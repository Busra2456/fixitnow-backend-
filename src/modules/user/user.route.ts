import { Router } from "express";
import { userController } from "./user.controller.js";
import { auth } from "../../middlewares/auth.js";
import { Role } from "../../../generated/prisma/enums.js";

const router = Router();

router.post("/register",userController.registerUser)
router.get("/me",auth(Role.ADMIN,Role.CUSTOMER,Role.TECHNICIAN),userController.getMyProfile);

router.patch("/me",auth(Role.ADMIN,Role.CUSTOMER,Role.TECHNICIAN),userController.updateMyProfile);

router.get("/",auth(Role.ADMIN),userController.getAllUsers
);

router.patch("/:id/status",auth(Role.ADMIN),userController.updateUserStatus
);


export const userRoutes = router;