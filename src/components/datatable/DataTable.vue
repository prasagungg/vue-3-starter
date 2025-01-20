<script setup lang="ts">
import type { ColumnDef } from '@tanstack/vue-table';
import { FlexRender, getCoreRowModel, useVueTable } from '@tanstack/vue-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { cn } from '@/utils';
import { ExtendOptionTable } from '@/types';

interface DataTableProps {
  columns: ColumnDef<any, any>[];
  data: any[] | undefined;
  isLoading?: boolean;
  options?: ExtendOptionTable;
}

const props = defineProps<DataTableProps>();

const table = useVueTable({
  get data() {
    return props.data ?? [];
  },
  get columns() {
    return props.columns;
  },
  getCoreRowModel: getCoreRowModel(),
  ...props.options,
});
</script>

<template>
  <div class="rounded-md overflow-x-auto">
    <Table class="min-w-full divide-y divide-gray-200">
      <TableHeader class="bg-primary-soft">
        <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
          <TableHead
            v-for="header in headerGroup.headers"
            :key="header.id"
            :data-pinned="header.column.getIsPinned()"
            :class="
              cn(
                'px-6 py-3 text-left text-xs font-medium text-primary uppercase tracking-wider',
                { 'sticky bg-background/95': header.column.getIsPinned() },
                header.column.getIsPinned() === 'left' ? 'left-0' : 'right-0'
              )
            "
          >
            <FlexRender
              v-if="!header.isPlaceholder"
              :render="header.column.columnDef.header"
              :props="header.getContext()"
            />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-if="isLoading">
          <TableCell :colspan="props.columns.length" class="h-24 text-center">
            Tunggu sebentar...
          </TableCell>
        </TableRow>

        <template v-else>
          <template v-if="table.getRowModel().rows?.length">
            <TableRow
              v-for="row in table.getRowModel().rows"
              :key="row.id"
              :data-state="row.getIsSelected() && 'selected'"
              class="hover:bg-gray-50"
            >
              <TableCell
                v-for="cell in row.getVisibleCells()"
                :key="cell.id"
                class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
              >
                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
              </TableCell>
            </TableRow>
          </template>

          <TableRow v-else>
            <TableCell :colspan="props.columns.length" class="h-24 text-center">
              Tidak ada data
            </TableCell>
          </TableRow>
        </template>
      </TableBody>
    </Table>
  </div>
</template>
