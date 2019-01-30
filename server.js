require('dotenv').config();

const v1Router = require('./api/v1')

const fastify = require('./libs/fatify');
const swagger = require('./libs/swagger');

fastify.register(require('fastify-swagger'), swagger.options)

v1Router.forEach((route, index) => {
  fastify.route(route)
 })

const start = async () => {
  try {
    await fastify.listen(process.env.PORT);
    fastify.swagger();
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();
