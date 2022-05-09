import { createRouter, createWebHistory } from "vue-router";
import Index from "../views/Index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "root",
      component: Index,
    },
    {
      path: "/cinemas",
      name: "cinemas",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("./../views/Cinemas.vue"),
    },
  ],
});

export default router;
