import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { userService } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
const registerUser = catchAsync(async(req:Request,res: Response)=>{
      const payload = req.body;
      const user = await userService.registerUserIntoDB(payload)

      sendResponse(res,{
            success:true,
            statusCode: httpStatus.CREATED,
            message:"User registered successfully",
            data:{
                  user
            }
      })


})

const getMyProfile = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.getMyProfileFromDB(req.user!.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Profile fetched successfully",
    data: user,
  });
});

const updateMyProfile = catchAsync(async (req: Request, res: Response) => {
  const updatedUser = await userService.updateMyProfileInDB(
    req.user!.id,
    req.body
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Profile updated successfully",
    data: updatedUser,
  });
});

export const userController = {
      registerUser,
      getMyProfile,
      updateMyProfile
}