import { BookingStatus } from "../../../generated/prisma/enums.js";

export interface ICreateBooking {
  serviceId: string;
  bookingDate: string;
}

export interface IUpdateBookingStatus {
  status: BookingStatus;
}