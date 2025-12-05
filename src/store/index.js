import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';

// 创建 pinia 实例
const pinia = createPinia();

// 使用持久化插件
pinia.use(createPersistedState({
  storage: {
    getItem: (key) => {
      // 使用 NativeScript 的 ApplicationSettings 来存储数据
      return ApplicationSettings.getString(key, null);
    },
    setItem: (key, value) => {
      // 将值转换为字符串后存储
      ApplicationSettings.setString(key, value);
    },
    removeItem: (key) => {
      ApplicationSettings.remove(key);
    },
  },
}));

export default pinia;