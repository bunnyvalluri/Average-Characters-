import express from 'express';
import cors from 'cors';
import { config } from './config/index.js';
import characterRoutes from './routes/characterRoutes.js';

const app = express();

// Security & Parsing Middleware
app.use(cors({ origin: config.corsOrigin }));
app.use(express.json());

// API Routes
app.use('/api', characterRoutes);

// Root route redirect/info
app.get('/', (req, res) => {
  res.json({
    name: 'Marvel & Avengers Characters REST API',
    version: '1.0.0',
    documentation: '/api/health',
    endpoints: [
      'GET /api/health',
      'GET /api/characters',
      'GET /api/characters/search?q=:name',
      'GET /api/characters/:id',
      'GET /api/categories'
    ]
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    path: req.originalUrl
  });
});

// Global Error Handler
app.use((err, req, res, _next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: config.nodeEnv === 'development' ? err.message : undefined
  });
});

const server = app.listen(config.port, () => {
  console.log(`⚡ Marvel Characters Backend running on http://localhost:${config.port}`);
  console.log(`👉 Health check: http://localhost:${config.port}/api/health`);
  console.log(`👉 Characters list: http://localhost:${config.port}/api/characters`);
});

// Graceful Shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Process terminated');
  });
});

export default app;
