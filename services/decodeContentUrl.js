const GetTwitchLink = require('node-twitch-link');

const getTwitchLinkService = async (contentUrl) => await GetTwitchLink(contentUrl, {oauth_token: process.env.HOST_OAUTH});

module.exports = getTwitchLinkService;