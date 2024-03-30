import { useCallback, useEffect, useState } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import { useForm, FieldValues } from 'react-hook-form';
import { GET_PRESEIGNED_URL } from '../lib/queries';
import { uploadImgToS3 } from '../lib/s3';

export default function UploadImage({ propertyName }: Readonly<{ propertyName: string }>) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const [input, setInput] = useState<FieldValues | null>(null);
	const [keyPrefix, setKeyPrefix] = useState<string>('');
	const [getPresignedUrl, { loading, error, data }] = useLazyQuery(GET_PRESEIGNED_URL, {
		variables: {
			imgKey: `${keyPrefix}/test`,
			commandType: 'upload',
		},
	});

	const handleImageUpload = useCallback(
		async ({ image }: FieldValues) => {
			try {
				const { data, error } = await getPresignedUrl({
					variables: {
						imgKey: `${keyPrefix}/${image[0].name}`,
						commandType: 'put',
					},
				});
				console.log(data);
				if (error || !data) {
					throw new Error('Error fetching presigned URL' + error?.message);
				}
				const response = await uploadImgToS3(image[0], data.getPresignedS3Url);

				if (!response.ok) {
					throw new Error('Error in upload POST fetch: ' + response.statusText);
				}
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
		}
	}, [propertyName]);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;


	// console.log(data);

	return (
		<div>
			<h1>Upload Image</h1>
			<form onSubmit={handleSubmit((data) => setInput(data))}>
				<input type='file' {...register('image')} />
				<button type='submit'>Upload</button>
			</form>
		</div>
	);
}
