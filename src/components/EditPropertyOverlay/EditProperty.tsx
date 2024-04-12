import { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { Button, CrossIcon, Icon, Textarea, TickCircleIcon } from 'evergreen-ui';
import { GET_PROPERTY_INFO } from '../../lib/queries';
import { UPDATE_PROPERTY_INFO } from '../../lib/mutations';
import { useLazyQuery, useMutation } from '@apollo/client';
import { Amenity, Property, UpdatePropertyInput } from '../../lib/__generated__/graphql';
import { FieldValues, useForm } from 'react-hook-form';
import Loading from '../LoadingAnimation';

// Styled components

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

const CloseBtnContainer = styled.div`
	width: 100%;
	padding: 0.5rem;
	background-color: transparent;
	display: flex;
	justify-content: flex-end;
	border: none !important;

	&:hover,
	&:focus,
	&:active,
	&:visited,
	&:link,
	&.active,
	&.hover,
	&.focus,
	&.visited,
	&.link {
		background-color: transparent !important;
		border: none !important;
	}
`;

// Styled Evergreen ui button
const CloseBtn = styled(Button)`
	background-color: transparent !important;
	border: none !important;
	color: white !important;
	width: min-content;
`;

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

// Styled Evergreen ui textarea
const STextarea = styled(Textarea)`
	width: 100%;
	margin-bottom: 1rem;
`;

const BtnContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	width: 40%;
`;

// Styled Evergreen ui button
const SButton = styled(Button)`
	color: white;
	border: 1px solid white;
	background-color: transparent;
	&:hover {
		color: black;
	}
`;

export default function EditProperty({ handleSetClose, property }: Readonly<{ handleSetClose: () => void; property: Property }>) {
	// Destructure react-hook-form useForm() response to pass into Form component
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const [propertyNameInputValue, setPropertyNameInputValue] = useState<string>('');
	const [propertyDescriptionInputValue, setPropertyDescriptionInputValue] = useState<string>('');
	const [originalPropertyInfo, setOriginalPropertyInfo] = useState<Property | null>(null);

	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const [propertyNameInputDisabled, setPropertyNameInputDisabled] = useState<boolean>(true);
	const [propertyDescriptionInputDisabled, setPropertyDescriptionInputDisabled] = useState<boolean>(true);
	const [successfulUpdate, setSuccessfulUpdate] = useState<boolean>(false);
	const [reloadPropertyInfo, setReloadPropertyInfo] = useState<boolean>(false);

	// Apollo hooks for fetching and updating property info
	const [getPropertyInfo] = useLazyQuery(GET_PROPERTY_INFO);
	const [updatePropertyInfo] = useMutation(UPDATE_PROPERTY_INFO);

	// Handles input change form input fields - propertyName and propertyDescription inputs are pre-populated
	// with the original property info. The event passed in contains the name and value of the input field
	// that was changed. The name is used to determine which input field was changed.
	const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		console.log('Event:', event.target);
		const { name, value } = event.target;
		console.log('Name:', name);
		if (name === 'propertyName') {
			setPropertyNameInputValue(value);
		} else if (name === 'propertyDescription') {
			setPropertyDescriptionInputValue(value);
		}
	}, []);

	// Strips the amenities object returned from apollo query to only include the amenityName and amenityType
	// to pass back into update mutation (amenities are not editable in the current version);
	const getAmenitiesInput = useCallback((amenities: Amenity[]) => {
		if (!amenities) {
			console.error('No amenities provided');
			return;
		}
		return amenities.map((amenity) => {
			return {
				amenityName: amenity.amenityName,
				amenityType: amenity.amenityType,
			};
		});
	}, []);

	// Reverts the property name and description input fields to the "original values" that were set
	// on render before user modifications were made.

	const handleDiscardChanges = useCallback(
		(event: MouseEvent) => {
			event.preventDefault();
			if (!originalPropertyInfo?.propertyName || !originalPropertyInfo?.propertyDescription) {
				console.error('No original property info provided');
				return;
			}
			console.log('setting original values');
			setPropertyNameInputValue(originalPropertyInfo?.propertyName);
			setPropertyDescriptionInputValue(originalPropertyInfo?.propertyDescription);
			console.log('setting isEditing to !isEditing');
			setIsEditing(!isEditing);
		},
		[originalPropertyInfo, isEditing]
	);

	// Fetches the property info from the database using the property id passed in as a prop.
	const handleGetPropertyInfo = useCallback(async () => {
		if (!property?._id) {
			console.error('No property id provided');
			return;
		}

		const { loading, error, data } = await getPropertyInfo({ variables: { _id: property._id } });

		if (error) {
			console.error('Error fetching property info:', error);
			return;
		}

		if (data && !loading) {
			setOriginalPropertyInfo(data.getPropertyInfo as Property);
			setSuccessfulUpdate(false);
		}
	}, [getPropertyInfo, property]);

	// Handles the form submission of the property info form. The updatedInfo object contains the updated
	// property name and description values. The updatedInfo object is then used to update the property
	// info in the database. The current version will not allow for user-modified amenities or headerImgKey
	// so the original values are automatically passed in.
	const handleUpdatePropertyInfo = useCallback(async (formValues: FieldValues, originalPropertyInfo: Property) => {
		if (!formValues.propertyName || !formValues.propertyDescription) {
			console.error('No update input provided');
			return;
		}

		if (!originalPropertyInfo?._id || !originalPropertyInfo?.amenities || !originalPropertyInfo?.headerImgKey) {
			console.error('No original property provided', originalPropertyInfo);
			return;
		}

		const originalAmenities = getAmenitiesInput(originalPropertyInfo?.amenities);
		const updateInput: UpdatePropertyInput = {
			_id: originalPropertyInfo?._id,
			update: {
				propertyName: formValues.propertyName,
				propertyDescription: formValues.propertyDescription,
				amenities: originalAmenities,
				headerImgKey: originalPropertyInfo?.headerImgKey,
			},
		};

		console.log('Update input:', updateInput);

		try {
			const { data } = await updatePropertyInfo({ variables: { input: updateInput } });

			if (!data) {
				console.error('Error updating property info');
				return;
			}

			console.log('Property info updated:', data);
			setSuccessfulUpdate(true);
			setIsEditing(false);
			setReloadPropertyInfo(true);
		} catch (error: any) {
			// (TODO) Function is run once on initial render to memoize, will throw error... Handle error softly
			console.error(error);
			throw new Error(error);
		}
	}, []);

	useEffect(() => {
		if (property) {
			setOriginalPropertyInfo(property);
			setPropertyNameInputValue(property.propertyName);
			setPropertyDescriptionInputValue(property.propertyDescription);
			setIsLoading(false);
		}
	}, [property]);

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
		if (originalPropertyInfo) {
			console.log('Original property info:', originalPropertyInfo);
		} else {
			console.error('No original property info provided in standalone use effect');
		}
	}, [originalPropertyInfo]);

	useEffect(() => {
		if (reloadPropertyInfo) {
			handleGetPropertyInfo();
			setReloadPropertyInfo(false);
		}
	}, [reloadPropertyInfo, handleGetPropertyInfo]);

	useEffect(() => {
		console.log('isEditing:', isEditing);
	}, [isEditing]);

	return (
		<FormWrapper>
			<CloseBtnContainer>
				<CloseBtn onClick={handleSetClose} iconBefore={CrossIcon} appearance='minimal' />
			</CloseBtnContainer>
			<h1 style={{ color: 'white' }}>Update Info</h1>
			{!isLoading && originalPropertyInfo ? (
				<Form onSubmit={handleSubmit((data) => handleUpdatePropertyInfo(data, originalPropertyInfo))}>
					<Label htmlFor='propertyName'>Property Name</Label>
					<Input {...register('propertyName', { required: true, disabled: propertyNameInputDisabled, onChange: handleInputChange })} value={propertyNameInputValue} placeholder='Property Name' />
					{errors.propertyName && <span style={{ color: 'red' }}>This field is required</span>}
					<Label htmlFor='propertyDescription'>Property Description</Label>
					<STextarea
						id='propertyDescription'
						value={propertyDescriptionInputValue}
						placeholder='Property Description'
						{...register('propertyDescription', { required: true, disabled: propertyDescriptionInputDisabled, onChange: handleInputChange })}
					/>
					{!successfulUpdate ? (
						<BtnContainer>
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
						</BtnContainer>
					) : (
						<Icon icon={TickCircleIcon} color='success' size={24} />
					)}
				</Form>
			) : (
				<Loading />
			)}
		</FormWrapper>
	);
}
