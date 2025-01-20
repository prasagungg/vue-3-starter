<script setup lang="ts">
import { Pagination, PaginationNext, PaginationPrev } from '../ui/pagination';
import { useVModel } from '@vueuse/core';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { watch } from 'vue';

interface DataTablePaginationProps {
  total: number;
  size: string;
  page: number;
}
const props = defineProps<DataTablePaginationProps>();

const emits = defineEmits<{
  (e: 'update:size', payload: string): void;
  (e: 'update:page', payload: number): void;
}>();

const size = useVModel(props, 'size', emits, {
  passive: true,
});

const page = useVModel(props, 'page', emits, {
  passive: true,
});

watch(
  () => size.value,
  () => {
    page.value = 1;
  }
);
</script>

<template>
  <Pagination
    v-model:page="page"
    :total="total"
    :sibling-count="1"
    :itemsPerPage="Number(size)"
    show-edges
    :default-page="1"
    class="mt-4 flex md:items-center justify-start md:justify-between flex-col md:flex-row px-2 gap-2"
  >
    <p class="text-sm text-neutral-grey-dark">
      Menampilkan {{ Math.min(page * Number(size || 5), total) }} dari {{ total }} Data
    </p>
    <div class="flex justify-between items-center gap-3">
      <Select v-model="size">
        <SelectTrigger class="h-8 rounded-lg bg-primary-greyish border-none w-[100px] md:w-full">
          <SelectValue :placeholder="`${size}`" />
        </SelectTrigger>
        <SelectContent side="top">
          <SelectItem
            v-for="pageSize in [10, 20, 30, 40, 50]"
            :key="pageSize"
            :value="`${pageSize}`"
          >
            {{ pageSize }}
          </SelectItem>
        </SelectContent>
      </Select>
      <div class="h-8 rounded-lg bg-primary-greyish px-3 py-3 text-sm flex items-center">
        <div class="flex w-[100px] items-center justify-center">
          {{ (page - 1) * Number(size) + 1 }} - {{ Math.min(page * Number(size), total) }} of
          {{ total }}
        </div>
        <PaginationPrev />
        <PaginationNext />
      </div>
    </div>
  </Pagination>
</template>
