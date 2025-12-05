import http from '../http';

// 用户登录
export const login = (username, password) => {
  return http.post('/auth/login', {
    username,
    password,
  });
};

// 获取用户信息
export const getUserInfo = () => {
  return http.get('/user/info');
};

// 更新用户信息
export const updateUserInfo = (userInfo) => {
  return http.put('/user/info', userInfo);
};

// 用户注册
export const register = (userData) => {
  return http.post('/auth/register', userData);
};

// 退出登录
export const logout = () => {
  return http.post('/auth/logout');
};

// 刷新token
export const refreshToken = () => {
  return http.post('/auth/refresh-token');
};