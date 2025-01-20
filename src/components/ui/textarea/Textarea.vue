<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue';
import { useVModel } from '@vueuse/core';
import { cn } from '@/utils';

const props = defineProps<{
  class?: HTMLAttributes['class'];
  defaultValue?: string | number;
  modelValue?: string | number;
  isValid?: boolean;
}>();

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void;
}>();

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
});

const isValid = computed(() => props.isValid);
</script>

<template>
  <textarea
    v-model="modelValue"
    :class="
      cn(
        'flex w-full rounded-lg bg-primary-greyish p-3 text-sm ring-offset-background  placeholder:text-neutral-grey-hard focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-primary focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 readonly:cursor-not-allowed readonly:opacity-50',
        props.class,
        { 'border border-alert': !isValid }
      )
    "
  />
</template>
