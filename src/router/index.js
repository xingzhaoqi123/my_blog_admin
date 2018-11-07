import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);
const components = {
  login: () => import("../views/Login"),
  home: () => import("../views/Home"),
  layout: () => import("../views/layout"),
  permission_list: () => import("../views/Permission/List"),
  permission_add: () => import("../views/Permission/add"),
  article_list: () => import("../views/Article/List"),
  article_add: () => import("../views/Article/add"),
  article_edit: () => import("../views/Article/edit")
};
export default new Router({
  routes: [
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
            title: "首页"
          },
          component: components.home
        },
        {
          path: "permission_list",
          meta: {
            title: "管理员列表"
          },
          component: components.permission_list
        },
        {
          path: "permission_add",
          meta: {
            title: "添加管理员"
          },
          component: components.permission_add
        },
        {
          path: "article_list",
          meta: {
            title: "文章列表"
          },
          component: components.article_list
        },
        {
          path: "article_add",
          meta: {
            title: "文章添加"
          },
          component: components.article_add
        },
        {
          path: "article_edit",
          meta: {
            title: "文章编辑"
          },
          component: components.article_edit
        }
      ]
    }
  ]
});
