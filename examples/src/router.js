import Vue from "vue";
import Router from "vue-router";
const VaffMultiField = () => import("./views/VaffMultiField.vue");
const VaffMediaField = () => import("./views/VaffMediaField.vue");
const VaffDateTimeField = () => import("./views/VaffDateTimeField.vue");

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/vaff-multi-field",
      name: "VaffMultiField",
      component: VaffMultiField
    },
    {
      path: "/vaff-media-field",
      name: "VaffMediaField",
      component: VaffMediaField
    },
    {
      path: "/vaff-date-time-field",
      name: "VaffDateTimeField",
      component: VaffDateTimeField
    }
  ]
});
