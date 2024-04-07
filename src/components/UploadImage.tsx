import { useCallback, useEffect, useState, useRef } from 'react';
import { useLazyQuery } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { GET_PRESEIGNED_URL } from '../lib/queries';
import { uploadImgToS3 } from '../lib/s3';
import styled from 'styled-components';
import { Button, CloudUploadIcon, FileUploader, TextInput, FileCard, FileRejection, Tooltip, TickCircleIcon, CrossIcon } from 'evergreen-ui';

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
	bo &:hover,
	&:focus,
	&:active,
	&:visited,
	&:link,
	&.active,
	&.hover,
	&.focus,
	&.visited,
	&.link {
		background-color: transparent;
	}
`;

const CloseBtn = styled(Button)`
	background-color: transparent;
	border: none;
	color: white;
	width: min-content;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
`;

const StyledTextInput = styled(TextInput)`
	width: 30%;
	margin: 1rem;
	background-color: white;
	border: 1px solid black;
	color: black;

	&:disabled {
		background-color: lightgrey;
	}
`;

const SButton = styled(Button)`
	color: white;
	background-color: transparent;
	&:hover {
		color: black;
	}
`;



export default function UploadImage({
	propertyName,
	handleSetClose,
	handleSetImgUploadSuccess,
}: Readonly<{ propertyName: string; handleSetClose: () => void; handleSetImgUploadSuccess: () => void }>) {
	const {
		register,
	} = useForm();

	const [altInput, setAltInput] = useState<string | null>(null);
	const [keyPrefix, setKeyPrefix] = useState<string>('');
	const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
	const [altInputDisabled, setAltInputDisabled] = useState<boolean>(true);
	const [files, setFiles] = useState<File[]>([]);
	const [fileRejections, setFileRejections] = useState<FileRejection[]>([]);
	const handleChange = useCallback((files: File[]) => setFiles([files[0]]), []);
	const handleRejected = useCallback((fileRejections: FileRejection[]) => setFileRejections([fileRejections[0]]), []);
	const handleRemove = useCallback(() => {
		setFiles([]);
		setFileRejections([]);
	}, []);

	const [getPresignedUrl] = useLazyQuery(GET_PRESEIGNED_URL);

	const altInputRef = useRef<HTMLDivElement>(null);

	const handleInputChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const { value } = event.target;
			setAltInput(value);
		},
		[altInput]
	);

	const handleDisableAltInput = useCallback((isDisabled: boolean) => {
		setAltInputDisabled(isDisabled);
	}, []);


	const handleImageUpload = useCallback(
		async (event: any) => {
			event.preventDefault();
			if (!altInput || files.length === 0) {
				console.error('Alt tag and image are required');
				return;
			}
			console.log('uploading image:', files[0], altInput, keyPrefix);
			try {
				const { data, error } = await getPresignedUrl({
					variables: {
						imgKey: `${keyPrefix}/${files[0].name}`,
						commandType: 'put',
						altTag: altInput,
					},
				});
				console.log(data);
				if (error || !data) {
					throw new Error('Error fetching presigned URL' + error?.message);
				}
				const response = await uploadImgToS3(files[0], data.getPresignedS3Url, altInput);

				if (!response.ok) {
					throw new Error('Error in upload POST fetch: ' + response.statusText);
				}
				setUploadSuccess(true);
				console.log('Image uploaded successfully', response);
			} catch (error: any) {
				console.error(error);
				throw new Error('Failed to upload image to S3' + error.message);
			}
		},
		[keyPrefix, altInput, files, getPresignedUrl]
	);

	useEffect(() => {
		if (propertyName === "Captain's Hideaway") {
			setKeyPrefix('captains_hideaway_png');
		} else if (propertyName === "Captain's Cottage") {
			setKeyPrefix('captains_cottage_png');
		}
	}, [propertyName]);

	useEffect(() => {
		if (files.length > 0) {
			console.log('files length greater than 0:', files);
			handleDisableAltInput(false);
		}
	}, [files]);

	useEffect(() => {
		if (altInput) {
			console.log('altInput:', altInput);
		}
	}, [altInput]);

	useEffect(() => {
		console.log('altInputRef:', altInputRef);
	}, [altInputRef]);

	useEffect(() => {
		if (files.length > 0) {
			console.log('files:', files);
		}
	}, [files]);

	useEffect(() => {
		if (uploadSuccess) {
			handleSetImgUploadSuccess();
		}
	}, [uploadSuccess]);

	return (
		<UploadFormWrapper>
			<CloseBtnContainer>
				<CloseBtn onClick={handleSetClose} iconBefore={CrossIcon} appearance='minimal' />
			</CloseBtnContainer>
			<h1 style={{ color: 'white' }}>Upload Image</h1>
			{uploadSuccess ? (
				<TickCircleIcon color='green' size={40} />
			) : (
				<Form>
					<FileUploader
						maxSizeInBytes={50 * 1024 ** 2}
						maxFiles={1}
						onChange={handleChange}
						onRejected={handleRejected}
						renderFile={(file) => {
							const { name, size, type } = file;
							const fileRejection = fileRejections.find((fileRejection) => fileRejection.file === file);
							const { message } = fileRejection || {};
							return <FileCard key={name} name={name} isInvalid={fileRejection != null} onRemove={handleRemove} sizeInBytes={size} type={type} validationMessage={message} />;
						}}
						values={files}
					/>

					<Tooltip position='right' content={<p style={{ fontSize: '12px', color: 'white', lineHeight: 'normal' }}>Please enter a brief, descriptive tag for this image</p>}>
						<StyledTextInput {...register('altInput', { disabled: altInputDisabled, onChange: handleInputChange })} type='text' placeholder='Alt Tag' />
					</Tooltip>
					<SButton onClick={handleImageUpload} iconBefore={CloudUploadIcon}>
						Upload
					</SButton>
				</Form>
			)}
		</UploadFormWrapper>
	);
}
