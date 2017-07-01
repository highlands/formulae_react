// @flow

import { create } from "apisauce";
import config from "../config";
import { Record } from "immutable";

class ApiHeaders
  extends Record({
    Accept: ""
  }) {}

class ApiConfig
  extends Record({
    baseURL: "",
    headers: new ApiHeaders()
  }) {}

const defaultHeaders = new ApiHeaders({
  Accept: "application/json"
});

const defaultConfig = new ApiConfig({
  baseURL: config.apiBaseUrl,
  headers: defaultHeaders
});

function createConfig(resourcePath: string) {
  const resourceUrl = `${config.apiBaseUrl}/${resourcePath}/`;
  return defaultConfig.set("baseURL", resourceUrl).toJS();
}

export function createApi(resourcePath: string, apiKey: string) {
  const api = create(createConfig(resourcePath));
  api.setHeader("Authorization", `Bearer ${apiKey}`);
  return api;
}
