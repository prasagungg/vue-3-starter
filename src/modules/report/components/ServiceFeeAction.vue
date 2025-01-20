<script lang="ts" setup>
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ServiceFee } from '../types';
import { Loader2, MoreHorizontal } from 'lucide-vue-next';
import { useDeleteServiceFee, useRecalculateServiceFee } from '../composables';
import { ConfirmDialogProviderProps } from '@/components/confirm-dialog';
import { computed, inject } from 'vue';
import { toast } from '@/components/ui/toast';

const openDialog =
  inject<({ title, message, onConfirm, show }: ConfirmDialogProviderProps) => void>('openDialog');

const handleRefetch = inject<() => void>('refetch');

if (!openDialog) {
  throw new Error('dialog not found. Ensure provide is correctly set up.');
}

const props = defineProps<{
  row: ServiceFee;
}>();

const { handleDeleteFee, isLoading: isLoadingDelete } = useDeleteServiceFee();

const openDialogDelete = () => {
  openDialog({
    show: true,
    title: 'Apakah Anda Yakin Ingin Mengahapus?',
    message:
      'Anda akan menghapus data ini secara permanen. Tindakan ini tidak dapat dibatalkan. Apakah Anda yakin ingin melanjutkan?',
    onConfirm: () => {
      handleDeleteFee(
        {
          id: props.row.id,
        },
        {
          onSuccess() {
            toast({
              title: 'Berhasil menghapus laporan biaya layanan',
              variant: 'success',
            });

            if (handleRefetch) {
              handleRefetch();
            }
          },
          onError(error) {
            toast({
              title: error.message || 'Upss terjadi kesalahan',
              variant: 'error',
            });
          },
        }
      );
    },
  });
};

const { handleRecalculate, isLoading: isLoadingRecalculate } = useRecalculateServiceFee();

const openDialogRecalculate = () => {
  openDialog({
    show: true,
    title: 'Apakah Anda Yakin Ingin Menghitung Ulang?',
    message:
      'Anda akan menghitung ulang data ini. Tindakan ini tidak dapat dibatalkan. Apakah Anda yakin ingin melanjutkan?',
    onConfirm: () => {
      handleRecalculate(
        {
          id: props.row.id,
        },
        {
          onSuccess() {
            toast({
              title: 'Berhasil menghitung ulang laporan biaya layanan',
              variant: 'success',
            });

            if (handleRefetch) {
              handleRefetch();
            }
          },
          onError(error) {
            toast({
              title: error.message || 'Upss terjadi kesalahan',
              variant: 'error',
            });
          },
        }
      );
    },
  });
};

const openModalSelectProduct =
  inject<(value: { id: number; acquirerCode: string }) => void>('openModalSelectProduct');

const openModal = () => {
  if (openModalSelectProduct) {
    openModalSelectProduct({ id: props.row.id, acquirerCode: props.row.acquirerCode });
  }
};

const isLoading = computed(() => isLoadingDelete.value || isLoadingRecalculate.value);
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        variant="ghost"
        class="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        :disabled="isLoading"
      >
        <Loader2 class="w-4 h-4 animate-spin" v-if="isLoading" />
        <MoreHorizontal v-else />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-[180px]">
      <DropdownMenuItem @click="openDialogDelete"> Hapus</DropdownMenuItem>
      <DropdownMenuItem @click="openDialogRecalculate"> Hitung Ulang</DropdownMenuItem>
      <DropdownMenuItem @click="openModal"> Ekspor</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
