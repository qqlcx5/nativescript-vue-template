# NativeScript-Vue 项目模板

这是一个功能完善的 NativeScript-Vue 项目模板，包含了常用的功能和最佳实践。

## 功能特性

### 1. 项目结构
- **清晰的项目结构**：按照功能模块组织代码
- **组件化开发**：可复用的基础组件
- **模块化状态管理**：使用 Pinia 进行状态管理
- **HTTP 请求封装**：统一的 API 请求处理

### 2. HTTP 请求封装
- **统一配置**：基础 URL 和超时设置
- **请求拦截器**：自动添加认证 Token
- **响应拦截器**：统一的错误处理
- **API 模块化**：按业务模块组织 API

### 3. 状态管理
- **Pinia 状态管理**：现代化的状态管理方案
- **数据持久化**：自动保存关键数据到本地存储
- **模块化设计**：按业务模块划分状态

### 4. 路由管理
- **中心化路由配置**：统一的路由定义
- **导航守卫**：登录状态检查和权限控制
- **路由导航**：封装的导航方法

### 5. 通用工具函数
- **本地存储封装**：基于 ApplicationSettings 的存储工具
- **日期格式化**：灵活的日期格式化函数
- **节流防抖**：性能优化工具函数

### 6. UI 组件
- **通用按钮组件**：支持多种类型和尺寸
- **加载指示器**：全屏和局部加载状态
- **列表项组件**：通用的列表项展示
- **布局组件**：灵活的页面布局

## 项目结构

```
src/
├── assets/                    # 静态资源
├── components/               # 组件
│   ├── common/              # 通用组件
│   │   ├── AppButton.vue    # 按钮组件
│   │   ├── AppLoading.vue   # 加载组件
│   │   └── AppListItem.vue  # 列表项组件
│   └── layouts/             # 布局组件
│       └── AppLayout.vue    # 页面布局组件
├── config/                   # 配置文件
│   └── index.js             # 应用配置
├── router/                   # 路由配置
│   └── index.js             # 路由定义和导航守卫
├── services/                 # 服务层
│   ├── http.js              # HTTP 请求封装
│   ├── index.js             # 服务导出
│   └── modules/             # API 模块
│       ├── user.js          # 用户相关 API
│       └── products.js      # 产品相关 API
├── store/                    # 状态管理
│   ├── index.js             # Pinia 配置
│   └── modules/             # 状态模块
│       ├── app.js           # 应用状态
│       └── user.js          # 用户状态
├── utils/                    # 工具函数
│   ├── index.js             # 工具函数导出
│   ├── storage.js           # 本地存储封装
│   ├── dateFormatter.js     # 日期格式化
│   └── throttle.js          # 节流防抖函数
├── views/                    # 页面组件
│   ├── Login.vue            # 登录页面
│   └── Home.vue             # 首页
├── App.vue                   # 根组件
├── app.css                   # 全局样式
└── app.ts                    # 应用入口
```

## 使用说明

### 1. 安装依赖
```bash
npm install
```

### 2. 配置 API
修改 `src/config/index.js` 中的 API 配置：

```javascript
export const API_CONFIG = {
  BASE_URL: 'https://your-api-domain.com',
  TIMEOUT: 10000,
  // ...
};
```

### 3. 运行应用
```bash
# iOS
ns run ios

# Android
ns run android

# 预览模式
ns preview
```

### 4. 构建应用
```bash
# iOS 构建
ns build ios

# Android 构建
ns build android
```

## 开发指南

### 1. 添加新的 API 模块
1. 在 `src/services/modules/` 创建新的 API 文件
2. 在 `src/services/index.js` 中导出模块
3. 在组件中使用：`import { yourApi } from '@/services'`

### 2. 添加新的状态模块
1. 在 `src/store/modules/` 创建新的状态文件
2. 在组件中使用：`import { useYourStore } from '@/store/modules/your'`

### 3. 添加新的页面
1. 在 `src/views/` 创建新的页面组件
2. 在 `src/router/index.js` 中添加路由配置

### 4. 使用通用组件
```vue
<template>
  <!-- 按钮组件 -->
  <AppButton 
    text="Click me"
    type="primary"
    @tap="handleClick"
  />
  
  <!-- 加载组件 -->
  <AppLoading 
    :visible="loading"
    text="Loading..."
  />
  
  <!-- 列表项组件 -->
  <AppListItem 
    title="Item title"
    subtitle="Item subtitle"
    @tap="handleItemClick"
  />
</template>

<script setup>
import AppButton from '@/components/common/AppButton.vue';
import AppLoading from '@/components/common/AppLoading.vue';
import AppListItem from '@/components/common/AppListItem.vue';
</script>
```

## 最佳实践

### 1. 状态管理
- 使用 Pinia 进行状态管理
- 按业务模块划分状态
- 使用持久化插件保存关键数据

### 2. API 请求
- 使用封装的 HTTP 服务
- 按业务模块组织 API
- 统一处理错误和加载状态

### 3. 组件开发
- 保持组件的单一职责
- 使用组合式 API
- 合理使用 TypeScript 类型

### 4. 性能优化
- 使用节流防抖函数
- 合理使用计算属性
- 避免不必要的重新渲染

## 注意事项

1. **环境配置**：确保正确配置 API 基础地址
2. **权限管理**：根据实际需求调整导航守卫逻辑
3. **错误处理**：根据业务需求完善错误处理机制
4. **样式定制**：根据设计需求调整全局样式

## 更新日志

### v1.0.0
- 初始版本发布
- 完整的项目结构和功能
- 集成常用功能和最佳实践

## 许可证

MIT License