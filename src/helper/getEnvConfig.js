import config from "../config/index.js";

export default function getEnvConfig(params) {
  return config[process.env.NODE_ENV];
}
