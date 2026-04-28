import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("@/pages/LoginPage.vue"),
      meta: { guestOnly: true },
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/pages/RegisterPage.vue"),
      meta: { guestOnly: true },
    },
    {
      path: "/dashboard",
      component: () => import("@/features/layout/DashboardShell.vue"),
      meta: { requiresAuth: true },
      children: [
        {
          path: "",
          redirect: { name: "dashboard-users" },
        },
        {
          path: "users",
          name: "dashboard-users",
          component: () => import("@/pages/UsersPage.vue"),
        },
        {
          path: "products",
          name: "dashboard-products",
          component: () => import("@/pages/ProductsPage.vue"),
        },
      ],
    },
    {
      path: "/",
      redirect: { name: "login" },
    },
  ],
});

router.beforeEach((to) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: "login" };
  }

  if (to.meta.guestOnly && authStore.isAuthenticated) {
    return { name: "dashboard-users" };
  }

  return true;
});

export { router };
