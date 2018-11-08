import axios from "axios";
import store from "../store";
const env = process.env.NODE_ENV;
let baseUrl = env == "development" ? "/api" : "/";

const instance = axios.create({
  baseURL: baseUrl,
  timeout: 15000
});
instance.interceptors.request.use(
  config => {
    if (store.state.user.token) {
      config.headers.token = `${store.state.user.token}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 401 清除token信息并跳转到登录页面
          store.dispatch("remove_token");

          // 只有在当前路由不是登录页面才跳转
          router.currentRoute.path !== "/" &&
            router.replace({
              path: "/",
              query: { redirect: router.currentRoute.path }
            });
      }
    }
    // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
    return Promise.reject(error.response.data);
  }
);
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
