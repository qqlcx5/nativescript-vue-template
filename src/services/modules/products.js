import http from '../http';

// 获取产品列表
export const getProducts = (params = {}) => {
  return http.get('/products', { params });
};

// 获取产品详情
export const getProductDetail = (id) => {
  return http.get(`/products/${id}`);
};

// 搜索产品
export const searchProducts = (keyword, params = {}) => {
  return http.get('/products/search', {
    params: {
      keyword,
      ...params,
    },
  });
};

// 获取产品分类
export const getProductCategories = () => {
  return http.get('/products/categories');
};

// 获取分类下的产品
export const getProductsByCategory = (categoryId, params = {}) => {
  return http.get(`/products/category/${categoryId}`, { params });
};