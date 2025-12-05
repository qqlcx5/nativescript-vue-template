<template>
  <Page>
    <ActionBar class="bg-blue-500">
      <Label text="Home" class="text-white font-bold text-lg" />
      <ActionItem
        @tap="logout"
        ios.position="right"
        android.position="popup"
      >
        <Label text="Logout" class="text-white" />
      </ActionItem>
    </ActionBar>

    <GridLayout rows="auto, *, auto" class="bg-gray-50">
      <!-- 用户信息卡片 -->
      <StackLayout row="0" class="m-4 p-4 bg-white rounded-lg shadow-sm">
        <Label
          :text="`Welcome, ${userDisplayName}!`"
          class="text-xl font-bold text-gray-800 mb-2"
        />
        <Label
          text="Here are your recent activities:"
          class="text-gray-600"
        />
      </StackLayout>

      <!-- 数据列表 -->
      <ScrollView row="1" class="mx-4">
        <StackLayout>
          <!-- 加载状态 -->
          <ActivityIndicator
            v-if="loading"
            busy="true"
            class="h-20 w-20"
          />

          <!-- 数据列表 -->
          <StackLayout v-else>
            <Label
              text="Products"
              class="text-lg font-bold text-gray-800 mb-3"
            />

            <StackLayout
              v-for="item in products"
              :key="item.id"
              class="mb-3 p-4 bg-white rounded-lg shadow-sm"
            >
              <GridLayout columns="*, auto">
                <StackLayout col="0">
                  <Label
                    :text="item.name"
                    class="text-lg font-semibold text-gray-800"
                  />
                  <Label
                    :text="item.description"
                    class="text-sm text-gray-600 mt-1"
                  />
                  <Label
                    :text="`$${item.price}`"
                    class="text-lg font-bold text-blue-500 mt-2"
                  />
                </StackLayout>
                <StackLayout col="1">
                  <Label
                    text="View"
                    class="text-blue-500 text-sm p-2"
                    @tap="viewProduct(item)"
                  />
                </StackLayout>
              </GridLayout>
            </StackLayout>

            <!-- 空状态 -->
            <Label
              v-if="products.length === 0 && !loading"
              text="No products found"
              class="text-center text-gray-500 mt-10"
            />
          </StackLayout>
        </StackLayout>
      </ScrollView>

      <!-- 底部操作按钮 -->
      <StackLayout row="2" class="m-4">
        <Button
          @tap="loadProducts"
          text="Refresh Products"
          class="bg-blue-500 text-white font-bold p-4 rounded-lg"
        />
      </StackLayout>
    </GridLayout>
  </Page>
</template>

<script setup>
import { ref, computed, onMounted } from 'nativescript-vue';
import { useUserStore } from '../store/modules/user';
import { productsApi } from '../services';
import { $navigateTo, $navigateBack } from 'nativescript-vue';
import Login from './Login.vue';

// 响应式数据
const products = ref([]);
const loading = ref(false);
const errorMessage = ref('');

// 使用用户存储
const userStore = useUserStore();

// 计算属性
const userDisplayName = computed(() => {
  return userStore.displayName;
});

// 获取产品列表
const loadProducts = async () => {
  loading.value = true;
  errorMessage.value = '';

  try {
    const response = await productsApi.getProducts({
      page: 1,
      limit: 10
    });

    // 模拟数据，实际项目中应该是 response.data
    products.value = [
      {
        id: 1,
        name: 'Premium Headphones',
        description: 'High-quality wireless headphones with noise cancellation',
        price: 299.99
      },
      {
        id: 2,
        name: 'Smart Watch',
        description: 'Advanced fitness tracking and smart notifications',
        price: 399.99
      },
      {
        id: 3,
        name: 'Wireless Speaker',
        description: 'Portable speaker with amazing sound quality',
        price: 149.99
      },
      {
        id: 4,
        name: 'Gaming Mouse',
        description: 'Precision gaming mouse with customizable RGB',
        price: 79.99
      }
    ];

    console.log('Products loaded successfully');
  } catch (error) {
    console.error('Failed to load products:', error);
    errorMessage.value = 'Failed to load products';

    // 如果返回401，说明token可能过期，跳转到登录页
    if (error.response && error.response.status === 401) {
      logout();
    }
  } finally {
    loading.value = false;
  }
};

// 查看产品详情
const viewProduct = (product) => {
  console.log('View product:', product);
  // 这里可以实现跳转到产品详情页的逻辑
};

// 退出登录
const logout = async () => {
  try {
    await userStore.logout();

    // 跳转到登录页
    $navigateTo(Login, {
      clearHistory: true,
      transition: {
        name: 'slideRight',
        duration: 300
      }
    });
  } catch (error) {
    console.error('Logout error:', error);
  }
};

// 页面加载时获取数据
onMounted(() => {
  loadProducts();
});
</script>

<style scoped>
.bg-gray-50 {
  background-color: #f9fafb;
}

.shadow-sm {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
</style>