import { prisma } from "../../lib/prisma";
import { ICreateCategory } from "./category.interface";

const createCategoryIntoDB = async (payload: ICreateCategory) => {

      const isExist = await prisma.category.findUnique({
  where: {
    name: payload.name,
  },
});

if (isExist) {
  throw new Error("Category already exists");
}

  const category = await prisma.category.create({
    data: payload,
  });

  return category;
};

export const categoryService = {
  createCategoryIntoDB,
};