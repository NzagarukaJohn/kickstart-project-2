import { Router } from 'express';
import { serve, setup } from 'swagger-ui-express';

const docrouter = Router();

const local = process.env.LOCAL_HOST;
const heroku = process.env.DB_CONNECT;

const options = {
  openapi: '3.0.1',
  info: {
    title: 'RRA ebm claims portal',
    version: '1.0.0',
    description: 'This is the backend api for RRA ebm claims Portal project.',
  },
  host: process.env.NODE_ENV === 'production' ? heroku : local,
  basePath: '/api',
  security: [
    {
      bearerAuth: [],
    },
  ],
  tags: [
    { name: 'setup swagger', description: 'Testing swagger setup' },
    { name: 'User', description: 'users endpoint' },
    { name: 'Admin', description: 'update user role' },
  ],
  paths: {
    '/api/v1/docs': {
      get: {
        tags: ['setup swagger'],
        description: 'testing swagger setup',
        security: [],
        parameters: [],

        responses: {
          200: {
            description: 'success status',
          },
          500: {
            description: 'Internal Server Error',
          },
        },
      },
    },

    '/api/v1/user/forgotpassword': {
      post: {
        summary: 'Forgotten password',
        tags: ['resetPassword'],
        parameters: [],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/forgot',
              },
            },
          },
          required: true,
        },
        consumes: ['application/json'],
        responses: {
          200: {
            description: 'success status',
          },
          500: {
            description: 'Something went very wrong!',
          },
        },
      },
    },
    '/api/v1/user/resetpassword/{token}': {
      patch: {
        summary: 'Reset password',
        tags: ['resetPassword'],
        parameters: [
          {
            name: 'token',
            in: 'path',
            type: 'string',
            description: 'reset token',
            required: true,
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/reset',
              },
            },
          },
          required: true,
        },
        consumes: ['application/json'],
        responses: {
          200: {
            description: 'success status',
          },
          500: {
            description: 'Error',
          },
        },
      },
    },

    '/api/v1/user/': {
      get: {
        tags: ['User'],
        description: 'get all user data',
        security: [],
        parameters: [],
        responses: {
          200: {
            description: 'successfully',
          },
          400: {
            description: 'Invalid credation',
          },
          500: {
            description: 'Internal Server Error',
          },
        },
      },
    },
    '/api/v1/user/{id}': {
      get: {
        tags: ['User'],
        description: 'get all user data',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'user id',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          200: {
            description: 'successfully',
          },
          400: {
            description: 'Invalid credation',
          },
          500: {
            description: 'Internal Server Error',
          },
        },
      },
    },
    '/api/v1/user/update': {
      patch: {
        tags: ['User'],
        description: 'update user data',
        parameters: [],
        requestBody: {
          content: {
            'multipart/form-data': {
              schema: {
                $ref: '#/components/schemas/User',
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: 'successfully',
          },
          400: {
            description: 'Invalid credation',
          },
          500: {
            description: 'Internal Server Error',
          },
        },
      },
    },
    '/api/v1/user/roles': {
      put: {
        tags: ['Admin'],
        description: 'Updating user roles',
        parameters: [],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/userRole',
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: 'success',
          },
          500: {
            description: 'Internal server error',
          },
        },
      },
    },
    '/api/v1/user/notification/get': {
      get: {
        tags: ['Notification'],
        description: 'Get all notifications',
        parameters: [],
        responses: {
          200: {
            description: 'success',
          },
        },
      },
    },
    '/api/v1/user/notification/read': {
      put: {
        tags: ['Notification'],
        description: 'Read all notifications',
        parameters: [],
        responses: {
          200: {
            description: 'success',
          },
        },
      },
    },
    '/api/v1/user/notification/{id}': {
      patch: {
        tags: ['Notification'],
        description: 'Read notification',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'notification id',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          200: {
            description: 'success',
          },
        },
      },
    },
    '/api/v1/user/auth/signup': {
      post: {
        security: [],
        tags: ['authentication'],
        description: 'user signup with JWT',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/SignupAuthShema',
              },
              example: {
                firstName: 'John',
                lastName: 'Nzagaruka',
                tinNumber: '123456789',
                IDNumber: '1234567891234567',
                phoneNumber: '0785632478',
                user_role: 'ebm_claimer',
                gender: 'male',
                email: 'nzagarukajohn@gmail.com',
                password: 'testing',
                repeat_password: 'testing',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'success status',
          },
        },
      },
    },
    '/api/v1/user/login': {
      post: {
        tags: ['User'],
        description: 'login user',
        security: [],
        parameters: [],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User',
              },
              example: {
                tinNumber: '123456789',
                password: 'testing',
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: 'successfully',
          },
          400: {
            description: 'Invalid credation',
          },
          500: {
            description: 'Internal Server Error',
          },
        },
      },
    },

    '/api/v1/user/auth/logout': {
      get: {
        tags: ['authentication'],
        description: 'logout user',
        responses: {
          200: {
            description: 'successfully',
          },
        },
      },
    },

    '/api/v1/ebm-claims': {
      post: {
        tags: ['EBM Claims'],
        description: 'Send an ebm claim',

        parameters: [],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ebmClaimRequest',
              },
              example: {
                claimReason: 'lost',
                claimDetails: 'My ebm machine has been stolen',
                dateOfTheCase: '2022-06-29',
                place: 'Gatenga',
              },
            },
          },
          required: true,
        },
        responses: {
          201: {
            description: 'success status',
          },
          401: {
            description: 'Unauthorized',
          },
          403: {
            description: 'Unauthorized',
          },
          500: {
            description: 'Server Error',
          },
          404: {
            description: 'Not Found',
          },
        },
      },
      get: {
        tags: ['EBM Claims'],
        description: 'get all ebm claims',
        parameters: [],
        responses: {
          200: {
            description: 'successful',
          },
          500: {
            description: 'Internal Server Error',
          },
        },
      }
    },
    '/api/v1/ebm-claims/approve/{id}': {
      patch: {
        tags: ['EBM Claims'],
        description: 'approve claim request',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ebm claim request id',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          200: {
            description: 'successfully',
          },
          404: {
            description: 'Not found',
          },
          500: {
            description: 'Internal Server Error',
          },
        },
      },
    },
  },
  components: {
    schemas: {
      userRole: {
        type: 'object',
        properties: {
          email: {
            type: 'string',
            description: 'user email',
          },
          role: {
            type: 'string',
            description: 'new role to set to user',
          },
        },
      },
      SignupAuthShema: {
        type: 'object',
        properties: {
          firstName: {
            type: 'string',
          },
          lastName: {
            type: 'string',
          },
          tinNumber: {
            type: 'string',
          },
          IDNumber: {
            type: 'string',
          },
          phoneNumber: {
            type: 'string',
          },
          email: {
            type: 'string',
          },
          password: {
            type: 'string',
          },
          repeat_password: {
            type: 'string',
          },
        },
      },

      User: {
        type: 'object',

        properties: {
          firstName: {
            type: 'string',
            description: "User's first name",
          },
          lastName: {
            type: 'string',
            description: "User's last name",
          },
          tinNumber: {
            type: 'string',
            description: "User's TIN number",
          },
          IDNumber: {
            type: 'string',
            description: "User's TIN number",
          },
          email: {
            type: 'string',
            description: "User's email",
          },
          phoneNumber: {
            type: 'string',
            description: "User's phone number",
          },
          gender: {
            type: 'string',
            description: "User's gender",
          },
          preferredLanguage: {
            type: 'string',
            description: "User's preferred language",
          },
          preferredCurrency: {
            type: 'string',
            description: "User's preferred currency",
          },
        },
      },
      
      ebmClaimRequest: {
        type: 'object',

        properties: {
          claimReason: {
            type: 'string',
            description: 'claim reason',
          },
          claimDetails: {
            type: 'string',
            description: 'claim Details',
          },
          dateOfTheCase: {
            type: 'string',
            description: 'When the incident happened',
          },
          place: {
            type: 'string',
            description: 'place of incidence',
          },
        },
      },

      forgot: {
        type: 'object',
        properties: {
          email: {
            type: 'string',
          },
        },
      },
      reset: {
        type: 'object',
        properties: {
          password: {
            type: 'string',
            in: 'body',
            name: 'name',
            required: true,
          },
        },
      },

    },
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};
docrouter.use('/', serve, setup(options));
export default docrouter;
