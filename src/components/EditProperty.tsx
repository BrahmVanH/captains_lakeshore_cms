import { useEffect, useState, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { Button, Icon, Textarea, Tooltip } from 'evergreen-ui';
import { GET_PROPERTY_INFO } from '../lib/queries';
import { UPDATE_PROPERTY_INFO } from '../lib/mutations';
import { useLazyQuery, useMutation } from '@apollo/client';
import { IProperty } from '../types';
import { Amenity, UpdatePropertyInput } from '../lib/__generated__/graphql';
import { FieldValues, set, useForm } from 'react-hook-form';

const FormWrapper = styled.div(
	({ theme }) => `
	z-index: 1000;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 25%;
	background-color: ${theme.primary};
	border-radius: 6px;
	border: 1px solid white;
	margin: auto;
	padding: 1rem;
	height: min-content;
	box-shadow: 0 0 10px 0 ${theme.primary};
`
);

const Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
`;

const Label = styled.label`
	color: white;
	margin-bottom: 0.5rem;
`;

const Input = styled.input`
	width: 75%;
	margin-bottom: 1rem;
	text-align: center;
	border-radius: 6px;
	box-shadow: none;
	line-height: normal;
	border: none;
`;

const STextarea = styled(Textarea)`
	width: 100%;
	margin-bottom: 1rem;
`;

const SButton = styled(Button)`
	color: white;
	border: 1px solid white;
	background-color: transparent;
	&:hover {
		color: black;
	}
`;

export default function EditProperty({ propertyName }: Readonly<{ propertyName: string }>) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	// const {
	// 	ref: propertyNameInputRef,
	// 	onChange: propertyNameInputOnChange,
	// 	name: propertyNameInputName,
	// 	...propertyNameInputProps
	// } = register('propertyName', { required: true, disabled: disabled, onChange: handleInputChange });
	const {
		ref: propertyDescriptionInputRef,
		onChange: propertyDescriptionInputOnChange,
		name: propertyDescriptionInputName,
		...propertyDescriptionInputProps
	} = register('propertyDescription', { required: true });

	const [originalPropertyInfo, setOriginalPropertyInfo] = useState<IProperty | null>(null);
	const [propertyNameInputValue, setPropertyNameInputValue] = useState<string>('');
	const [propertyDescription, setPropertyDescription] = useState<string>('');
	const [amenities, setAmenities] = useState<Amenity[] | null>(null);
	const [headerImgKey, setHeaderImgKey] = useState<string>('');
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [updatedInfo, setUpdatedInfo] = useState<FieldValues | null>(null);
	// const [updatedInfo, setUpdatedInfo] = useState<FieldValues | null>(null);
	const nameInputRef = useRef<HTMLInputElement>(null);
	const descriptionInputRef = useRef<HTMLInputElement>(null);
	const [propertyNameInputDisabled, setPropertyNameInputDisabled] = useState<boolean>(true);
	const [propertyDescriptionInputDisabled, setPropertyDescriptionInputDisabled] = useState<boolean>(true);

	// IF !ISEDITING DISABLE INPUTS

	const [getPropertyInfo] = useLazyQuery(GET_PROPERTY_INFO);
	const [updatePropertyInfo] = useMutation(UPDATE_PROPERTY_INFO);

	const handleInputChange = (event: any) => {
		const { name, value } = event.target;
		if (name === 'propertyName') {
			setPropertyNameInputValue(value);
		} else if (name === 'propertyDescription') {
			setPropertyDescription(value);
		}
	};

	const handleDiscardChanges = useCallback(() => {
		setPropertyNameInputValue(originalPropertyInfo?.propertyName || '');
		setPropertyDescription(originalPropertyInfo?.propertyDescription || '');
		setAmenities(originalPropertyInfo?.amenities || null);
		setHeaderImgKey(originalPropertyInfo?.headerImgKey || '');
		setIsEditing(false);
	}, [originalPropertyInfo]);

	const handleGetPropertyInfo = useCallback(async (propertyName: string) => {
		if (!propertyName) {
			return;
		}

		try {
			const { data, loading, error } = await getPropertyInfo({ variables: { propertyName } });

			if (loading) {
				setIsLoading(true);
			}

			if (error && !data) {
				console.error(error);
			}

			if (data) {
				setOriginalPropertyInfo(data?.getPropertyInfo);
				setIsLoading(false);
				setPropertyNameInputValue(data?.getPropertyInfo?.propertyName);
				setPropertyDescription(data?.getPropertyInfo?.propertyDescription);
				setAmenities(data?.getPropertyInfo?.amenities);
				setHeaderImgKey(data?.getPropertyInfo?.headerImgKey);
			}
		} catch (error) {
			console.error(error);
		}
	}, []);

	const handleUpdatePropertyInfo = useCallback(async ({ propertyName, propertyDescription, amenities, headerImgKey }: any) => {
		console.log('updating property info:', propertyName, propertyDescription, amenities, headerImgKey);
		if (!propertyName || !propertyDescription) {
			console.error('Missing required fields');
			return;
		}
		const updateInput: UpdatePropertyInput = {
			propertyName,
			update: {
				propertyDescription,
				amenities,
				headerImgKey,
			},
		};

		console.log('updateInput:', updateInput);
		try {
			const { data } = await updatePropertyInfo({ variables: { input: updateInput } });

			if (!data) {
				console.error('Error updating property info');
				return;
			}

			console.log('Property info updated:', data);
		} catch (error: any) {
			console.error(error);
			throw new Error(error);
		}
	}, []);

	useEffect(() => {
		if (propertyName) {
			handleGetPropertyInfo(propertyName);
		}
	}, [propertyName]);

	useEffect(() => {
		if (isEditing) {
			setPropertyNameInputDisabled(false);
			setPropertyDescriptionInputDisabled(false);
		} else {
			setPropertyNameInputDisabled(true);
			setPropertyDescriptionInputDisabled(true);
		}
	}, [isEditing]);

	useEffect(() => {
		if (updatedInfo && amenities && headerImgKey) {
			console.log('updatedInfo:', updatedInfo);
			const update = {
				propertyName: updatedInfo.propertyName,
				propertyDescription: updatedInfo.propertyDescription,
				amenities: amenities,
				headerImgKey: headerImgKey,
			};
			handleUpdatePropertyInfo(update);
		}
	}, [updatedInfo, amenities, headerImgKey, handleUpdatePropertyInfo]);

	return (
		<FormWrapper>
			<h1 style={{ color: 'white' }}>Upload Image</h1>
			<Form onSubmit={handleSubmit(setUpdatedInfo)}>
				<Label htmlFor='propertyName'>Property Name</Label>
				<Input {...register('propertyName', { required: true, disabled: propertyNameInputDisabled, onChange: handleInputChange })} value={propertyNameInputValue} placeholder='Property Name' />
				{errors.propertyName && <span style={{ color: 'red' }}>This field is required</span>}
				<Label htmlFor='propertyDescription'>Property Description</Label>
				<STextarea
					id='propertyDescription'
					value={propertyDescription}
					placeholder='Property Description'
					{...register('propertyDescription', { required: true, disabled: propertyDescriptionInputDisabled, onChange: handleInputChange })}
				/>
				{isEditing && (
					<SButton type='submit' appearance='minimal'>
						Save
					</SButton>
				)}

				{!isEditing ? (
					<SButton onClick={() => setIsEditing(!isEditing)} appearance='minimal'>
						Edit
					</SButton>
				) : (
					<SButton onClick={handleDiscardChanges} appearance='minimal'>
						Discard
					</SButton>
				)}
			</Form>
		</FormWrapper>
	);
}
