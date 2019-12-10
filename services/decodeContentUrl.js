const GetTwitchLink = require('node-twitch-link');

module.exports = async (contentUrl) => GetTwitchLink(
  contentUrl, {
    oauth_token: process.env.HOST_OAUTH,
  },
);
