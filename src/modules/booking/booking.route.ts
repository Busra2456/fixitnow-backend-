import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middlewares/auth";
import { bookingController } from "./booking.controller";

const router = Router();

router.post("/",auth(Role.CUSTOMER),bookingController.createBooking
);
router.get("/",auth(Role.CUSTOMER, Role.TECHNICIAN, Role.ADMIN),
  bookingController.getAllBookings
);
router.get("/:id",auth(Role.CUSTOMER, Role.TECHNICIAN, Role.ADMIN),
  bookingController.getSingleBooking
);

export const bookingRoutes = router;