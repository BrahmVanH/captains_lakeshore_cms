import { useState, useEffect, useCallback } from 'react';
import { Calendar, TileArgs } from 'react-calendar';
// import Value from 'react-calendar';

import { QUERY_BOOKINGS_BY_PROPERTY } from '../lib/queries';
import { CREATE_BOOKING, DELETE_BOOKING } from '../lib/mutations';

import { useLazyQuery, useMutation } from '@apollo/client';

import { getDateValues, isSameDay, convertToDateArr } from '../lib/calendarHelpers';

import 'react-calendar/dist/Calendar.css';
import Loading from './LoadingAnimation';
import { Booking } from '../lib/__generated__/graphql';
import { Button } from 'evergreen-ui';

function AdminCalendar({ propertyId, handleSetClose }: Readonly<{ propertyId: string; handleSetClose: () => void }>) {
	const [date, setDate] = useState(new Date());
	const [bookings, setBookings] = useState<Booking[] | null>(null);
	const [loading, setLoading] = useState(true);
	const [toBeBooked, setToBeBooked] = useState<string[]>([]);
	const [toBeRemoved, setToBeRemoved] = useState<string[]>([]);
	const [selectedDates, setSelectedDates] = useState<string[]>([]);

	// Checks database for booked dates for the passed in property
	const [getBookings] = useLazyQuery(QUERY_BOOKINGS_BY_PROPERTY);
	const [createBooking] = useMutation(CREATE_BOOKING);
	const [removeBooking] = useMutation(DELETE_BOOKING);

	const handleGetBookings = useCallback(async (propertyId: string) => {
		if (!propertyId) {
			return;
		}

		try {
			const { loading, error, data } = await getBookings({ variables: { propertyId } });

			if (error) {
				console.error(error);
			}

			if (data?.queryBookingsByProperty && !loading) {
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

	useEffect(() => {
		if (loading) {
			console.log(handleSetClose);
		}
	}, [loading]);

	// Function to generate custom class for the current day
	const tileClassName = ({ date }: TileArgs) => {
		if (!bookings || bookings.length === 0) {
			return;
		}
		const selDates = convertToDateArr(selectedDates);
		const bookedDates = getDateValues(bookings);

		if (bookedDates && bookedDates.some((booking) => isSameDay(booking, date))) {
			console.log('adding class booked-calendar-day');
			return 'booked-calendar-day';
		} else if (selDates && selDates.some((selDate) => isSameDay(selDate, date))) {
			return 'selected-calendar-day';
		} else {
			return '';
		}
	};

	// This creates an elements to be appended to each date on the calendar that matches a date in a new unavailableDates array
	// created from calling getDateValues
	const tileContent = ({ date, view }: TileArgs) => {
		if (bookings !== null && bookings.length > 0) {
			const bookingsDateValues = getDateValues(bookings);
			const isUnavailable = bookingsDateValues.some((bookingDate) =>
				view === 'month'
					? bookingDate.getFullYear() === date.getFullYear() && bookingDate.getMonth() === date.getMonth() && bookingDate.toDateString() === date.toDateString()
					: bookingDate.toDateString() === date.toDateString()
			);
			if (isUnavailable) {
				console.log('isUnavailable:', isUnavailable);
			}
			return isUnavailable;
		} else {
			return null;
		}
	};

	const handleDateChange = (value: any, event: any) => {
		event.preventDefault();
		const date = new Date(value);
		setDate(date);
	};
	// This adds an entry to the datebase representing a date that is unavailable to rent
	const handleAddBookings = useCallback(async () => {
		if (toBeBooked.length === 0) {
			console.log('No dates to add');

			return;
		}
		const newBookings = toBeBooked.map((date) => ({ dateValue: date, propertyId }));
		try {
			const { data } = await createBooking({ variables: { input: { bookings: newBookings } } });
			if (data) {
				reloadPage();
			}
		} catch (err) {
			console.error(err);
		}
	}, []);

	// This removes an entry from the database representing a date that was unavailable to rent
	const handleRemoveBookings = useCallback(async () => {
		let selectedBookingIds = toBeRemoved.map((date) => bookings?.find((booking) => booking.dateValue === date)?._id).filter((id) => id !== undefined) as string[];

		if (selectedBookingIds.length === 0) {
			return;
		}

		try {
			const { data } = await removeBooking({ variables: { input: { bookingIds: selectedBookingIds } } });
			if (data) {
				reloadPage();
			}
		} catch (err) {
			console.error(err);
		}
	}, []);

	// This takes in the selected date value from the calendar and compares to the unavailableDates state
	// and returns a value if there is a match. the value is created as an unavailableDate object in db
	// if there is no return value from the filter, the matching date object will be removed from the db
	const checkIfUnavailable = (value: string) => {
		if (!bookings || bookings.length === 0) {
			return;
		}

		const proposedDateOverlap = bookings.filter((date) => date.dateValue === value);
		const isSelected = selectedDates.includes(value);

		if (!isSelected) {
			let dates = selectedDates;
			selectedDates.forEach((date, index) => {
				if (date === value) {
					dates = selectedDates.splice(index, 1);
				}
			});
			setSelectedDates(dates);
		} else if (proposedDateOverlap.length === 0 && !isSelected) {
			// handleAddBooking(value);
			setToBeBooked((prevState) => [...prevState, value]);
			setSelectedDates((prevState) => [...prevState, value]);
		} else if (!isSelected && proposedDateOverlap.length > 0) {
			// handleRemoveBooking(value);
			setToBeRemoved((prevState) => [...prevState, value]);
			setSelectedDates((prevState) => [...prevState, value]);
		} else if (bookings && bookings.length === 0 && !loading) {
			setToBeBooked((prevState) => [...prevState, value]);
			setSelectedDates((prevState) => [...prevState, value]);
		}
	};
	// This is a handler function that is called when the user clicks on a date on the calendar
	const onClickDay = (value: any, event: any) => {
		event.preventDefault();
		const date = new Date(value);
		checkIfUnavailable(date.toISOString());
	};

	useEffect(() => {
		if (propertyId) {
			handleGetBookings(propertyId);
		}
	}, [propertyId]);

	return (
		<div style={{ zIndex: '1000' }}>
			{loading ? (
				<Loading />
			) : (
				<div>
					<div className='admin-calendar-container'>
						<Calendar tileContent={tileContent} onChange={handleDateChange} value={date} onClickDay={onClickDay} tileClassName={tileClassName} />
					</div>
					<Button onClick={handleAddBookings}>Add Bookings</Button>
					<Button onClick={handleRemoveBookings}>Remove Bookings</Button>
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
