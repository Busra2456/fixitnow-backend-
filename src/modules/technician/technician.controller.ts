import { Request, Response } from "express";
import { technicianService } from "./technician.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const updateAvailability = catchAsync(
  async (req: Request, res: Response) => {
      const availability = req.user!.id

    const result = await technicianService.updateAvailabilityIntoDB(
      availability as string,
      req.body
    );

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Availability updated successfully",
      data: result,
    });
  }
);

const getAllTechnicians = catchAsync(
  async (req: Request, res: Response) => {
    const result = await technicianService.getAllTechniciansFromDB();

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Technicians retrieved successfully",
      data: result,
    });
  }
);

const getSingleTechnician = catchAsync(
  async (req: Request, res: Response) => {
    const singleTechnician = req.params.id

    const result = await technicianService.getSingleTechnicianFromDB(
      singleTechnician as string
    );

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Technician retrieved successfully",
      data: result,
    });
  }
);

const updateTechnicianProfile = catchAsync(
  async (req: Request, res: Response) => {
    const result = await technicianService.updateTechnicianProfileIntoDB(
      req.user!.id,
      req.body
    );

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Technician profile updated successfully",
      data: result,
    });
  }
);

const getTechnicianBookings = catchAsync(
  async (req: Request, res: Response) => {

    const technicianBooking = req.user!.id
    const result = await technicianService.getTechnicianBookingsFromDB(
      technicianBooking as string
    );

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Technician bookings retrieved successfully",
      data: result,
    });
  }
);

const startBooking = catchAsync(
  async (req: Request, res: Response) => {
    const bookingId = req.params.id;
    const technicianId = req.user!.id;

    const result = await technicianService.startBookingIntoDB(
      bookingId as string,
      technicianId
    );

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Booking started successfully",
      data: result,
    });
  }
);

const completeBooking = catchAsync(
  async (req: Request, res: Response) => {
    const bookingId = req.params.id;
    const technicianId = req.user!.id;

    const result = await technicianService.completeBookingIntoDB(
      bookingId as string,
      technicianId
    );

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Booking completed successfully",
      data: result,
    });
  }
);

export const technicianController = {
  updateAvailability,
  getAllTechnicians,
  getSingleTechnician,
  updateTechnicianProfile,
  getTechnicianBookings,
  startBooking,
  completeBooking
};