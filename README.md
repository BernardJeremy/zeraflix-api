# zeraflix-api
REST API dedicated to retrieve Twitch VOD & Stream content link.

## Features
- Retrieve video media links from Twitch stream or past broadcast. 

## Environnements configuration
- `HOST_OAUTH` : Twitch OAUTH token, needed to use Twitch API.
- `CLIENT_HOST` : Host of client applications, needed to configure CORS. You can configure several at once by separating each one with ";".
- `PORT` : Target port to bind server.
