<template>
  <Page :actionBarHidden="hideNavigation">
    <!-- 自定义导航栏 -->
    <FlexboxLayout 
      v-if="!hideNavigation && showCustomNav"
      class="p-4 bg-blue-500 items-center"
    >
      <ContentView 
        v-if="showBackButton"
        @tap="goBack"
        class="mr-4"
      >
        <Label text="‹" class="text-white text-2xl font-bold" />
      </ContentView>
      
      <Label 
        :text="title"
        class="text-white font-bold text-lg flex-1"
      />
      
      <ContentView 
        v-if="$slots.actions"
        @tap="$emit('action')"
      >
        <slot name="actions" />
      </ContentView>
    </FlexboxLayout>
    
    <!-- 主要内容 -->
    <ScrollView v-if="scrollable" class="flex-1">
      <StackLayout class="p-4">
        <slot />
      </StackLayout>
    </ScrollView>
    
    <StackLayout v-else class="flex-1">
      <slot />
    </StackLayout>
    
    <!-- 加载指示器 -->
    <AppLoading 
      :visible="loading"
      :fullscreen="true"
      text="Loading..."
    />
  </Page>
</template>

<script setup>
import { $navigateBack } from 'nativescript-vue';
import AppLoading from '../common/AppLoading.vue';

const props = defineProps({
  title: {
    type: String,
    default: 'App'
  },
  hideNavigation: {
    type: Boolean,
    default: false
  },
  showCustomNav: {
    type: Boolean,
    default: true
  },
  showBackButton: {
    type: Boolean,
    default: true
  },
  scrollable: {
    type: Boolean,
    default: true
  },
  loading: {
    type: Boolean,
    default: false
  }
});

defineEmits(['action']);

const goBack = () => {
  $navigateBack();
};
</script>