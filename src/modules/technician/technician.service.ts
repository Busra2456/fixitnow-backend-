import { Role } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { IUpdateAvailability, IUpdateTechnicianProfile } from "./technician.interface";

const updateAvailabilityIntoDB = async (
  userId: string,
  payload: IUpdateAvailability
) => {

  const profile = await prisma.technicianProfile.findUnique({
    where: {
      userId,
    },
  });


  if (!profile) {
    throw new Error("Technician profile not found");
  }

  return await prisma.technicianProfile.update({
    where: {
      id: profile.id,
    },
    data: {
      isAvailable: payload.isAvailable,
      availableFrom: payload.availableFrom,
      availableTo: payload.availableTo,
    },
  });
};

const getAllTechniciansFromDB = async () => {
  const technicians = await prisma.user.findMany({
    where: {
      role: Role.TECHNICIAN,
      activeStatus: "ACTIVE",
    },
    omit: {
      password: true,
    },
    include: {
      technicianProfile: true,
      servicesCreated: {
        include: {
          category: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return technicians;
};

const getSingleTechnicianFromDB = async (id: string) => {
  const technician = await prisma.user.findFirstOrThrow({
    where: {
      id,
      role: Role.TECHNICIAN,
      activeStatus: "ACTIVE",
    },
    omit: {
      password: true,
    },
    include: {
      technicianProfile: true,
      servicesCreated: {
        include: {
          category: true,
        },
      },
      technicianReviews: {
        include: {
          customer: {
            omit: {
              password: true,
            },
          },
        },
      },
    },
  });

  return technician;
};

const updateTechnicianProfileIntoDB = async (
  userId: string,
  payload: IUpdateTechnicianProfile
) => {
  const profile = await prisma.technicianProfile.findUnique({
    where: {
      userId,
    },
  });

  if (!profile) {
    throw new Error("Technician profile not found");
  }

  return await prisma.technicianProfile.update({
    where: {
      id: profile.id,
    },
    data: {
      experience: payload.experience,
      bio: payload.bio,
      location: payload.location,
    },
  });
};

const getTechnicianBookingsFromDB = async (userId: string) => {
  const bookings = await prisma.booking.findMany({
    where: {
      technicianId: userId,
    },
    include: {
      customer: {
        omit: {
          password: true,
        },
      },
      service: {
        include: {
          category: true,
        },
      },
      payment: true,
      review: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return bookings;
};

const startBookingIntoDB = async (
  bookingId: string,
  technicianId: string
) => {
  const booking = await prisma.booking.findFirstOrThrow({
    where: {
      id: bookingId,
      technicianId,
    },
  });

  if (booking.status !== "ACCEPTED") {
    throw new Error("Only accepted bookings can be started");
  }

  return await prisma.booking.update({
    where: {
      id: booking.id,
    },
    data: {
      status: "IN_PROGRESS",
    },
    include: {
      customer: {
        omit: {
          password: true,
        },
      },
      service: true,
    },
  });
};

const completeBookingIntoDB = async (
  bookingId: string,
  technicianId: string
) => {
  const booking = await prisma.booking.findFirstOrThrow({
    where: {
      id: bookingId,
      technicianId,
    },
  });

  if (booking.status !== "IN_PROGRESS") {
    throw new Error("Only in-progress bookings can be completed");
  }

  return await prisma.booking.update({
    where: {
      id: booking.id,
    },
    data: {
      status: "COMPLETED",
    },
    include: {
      customer: {
        omit: {
          password: true,
        },
      },
      service: {
        include: {
          category: true,
        },
      },
      payment: true,
      review: true,
    },
  });
};

export const technicianService = {
  updateAvailabilityIntoDB,
  getAllTechniciansFromDB,
  getSingleTechnicianFromDB,
  updateTechnicianProfileIntoDB,
  getTechnicianBookingsFromDB,
  startBookingIntoDB,
  completeBookingIntoDB
};