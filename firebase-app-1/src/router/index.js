import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../stores/user";
import HomeView from "../views/HomeView.vue";

const requireAuth = async (to, from, next) => {
  const userStore = useUserStore();
  userStore.loadingSession = true;
  const user = await userStore.currentUser();

  if (user) {
    next();
  } else {
    next("/login");
  }
  userStore.loadingSession = false;
};

const routes = [
  {
    path: "/",
    component: HomeView,
    beforeEnter: requireAuth,
  },
  { path: "/login", component: () => import("../views/LoginView.vue") },
  {
    path: "/editar/:id",
    component: () => import("../views/EditarView.vue"),
    beforeEnter: requireAuth,
  },
  { path: "/register", component: () => import("../views/RegisterView.vue") },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
