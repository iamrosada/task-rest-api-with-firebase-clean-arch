import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import runServer from './infra/http/routes';

export const app = express();



app.use(cors({
  origin: 'http://localhost:3000', // Replace with the actual origin of your frontend
  credentials: true, // Allow credentials (cookies, HTTP authentication)
}));

// {
//   origin: 'http://localhost:3000', 
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
//   allowedHeaders: 'Content-Type,Authorization', 
// }
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ ok: true });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 8080;

runServer();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
