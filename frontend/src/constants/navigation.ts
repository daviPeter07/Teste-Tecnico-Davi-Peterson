import { Boxes, Users } from "lucide-vue-next";
import type { NavigationItem } from "@/types/navigation";

export const dashboardNavigation: NavigationItem[] = [
  {
    label: "Usuarios",
    to: "/dashboard/users",
    icon: Users,
  },
  {
    label: "Produtos",
    to: "/dashboard/products",
    icon: Boxes,
  },
];
