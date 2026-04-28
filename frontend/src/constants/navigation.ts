import { Package, Users } from "lucide-vue-next";
import type { SidebarItem } from "../types/navigation";

export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    label: "Usuarios",
    icon: Users,
    to: "/dashboard/users",
  },
  {
    label: "Produtos",
    icon: Package,
    to: "/dashboard/products",
  },
];
