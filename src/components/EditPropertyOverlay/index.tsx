import { BoxProps, Overlay } from 'evergreen-ui';
import EditProperty from './EditProperty';
import { Property } from '../../lib/__generated__/graphql';
import { useCallback } from 'react';

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

	const handleSetClose = useCallback(() => {
		handleOpenEditPropertyOverlay(false);
	}, [handleOpenEditPropertyOverlay]);

	return (
		<Overlay
			containerProps={containerProps}
			onExit={() => handleOpenEditPropertyOverlay(false)}
			shouldCloseOnEscapePress={true}
			shouldCloseOnClick={true}
			preventBodyScrolling={true}
			isShown={isShown}>
			{property ? <EditProperty handleSetClose={handleSetClose} property={property} /> : <></>}
		</Overlay>
	);
}
