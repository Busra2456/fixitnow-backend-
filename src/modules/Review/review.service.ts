import { prisma } from "../../lib/prisma";
import { BookingStatus } from "../../../generated/prisma/enums";
import { ICreateReview } from "./review.interface";

const createReviewIntoDB = async (
  customerId: string,
  payload: ICreateReview
) => {
  const booking = await prisma.booking.findUniqueOrThrow({
    where: {
      id: payload.bookingId,
    },
  });

  // Only booking owner can review
  if (booking.customerId !== customerId) {
    throw new Error("You can review only your own booking");
  }

  // Booking must be completed
  if (booking.status !== BookingStatus.COMPLETED) {
    throw new Error("Review is allowed only after booking is completed");
  }

  // Prevent duplicate review
  const existingReview = await prisma.review.findUnique({
    where: {
      bookingId: payload.bookingId,
    },
  });

  if (existingReview) {
    throw new Error("Review already exists for this booking");
  }

  const review = await prisma.review.create({
    data: {
      bookingId: booking.id,
      customerId,
      technicianId: booking.technicianId,
      rating: payload.rating,
      comment: payload.comment,
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
      booking: true,
    },
  });

  return review;
};

export const reviewService = {
  createReviewIntoDB,
};