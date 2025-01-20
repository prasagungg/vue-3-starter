<script lang="ts" setup>
import { provide, reactive, ref, toRefs } from 'vue';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';

import { ConfirmDialogProviderProps } from '.';
import { Loader2 } from 'lucide-vue-next';

const state = reactive<ConfirmDialogProviderProps>({
  show: false,
  title: 'Are you absolutely sure?',
  message:
    ' This action cannot be undone. This will permanently delete your account and remove your data from our servers.',
  onConfirm: () => {},
});

const isLoading = ref(false);

function openDialog({ title, message, onConfirm }: ConfirmDialogProviderProps) {
  state.title = title;
  state.message = message;

  state.onConfirm = async () => {
    if (!onConfirm) return;

    try {
      isLoading.value = true;
      await Promise.resolve(onConfirm());
    } catch (error) {
      console.error('Error during confirm action:', error);
    } finally {
      isLoading.value = false;
      state.show = false;
    }
  };

  state.show = true;
}

provide('openDialog', openDialog);

const { show, title, message, onConfirm } = toRefs(state);
</script>

<template>
  <slot />

  <AlertDialog v-model:open="show">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{{ title }}</AlertDialogTitle>
        <AlertDialogDescription> {{ message }}</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Batal</AlertDialogCancel>
        <AlertDialogAction @click="onConfirm"
          ><Loader2 class="w-4 h-4 mr-2 animate-spin" v-if="isLoading" />
          Lanjutkan</AlertDialogAction
        >
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
