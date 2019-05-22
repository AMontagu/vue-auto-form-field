import Vue from "vue";
import Router from "vue-router";
const Vaff = () => import("./views/Vaff.vue");
const VaffMediaField = () => import("./views/VaffMediaField.vue");
const VaffDateTimeField = () => import("./views/VaffDateTimeField.vue");

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/vaff",
      name: "Vaffd",
      component: Vaff
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
