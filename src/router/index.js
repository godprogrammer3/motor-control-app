import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Setting from "../views/Setting.vue";
import History from "@/views/History.vue";
import Operating from "@/views/Operating.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/setting",
    name: "Setting",
    component: Setting,
  },
  {
    path: "/history",
    name: "History",
    component: History,
  },
  {
    path: "/operating",
    name: "Operating",
    component: Operating,
    props: (route) => ({
      ...route.params,
    }),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
