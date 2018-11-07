import axios from "axios";
const env = process.env.NODE_ENV;
let baseUrl = env == "development" ? "/api" : "/";

const instance = axios.create({
  baseURL: baseUrl,
  timeout: 15000
});
const fetch = {
  get(url, data, config) {
    return new Promise((resolve, reject) => {
      instance
        .get(url, { params: data }, config)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  axios(url, data, config, methods) {
    return new Promise((resolve, reject) => {
      instance[methods](url, data, config)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  put(url, data, config) {
    return this.axios(url, data, config, "put");
  },
  post(url, data, config) {
    return this.axios(url, data, config, "post");
  },
  delete(url, data, config) {
    return this.axios(url, data, config, "delete");
  }
};
export default fetch;
