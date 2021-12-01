import convict from "convict";
import convictWithValidator from "convict-format-with-validator";
import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
convict.addFormats(convictWithValidator);

let pack = {};
try {
  pack = JSON.parse(fs.readFileSync(join(__dirname, "../package.json")));
} catch (error) {
  /* empty */
}

const conf = convict({
  name: {
    format: String,
    doc: "Name of the application",
    default: pack.name,
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
  podlets: {
    header: { format: "url", default: "http://header/manifest.json" },
    footer: { format: "url", default: "http://footer/manifest.json" },
    sidebar: {
      format: "url",
      default: "http://sidebar/manifest.json",
    },
    main: {
      format: "url",
      default: "http://main/manifest.json",
    },
  },
});

const env = conf.get("env");
conf.loadFile(`${__dirname}/config.${env}.json`);
conf.validate();

export default conf;
