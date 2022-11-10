# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:

1. Run `Extensions: Show Built-in Extensions` from VS Code's command palette, look for `TypeScript and JavaScript Language Features`, then right click and select `Disable (Workspace)`. By default, Take Over mode will enable itself if the default TypeScript extension is disabled.
2. Reload the VS Code window by running `Developer: Reload Window` from the command palette.

You can learn more about Take Over mode [here](https://github.com/johnsoncodehk/volar/discussions/471).

## 包装计划相关

### 包装计划节点号

10-包材信息表-PMO
20-基础信息表-研发PM 21-包材信息表-技术PM 22-包材信息表-物流BP 22-危险品包材请购需求表-技术PM
30-包装请购Deadline-物控
40-发货信息表-PMO 41-发货信息表-物流BP
50-质量标准生效/变更-QC
60-包装指令-计划专员

### 包装计划节点提交表单，数字要全部转为字符串后提交

### 按钮封装防抖函数

```
import { debounce } from '@/utils/tools'

const onEvent = debounce(() => {
  // do something
})

```
