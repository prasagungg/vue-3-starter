<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue';
import { PaginationLast, type PaginationLastProps } from 'radix-vue';

import { Button } from '@/components/ui/button';
import { cn } from '@/utils';

const props = withDefaults(
  defineProps<PaginationLastProps & { class?: HTMLAttributes['class'] }>(),
  {
    asChild: true,
  }
);

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <PaginationLast v-bind="delegatedProps">
    <Button :class="cn('w-10 h-10 p-0', props.class)" variant="outline">
      <slot> Last </slot>
    </Button>
  </PaginationLast>
</template>
