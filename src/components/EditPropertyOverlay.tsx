import { BoxProps, Overlay } from 'evergreen-ui';
import EditProperty from './EditProperty';

export default function ImgUploadOverlay({
	isShown,
	propertyName,
	handleOpenEditPropertyOverlay,
}: Readonly<{ isShown: boolean; propertyName: string; handleOpenEditPropertyOverlay: (show: boolean) => void }>) {
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
		<Overlay
			containerProps={containerProps}
			onExit={() => handleOpenEditPropertyOverlay(false)}
			shouldCloseOnEscapePress={true}
			shouldCloseOnClick={false}
			preventBodyScrolling={true}
			isShown={isShown}>
			{propertyName ? <EditProperty propertyName={propertyName} /> : <></>}
		</Overlay>
	);
}
