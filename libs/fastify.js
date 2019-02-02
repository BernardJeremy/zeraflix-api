const fastify = require('fastify')({
    logger: process.env.DEBUG,
  });

const v1Router = require('../api/v1');

const swagger = require('./swagger');


fastify.register(require('fastify-swagger'), swagger.options);

const allowedOrigin = process.env.DEBUG ? true : process.env.CLIENT_HOST;
fastify.register(require('fastify-cors'), { origin: allowedOrigin});

v1Router.forEach((route) => {
  fastify.route(route)
 });

module.exports = fastify;