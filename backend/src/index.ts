import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import { initDatabase } from './models/User';
import { requestLogger } from './middleware/logger';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(requestLogger);
app.use(cors());
app.use(express.json());

// Initialize Database
initDatabase()
  .then(() => {
    console.log('Database initialized successfully.');
  })
  .catch(err => {
    console.error('Failed to initialize database:', err);
  });

// Routes
app.use('/api/auth', authRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('MyTimetable Backend is running! 🚀');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
