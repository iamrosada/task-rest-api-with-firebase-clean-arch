import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import runServer from './infra/http/routes';




export const app = express();


app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true, 
}));



app.use(express.json());

app.get('/', (req, res) => {
  res.json({ ok: true });
});



const PORT = process.env.PORT || 8080;

runServer();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
