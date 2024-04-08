import React, { useState, useEffect, useCallback, MouseEvent } from 'react';
import View, { Calendar, TileArgs } from 'react-calendar';
import Value from 'react-calendar';

import { QUERY_BOOKINGS_BY_PROPERTY } from '../lib/queries';
import { CREATE_BOOKING, DELETE_BOOKING } from '../lib/mutations';

import { useLazyQuery, useMutation } from '@apollo/client';

import { getDateValues, isSameDay } from '../lib/calendarHelpers';

import 'react-calendar/dist/Calendar.css';
import './style.css';
import Loading from './LoadingAnimation';
import { Booking, CreateBookingInput } from '../lib/__generated__/graphql';

function AdminCalendar({ propertyName }: Readonly<{ propertyName: string }>) {
	const [date, setDate] = useState(new Date());
	const [bookings, setBookings] = useState<Booking[] | null>(null);
	const [loading, setLoading] = useState(true);

	// Checks database for booked dates for the passed in property
	const [getBookings] = useLazyQuery(QUERY_BOOKINGS_BY_PROPERTY);
	const [createBooking] = useMutation(CREATE_BOOKING);
	const [removeBooking] = useMutation(DELETE_BOOKING);

	useEffect(() => {}, [propertyName]);

	const handleGetBookings = useCallback(async (propertyName: string) => {
		if (!propertyName) {
			return;
		}

		try {
			const { loading, error, data } = await getBookings({ variables: { propertyName } });

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

	// Function to generate custom class for the current day
	const tileClassName = ({ date, view }: TileArgs) => {
		if (bookings !== null && bookings.length > 0) {
			const unavailableDateValues = getDateValues(unavailableDates);
			if (unavailableDateValues.some((unavailableDate) => isSameDay(unavailableDate, date))) {
				return 'admin-unavailable-day';
			} else {
				return '';
			}
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

			return isUnavailable;
		} else {
			return null;
		}
	};

	const handleDateChange = (value: Value, event: MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
		const date = new Date(value);
		setDate(date);
	};
	// This adds an entry to the datebase representing a date that is unavailable to rent
	const handleAddBooking = async (value: string) => {
		try {
			const { data } = await createBooking({ variables: { input: { propertyName: propertyName, dateValue: value } as CreateBookingInput } });
			if (data) {
				reloadPage();
			}
		} catch (err) {
			console.error(err);
		}
	};

	// This removes an entry from the database representing a date that was unavailable to rent
	const handleRemoveBooking = async (value: string) => {
		try {
			const { data } = await removeBooking({ variables: { propertyName: propertyName, dateValue: value } });
			if (data) {
				reloadPage();
			}
		} catch (err) {
			console.error(err);
		}
	};

	// This takes in the selected date value from the calendar and compares to the unavailableDates state
	// and returns a value if there is a match. the value is created as an unavailableDate object in db
	// if there is no return value from the filter, the matching date object will be removed from the db
	const checkIfUnavailable = (value: string) => {
		if (bookings && bookings.length > 0) {
			const proposedDate = bookings.filter((date) => date.dateValue === value);
			if (proposedDate.length === 0) {
				handleAddBooking(value);
			} else {
				handleRemoveBooking(value);
			}
		} else if (bookings && bookings.length === 0 && !loading) {
			handleAddBooking(value);
		}
	};
	// This is a handler function that is called when the user clicks on a date on the calendar
	const onClickDay = (value: string, event: MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
		const date = new Date(value);
		checkIfUnavailable(date.toISOString());
	};

	useEffect(() => {
		if (propertyName) {
			handleGetBookings(propertyName);
		}
	}, [propertyName]);

	return (
		<>
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
		</>
	);
}

export default AdminCalendar;
