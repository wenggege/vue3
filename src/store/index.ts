import { createPinia } from "pinia";

import { TaskGuidStore } from "./modules/user/user";
import { useAppStore } from "./modules/app/index";
import { optionsStore } from "./modules/options/index";

const store = createPinia();

export { useAppStore, TaskGuidStore, optionsStore };
export default store;
