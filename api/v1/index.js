const boom = require('boom');

const getTwitchLinkService = require('../../services/decodeContentUrl');

module.exports = [
  {
    method: 'GET',
    url: '/decode',
    handler: async (req, reply) => {
      const contentUrl = req.query.twitchUrl;
      if (!contentUrl) {
        throw boom.badRequest(new Error('[twitchUrl] parameter is missing !'));
      }

      const contentLinkArray = await getTwitchLinkService(contentUrl);
      reply.send(contentLinkArray);
    },
  },
];
