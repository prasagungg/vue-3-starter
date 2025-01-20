import { TableOptions } from '@tanstack/vue-table';

export type ExtendOptionTable = Omit<TableOptions<any>, 'data' | 'columns' | 'getCoreRowModel'>;
