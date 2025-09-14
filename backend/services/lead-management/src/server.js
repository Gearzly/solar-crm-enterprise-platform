'use strict';

require('dotenv').config();
const fastify = require('fastify');
const { PrismaClient } = require('@prisma/client');

// Create Fastify instance
const server = fastify({
  logger: {
    level: process.env.LOG_LEVEL || 'info',
    transport: process.env.NODE_ENV === 'development'
      ? { target: 'pino-pretty' }
      : undefined
  },
  trustProxy: true
});

// Import shared middleware
const { createRateLimitMiddleware } = require('../../../shared/src/middleware/rate-limit.middleware');
const { createErrorHandlerPlugin } = require('../../../shared/src/middleware/error.middleware');

// Register plugins
async function registerPlugins() {
  // CORS
  await server.register(require('@fastify/cors'), {
    origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true
  });

  // Security headers
  await server.register(require('@fastify/helmet'), {
    contentSecurityPolicy: process.env.NODE_ENV === 'production'
  });

  // JWT Authentication
  await server.register(require('@fastify/jwt'), {
    secret: process.env.JWT_SECRET || 'supersecretkey',
    sign: {
      expiresIn: '1h'
    }
  });
  
  // Register rate limiting middleware
  const rateLimitOptions = {
    windowMs: 60 * 1000, // 1 minute window
    max: 100, // limit each IP to 100 requests per windowMs
    standardHeaders: true,
    skip: (request) => {
      // Skip rate limiting for health check and documentation endpoints
      return request.url.startsWith('/health') || 
             request.url.startsWith('/documentation');
    }
  };
  
  // Add rate limit middleware as a preHandler hook
  server.addHook('preHandler', createRateLimitMiddleware(rateLimitOptions));
  
  // Register global error handler
  server.register(createErrorHandlerPlugin());

  // Swagger documentation
  await server.register(require('@fastify/swagger'), {
    openapi: {
      info: {
        title: 'Lead Management API',
        description: 'API for managing leads in the Solar CRM',
        version: '1.0.0'
      },
      servers: [
        {
          url: `http://localhost:${process.env.PORT || 3002}`,
          description: 'Development server'
        }
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT'
          }
        }
      }
    }
  });

  await server.register(require('@fastify/swagger-ui'), {
    routePrefix: '/documentation',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: true
    }
  });
}

// Initialize Prisma
const prisma = new PrismaClient();
server.decorate('prisma', prisma);

// Authentication hook
server.addHook('onRequest', async (request, reply) => {
  try {
    // Skip auth for documentation and health check
    if (request.routerPath === '/health' || 
        request.routerPath === '/documentation' || 
        request.routerPath.startsWith('/documentation/')) {
      return;
    }
    
    await request.jwtVerify();
  } catch (err) {
    reply.code(401).send({ status: 'error', message: 'Unauthorized' });
  }
});

// Health check endpoint
server.get('/health', async () => {
  return { status: 'ok', service: 'lead-management', timestamp: new Date().toISOString() };
});

// Register routes
async function registerRoutes() {
  server.register(require('./api/lead.routes'), { prefix: '/api/v1/leads' });
}

// Graceful shutdown
async function closeGracefully(signal) {
  server.log.info(`Received signal to terminate: ${signal}`);
  
  await server.close();
  await prisma.$disconnect();
  
  process.exit(0);
}

process.on('SIGINT', closeGracefully);
process.on('SIGTERM', closeGracefully);

// Start server
async function start() {
  try {
    await registerPlugins();
    await registerRoutes();
    
    const port = process.env.PORT || 3002;
    await server.listen({ port, host: '0.0.0.0' });
    
    server.log.info(`Server listening on ${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

start();

module.exports = server;