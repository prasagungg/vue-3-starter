<script lang="ts" setup>
import { ProfileDropdown } from '@/components/profile-dropdown';
import { Search } from '@/components/search';
import { ThemeSwitch } from '@/components/theme-switch';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
</script>

<template>
  <header class="flex items-center gap-3 sm:gap-4 bg-background p-4 h-16">
    <SidebarTrigger variant="outline" class="scale-125 sm:scale-100" />
    <Separator orientation="vertical" class="h-6" />
    <Search />

    <div class="ml-auto flex items-center space-x-4">
      <ThemeSwitch />
      <ProfileDropdown />
    </div>
  </header>
</template>
