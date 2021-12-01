import express from 'express'
import Layout from '@podium/layout';
import pino from 'pino';

import config from './config/index.js';

const BASE_PATH = '/bilabo-imove-test';

// const HOST = 'https://www.flatoy.wtf/manifest.json';
const HOST = 'http://localhost:3000/manifest.json'
const CONTENT = `${HOST}${BASE_PATH}`;

const logger = pino({
    level: config.get('logLevel'),
});

const app = express({logger})

const layout = new Layout({
    development: config.get('development'),
    pathname: '/',
    logger,
    name: 'podium-example',
});

const mainPodlet = layout.client.register({
  name: 'main', // required
  uri: HOST, // required
});

app.use(layout.middleware());


app.get('/', async (req, res) => {
  const incoming = res.locals.podium;
  const response = await mainPodlet.fetch(incoming);


  console.log(response.js)

  // response.js
  // response.css

  // use document templet, will include it automatically

  // promise all for flere podlets, gir array

  incoming.view.title = 'Layout Server Example';
  incoming.podlets = [response]

  res.podiumSend(`<div>${response.content}</div>`);
});


// const headerPodlet = layout.client.register({
//     name: 'header',
//     uri: config.get('podlets.header'),
// });

// const footerPodlet = layout.client.register({
//     name: 'footer',
//     uri: config.get('podlets.footer'),
// });

try {
    await app.listen(config.get('port'), '0.0.0.0');
} catch (err) {
    logger.error(err);
    process.exit(1);
}
