<script lang="ts" setup>
import { SearchIcon } from 'lucide-vue-next';
import { Button } from '../ui/button';
</script>

<template>
  <Button
    variant="outline"
    class="relative h-8 w-full flex-1 md:flex-none justify-start rounded-md bg-muted/25 hover:bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-56 xl:w-64"
  >
    <SearchIcon class="absolute left-1.5 top-1/2 -translate-y-1/2" />
    <span class="ml-3">Cari...</span>
    <kbd
      class="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex"
    >
      <span class="text-xs">⌘</span>K
    </kbd>
  </Button>
</template>
