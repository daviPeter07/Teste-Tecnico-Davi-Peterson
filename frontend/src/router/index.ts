import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/dashboard/users",
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../pages/LoginPage.vue"),
      meta: { guestOnly: true },
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../pages/RegisterPage.vue"),
      meta: { guestOnly: true },
    },
    {
      path: "/dashboard",
      component: () => import("../features/layout/DashboardShell.vue"),
      meta: { requiresAuth: true },
      children: [
        {
          path: "users",
          name: "dashboard-users",
          component: () => import("../pages/UsersPage.vue"),
        },
        {
          path: "products",
          name: "dashboard-products",
          component: () => import("../pages/ProductsPage.vue"),
        },
      ],
    },
  ],
});

router.beforeEach(async (to) => {
  const authStore = useAuthStore();

  if (!authStore.isBootstrapped) {
    await authStore.bootstrap();
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: "login" };
  }

  if (to.meta.guestOnly && authStore.isAuthenticated) {
    return { name: "dashboard-users" };
  }

  return true;
});

export { router };
