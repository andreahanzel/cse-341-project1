import swaggerAutogen from 'swagger-autogen';
import dotenv from 'dotenv';
dotenv.config();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'API for contacts management'
  },
  host: process.env.HOST || 'localhost:3000',
  basePath: '/contacts',
  schemes: ['http', 'https']
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/contacts.js'];

swaggerAutogen()(outputFile, endpointsFiles, doc).then(async () => {
  // Import server.js dynamically
  await import('./server.js');
});
