import { useCallback, useEffect, useState, useRef } from 'react';
import { useLazyQuery } from '@apollo/client';
import { useForm, FieldValues } from 'react-hook-form';
import { GET_PRESEIGNED_URL } from '../lib/queries';
import { uploadImgToS3 } from '../lib/s3';
import styled from 'styled-components';
import { Button, CloudUploadIcon, ImportIcon } from 'evergreen-ui';

const UploadFormWrapper = styled.div(
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
	height: 35vh;
`
);

const Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
`;

interface InputSCProps {
	$isFileSet: boolean;
}

const Input = styled.input<InputSCProps>(
	({ $isFileSet }) => `
width: 30%;
margin: 1rem;
background-color: ${$isFileSet ? 'white' : 'transparent'};
border: ${$isFileSet ? '1px solid black' : 'none'};
color: ${$isFileSet ? 'black' : 'transparent'};
`
);

const SButton = styled(Button)`
	color: white;
	background-color: transparent;
	&:hover {
		color: black;
	}
`;

const HiddenInput = styled.input`
	display: none;
`;

export default function UploadImage({ propertyName }: Readonly<{ propertyName: string }>) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const { ref: imgRef, ...restImg } = register('image', { required: true });
	const { ref: altRef, ...restAlt } = register('altTag', { required: true });

	const [input, setInput] = useState<FieldValues | null>(null);
	const [keyPrefix, setKeyPrefix] = useState<string>('');
	const [fileName, setFileName] = useState<string>('');
	const [isFileSet, setIsFileSet] = useState<boolean>(false);

	// const altInputRef = useRef<HTMLInputElement>(null);

	const [getPresignedUrl] = useLazyQuery(GET_PRESEIGNED_URL);

	const hiddenInputRef = useRef<HTMLInputElement>(null);
	const uploadBtn = useRef<HTMLButtonElement>(null);

	// const triggerHiddenInput = useCallback(() => {
	// 	if (hiddenInputRef.current) {
	// 		hiddenInputRef.current.click();
	// 	}
	// }, [hiddenInputRef]);

	const triggerHiddenInput = useCallback(() => {
		// imgRef(hiddenInputRef.current);
		hiddenInputRef.current?.click();
	}, []);

	// const setHiddenInputRef = useCallback(
	// 	(e: any) => {
	// 		if (!imgRef) return;
	// 		console.log('e: ', e);
	// 		// hiddenInputRef.current = e;
	// 		imgRef(e);
	// 		console.log('e:', e);

	// 	},
	// 	[imgRef]
	// );

	const handleSetFileName = useCallback(() => {
		// if (hiddenInputRef?.current?.files?.[0]) {
		// 	setFileName(hiddenInputRef.current.files?.[0].name);
		// 	setIsFileSet(true);
		// }
	}, [hiddenInputRef]);

	// const handleEnableBtn = useCallback(() => {
	// 	uploadBtn.current?.removeAttribute('disabled');
	// }, [uploadBtn]);

	const handleImageUpload = useCallback(
		async ({ image, altTag }: FieldValues) => {
			console.log('uploading image:', image[0].name, altTag, keyPrefix);
			try {
				const { data, error } = await getPresignedUrl({
					variables: {
						imgKey: `${keyPrefix}/${image[0].name}`,
						commandType: 'put',
						altTag,
					},
				});
				console.log(data);
				if (error || !data) {
					throw new Error('Error fetching presigned URL' + error?.message);
				}
				const response = await uploadImgToS3(image[0], data.getPresignedS3Url, altTag);

				if (!response.ok) {
					throw new Error('Error in upload POST fetch: ' + response.statusText);
				}
				console.log('Image uploaded successfully', response);
			} catch (error: any) {
				console.error(error);
				throw new Error('Failed to upload image to S3' + error.message);
			}
		},
		[keyPrefix]
	);

	useEffect(() => {
		if (input) {
			console.log('input:', input);
			handleImageUpload(input);
		}
	}, [input, handleImageUpload]);

	useEffect(() => {
		if (propertyName === 'hideaway') {
			setKeyPrefix('captains_hideaway_png');
		} else if (propertyName === 'cottage') {
			setKeyPrefix('captains_cottage_png');
		}
	}, [propertyName]);

	return (
		<UploadFormWrapper>
			<h1 style={{ color: 'white' }}>Upload Image</h1>
			<Form onSubmit={handleSubmit((data) => setInput(data))}>
				<HiddenInput {...restImg} onChange={handleSetFileName} ref={hiddenInputRef} type='file' />
				{errors.image && <span style={{ color: 'red' }}>This field is required</span>}
				<SButton onClick={triggerHiddenInput} iconBefore={ImportIcon} type='button' appearance='minimal'>
					Choose File
				</SButton>
				{fileName && <span style={{ color: 'white' }}>{fileName}</span>}
				<Input $isFileSet={isFileSet} {...restAlt} type='text' placeholder='alt tag' />
				{errors.altTag && <span style={{ color: 'red' }}>This field is required</span>}
				<SButton type='submit' iconBefore={CloudUploadIcon}>
					Upload
				</SButton>
			</Form>
		</UploadFormWrapper>
	);
}
