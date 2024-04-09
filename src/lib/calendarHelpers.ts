import _ from 'lodash';
import { Booking } from './__generated__/graphql';

// This maps through an array of unavailableDate objects from the db and returns an array
// containing only the dateValue
export const getDateValues = (bookings: Booking[]) => {
	let bookingDateValues: Date[] = [];
	bookings.forEach((dateObject) => {
		bookingDateValues.push(new Date(dateObject.dateValue));
	});

	return bookingDateValues;
};

// Helper function to check if two dates are the same day
export const isSameDay = (date1: Date, date2: Date) => {
	return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
};

export const convertToDateArr = (dates: string[]) => {
	return dates.map((date) => new Date(date));
};
