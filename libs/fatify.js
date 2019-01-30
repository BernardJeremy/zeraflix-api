const fastify = require('fastify')({
    logger: process.env.DEBUG,
  });

const v1Router = require('../api/v1')

const swagger = require('../libs/swagger');

fastify.register(require('fastify-swagger'), swagger.options)

v1Router.forEach((route) => {
  fastify.route(route)
 })

module.exports = fastify;