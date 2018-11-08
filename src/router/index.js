import Vue from "vue";
import Router from "vue-router";
import store from "../store";
import { Notification } from "element-ui";
Vue.use(Router);
const components = {
  login: () => import("../views/Login"),
  home: () => import("../views/Home"),
  layout: () => import("../views/layout"),
  permission_list: () => import("../views/Permission/List"),
  permission_add: () => import("../views/Permission/add"),
  article_list: () => import("../views/Article/List"),
  article_add: () => import("../views/Article/add"),
  article_edit: () => import("../views/Article/edit"),
  to_404: () => import("../views/404")
};

const router = new Router({
  routes: [
    {
      path: "*",
      component: components.to_404
    },
    {
      path: "/",
      name: "login",
      component: components.login
    },
    {
      path: "/layout",
      component: components.layout,
      redirect: "/layout/home",
      children: [
        {
          path: "home",
          meta: {
            title: "首页",
            requireAuth: true
          },
          component: components.home
        },
        {
          path: "permission_list",
          meta: {
            title: "管理员列表",
            requireAuth: true
          },
          component: components.permission_list
        },
        {
          path: "permission_add",
          meta: {
            title: "添加管理员",
            requireAuth: true
          },
          component: components.permission_add
        },
        {
          path: "article_list",
          meta: {
            title: "文章列表",
            requireAuth: true
          },
          component: components.article_list
        },
        {
          path: "article_add",
          meta: {
            title: "文章添加",
            requireAuth: true
          },
          component: components.article_add
        },
        {
          path: "article_edit",
          meta: {
            title: "文章编辑",
            requireAuth: true
          },
          component: components.article_edit
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.state.user.token) {
      next();
    } else {
      Notification.error("兄弟，你未登录呀!");
      next({
        path: "/"
        // query: { redirect: to.fullPath }
      });
    }
  } else {
    next();
  }
});
export default router;
