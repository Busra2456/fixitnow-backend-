import { prisma } from "../../lib/prisma";
import { ICreateBooking } from "./booking.interface";

const createBookingIntoDB = async (
  customerId: string,
  payload: ICreateBooking
) => {

  
  const service = await prisma.service.findUniqueOrThrow({
    where: {
      id: payload.serviceId,
    },
  });




  const booking = await prisma.booking.create({
    data: {
      customerId,
      technicianId: service.technicianId,
      serviceId: service.id,
      bookingDate: payload.bookingDate,
      totalPrice: service.price,
    },
    include: {
      customer: {
        omit: {
          password: true,
        },
      },
      technician: {
        omit: {
          password: true,
        },
      },
      service: true,
    },
  });

  return booking;
};

export const bookingService = {
  createBookingIntoDB,
};