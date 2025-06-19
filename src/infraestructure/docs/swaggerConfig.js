const swaggerJSDoc = require('swagger-jsdoc');
const config = require('../../config');
const port = config.port;
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-commerce API',
      version: '1.0.0',
      description: 'API para sistema de e-commerce con autenticación y gestión de productos',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
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
          required: ['name', 'price'],
          properties: {
            name: {
              type: 'string',
              description: 'Nombre del producto'
            },
            price: {
              type: 'number',
              description: 'Precio del producto'
            },
            description: {
              type: 'string',
              description: 'Descripción del producto'
            },
          },
        },
        User: {
          type: 'object',
          required: ['username', 'email', 'password'],
          properties: {
            username: {
              type: 'string',
              description: 'Nombre de usuario'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Correo electrónico del usuario'
            },
            password: {
              type: 'string',
              format: 'password',
              description: 'Contraseña del usuario'
            },
            roles: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: 'Roles del usuario',
              default: ['user']
            }
          },
        },
        LoginRequest: {
          type: 'object',
          required: ['username', 'password'],
          properties: {
            username: {
              type: 'string',
              description: 'Nombre de usuario'
            },
            password: {
              type: 'string',
              format: 'password',
              description: 'Contraseña del usuario'
            }
          }
        },
        AuthResponse: {
          type: 'object',
          properties: {
            user: {
              $ref: '#/components/schemas/User'
            },
            token: {
              type: 'string',
              description: 'JWT token de autenticación'
            }
          }
        }
      },
    },
  },
  apis: ['./src/adapters/routes/*.js'],
};
 
module.exports = swaggerJSDoc(options);