import { prisma } from "../../lib/prisma";
import { ICreateService } from "./service.interface";

const createServiceIntoDB = async (
  technicianId: string,
  payload: ICreateService
) => {

  
  await prisma.category.findUniqueOrThrow({
    where: {
      id: payload.categoryId,
    },
  });

  // Service create
  const result = await prisma.service.create({
    data: {
      ...payload,
      technicianId,
    },
    include: {
      category: true,
      technician: {
        omit: {
          password: true,
        },
      },
    },
  });

  return result;
};

const getAllServicesFromDB = async () => {
  const services = await prisma.service.findMany({
    include: {
      category: true,
      technician: {
        omit: {
          password: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return services;
};

const getSingleServiceFromDB = async (id:string)=>{

const service = await prisma.service.findUniqueOrThrow({
    where:{
      id
    },
    include:{
      category:true,
      technician:{
        omit:{
          password:true
        }
      }
    }
  });

  return service;
};

const updateServiceIntoDB = async (
  technicianId: string,
  serviceId: string,
  payload: ICreateService
) => {

  const service = await prisma.service.findUniqueOrThrow({
    where: {
      id: serviceId
    }
  });


  
  if(service.technicianId !== technicianId){
    throw new Error("You can update only your own service");
  }


 
  if(payload.categoryId){

    await prisma.category.findUniqueOrThrow({
      where:{
        id: payload.categoryId
      }
    });

  }


  const updatedService = await prisma.service.update({
    where:{
      id: serviceId
    },
    data: payload,
    include:{
      category:true,
      technician:{
        omit:{
          password:true
        }
      }
    }
  });


  return updatedService;
};

const deleteServiceFromDB = async(
 technicianId:string,
 serviceId:string
)=>{

 const service = await prisma.service.findUniqueOrThrow({
    where:{
      id:serviceId
    }
 });


 if(service.technicianId !== technicianId){
    throw new Error("You can delete only your own service");
 }


 await prisma.service.delete({
    where:{
      id:serviceId
    }
 });


 return null;
};

export const serviceService = {
  createServiceIntoDB,
  getAllServicesFromDB,
  getSingleServiceFromDB,
  updateServiceIntoDB,
  deleteServiceFromDB
};