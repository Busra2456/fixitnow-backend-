import { prisma } from "../../lib/prisma";
import { ICreateCategory, IUpdateCategory } from "./category.interface";

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

const getAllCategoriesFromDB = async () => {
  const categories = await prisma.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return categories;
};

const getSingleCategoryFromDB = async (id: string) => {
  const category = await prisma.category.findUniqueOrThrow({
    where: {
      id,
    },
  });

  return category;
};

const updateCategoryIntoDB = async (
  categoryId: string,
  payload: IUpdateCategory
) => {
  await prisma.category.findUniqueOrThrow({
    where: {
      id: categoryId,
    },
  });

  return await prisma.category.update({
    where: {
      id: categoryId,
    },
    data: payload,
  });
};

const deleteCategoryFromDB = async (categoryId: string) => {
  await prisma.category.findUniqueOrThrow({
    where: {
      id: categoryId,
    },
  });

  const result = await prisma.category.delete({
    where: {
      id: categoryId,
    },
  });

  return result;
};

export const categoryService = {
  createCategoryIntoDB,
  getAllCategoriesFromDB,
  getSingleCategoryFromDB,
  updateCategoryIntoDB,
  deleteCategoryFromDB
};