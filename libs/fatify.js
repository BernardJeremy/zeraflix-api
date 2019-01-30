const fastify = require('fastify')({
    logger: process.env.DEBUG,
  });


module.exports = fastify;