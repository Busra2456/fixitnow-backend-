import express, { Application, Request, Response } from 'express';
import config from './config';
import cors from "cors";
import { userRoutes } from './modules/user/user.route';
import { authRoutes } from './modules/auth/auth.route';
import cookieParser from 'cookie-parser';
import { categoryRoutes } from './modules/category/category.route';
import { serviceRoutes } from './modules/service/service.route';
import { bookingRoutes } from './modules/booking/booking.route';
import { paymentRoutes } from './modules/payment/payment.route';
import { reviewRoutes } from './modules/Review/review.route';
import { technicianRoutes } from './modules/technician/technician.route';
import { globalErrorHandler } from './middlewares/globalErrorHandler';
import { notFound } from './middlewares/notFound';
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

