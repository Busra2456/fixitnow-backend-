import { Router } from "express";
import { technicianController } from "./technician.controller";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middlewares/auth";

const router = Router();
router.get("/bookings",auth(Role.TECHNICIAN),technicianController.getTechnicianBookings
);
router.get("/",technicianController.getAllTechnicians);
router.get("/:id",technicianController.getSingleTechnician);
router.put("/profile",auth(Role.TECHNICIAN),technicianController.updateTechnicianProfile);
router.put("/availability",auth(Role.TECHNICIAN),technicianController.updateAvailability);
router.patch("/bookings/:id/in-progress",auth(Role.TECHNICIAN),technicianController.startBooking);
router.patch("/bookings/:id/complete",auth(Role.TECHNICIAN),
technicianController.completeBooking);

export const technicianRoutes = router;