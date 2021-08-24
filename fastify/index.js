const fastify = require('fastify')({
  logger: true,
  ignoreTrailingSlash: true
}),
  path = require('path');

fastify.register(require('fastify-static'), {
  root: path.join(__dirname, 'public'),
  prefix: '/public/',
});

fastify.register(require('fastify-swagger'), {
  routePrefix: '/documentation',
  swagger: {
    securityDefinitions: {
      Bearer: {
        type: 'apiKey',
        name: 'token',
        in: 'header',
      }
    },
    info: {
      title: 'API',
      description: 'Api para gestion de sitios',
      version: '1.0'
    },
    host: 'localhost:3001',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
  },

  exposeRoute: true
});
fastify.register(require('fastify-url-data'));
fastify.register(require('fastify-multipart'));
fastify.register(require('fastify-cors'), { 
  origin: '*' 
}); 
fastify.register(require('./app/routes/sites'));
fastify.register(require('./app/routes/images'));

fastify.listen(3001, '0.0.0.0', (err, address) => {
  if (err) throw err;
  fastify.log.info(`server listening on ${address}`);
})

