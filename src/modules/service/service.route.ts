import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middlewares/auth";
import { serviceController } from "./service.controller";

const router = Router();

router.post("/",auth(Role.TECHNICIAN),serviceController.createService
);
router.get("/", serviceController.getAllServices);
router.get("/:id", serviceController.getSingleService);
router.patch(
 "/:id",auth(Role.TECHNICIAN),serviceController.updateService
);
router.delete("/:id",auth(Role.TECHNICIAN),serviceController.deleteService
);

export const serviceRoutes = router;