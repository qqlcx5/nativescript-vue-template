<template>
  <GridLayout 
    v-if="visible"
    :class="containerClass"
    :rows="loadingRows"
  >
    <!-- 全屏遮罩 -->
    <StackLayout 
      v-if="fullscreen"
      row="0"
      class="absolute inset-0 bg-black bg-opacity-50 z-50"
    />
    
    <!-- 加载内容 -->
    <StackLayout 
      row="1"
      class="items-center justify-center"
    >
      <ActivityIndicator 
        :busy="true"
        :class="indicatorClass"
      />
      <Label 
        v-if="text"
        :text="text"
        class="text-gray-600 text-center mt-2"
      />
    </StackLayout>
  </GridLayout>
</template>

<script setup>
import { computed } from 'nativescript-vue';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  text: {
    type: String,
    default: 'Loading...'
  },
  fullscreen: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'medium', // small, medium, large
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  overlay: {
    type: Boolean,
    default: false
  }
});

const containerClass = computed(() => {
  const baseClass = 'items-center justify-center';
  const fullscreenClass = props.fullscreen ? 'absolute inset-0 z-50' : '';
  const overlayClass = props.overlay ? 'bg-white bg-opacity-90 rounded-lg p-4' : '';
  
  return [baseClass, fullscreenClass, overlayClass].join(' ');
});

const loadingRows = computed(() => {
  return props.fullscreen ? '*, auto, *' : 'auto';
});

const indicatorClass = computed(() => {
  const sizeClass = {
    small: 'h-8 w-8',
    medium: 'h-12 w-12',
    large: 'h-16 w-16'
  }[props.size];
  
  return sizeClass;
});
</script>