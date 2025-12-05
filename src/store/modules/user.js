import { defineStore } from 'pinia';
import { ApplicationSettings } from '@nativescript/core';
import { userApi } from '../../services';

export const useUserStore = defineStore('user', {
  state: () => ({
    // 用户信息
    userInfo: {
      id: null,
      username: '',
      email: '',
      avatar: '',
      nickname: '',
      phone: '',
      roles: [],
    },
    // 登录状态
    isLoggedIn: false,
    // 认证令牌
    token: '',
    // 刷新令牌
    refreshToken: '',
    // 权限列表
    permissions: [],
  }),

  getters: {
    // 获取用户显示名称
    displayName: (state) => {
      return state.userInfo.nickname || state.userInfo.username || '未知用户';
    },
    // 是否为管理员
    isAdmin: (state) => {
      return state.userInfo.roles.includes('admin');
    },
    // 检查是否有特定权限
    hasPermission: (state) => (permission) => {
      return state.permissions.includes(permission);
    },
  },

  actions: {
    // 登录
    async login(username, password) {
      try {
        const response = await userApi.login(username, password);

        // 保存令牌
        this.token = response.token;
        this.refreshToken = response.refreshToken || '';

        // 保存到本地存储
        ApplicationSettings.setString('token', this.token);
        if (this.refreshToken) {
          ApplicationSettings.setString('refreshToken', this.refreshToken);
        }

        // 获取用户信息
        await this.fetchUserInfo();

        this.isLoggedIn = true;

        return { success: true, message: '登录成功' };
      } catch (error) {
        console.error('登录失败:', error);
        return {
          success: false,
          message: error.message || '登录失败，请检查用户名和密码'
        };
      }
    },

    // 获取用户信息
    async fetchUserInfo() {
      try {
        const userInfo = await userApi.getUserInfo();
        this.userInfo = userInfo;

        // 这里可以根据实际API响应设置权限
        this.permissions = userInfo.permissions || [];

        return userInfo;
      } catch (error) {
        console.error('获取用户信息失败:', error);
        throw error;
      }
    },

    // 更新用户信息
    async updateUserInfo(updatedUserInfo) {
      try {
        const response = await userApi.updateUserInfo(updatedUserInfo);
        this.userInfo = { ...this.userInfo, ...response };
        return { success: true, data: response };
      } catch (error) {
        console.error('更新用户信息失败:', error);
        return { success: false, message: error.message || '更新用户信息失败' };
      }
    },

    // 退出登录
    async logout() {
      try {
        // 调用退出登录API
        await userApi.logout();
      } catch (error) {
        console.error('退出登录API调用失败:', error);
      } finally {
        // 清除本地状态
        this.clearUserData();
      }
    },

    // 刷新令牌
    async refreshUserToken() {
      try {
        const response = await userApi.refreshToken();
        this.token = response.token;
        this.refreshToken = response.refreshToken || '';

        // 更新本地存储
        ApplicationSettings.setString('token', this.token);
        if (this.refreshToken) {
          ApplicationSettings.setString('refreshToken', this.refreshToken);
        }

        return true;
      } catch (error) {
        console.error('刷新令牌失败:', error);
        // 刷新失败，清除用户数据
        this.clearUserData();
        return false;
      }
    },

    // 清除用户数据
    clearUserData() {
      this.userInfo = {
        id: null,
        username: '',
        email: '',
        avatar: '',
        nickname: '',
        phone: '',
        roles: [],
      };
      this.isLoggedIn = false;
      this.token = '';
      this.refreshToken = '';
      this.permissions = [];

      // 清除本地存储
      ApplicationSettings.remove('token');
      ApplicationSettings.remove('refreshToken');
    },

    // 检查登录状态
    checkLoginStatus() {
      const token = ApplicationSettings.getString('token', '');
      if (token) {
        this.token = token;
        this.isLoggedIn = true;
        // 可以在这里获取用户信息
        this.fetchUserInfo().catch(() => {
          // 获取用户信息失败，可能token已过期
          this.clearUserData();
        });
      }
    },
  },

  persist: {
    key: 'user-store',
    paths: ['userInfo', 'isLoggedIn', 'token', 'refreshToken', 'permissions'],
  },
});