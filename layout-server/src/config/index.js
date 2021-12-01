import convict from "convict";
import convictWithValidator from "convict-format-with-validator";
import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
convict.addFormats(convictWithValidator);

let pack = {};
try {
  pack = JSON.parse(fs.readFileSync(join(__dirname, "../../package.json")));
} catch (error) {
  /* empty */
}

const conf = convict({
  name: {
    format: String,
    doc: "Name of the application",
    default: pack.name.replace("@finn-no/", ""),
    env: "NAME",
  },
  version: {
    format: String,
    default: Date.now().toString(),
    env: "VERSION",
  },
  env: {
    format: ["local", "dev", "prod"],
    default: "local",
    env: "FIAAS_ENVIRONMENT",
  },
  logLevel: {
    format: ["trace", "debug", "info", "warn", "error", "fatal", "silent"],
    default: "info",
    env: "LOG_LEVEL",
    arg: "log-level",
  },
  metrics: {
    format: Boolean,
    default: true,
  },
  development: {
    format: Boolean,
    default: false,
  },
  port: {
    format: "port",
    doc: "The server port",
    default: 8080,
    env: "PORT",
    arg: "port",
  },
  shutdownGracePeriod: {
    doc: "Grace period to allow connections to finish before shutdown",
    default: 5000,
    format: "nat",
  },
  sitesUrl: {
    format: String,
    default: "//www.finn.no",
  },
  podlets: {
    header: { format: "url", default: "http://header/manifest.json" },
    footer: { format: "url", default: "http://footer/manifest.json" },
    main: {
      format: "url",
      default: "http://localhost:3000/manifest.json",
    },
  },
});

const env = conf.get("env");
conf.loadFile(`${__dirname}/config.${env}.json`);
conf.validate();

export default conf;
