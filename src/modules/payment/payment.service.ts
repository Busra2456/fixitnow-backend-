import { prisma } from "../../lib/prisma";
import { ICreatePayment } from "./payment.interface";
import { BookingStatus, PaymentStatus } from "../../../generated/prisma/enums";


const createPaymentIntoDB = async (
  customerId: string,
  payload: ICreatePayment
) => {

  
  const booking = await prisma.booking.findUniqueOrThrow({
    where: {
      id: payload.bookingId,
    },
  });


   
  if (booking.customerId !== customerId) {
    throw new Error(
      "You can only pay for your own booking"
    );
  }


  
  if (booking.status !== "ACCEPTED") {
    throw new Error(
      "Payment is allowed only for accepted booking"
    );
  }


 
  const existingPayment = await prisma.payment.findUnique({
    where: {
      bookingId: payload.bookingId,
    },
  });


  if (existingPayment) {
    throw new Error(
      "Payment already exists for this booking"
    );
  }


//    Create payment record
  const payment = await prisma.payment.create({
    data: {
      bookingId: booking.id,
      amount: booking.totalPrice,
      provider: payload.provider,
      status: PaymentStatus.PENDING,
    },
  });


  return payment;
};



const confirmPaymentIntoDB = async (paymentId: string) => {
  const payment = await prisma.payment.findUniqueOrThrow({
    where: {
      id: paymentId,
    },
    include: {
      booking: true,
    },
  });

  if (payment.status === PaymentStatus.COMPLETED) {
    throw new Error("Payment already completed");
  }

  await prisma.$transaction(async (tx) => {
    await tx.payment.update({
      where: {
        id: paymentId,
      },
      data: {
        status: PaymentStatus.COMPLETED,
        transactionId: `TXN-${Date.now()}`,
        paidAt: new Date(),
      },
    });

    await tx.booking.update({
      where: {
        id: payment.bookingId,
      },
      data: {
        status: BookingStatus.PAID,
      },
    });
  });

  return prisma.payment.findUnique({
    where: {
      id: paymentId,
    },
  });
};



export const paymentService = {
  createPaymentIntoDB,
  confirmPaymentIntoDB
};