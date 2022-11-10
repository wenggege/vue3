import { defineStore } from "pinia";
import { CollapseState } from "./types";

export const useAppStore = defineStore("app", {
  state: (): CollapseState => {
    return {
      collapse: false,
    };
  },
});
