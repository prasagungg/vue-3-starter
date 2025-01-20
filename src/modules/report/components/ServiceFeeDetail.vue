<script setup lang="ts">
import { Button } from '@/components/ui/button';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

defineProps<{
  countAll: string;
  prepaid: string;
  nontaglis: string;
  postpaid: string;
}>();
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="link" class="underline"> {{ countAll }} </Button>
    </PopoverTrigger>
    <PopoverContent class="w-80">
      <div class="grid gap-4">
        <div class="space-y-2">
          <h4 class="font-medium leading-none">Detail</h4>
          <p class="text-sm text-muted-foreground">Jumlah Detail Masing - Masing Produk</p>
        </div>
        <div class="grid gap-2">
          <div class="grid grid-cols-3 items-center gap-4">
            <h3 class="text-sm leading-none">Prepaid</h3>
            <h3 class="text-sm font-semibold col-span-2">{{ prepaid }}</h3>
          </div>
          <div class="grid grid-cols-3 items-center gap-4">
            <h3 class="text-sm leading-none">Postpaid</h3>
            <h3 class="text-sm font-semibold col-span-2">{{ postpaid }}</h3>
          </div>
          <div class="grid grid-cols-3 items-center gap-4">
            <h3 class="text-sm leading-none">Nontaglis</h3>
            <h3 class="text-sm font-semibold col-span-2">{{ nontaglis }}</h3>
          </div>
        </div>
      </div>
    </PopoverContent>
  </Popover>
</template>
