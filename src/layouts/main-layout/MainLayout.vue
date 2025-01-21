<script lang="ts" setup>
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppHeader, AppSidebar } from '.';
import { CommandMenu } from '@/components/command-menu';
import { useSeachStore } from '@/stores';
import { onMounted, onUnmounted } from 'vue';

const searchStore = useSeachStore();

const handleKeydown = (event: KeyboardEvent) => {
  if (event.ctrlKey && event.key === 'k') {
    event.preventDefault();
    searchStore.open = !searchStore.open;
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <div
      id="content"
      class="max-w-full w-full ml-auto peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)] peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))] transition-[width] ease-linear duration-200 h-svh flex flex-col group-data-[scroll-locked=1]/body:h-full group-data-[scroll-locked=1]/body:has-[main.fixed-main]:h-svh"
    >
      <AppHeader />
      <main class="peer-[.header-fixed]/header:mt-16 px-4 py-6">
        <slot />
      </main>
    </div>
    <CommandMenu v-model:open="searchStore.open" />
  </SidebarProvider>
</template>
