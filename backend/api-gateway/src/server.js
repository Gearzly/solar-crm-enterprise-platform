require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const { StatusCodes } = require('http-status-codes');

// Import routes
const authRoutes = require('./routes/auth.routes');
const serviceRoutes = require('./routes/services.routes');
const proxyRoutes = require('./routes/proxy.routes');

// Import middleware
const { errorHandler } = require('./middleware/error.middleware');
const { requestLogger } = require('./middleware/logging.middleware');
const { apiLimiter } = require('./middleware/rate-limit.middleware');
const cacheMiddleware = require('./middleware/cache.middleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key', 'x-correlation-id'],
  credentials: true
}));

// Performance middleware
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging and rate limiting
app.use(requestLogger);
app.use(apiLimiter);

// Health check endpoint with cache
app.get('/health',
  cacheMiddleware.cache({ ttl: 60, keyPrefix: 'health:' }),
  (req, res) => {
    res.status(StatusCodes.OK).json({
      status: 'success',
      data: {
        service: 'api-gateway',
        uptime: process.uptime(),
        timestamp: Date.now(),
        memory: process.memoryUsage(),
        cpu: process.cpuUsage()
      }
    });
  }
);

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1', serviceRoutes);
app.use('/api/v1', proxyRoutes);

// 404 handler
app.use((req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({
    status: 'error',
    error: {
      code: 'RESOURCE_NOT_FOUND',
      message: 'The requested resource was not found.'
    }
  });
});

// Error handler middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});

module.exports = app; // For testing