import type { Component } from "vue";

export type NavigationItem = {
  label: string;
  to: string;
  icon: Component;
};
