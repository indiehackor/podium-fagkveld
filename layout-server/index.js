import express from "express";
import Layout from "@podium/layout";
import pino from "pino";

import config from "./config/index.js";


const logger = pino({
  level: config.get("logLevel"),
});

const app = express({ logger });

app.use('/public', express.static("public"))

const layout = new Layout({
  development: config.get("development"),
  pathname: "/",
  logger,
  name: "layout-server",
});

layout.css({ value: 'http://localhost:8080/public/styles.css'  });

// https://podium-lib.io/docs/api/layout#clientregisteroptions
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
  // https://podium-lib.io/docs/api/incoming
  const incoming = res.locals.podium;

  const [$main, $header, $footer, $sidebar] = await Promise.all([
    main.fetch(incoming),
    header.fetch(incoming),
    footer.fetch(incoming),
    sidebar.fetch(incoming),
  ]);

  incoming.view.title = "Layout Server Example";
  incoming.podlets = [$main, $header, $footer, $sidebar];

  res.podiumSend($header.content + $main.content + $sidebar.content + $footer.content);
});

try {
  const PORT = config.get("port");
  await app.listen(PORT, () => {
    console.log(`Layout server running at http://localhost:${PORT}`);
  });
} catch (err) {
  logger.error(err);
  process.exit(1);
}
