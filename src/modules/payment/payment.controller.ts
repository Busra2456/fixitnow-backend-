import { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { paymentService } from "./payment.service";



const createPayment = catchAsync(
  async (req: Request, res: Response) => {

    const customerId = req.user!.id;

    const result = await paymentService.createPaymentIntoDB(
      customerId,
      req.body
    );


    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Payment created successfully",
      data: result,
    });

  }
);

const confirmPayment = catchAsync(async (req: Request, res: Response) => {
  const paymentId = req.params.id;

  const result = await paymentService.confirmPaymentIntoDB(paymentId as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Payment confirmed successfully",
    data: result,
  });
});




export const paymentController = {
  createPayment,
  confirmPayment
};