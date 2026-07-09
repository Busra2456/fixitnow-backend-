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

export const serviceService = {
  createServiceIntoDB,
};