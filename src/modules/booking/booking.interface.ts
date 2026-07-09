import { BookingStatus } from "../../../generated/prisma/enums";

export interface ICreateBooking {
  serviceId: string;
  bookingDate: Date;
}

export interface IUpdateBookingStatus {
  status: BookingStatus;
}