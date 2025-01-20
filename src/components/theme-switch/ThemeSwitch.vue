<script lang="ts" setup>
import { MoonIcon, SunIcon } from 'lucide-vue-next';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
</script>
<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" size="icon" class="scale-95 rounded-full">
        <SunIcon
          class="size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        />
        <MoonIcon
          class="absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        />
        <span class="sr-only">Toggle theme</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem> Light </DropdownMenuItem>
      <DropdownMenuItem> Dark </DropdownMenuItem>
      <DropdownMenuItem> System </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
