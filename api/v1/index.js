const boom = require('boom');

const getTwitchLinkService = require('../../services/decodeContentUrl');

const routes = [
  {
    method: 'GET',
    url: '/decode',
    handler: async (req, reply) => {
      try {
        const contentUrl = req.query.twitchUrl;
        if (!contentUrl) {
          throw boom.badRequest(new Error('[twitchUrl] parameter is missing !'));
        }

        const contentLinkArray = await getTwitchLinkService(contentUrl);
        reply.send(contentLinkArray);
      } catch (err) {
        throw err;
      }
    },
  },
]

module.exports = routes