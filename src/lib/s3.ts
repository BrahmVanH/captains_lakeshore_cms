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

export const deleteImgFromS3 = async (imgKey: string, presignedDeleteUrl: string) => {
	try {
		const headers = new Headers({ 'Content-Type': 'application/json' });
		console.log('deleting image from s3 bucket:', imgKey);
		const response = await fetch(presignedDeleteUrl, {
			method: 'DELETE',
			headers: headers,
			body: JSON.stringify({ imgKey }),
		});

		if (!response.ok) {
			console.log('response:', response);
			throw new Error('Error in delete POST fetch: ' + response.statusText);
		}

		console.log('response:', response);

		if (response.status === 204) {
			return response;
		}

		return false;
	} catch (error: any) {
		console.error(error);
		throw new Error('Failed to delete image from S3' + error.message);
	}
};
