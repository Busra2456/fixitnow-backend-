import { prisma } from "../../lib/prisma";
import { ICreatePayment } from "./payment.interface";
import { BookingStatus, PaymentStatus } from "../../../generated/prisma/enums";
import SSLCommerzPayment from "sslcommerz-lts";
import config from "../../config";

const createPaymentIntoDB = async (
  customerId: string,
  payload: ICreatePayment
) => {
  // Booking Check
  const booking = await prisma.booking.findUniqueOrThrow({
    where: {
      id: payload.bookingId,
    },
  });

  if (booking.customerId !== customerId) {
    throw new Error("You can only pay for your own booking");
  }

  if (booking.status !== BookingStatus.ACCEPTED) {
    throw new Error("Payment is allowed only for accepted booking");
  }

  const existingPayment = await prisma.payment.findUnique({
    where: {
      bookingId: payload.bookingId,
    },
  });

  if (existingPayment) {
    throw new Error("Payment already exists for this booking");
  }

  // Customer
  const customer = await prisma.user.findUniqueOrThrow({
    where: {
      id: customerId,
    },
  });

  // Transaction ID
  const transactionId = `TXN-${Date.now()}`;

  // Save Payment
  const payment = await prisma.payment.create({
    data: {
      bookingId: booking.id,
      amount: booking.totalPrice,
      provider: payload.provider,
      status: PaymentStatus.PENDING,
      transactionId,
    },
  });

  // SSLCommerz
  const sslcz = new SSLCommerzPayment(
    config.ssl.storeId!,
    config.ssl.storePassword!,
    config.ssl.isLive
  );

  const data = {
  total_amount: booking.totalPrice,
  currency: "BDT",
  tran_id: transactionId,

  success_url: `${config.app_url}/api/payments/success`,
  fail_url: `${config.app_url}/api/payments/fail`,
  cancel_url: `${config.app_url}/api/payments/cancel`,
  ipn_url: `${config.app_url}/api/payments/ipn`,

  shipping_method: "Home Service",
  product_name: "FixItNow Service",
  product_category: "Service",
  product_profile: "general",

  cus_name: customer.name,
  cus_email: customer.email,
  cus_add1: "Dhaka",
  cus_add2: "N/A",
  cus_city: "Dhaka",
  cus_state: "Dhaka",
  cus_postcode: "1207",
  cus_country: "Bangladesh",
  cus_phone: customer.phone,

  ship_name: customer.name,
  ship_add1: "Dhaka",
  ship_add2: "N/A",
  ship_city: "Dhaka",
  ship_state: "Dhaka",
  ship_postcode: "1207",
  ship_country: "Bangladesh",
};

  const response = await sslcz.init(data);


  return {
    payment,
    gatewayUrl: response.GatewayPageURL,
  };
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

const paymentSuccessIntoDB = async (payload: any) => {
  const payment = await prisma.payment.findUniqueOrThrow({
    where: {
      transactionId: payload.tran_id,
    },
  });

  await prisma.$transaction(async (tx) => {

    await tx.payment.update({
      where: {
        id: payment.id,
      },
      data: {
        status: PaymentStatus.COMPLETED,
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
      id: payment.id,
    },
  });
};



const paymentFailIntoDB = async (payload: any) => {

  const payment = await prisma.payment.findUniqueOrThrow({
    where: {
      transactionId: payload.tran_id,
    },
  });


  return prisma.payment.update({
    where: {
      id: payment.id,
    },
    data: {
      status: PaymentStatus.FAILED,
    },
  });

};



const paymentCancelIntoDB = async (payload: any) => {

  const payment = await prisma.payment.findUniqueOrThrow({
    where: {
      transactionId: payload.tran_id,
    },
  });


  return prisma.payment.update({
    where: {
      id: payment.id,
    },
    data: {
      status: PaymentStatus.CANCELLED,
    },
  });

};

export const paymentService = {
  createPaymentIntoDB,
  confirmPaymentIntoDB,
  paymentCancelIntoDB,
  paymentFailIntoDB,
  paymentSuccessIntoDB
};