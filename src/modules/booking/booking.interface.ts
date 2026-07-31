import { BookingStatus } from "../../../generated/prisma/enums.js";

export interface ICreateBooking {
  serviceId: string;
  bookingDate: Date;
}

export interface IUpdateBookingStatus {
  status: BookingStatus;
}