<template>
  <GridLayout 
    columns="auto, *, auto"
    class="p-4 bg-white border-b border-gray-100"
    @tap="$emit('tap', $event)"
  >
    <!-- 左侧图标 -->
    <ContentView 
      v-if="$slots.icon || icon"
      col="0"
      class="mr-3"
    >
      <slot name="icon">
        <Label 
          v-if="icon"
          :text="icon"
          class="text-2xl"
        />
      </slot>
    </ContentView>
    
    <!-- 中间内容 -->
    <StackLayout col="1">
      <slot>
        <Label 
          :text="title"
          class="text-base font-semibold text-gray-800"
        />
        <Label 
          v-if="subtitle"
          :text="subtitle"
          class="text-sm text-gray-600 mt-1"
        />
        <Label 
          v-if="description"
          :text="description"
          class="text-xs text-gray-500 mt-1"
        />
      </slot>
    </StackLayout>
    
    <!-- 右侧内容 -->
    <StackLayout 
      v-if="$slots.right || rightText || showArrow"
      col="2"
      class="items-end"
    >
      <slot name="right">
        <Label 
          v-if="rightText"
          :text="rightText"
          class="text-sm text-gray-500"
        />
        <Label 
          v-if="showArrow"
          text="›"
          class="text-xl text-gray-400 ml-2"
        />
      </slot>
    </StackLayout>
  </GridLayout>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  rightText: {
    type: String,
    default: ''
  },
  showArrow: {
    type: Boolean,
    default: true
  }
});

defineEmits(['tap']);
</script>