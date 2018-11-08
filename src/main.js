// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "normalize.css";
import store from "./store";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import util from "./utils/index";
import { parseTime } from "../filters";
Vue.config.productionTip = false;
Vue.prototype.$axios = util.axios;
Vue.use(ElementUI);

Vue.prototype.parseTime = parseTime;

NProgress.inc(0.2);
NProgress.configure({ easing: "ease", speed: 500, showSpinner: false });

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
