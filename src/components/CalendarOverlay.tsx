import { BoxProps, Overlay } from 'evergreen-ui';
import { Property } from '../lib/__generated__/graphql';
import { useCallback } from 'react';
import Calendar from './Calendar';

export default function CalendarOverlay({ isShown, property, handleOpenCalendarOverlay }: Readonly<{ isShown: boolean; property: Property; handleOpenCalendarOverlay: (show: boolean) => void }>) {
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
		handleOpenCalendarOverlay(false);
	}, [handleOpenCalendarOverlay]);

	return (
		<Overlay containerProps={containerProps} onExit={() => handleOpenCalendarOverlay(false)} shouldCloseOnEscapePress={true} shouldCloseOnClick={true} preventBodyScrolling={true} isShown={isShown}>
			{property ? <Calendar handleSetClose={handleSetClose} propertyId={property._id} /> : <></>}
		</Overlay>
	);
}
