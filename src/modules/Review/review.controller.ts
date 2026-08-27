import { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { reviewService } from "./review.service.js";

const createReview = catchAsync(
  async (req: Request, res: Response) => {
    const customerId = req.user!.id;

    const result = await reviewService.createReviewIntoDB(
      customerId,
      req.body
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Review created successfully",
      data: result,
    });
  }
);
const getReviewsByTechnician = catchAsync(
  async (req: Request, res: Response) => {
    const technicianId = req.params.technicianId;

    if (!technicianId || Array.isArray(technicianId)) {
      throw new Error("Technician ID is required");
    }

    const result =
      await reviewService.getReviewsByTechnicianFromDB(
        technicianId
      );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Reviews retrieved successfully",
      data: result,
    });
  }
);




export const reviewController = {
  createReview,
  getReviewsByTechnician
};