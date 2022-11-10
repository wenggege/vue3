/**
 * userStore 可以是任何东西
 *
 * 第一个参数是应用程序中唯一的Id
 */
import { defineStore } from 'pinia';
import { UserState } from './types';
export const UseruStore = defineStore({
  id: 'user',
  state: (): UserState => ({}),
  actions: {},
});

export const TaskGuidStore = defineStore({
  id:'TaskGUID',
  state: () => ({
    MileStoneTaskGUID: '',
    TaskType: ''
  })
})
