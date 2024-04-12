import { useState, useEffect, useCallback } from 'react';
import { Calendar, TileArgs, TileClassNameFunc } from 'react-calendar';
// import Value from 'react-calendar';

import { QUERY_BOOKINGS_BY_PROPERTY } from '../../lib/queries';
import { CREATE_BOOKING, DELETE_BOOKING } from '../../lib/mutations';

import { useLazyQuery, useMutation } from '@apollo/client';

import { getDateValues, isSameDay, convertToDateArr } from '../../lib/calendarHelpers';

import 'react-calendar/dist/Calendar.css';
import Loading from '../LoadingAnimation';
import { Booking } from '../../lib/__generated__/graphql';
import { Button } from 'evergreen-ui';

function AdminCalendar({
	propertyId,
	handleSetClose,
	enableAddBookings,
	enableDeleteBookings,
	confirmChanges,
}: Readonly<{ propertyId: string; handleSetClose: () => void; enableAddBookings: boolean; enableDeleteBookings: boolean; confirmChanges: boolean }>) {
	const [date, setDate] = useState(new Date());
	const [bookings, setBookings] = useState<Booking[] | null>(null);
	const [loading, setLoading] = useState(true);
	const [selectedDates, setSelectedDates] = useState<string[]>([]);
	const [tileClassName, setTileClassName] = useState<TileClassNameFunc | null>(null);

	// Checks database for booked dates for the passed in property
	const [getBookings] = useLazyQuery(QUERY_BOOKINGS_BY_PROPERTY);
	const [createBooking] = useMutation(CREATE_BOOKING);
	const [removeBooking] = useMutation(DELETE_BOOKING);

	const handleGetBookings = useCallback(async (propertyId: string) => {
		if (!propertyId) {
			return;
		}

		console.log('getting bookings');

		try {
			const { loading, error, data } = await getBookings({ variables: { propertyId } });

			if (error) {
				console.error(error);
			}

			if (data?.queryBookingsByProperty && !loading) {
				console.log('got bookings');
				setLoading(false);
				setBookings(data.queryBookingsByProperty);

				console.log('data:', data);
			}
		} catch (err) {
			console.error(err);
			throw new Error('Error fetching unavailable dates');
		}
	}, []);

	const reloadPage = () => {
		window.location.reload();
	};

	const tileClassNameEditDisabled = ({ date }: TileArgs) => {
		if (!bookings || bookings.length === 0) {
			return;
		}
		const bookedDates = getDateValues(bookings);

		if (bookedDates && bookedDates.some((booking) => isSameDay(booking, date))) {
			return 'disabled-booked-calendar-day';
		} else if (!bookedDates.some((booking) => isSameDay(booking, date))) {
			return 'disabled-calendar-day';
		}
	};

	// Function to generate custom class for the current day
	const tileClassNameEnabledDeleteBookings = ({ date }: TileArgs) => {
		if (!bookings || bookings.length === 0) {
			return;
		}
		const selDates = convertToDateArr(selectedDates);
		const bookedDates = getDateValues(bookings);
		if (bookedDates && bookedDates.some((booking) => isSameDay(booking, date)) && selDates && selDates.some((selDate) => isSameDay(selDate, date))) {
			return 'selected-booked-calendar-day';
		} else if (bookedDates && bookedDates.some((booking) => isSameDay(booking, date))) {
			return 'booked-calendar-day';
		} else if (!bookedDates.some((booking) => isSameDay(booking, date))) {
			return 'disabled-calendar-day';
		} else if (selDates && selDates.some((selDate) => isSameDay(selDate, date))) {
			return 'selected-calendar-day';
		}
	};

	// Function to generate custom class for the current day
	const tileClassNameEnabledAddBookings = ({ date }: TileArgs) => {
		if (!bookings || bookings.length === 0) {
			return;
		}
		const selDates = convertToDateArr(selectedDates);
		const bookedDates = getDateValues(bookings);

		if (bookedDates && bookedDates.some((booking) => isSameDay(booking, date))) {
			return 'disabled-booked-calendar-day';
		} else if (selDates && selDates.some((selDate) => isSameDay(selDate, date))) {
			return 'selected-calendar-day';
		} else {
			return '';
		}
	};
	// This creates an elements to be appended to each date on the calendar that matches a date in a new unavailableDates array
	// created from calling getDateValues
	const tileContent = useCallback(({ date, view }: TileArgs) => {
		if (bookings !== null && bookings.length > 0) {
			const bookingsDateValues = getDateValues(bookings);
			const isUnavailable = bookingsDateValues.some((bookingDate) =>
				view === 'month'
					? bookingDate.getFullYear() === date.getFullYear() && bookingDate.getMonth() === date.getMonth() && bookingDate.toDateString() === date.toDateString()
					: bookingDate.toDateString() === date.toDateString()
			);

			return isUnavailable;
		} else {
			return null;
		}
	}, [bookings]);

	const handleDateChange = (value: any, event: any) => {
		event.preventDefault();
		const date = new Date(value);
		setDate(date);
	};
	// This adds an entry to the datebase representing a date that is unavailable to rent
	const handleAddBookings = useCallback(async () => {
		if (selectedDates.length === 0) {
			console.log('No dates to add');

			return;
		}
		const newBookings = selectedDates.map((date) => ({ dateValue: date, propertyId }));
		try {
			const { data } = await createBooking({ variables: { input: { bookings: newBookings } } });
			if (data && propertyId) {
				handleGetBookings(propertyId);
			}
		} catch (err) {
			console.error(err);
		}
	}, [selectedDates]);

	// This removes an entry from the database representing a date that was unavailable to rent
	const handleDeleteBookings = useCallback(async () => {
		const selectedBookingIds = selectedDates.map((date) => bookings?.find((booking) => booking.dateValue === date)?._id).filter((id) => id !== undefined) as string[];
		console.log('Selected Booking Ids:', selectedBookingIds)
		if (selectedBookingIds.length === 0) {
			console.log('No dates to delete');
			return;
		}

		try {
			const { data } = await removeBooking({ variables: { input: { bookingIds: selectedBookingIds } } });
			if (data && propertyId) {
				handleGetBookings(propertyId);
			}
		} catch (err) {
			console.error(err);
		}
	}, [selectedDates, bookings]);

	// This takes in the selected date value from the calendar and compares to the unavailableDates state
	// and returns a value if there is a match. the value is created as an unavailableDate object in db

	// This is a handler function that is called when the user clicks on a date on the calendar
	const onClickDay = (value: any, event: any) => {
		event.preventDefault();
		if (selectedDates.includes(value.toDateString())) {
			setSelectedDates(selectedDates.filter((date) => date !== value.toDateString()));
		} else {
			setSelectedDates([...selectedDates, value.toDateString()]);
		}
	};

	const handleConfirmChanges = () => {
		if (enableAddBookings) {
			handleAddBookings();
		} else if (enableDeleteBookings) {
			handleDeleteBookings();
		} else {
			return;
		}
	};

	useEffect(() => {
		if (confirmChanges) {
			handleConfirmChanges();
		}
	}, [confirmChanges]);

	useEffect(() => {
		if (propertyId) {
			handleGetBookings(propertyId);
		}
	}, [propertyId]);

	useEffect(() => {
		if (enableAddBookings) {
			setTileClassName(() => tileClassNameEnabledAddBookings);
		} else if (enableDeleteBookings) {
			setTileClassName(() => tileClassNameEnabledDeleteBookings);
		} else {
			setTileClassName(() => tileClassNameEditDisabled);
		}
	}, [enableAddBookings, enableDeleteBookings, bookings, selectedDates]);

	useEffect(() => {
		if (selectedDates.length > 0) {
			console.log('Selected Dates:', selectedDates);
		}
	}, [selectedDates]);

	useEffect(() => {
		console.log('confirmChanges:', confirmChanges);
	}, [confirmChanges]);


	return (
		<div style={{ zIndex: '1000' }}>
			{loading ? (
				<Loading />
			) : (
				<div>
					<div className='admin-calendar-container'>
						<Calendar tileContent={tileContent} onChange={handleDateChange} value={date} onClickDay={onClickDay} tileClassName={tileClassName} />
					</div>

					<div className='calendar-key'>
						<div className='calendar-key-tile' />
						<p className='calendar-key-text'>Booked</p>
					</div>
				</div>
			)}
		</div>
	);
}

export default AdminCalendar;
