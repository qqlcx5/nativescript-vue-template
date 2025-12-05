# Nativescript-Vue Template

这是一个基于 Nativescript-Vue3 的空白模板项目，用于快速启动 Nativescript 移动应用开发。

## 技术栈

- **Nativescript Core**: ~8.9.1
- **Nativescript-Vue**: 3.0.2
- **TypeScript**: ^5.8.3
- **TailwindCSS**: ^4.1.3
- **Webpack**: ~5.0.24

## 项目结构

```
├── src/
│   ├── components/
│   │   ├── Home.vue       # 主页组件，包含计数器功能
│   │   └── Details.vue     # 详情页组件，包含列表展示
│   ├── app.css             # 全局样式
│   └── app.ts              # 应用入口
├── types/                  # TypeScript类型定义
├── package.json            # 项目配置和依赖
├── tsconfig.json           # TypeScript配置
└── webpack.config.js       # Webpack配置
```

## 功能说明

### 主页 (Home.vue)
- 显示一个自动递增的计数器
- 点击消息文本可以在控制台输出日志
- 点击"View Details"按钮可以跳转到详情页

### 详情页 (Details.vue)
- 展示一个包含1000个项目的列表
- 点击顶部"Go Back"文字可以返回主页
- 列表项包含文本和右侧的白色圆形标记

## 安装和运行

要使用 NativeScript-Vue，你的系统需要设置成能够编译和运行原生应用。

详细指南可见 NativeScript 文档：[环境设置](https://docs.nativescript.org/setup/)

1. 安装 Node.JS
2. 安装 JDK
3. 安装 Android Studio

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
ns preview
```


## 开发命令

- `ns preview`：启动预览服务器
- `ns build`：构建应用
- `ns run android`：在Android设备上运行
- `ns run ios`：在iOS设备上运行

## 许可证

MIT License