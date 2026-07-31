import { PaymentProvider } from "../../../generated/prisma/enums.js";

export interface ICreatePayment {
  bookingId: string;
  provider: PaymentProvider;
}