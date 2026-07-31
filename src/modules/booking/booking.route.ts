import { Router } from "express";
import { Role } from "../../../generated/prisma/enums.js";
import { auth } from "../../middlewares/auth.js";
import { bookingController } from "./booking.controller.js";

const router = Router();

router.post("/",auth(Role.CUSTOMER),bookingController.createBooking
);
router.get("/",auth(Role.CUSTOMER, Role.TECHNICIAN, Role.ADMIN),
  bookingController.getAllBookings
);
router.get("/:id",auth(Role.CUSTOMER, Role.TECHNICIAN, Role.ADMIN),
  bookingController.getSingleBooking
);
router.patch("/:id",auth(Role.TECHNICIAN),bookingController.updateBookingStatus
);
export const bookingRoutes = router;