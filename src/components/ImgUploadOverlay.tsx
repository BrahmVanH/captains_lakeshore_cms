import { BoxProps, Overlay } from 'evergreen-ui';
import UploadImage from './UploadImage';

export default function ImgUploadOverlay({
	isShown,
	propertyName,
	handleUploadOverlay,
	handleSetImgUploadSuccess,
}: {
	isShown: boolean;
	propertyName: string;
	handleUploadOverlay: (show: boolean) => void;
	handleSetImgUploadSuccess: () => void;
}) {
	const containerProps: BoxProps<'div'> = {
		style: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			width: '100%',
			height: '100%',
			// zIndex: '999',
		},
	};
	return (
		<Overlay containerProps={containerProps} onExit={() => handleUploadOverlay(false)} shouldCloseOnEscapePress={true} shouldCloseOnClick={false} preventBodyScrolling={true} isShown={isShown}>
			{propertyName ? <UploadImage handleSetImgUploadSuccess={handleSetImgUploadSuccess} propertyName={propertyName} /> : <></>}
		</Overlay>
	);
}
