import express from "express";
import Layout from "@podium/layout";
import pino from "pino";

import config from "./config/index.js";


const logger = pino({
  level: config.get("logLevel"),
});

const app = express({ logger });

const layout = new Layout({
  development: config.get("development"),
  pathname: "/",
  logger,
  name: "layout-server",
});

const main = layout.client.register({
  name: "main",
  uri: config.get("podlets.main"),
});

const header = layout.client.register({
  name: "header",
  uri: config.get("podlets.header"),
});

const footer = layout.client.register({
  name: "footer",
  uri: config.get("podlets.footer"),
});

const sidebar = layout.client.register({
  name: "sidebar",
  uri: config.get("podlets.sidebar"),
});

app.use(layout.middleware());

app.get("/", async (req, res) => {
  const incoming = res.locals.podium;

  const [$main, $header, $footer, $sidebar] = await Promise.all([
    main.fetch(incoming),
    header.fetch(incoming),
    footer.fetch(incoming),
    sidebar.fetch(incoming),
  ]);

  // response.js
  // response.css

  // use document templet, will include it automatically

  // promise all for flere podlets, gir array

  incoming.view.title = "Layout Server Example";
  incoming.podlets = [$main, $header, $footer, $sidebar];

  res.podiumSend(`<div>${$main.content}</div>`);
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
  const PORT = config.get("port");
  await app.listen(PORT, () => {
    console.log(`Layout server running at http://localhost:${PORT}`);
  });
} catch (err) {
  logger.error(err);
  process.exit(1);
}
