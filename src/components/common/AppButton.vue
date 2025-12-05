<template>
  <Button
    :text="text"
    :isEnabled="!disabled"
    :class="buttonClass"
    @tap="$emit('tap', $event)"
  />
</template>

<script setup>
import { computed } from 'nativescript-vue';

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'primary', // primary, secondary, danger, success
    validator: (value) => ['primary', 'secondary', 'danger', 'success'].includes(value)
  },
  size: {
    type: String,
    default: 'medium', // small, medium, large
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  block: {
    type: Boolean,
    default: false
  },
  outline: {
    type: Boolean,
    default: false
  }
});

defineEmits(['tap']);

const buttonClass = computed(() => {
  const baseClass = 'font-bold rounded-lg transition-colors';
  const sizeClass = {
    small: 'px-3 py-2 text-sm',
    medium: 'px-4 py-3 text-base',
    large: 'px-6 py-4 text-lg'
  }[props.size];

  const typeClass = props.outline
    ? {
        primary: 'border-2 border-blue-500 text-blue-500 bg-transparent',
        secondary: 'border-2 border-gray-500 text-gray-500 bg-transparent',
        danger: 'border-2 border-red-500 text-red-500 bg-transparent',
        success: 'border-2 border-green-500 text-green-500 bg-transparent'
      }[props.type]
    : {
        primary: 'bg-blue-500 text-white',
        secondary: 'bg-gray-500 text-white',
        danger: 'bg-red-500 text-white',
        success: 'bg-green-500 text-white'
      }[props.type];

  const disabledClass = props.disabled ? 'opacity-50' : '';
  const blockClass = props.block ? 'w-full' : '';

  return [baseClass, sizeClass, typeClass, disabledClass, blockClass].join(' ');
});
</script>