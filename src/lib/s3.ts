export const uploadImgToS3 = async (file: File, presignedUploadUrl: string, altTag: string) => {
	try {
		const headers = new Headers({ 'Content-Type': 'image/jpg', 'x-amz-tagging': `alt=${altTag}` });
		const response = await fetch(presignedUploadUrl, {
			method: 'PUT',
			headers,
			body: file,
		});

		if (!response.ok) {
			throw new Error('Error in upload POST fetch: ' + response.statusText);
		}

		return response;
	} catch (error: any) {
		console.error(error);
		throw new Error('Failed to upload image to S3' + error.message);
	}
};
