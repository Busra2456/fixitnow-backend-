import { Router } from "express";
import { Role } from "../../../generated/prisma/enums.js";
import { auth } from "../../middlewares/auth.js";
import { paymentController } from "./payment.controller.js";


const router = Router();


router.post("/create",auth(Role.CUSTOMER),paymentController.createPayment
);

router.patch("/confirm/:id",auth(Role.ADMIN),paymentController.confirmPayment
);

router.post("/success", paymentController.paymentSuccess);

router.post("/fail", paymentController.paymentFail);

router.post("/cancel", paymentController.paymentCancel);

export const paymentRoutes = router;