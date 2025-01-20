<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue';
import { PaginationNext, type PaginationNextProps } from 'radix-vue';
import { ChevronRight } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { cn } from '@/utils';

const props = withDefaults(
  defineProps<PaginationNextProps & { class?: HTMLAttributes['class'] }>(),
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
  <PaginationNext v-bind="delegatedProps">
    <Button :class="cn('w-6 md:w-5 h-6 md:h-5 p-0', props.class)" variant="ghost">
      <slot>
        <ChevronRight class="h-6 md:h-4 w-6 md:w-4" />
      </slot>
    </Button>
  </PaginationNext>
</template>
