import { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { serviceService } from "./service.service";

const createService = catchAsync(async (req: Request, res: Response) => {

  const technicianId = req.user!.id;

  const service = await serviceService.createServiceIntoDB(
    technicianId,
    req.body
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Service created successfully",
    data: service,
  });
});

const getAllServices = catchAsync(async (req: Request, res: Response) => {
  const services = await serviceService.getAllServicesFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Services retrieved successfully",
    data: services,
  });
});

const getSingleService = catchAsync(async (req: Request, res: Response) => {
const  id  = req.params.id;
  const service = await serviceService.getSingleServiceFromDB(id as string
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Service retrieved successfully",
    data: service,
  });
});

const updateService = catchAsync(async (req: Request, res: Response) => {

  const technicianId = req.user!.id;
  const serviceId = req.params.id;
  const payload = req.body;

  const service = await serviceService.updateServiceIntoDB(technicianId,
    serviceId as string,
    payload
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Service updated successfully",
    data: service,
  });
});

const deleteService = catchAsync(async(req:Request,res:Response)=>{

 const technicianId = req.user!.id;
 const serviceId = req.params.id;
  


 await serviceService.deleteServiceFromDB(
    technicianId,
    serviceId as string
  
 );


 sendResponse(res,{
    success:true,
    statusCode:httpStatus.OK,
    message:"Service deleted successfully",
    data:null
 });

});

export const serviceController = {
  createService,
  getAllServices,
  getSingleService,
  updateService,
  deleteService
};