import axios from 'axios';
import { ApplicationSettings } from '@nativescript/core';

// 创建 axios 实例
const http = axios.create({
  baseURL: 'https://api.example.com', // 替换为你的 API 基础URL
  timeout: 10000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
http.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    const token = ApplicationSettings.getString('token', '');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // 可以在这里添加加载中提示
    // showLoading();
    
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    // hideLoading();
    return Promise.reject(error);
  }
);

// 响应拦截器
http.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    // hideLoading();
    
    // 只返回 response.data
    return response.data;
  },
  (error) => {
    // 对响应错误做点什么
    // hideLoading();
    
    if (error.response) {
      // 服务器返回了响应，但状态码不在 2xx 范围内
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          // 未授权，清除本地存储的token并跳转到登录页
          ApplicationSettings.remove('token');
          // 可以在这里添加导航到登录页的逻辑
          // navigateToLogin();
          console.error('未授权，请重新登录');
          break;
        case 403:
          console.error('拒绝访问');
          break;
        case 404:
          console.error('请求的资源不存在');
          break;
        case 500:
          console.error('服务器内部错误');
          break;
        default:
          console.error(`请求错误: ${status}`);
      }
      
      // 显示服务器返回的错误信息
      if (data && data.message) {
        console.error(data.message);
      }
    } else if (error.request) {
      // 请求已发出，但没有收到响应
      console.error('网络错误，请检查您的网络连接');
    } else {
      // 在设置请求时触发了错误
      console.error('请求配置错误:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default http;