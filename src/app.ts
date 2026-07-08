import express, { Application, Request, Response } from 'express';
import config from './config';
import cors from "cors";
const app: Application = express();
app.use(cors({
  origin : config.app_url,
  credentials :true
}))

app.get('/',async(req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;

