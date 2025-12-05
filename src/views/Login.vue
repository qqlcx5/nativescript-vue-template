<template>
  <Page actionBarHidden="true">
    <GridLayout rows="*, auto, *" class="bg-gradient-to-br from-blue-500 to-purple-600">
      <!-- 背景装饰 -->
      <StackLayout row="0" class="mt-20">
        <Label 
          text="Welcome Back" 
          class="text-4xl text-white text-center font-bold mb-2"
        />
        <Label 
          text="Sign in to continue" 
          class="text-lg text-white text-center opacity-80"
        />
      </StackLayout>

      <!-- 登录表单 -->
      <StackLayout row="1" class="mx-8 p-8 bg-white rounded-3xl shadow-lg">
        <StackLayout class="mb-6">
          <Label text="Username" class="text-gray-600 text-sm mb-2" />
          <TextField 
            v-model="username"
            hint="Enter your username"
            class="p-4 bg-gray-100 rounded-lg text-gray-800"
            autocorrect="false"
            autocapitalizationType="none"
          />
        </StackLayout>

        <StackLayout class="mb-8">
          <Label text="Password" class="text-gray-600 text-sm mb-2" />
          <TextField 
            v-model="password"
            hint="Enter your password"
            secure="true"
            class="p-4 bg-gray-100 rounded-lg text-gray-800"
            autocorrect="false"
            autocapitalizationType="none"
          />
        </StackLayout>

        <!-- 登录按钮 -->
        <Button 
          @tap="handleLogin"
          :isEnabled="!loading"
          class="p-4 bg-blue-500 rounded-lg text-white font-bold text-lg"
        >
          <FormattedString>
            <Span :text="loading ? 'Logging in...' : 'Login'" />
          </FormattedString>
        </Button>

        <!-- 错误提示 -->
        <Label 
          v-if="errorMessage"
          :text="errorMessage"
          class="text-red-500 text-center mt-4 text-sm"
        />

        <!-- 注册链接 -->
        <Label 
          text="Don't have an account? Sign up"
          class="text-blue-500 text-center mt-6 text-sm underline"
          @tap="goToRegister"
        />
      </StackLayout>

      <!-- 底部空白 -->
      <StackLayout row="2" />
    </GridLayout>
  </Page>
</template>

<script setup>
import { ref } from 'nativescript-vue';
import { useUserStore } from '../store/modules/user';
import { $navigateTo } from 'nativescript-vue';
import Home from './Home.vue';

// 响应式数据
const username = ref('');
const password = ref('');
const loading = ref(false);
const errorMessage = ref('');

// 使用用户存储
const userStore = useUserStore();

// 登录处理
const handleLogin = async () => {
  // 重置错误信息
  errorMessage.value = '';
  
  // 验证输入
  if (!username.value.trim()) {
    errorMessage.value = 'Please enter username';
    return;
  }
  
  if (!password.value.trim()) {
    errorMessage.value = 'Please enter password';
    return;
  }
  
  // 开始加载
  loading.value = true;
  
  try {
    // 调用登录API
    const result = await userStore.login(username.value.trim(), password.value);
    
    if (result.success) {
      // 登录成功，跳转到首页
      $navigateTo(Home, {
        clearHistory: true,
        transition: {
          name: 'slideLeft',
          duration: 300
        }
      });
    } else {
      // 登录失败，显示错误信息
      errorMessage.value = result.message;
    }
  } catch (error) {
    console.error('Login error:', error);
    errorMessage.value = 'Login failed, please try again';
  } finally {
    loading.value = false;
  }
};

// 跳转到注册页面
const goToRegister = () => {
  // 这里可以实现注册页面的跳转逻辑
  console.log('Navigate to register page');
};
</script>

<style scoped>
.bg-gradient-to-br {
  background: linear-gradient(135deg, #3b82f6, #9333ea);
}

.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}
</style>