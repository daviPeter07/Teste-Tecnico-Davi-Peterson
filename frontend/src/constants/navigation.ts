import type { SidebarItem } from "../types/navigation";

export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    label: "Usuarios",
    icon: "mdi-account-group-outline",
    to: "/dashboard/users",
  },
  {
    label: "Produtos",
    icon: "mdi-package-variant-closed",
    to: "/dashboard/products",
  },
];
