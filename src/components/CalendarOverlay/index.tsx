import { useState, useCallback } from 'react';
import { BoxProps, Overlay } from 'evergreen-ui';
import { Property } from '../../lib/__generated__/graphql';
import Calendar from './Calendar';
import SideMenu from './SideMenu';

export default function CalendarOverlay({ isShown, property, handleOpenCalendarOverlay }: Readonly<{ isShown: boolean; property: Property; handleOpenCalendarOverlay: (show: boolean) => void }>) {
	const [enableAddBookings, setEnableAddBookings] = useState<boolean>(false);
	const [enableDeleteBookings, setEnableDeleteBookings] = useState<boolean>(false);
	const [confirmChanges, setConfirmChanges] = useState<boolean>(false);

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

	const handleEnableAddBookings = useCallback(() => {
		setEnableAddBookings(true);
		setEnableDeleteBookings(false);
	}, []);

	const handleEnableDeleteBookings = useCallback(() => {
		setEnableDeleteBookings(true);
		setEnableAddBookings(false);
	}, []);

	const handleDisableBookingsEdit = useCallback(() => {
		setEnableAddBookings(false);
		setEnableDeleteBookings(false);
	}, []);

	const handleConfirmChanges = useCallback(() => {
		setConfirmChanges(true);
	}, []);

	return (
		<Overlay containerProps={containerProps} onExit={() => handleOpenCalendarOverlay(false)} shouldCloseOnEscapePress={true} shouldCloseOnClick={true} preventBodyScrolling={true} isShown={isShown}>
			{property ? (
				<>
					<SideMenu
						enableAddBookings={enableAddBookings}
						enableDeleteBookings={enableDeleteBookings}
						handleEnableAddBookings={handleEnableAddBookings}
						handleEnableDeleteBookings={handleEnableDeleteBookings}
						handleDisableBookingsEdit={handleDisableBookingsEdit}
						handleConfirmChanges={handleConfirmChanges}
					/>
					<Calendar confirmChanges={confirmChanges} enableAddBookings={enableAddBookings} enableDeleteBookings={enableDeleteBookings} handleSetClose={handleSetClose} propertyId={property._id} />
				</>
			) : (
				<></>
			)}
		</Overlay>
	);
}
