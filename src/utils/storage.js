import { ApplicationSettings } from '@nativescript/core';

/**
 * 本地存储工具函数
 * 基于 NativeScript 的 ApplicationSettings 模块
 */

// 存储数据
export const setItem = (key, value) => {
  try {
    // 将值转换为字符串存储
    const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
    ApplicationSettings.setString(key, stringValue);
    return true;
  } catch (error) {
    console.error('存储数据失败:', error);
    return false;
  }
};

// 获取数据
export const getItem = (key, defaultValue = null) => {
  try {
    const value = ApplicationSettings.getString(key, defaultValue);

    // 尝试解析JSON，如果失败则返回原始字符串
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  } catch (error) {
    console.error('获取数据失败:', error);
    return defaultValue;
  }
};

// 删除数据
export const removeItem = (key) => {
  try {
    ApplicationSettings.remove(key);
    return true;
  } catch (error) {
    console.error('删除数据失败:', error);
    return false;
  }
};

// 清空所有数据
export const clear = () => {
  try {
    ApplicationSettings.clear();
    return true;
  } catch (error) {
    console.error('清空数据失败:', error);
    return false;
  }
};

// 检查键是否存在
export const hasKey = (key) => {
  try {
    return ApplicationSettings.hasKey(key);
  } catch (error) {
    console.error('检查键是否存在失败:', error);
    return false;
  }
};

// 获取所有键
export const getAllKeys = () => {
  try {
    return ApplicationSettings.getAllKeys();
  } catch (error) {
    console.error('获取所有键失败:', error);
    return [];
  }
};