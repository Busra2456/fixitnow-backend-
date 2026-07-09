import { prisma } from "../../lib/prisma";
import { ICreateBooking } from "./booking.interface";
import { Role } from "../../../generated/prisma/enums";
import { Prisma } from "../../../generated/prisma/client";
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
      service: {
  include: {
    category: true,
  },
},
    },
  });

  return booking;
};


const getAllBookingsFromDB = async (user: {
  id: string;
  role: Role;
}) => {

 let whereCondition: Prisma.BookingWhereInput = {};

  if (user.role === Role.CUSTOMER) {
    whereCondition = {
      customerId: user.id,
    };
  }

  if (user.role === Role.TECHNICIAN) {
    whereCondition = {
      technicianId: user.id,
    };
  }

  const bookings = await prisma.booking.findMany({
    where: whereCondition,
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
      service: {
        include: {
          category: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return bookings;
};

const getSingleBookingFromDB = async (
  bookingId: string,
  user: {
    id: string;
    role: Role;
  }
) => {
  const booking = await prisma.booking.findUniqueOrThrow({
    where: {
      id: bookingId,
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
      service: {
        include: {
          category: true,
        },
      },
    },
  });

 
  if (user.role === Role.ADMIN) {
    return booking;
  }

  
  if (
    user.role === Role.CUSTOMER &&
    booking.customerId !== user.id
  ) {
    throw new Error("You are not authorized to view this booking");
  }

 
  if (
    user.role === Role.TECHNICIAN &&
    booking.technicianId !== user.id
  ) {
    throw new Error("You are not authorized to view this booking");
  }

  return booking;
};

export const bookingService = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  getSingleBookingFromDB
};