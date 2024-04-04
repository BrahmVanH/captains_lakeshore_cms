import { BoxProps, Overlay } from 'evergreen-ui';
import EditProperty from './EditProperty';
import { Property } from '../lib/__generated__/graphql';

export default function ImgUploadOverlay({
	isShown,
	property,
	handleOpenEditPropertyOverlay,
}: Readonly<{ isShown: boolean; property: Property; handleOpenEditPropertyOverlay: (show: boolean) => void }>) {
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
			{property ? <EditProperty property={property} /> : <></>}
		</Overlay>
	);
}
