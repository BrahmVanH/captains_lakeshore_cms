import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Calendar, TileArgs, TileClassNameFunc, TileDisabledFunc } from 'react-calendar';
import { Button, CrossIcon } from 'evergreen-ui';

import { QUERY_BOOKINGS_BY_PROPERTY } from '../../lib/queries';
import { CREATE_BOOKING, DELETE_BOOKING } from '../../lib/mutations';
import { useLazyQuery, useMutation } from '@apollo/client';

import { getDateValues, isSameDay, convertToDateArr } from '../../lib/calendarHelpers';

import 'react-calendar/dist/Calendar.css';
import Loading from '../LoadingAnimation';
import { Booking } from '../../lib/__generated__/graphql';

const CloseBtnContainer = styled.div`
	width: 100%;
	padding: 0.5rem;
	background-color: transparent;
	display: flex;
	justify-content: flex-end;
	bo &:hover,
	&:focus,
	&:active,
	&:visited,
	&:link,
	&.active,
	&.hover,
	&.focus,
	&.visited,
	&.link {
		background-color: transparent;
	}
`;

const CloseBtn = styled(Button)`
	background-color: transparent;
	border: none;
	color: white;
	width: min-content;
`;

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
	const [tileDisabled, setTileDisabled] = useState<TileDisabledFunc | undefined>(undefined);

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

	const tileClassNameEditDisabled = useCallback(
		({ date }: TileArgs) => {
			let bookedDates: Date[] | null = null;
			if (bookings && bookings.length > 0) {
				bookedDates = getDateValues(bookings);
			}

			if (bookedDates && bookedDates.some((booking) => isSameDay(booking, date))) {
				return 'disabled-booked-calendar-day';
			} else if (!bookedDates || !bookedDates.some((booking) => isSameDay(booking, date))) {
				return 'disabled-calendar-day';
			}
		},
		[bookings]
	);

	const tileDisabledEditDisabled = useCallback(() => {
		return true;
	}, [bookings]);

	// Function to generate custom class for the current day
	const tileClassNameEnabledDeleteBookings = useCallback(
		({ date }: TileArgs) => {
			let bookedDates: Date[] | null = null;
			if (bookings && bookings.length > 0) {
				bookedDates = getDateValues(bookings);
			}
			const selDates = convertToDateArr(selectedDates);
			if (bookedDates && bookedDates.some((booking) => isSameDay(booking, date)) && selDates && selDates.some((selDate) => isSameDay(selDate, date))) {
				return 'selected-booked-calendar-day';
			} else if (bookedDates && bookedDates.some((booking) => isSameDay(booking, date))) {
				return 'booked-calendar-day';
			} else if (!bookedDates || !bookedDates.some((booking) => isSameDay(booking, date))) {
				return 'disabled-calendar-day';
			} else if (selDates && selDates.some((selDate) => isSameDay(selDate, date))) {
				return 'selected-calendar-day';
			}
		},
		[bookings, selectedDates]
	);

	const tileDisabledEnabledDeleteBookings = useCallback(
		({ date }: TileArgs) => {
			let bookedDates: Date[] | null = null;
			if (bookings && bookings.length > 0) {
				bookedDates = getDateValues(bookings);
			}
			if (bookedDates && bookedDates.some((booking) => isSameDay(booking, date))) {
				return false;
			} else {
				return true;
			}
		},
		[bookings]
	);

	// Function to generate custom class for the current day
	const tileClassNameEnabledAddBookings = useCallback(
		({ date }: TileArgs) => {
			let bookedDates: Date[] | null = null;
			if (bookings && bookings.length > 0) {
				bookedDates = getDateValues(bookings);
			}
			const selDates = convertToDateArr(selectedDates);

			if (selDates && selDates.some((selDate) => isSameDay(selDate, date))) {
				return 'selected-calendar-day';
			} else if (bookedDates && bookedDates.some((booking) => isSameDay(booking, date))) {
				return 'booked-calendar-day';
			} else {
				return '';
			}
		},
		[bookings, selectedDates]
	);

	const tileDisabledEnabledAddBookings = useCallback(
		({ date }: TileArgs) => {
			let bookedDates: Date[] | null = null;
			if (bookings && bookings.length > 0) {
				bookedDates = getDateValues(bookings);
			}
			if (bookedDates && bookedDates.some((booking) => isSameDay(booking, date))) {
				return true;
			} else {
				return false;
			}
		},
		[bookings]
	);

	// This creates an elements to be appended to each date on the calendar that matches a date in a new unavailableDates array
	// created from calling getDateValues
	// const tileContent = useCallback(
	// 	({ date, view }: TileArgs) => {
	// 		if (bookings !== null && bookings.length > 0) {
	// 			const bookingsDateValues = getDateValues(bookings);
	// 			const isUnavailable = bookingsDateValues.some((bookingDate) =>
	// 				view === 'month'
	// 					? bookingDate.getFullYear() === date.getFullYear() && bookingDate.getMonth() === date.getMonth() && bookingDate.toDateString() === date.toDateString()
	// 					: bookingDate.toDateString() === date.toDateString()
	// 			);

	// 			return isUnavailable;
	// 		} else {
	// 			return null;
	// 		}
	// 	},
	// 	[bookings]
	// );

	// This is a handler function that is called when the user clicks on a date on the calendar
	const onClickDay = (value: any, event: any) => {
		console.log('Clicked Day:', value.toDateString());
		console.log('event:', event);
		event.preventDefault();
		if (!selectedDates.includes(value.toDateString())) {
			setSelectedDates([...selectedDates, value.toDateString()]);
		} else {
			setSelectedDates(selectedDates.filter((date) => date !== value.toDateString()));
		}
	};

	const handleDateChange = (value: any, event: any) => {
		event.preventDefault();
		const date = new Date(value);
		setDate(date);
	};
	// This adds an entry to the database representing a date that is unavailable to rent
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
				setSelectedDates([]);
			}
		} catch (err) {
			console.error(err);
		}
	}, [selectedDates]);

	// This removes an entry from the database representing a date that was unavailable to rent
	const handleDeleteBookings = useCallback(async () => {
		const selectedBookingIds = selectedDates.map((date) => bookings?.find((booking) => booking.dateValue === date)?._id).filter((id) => id !== undefined) as string[];
		console.log('Selected Booking Ids:', selectedBookingIds);
		if (selectedBookingIds.length === 0) {
			console.log('No dates to delete');
			return;
		}

		try {
			const { data } = await removeBooking({ variables: { input: { bookingIds: selectedBookingIds } } });
			if (data && propertyId) {
				handleGetBookings(propertyId);
				setSelectedDates([]);
			}
		} catch (err) {
			console.error(err);
		}
	}, [selectedDates, bookings]);

	// This takes in the selected date value from the calendar and compares to the unavailableDates state
	// and returns a value if there is a match. the value is created as an unavailableDate object in db

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
		if (bookings) {
			console.log('Bookings:', bookings);
		}
	}, [bookings]);

	useEffect(() => {
		if (enableAddBookings) {
			setTileClassName(() => tileClassNameEnabledAddBookings);
			setTileDisabled(() => tileDisabledEnabledAddBookings);
		} else if (enableDeleteBookings) {
			setTileClassName(() => tileClassNameEnabledDeleteBookings);
			setTileDisabled(() => tileDisabledEnabledDeleteBookings);
		} else {
			setTileClassName(() => tileClassNameEditDisabled);
			setTileDisabled(() => tileDisabledEditDisabled);
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
					<CloseBtnContainer>
						<CloseBtn onClick={handleSetClose} iconBefore={CrossIcon} appearance='minimal' />
					</CloseBtnContainer>
					<div className='admin-calendar-container'>
						<Calendar onChange={handleDateChange} value={date} onClickDay={onClickDay} tileClassName={tileClassName} tileDisabled={tileDisabled} />
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
