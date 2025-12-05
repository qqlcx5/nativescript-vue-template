import { defineStore } from 'pinia';
import { ApplicationSettings, Device } from '@nativescript/core';

export const useAppStore = defineStore('app', {
  state: () => ({
    // 设备信息
    deviceInfo: {
      model: '',
      os: '',
      osVersion: '',
      uuid: '',
    },
    // 主题设置
    theme: 'light', // 'light' | 'dark'
    // 语言设置
    language: 'zh-CN',
    // 应用版本
    appVersion: '1.0.0',
    // 是否首次启动
    isFirstLaunch: true,
    // 网络状态
    networkStatus: 'online', // 'online' | 'offline'
    // 加载状态
    loading: false,
  }),

  getters: {
    // 是否为暗色主题
    isDarkTheme: (state) => state.theme === 'dark',
    // 是否为在线状态
    isOnline: (state) => state.networkStatus === 'online',
  },

  actions: {
    // 初始化设备信息
    initDeviceInfo() {
      this.deviceInfo = {
        model: Device.model,
        os: Device.os,
        osVersion: Device.osVersion,
        uuid: Device.uuid,
      };
    },

    // 切换主题
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light';
    },

    // 设置主题
    setTheme(theme) {
      this.theme = theme;
    },

    // 设置语言
    setLanguage(language) {
      this.language = language;
    },

    // 设置网络状态
    setNetworkStatus(status) {
      this.networkStatus = status;
    },

    // 设置加载状态
    setLoading(loading) {
      this.loading = loading;
    },

    // 标记首次启动完成
    markFirstLaunchComplete() {
      this.isFirstLaunch = false;
    },

    // 重置应用状态
    resetAppState() {
      this.theme = 'light';
      this.language = 'zh-CN';
      this.loading = false;
    },
  },

  persist: {
    key: 'app-store',
    paths: ['theme', 'language', 'isFirstLaunch'],
  },
});