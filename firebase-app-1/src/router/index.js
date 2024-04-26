import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../stores/user";
import { useDatabaseStore } from "../stores/database";
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

const redireccion = async (to, from, next) => {
  const userStore = useUserStore();
  const databaseStore = useDatabaseStore();
  userStore.loadingSession = true;
  const url = await databaseStore.getUrl(to.params.pathMatch[0]);

  if (!url) {
    next();
  } else {
    window.location.href = url;
    userStore.loadingSession = true;
    next();
  }
};

const routes = [
  {
    path: "/",
    component: HomeView,
    beforeEnter: requireAuth,
    name: "home",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/editar/:id",
    name: "editar",
    component: () => import("../views/EditarView.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/RegisterView.vue"),
  },
  {
    path: "/perfil",
    name: "perfil",
    component: () => import("../views/PerfilView.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    component: () => import("../views/NotFound.vue"),
    beforeEnter: redireccion,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
