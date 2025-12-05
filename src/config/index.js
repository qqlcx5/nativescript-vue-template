/**
 * 应用配置文件
 * 包含所有全局配置项
 */

// API 配置
export const API_CONFIG = {
  // 基础URL，根据实际环境修改
  BASE_URL: 'https://api.example.com',
  
  // 请求超时时间（毫秒）
  TIMEOUT: 10000,
  
  // 重试次数
  RETRY_COUNT: 3,
  
  // 重试延迟（毫秒）
  RETRY_DELAY: 1000,
};

// 应用配置
export const APP_CONFIG = {
  // 应用名称
  APP_NAME: 'NativeScript Vue App',
  
  // 应用版本
  APP_VERSION: '1.0.0',
  
  // 是否开启调试模式
  DEBUG: __DEV__,
  
  // 默认语言
  DEFAULT_LANGUAGE: 'zh-CN',
  
  // 默认主题
  DEFAULT_THEME: 'light',
  
  // 日期格式
  DATE_FORMAT: 'YYYY-MM-DD',
  
  // 时间格式
  TIME_FORMAT: 'HH:mm:ss',
  
  // 日期时间格式
  DATETIME_FORMAT: 'YYYY-MM-DD HH:mm:ss',
};

// 存储配置
export const STORAGE_CONFIG = {
  // 存储前缀
  PREFIX: 'ns_vue_app_',
  
  // Token 存储键名
  TOKEN_KEY: 'token',
  
  // 用户信息存储键名
  USER_INFO_KEY: 'user_info',
  
  // 主题存储键名
  THEME_KEY: 'theme',
  
  // 语言存储键名
  LANGUAGE_KEY: 'language',
  
  // 首次启动存储键名
  FIRST_LAUNCH_KEY: 'first_launch',
};

// 路由配置
export const ROUTE_CONFIG = {
  // 登录页路由名称
  LOGIN_ROUTE: 'Login',
  
  // 首页路由名称
  HOME_ROUTE: 'Home',
  
  // 默认路由
  DEFAULT_ROUTE: 'Home',
  
  // 需要认证的路由
  AUTH_ROUTES: ['Home', 'Profile', 'Settings'],
};

// 网络配置
export const NETWORK_CONFIG = {
  // 网络超时时间（毫秒）
  NETWORK_TIMEOUT: 30000,
  
  // 最大重试次数
  MAX_RETRIES: 3,
  
  // 重试延迟（毫秒）
  RETRY_DELAY: 1000,
};

// UI 配置
export const UI_CONFIG = {
  // 默认按钮类型
  DEFAULT_BUTTON_TYPE: 'primary',
  
  // 默认按钮大小
  DEFAULT_BUTTON_SIZE: 'medium',
  
  // 默认加载文本
  DEFAULT_LOADING_TEXT: 'Loading...',
  
  // 默认错误提示持续时间（毫秒）
  ERROR_DURATION: 3000,
  
  // 默认成功提示持续时间（毫秒）
  SUCCESS_DURATION: 2000,
};

// 错误码配置
export const ERROR_CODES = {
  // 网络错误
  NETWORK_ERROR: 'NETWORK_ERROR',
  
  // 超时错误
  TIMEOUT_ERROR: 'TIMEOUT_ERROR',
  
  // 认证错误
  AUTH_ERROR: 'AUTH_ERROR',
  
  // 权限错误
  PERMISSION_ERROR: 'PERMISSION_ERROR',
  
  // 服务器错误
  SERVER_ERROR: 'SERVER_ERROR',
  
  // 参数错误
  PARAM_ERROR: 'PARAM_ERROR',
};

// 事件名称配置
export const EVENT_NAMES = {
  // 用户登录事件
  USER_LOGIN: 'user:login',
  
  // 用户登出事件
  USER_LOGOUT: 'user:logout',
  
  // 主题切换事件
  THEME_CHANGED: 'theme:changed',
  
  // 语言切换事件
  LANGUAGE_CHANGED: 'language:changed',
  
  // 网络状态变化事件
  NETWORK_STATUS_CHANGED: 'network:status_changed',
};

// 导出所有配置
export default {
  API_CONFIG,
  APP_CONFIG,
  STORAGE_CONFIG,
  ROUTE_CONFIG,
  NETWORK_CONFIG,
  UI_CONFIG,
  ERROR_CODES,
  EVENT_NAMES,
};