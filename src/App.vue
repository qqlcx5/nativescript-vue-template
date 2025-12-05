<template>
  <Frame>
    <Page 
      @loaded="onPageLoaded"
      @unloaded="onPageUnloaded"
    >
      <!-- 根据登录状态显示不同的页面 -->
      <component 
        :is="currentComponent"
        v-if="isAppReady"
      />
      
      <!-- 应用加载指示器 -->
      <AppLoading 
        v-else
        :fullscreen="true"
        text="Loading App..."
      />
    </Page>
  </Frame>
</template>

<script setup>
import { ref, computed, onMounted } from 'nativescript-vue';
import { ApplicationSettings } from '@nativescript/core';

// 导入页面组件
import Login from './views/Login.vue';
import Home from './views/Home.vue';

// 导入状态管理
import { useUserStore } from './store/modules/user';
import { useAppStore } from './store/modules/app';

// 导入通用组件
import AppLoading from './components/common/AppLoading.vue';

// 响应式数据
const isAppReady = ref(false);

// 使用状态管理
const userStore = useUserStore();
const appStore = useAppStore();

// 计算属性 - 当前应该显示的组件
const currentComponent = computed(() => {
  return userStore.isLoggedIn ? Home : Login;
});

// 页面生命周期事件
const onPageLoaded = () => {
  console.log('App page loaded');
};

const onPageUnloaded = () => {
  console.log('App page unloaded');
};

// 初始化应用
const initializeApp = async () => {
  try {
    // 初始化设备信息
    appStore.initDeviceInfo();
    
    // 检查网络状态
    // 这里可以添加网络状态监听逻辑
    
    // 标记应用已准备好
    isAppReady.value = true;
    
    console.log('App initialized successfully');
  } catch (error) {
    console.error('Failed to initialize app:', error);
    
    // 即使初始化失败，也让应用继续运行
    isAppReady.value = true;
  }
};

// 组件挂载时初始化
onMounted(() => {
  initializeApp();
});
</script>

<style scoped>
/* 全局样式可以在 app.css 中定义 */
</style>