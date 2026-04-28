import type { Component } from "vue";

export interface SidebarItem {
  label: string;
  icon: Component;
  to: string;
}
