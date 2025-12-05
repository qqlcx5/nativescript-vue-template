import { createApp } from 'nativescript-vue';
import { ApplicationSettings } from '@nativescript/core';

// 导入根组件
import App from './App.vue';

// 导入状态管理
import pinia from './store';

// 导入用户存储
import { useUserStore } from './store/modules/user';

// 导入全局样式
import './app.css';

// 创建应用实例
const app = createApp(App);

// 使用状态管理
app.use(pinia);

// 初始化用户状态
const userStore = useUserStore();
userStore.checkLoginStatus();

// 启动应用
app.start();

// 全局错误处理
if (typeof global !== 'undefined' && global.ErrorHandler) {
  global.ErrorHandler.setCallback((error: Error) => {
    console.error('Global error:', error);
    // 这里可以添加错误上报逻辑
  });
}