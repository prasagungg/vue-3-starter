<script setup lang="ts">
import { Calendar as CalendarIcon, X as XIcon } from 'lucide-vue-next';
import { RangeCalendar } from '@/components/ui/range-calendar';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn, formatDate } from '@/utils';
import { useVModels } from '@vueuse/core';

import { CalendarDate } from '@internationalized/date';
import { ref } from 'vue';

const props = withDefaults(
  defineProps<{
    startDate: string;
    endDate: string;
    width?: string;
  }>(),
  {
    width: 'w-[280px]',
  }
);

const emits = defineEmits<{
  (e: 'update:startDate', payload: string): void;
  (e: 'update:endDate', payload: string): void;
}>();

const { startDate, endDate } = useVModels(props, emits);

const clearDates = () => {
  startDate.value = '';
  endDate.value = '';
};

const now = new Date();
const year = now.getFullYear();
const month = now.getMonth() + 1;
const day = now.getDate();
const today = new CalendarDate(year, month, day);

const open = ref<boolean>(false);
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="
          cn(
            width,
            'border-neutral-grey-medium text-neutral  justify-start text-left font-normal',
            !(startDate && endDate) && 'text-muted-foreground'
          )
        "
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        <template v-if="startDate">
          <template v-if="endDate">
            {{ formatDate(startDate, 'dd MMM yyyy') }}
            -
            {{ formatDate(endDate, 'dd MMM yyyy') }}
          </template>

          <template v-else>
            {{ formatDate(startDate, 'dd MMM yyyy') }}
          </template>
        </template>
        <template v-else> Pilih Tanggal </template>
        <XIcon
          v-if="startDate || endDate"
          class="ml-auto h-4 w-4 text-muted-foreground cursor-pointer"
          @click.stop="clearDates"
        />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <RangeCalendar
        initial-focus
        :number-of-months="2"
        locale="id"
        :max-value="today"
        :preventDeselect="true"
        @update:model-value="
          (date) => {
            if (date.start) {
              startDate = date.start.toString();
            }

            if (date.end) {
              endDate = date.end.toString();
            }

            open = false;
          }
        "
      />
    </PopoverContent>
  </Popover>
</template>
