import { useUserStore } from '@/store/modules/user';

// 路由配置
export const routes = [
  {
    name: 'Login',
    path: '/login',
    component: () => import('@/views/Login.vue'),
    meta: {
      title: '登录',
      requiresAuth: false,
      hideNavigation: true,
    },
  },
  {
    name: 'Home',
    path: '/',
    component: () => import('@/views/Home.vue'),
    meta: {
      title: '首页',
      requiresAuth: true,
      hideNavigation: false,
    },
  },
  {
    name: 'Profile',
    path: '/profile',
    component: () => import('@/views/Profile.vue'),
    meta: {
      title: '个人中心',
      requiresAuth: true,
      hideNavigation: false,
    },
  },
  {
    name: 'Settings',
    path: '/settings',
    component: () => import('@/views/Settings.vue'),
    meta: {
      title: '设置',
      requiresAuth: true,
      hideNavigation: false,
    },
  },
];

// 导航守卫
export const beforeEach = async (to, from, next) => {
  const userStore = useUserStore();

  // 检查用户是否已登录
  const isLoggedIn = userStore.isLoggedIn;

  // 如果路由需要认证但用户未登录，重定向到登录页
  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: 'Login' });
    return;
  }

  // 如果用户已登录但访问登录页，重定向到首页
  if (to.name === 'Login' && isLoggedIn) {
    next({ name: 'Home' });
    return;
  }

  // 继续导航
  next();
};

// 路由导航函数
export const navigateTo = (route, options = {}) => {
  // 这里可以根据实际需求实现导航逻辑
  // 例如使用 NativeScript 的 $navigateTo 方法
  console.log('导航到:', route, options);
};

// 返回上一页
export const goBack = () => {
  // 这里可以根据实际需求实现返回逻辑
  console.log('返回上一页');
};

// 获取当前路由
export const getCurrentRoute = () => {
  // 这里可以根据实际需求实现获取当前路由的逻辑
  console.log('获取当前路由');
  return null;
};