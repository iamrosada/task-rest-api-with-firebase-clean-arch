import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import runServer from './infra/http';

export const app = express();


// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.json({ ok: true });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;

runServer();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
