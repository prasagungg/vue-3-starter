<script setup lang="ts">
import { ConfirmDialogProvider } from './components/confirm-dialog';
import { PageProgress } from './components/page-progress';
import { Toaster } from './components/ui/toast';
import { useThemeStore } from './stores';

useThemeStore();
</script>

<template>
  <PageProgress />
  <ConfirmDialogProvider>
    <component :is="$route.meta.layout || 'div'">
      <router-view />
    </component>
  </ConfirmDialogProvider>
  <Toaster />
</template>
