const fastify = require('fastify')({
    logger: process.env.DEBUG,
  });
const fastifySwagger = require('fastify-swagger'); 
const fastifyCors = require('fastify-cors'); 

const swagger = require('./swagger');
const v1Router = require('../api/v1');

fastify.register(fastifySwagger, swagger.options);

const allowedOrigin = process.env.DEBUG ? true : process.env.CLIENT_HOST.split(';');
fastify.register(fastifyCors, { origin: allowedOrigin});

v1Router.forEach((route) => {
  fastify.route(route)
 });

module.exports = fastify;