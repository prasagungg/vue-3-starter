<script lang="ts" setup>
import { useVModel } from '@vueuse/core';
import { formatDate } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { HTMLAttributes, ref } from 'vue';
import { Button } from '../ui/button';
import { CalendarIcon } from 'lucide-vue-next';
import { Calendar } from '../ui/calendar';
import { cn } from '@/utils';

const props = defineProps<{
  defaultValue?: string;
  modelValue?: string;
  class?: HTMLAttributes['class'];
}>();

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string): void;
}>();

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
});

const open = ref<boolean>(false);
</script>
<template>
  <div>
    <Popover v-model:open="open">
      <PopoverTrigger as-child>
        <Button
          variant="outline"
          :class="
            cn(
              'border border-border bg-background ps-3 text-start font-normal text-neutral w-full',
              props.class
            )
          "
        >
          <span>{{ modelValue ? formatDate(modelValue, 'dd MMMM yyyy') : 'Pilih Tanggal' }}</span>
          <CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent class="w-auto p-0">
        <Calendar
          @update:model-value="
            (date) => {
              if (date) {
                modelValue = date.toString();
                open = false;
              }
            }
          "
        />
      </PopoverContent>
    </Popover>
  </div>
</template>
