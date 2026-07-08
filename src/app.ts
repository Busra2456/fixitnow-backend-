import express, { Application, Request, Response } from 'express';
import config from './config';
import cors from "cors";
import { userRoutes } from './modules/user/user.route';
const app: Application = express();
app.use(cors({
  origin : config.app_url,
  credentials :true
}))
app.use(express.json());

app.get('/',async(req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use("/api/users",userRoutes)

export default app;

