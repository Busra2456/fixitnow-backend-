import { PaymentProvider } from "../../../generated/prisma/enums";

export interface ICreatePayment {
  bookingId: string;
  provider: PaymentProvider;
}