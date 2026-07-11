import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middlewares/auth";
import { paymentController } from "./payment.controller";


const router = Router();


router.post("/create",auth(Role.CUSTOMER),paymentController.createPayment
);

router.patch("/confirm/:id",auth(Role.ADMIN),paymentController.confirmPayment
);


export const paymentRoutes = router;