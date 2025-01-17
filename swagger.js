import swaggerAutogen from 'swagger-autogen';
const swagger = swaggerAutogen();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'API Documentation for Contacts Project'
  },
  host: 'localhost:3000',
  basePath: '/contacts',
  schemes: ['http'],
  definitions: {
    Contact: {
      type: 'object',
      properties: {
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        email: { type: 'string' },
        favoriteColor: { type: 'string' },
        birthday: { type: 'string' }
      },
      required: ['firstName', 'lastName', 'email', 'favoriteColor', 'birthday']
    }
  }
};

const outputFile = './swagger-output.json';
const routes = ['./routes/contacts.js'];

swagger(outputFile, routes, doc)
  .then(() => {
    console.log('Swagger documentation generated successfully');
  })
  .catch((error) => {
    console.error('Error generating Swagger documentation:', error);
  });
