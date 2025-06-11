const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-commerce API',
      version: '1.0.0',
      description: 'API para sistema de e-commerce',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor local',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Product: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            price: { type: 'number' },
            description: { type: 'string' },
          },
        },
        User: {
          type: 'object',
          properties: {
            email: { type: 'string' },
            password: { type: 'string' },
          },
        },
      },
    },
  },
  apis: ['./src/infrastructure/routes/*.js'], // Patrón para buscar archivos de rutas
};


module.exports = swaggerJSDoc(options);