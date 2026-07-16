import express, { Application, Request, Response } from 'express';
import cors from "cors";

import cookieParser from 'cookie-parser';
import { notFound } from './middlewares/notFound.js';
import { userRoutes } from './modules/user/user.route.js';
import { authRoutes } from './modules/auth/auth.route.js';
import { categoryRoutes } from './modules/category/category.route.js';
import { serviceRoutes } from './modules/service/service.route.js';
import { bookingRoutes } from './modules/booking/booking.route.js';
import { paymentRoutes } from './modules/payment/payment.route.js';
import { reviewRoutes } from './modules/Review/review.route.js';
import { technicianRoutes } from './modules/technician/technician.route.js';
import { globalErrorHandler } from './middlewares/globalErrorHandler.js';
import config from './config';
const app: Application = express();
app.use(cors({
  origin : config.app_url,
  credentials :true
}))
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser())

app.get('/',async(req: Request, res: Response) => {
  res.send('Hello World!');
});



app.use("/api/users",userRoutes)
app.use("/api/auth",authRoutes)
app.use("/api/categories", categoryRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments",paymentRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/technicians", technicianRoutes);
app.use(notFound)
app.use(globalErrorHandler);
export default app;

