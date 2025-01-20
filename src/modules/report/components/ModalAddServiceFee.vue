<script setup lang="ts">
import { inject, ref } from 'vue';

import * as Yup from 'yup';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { SelectDate } from '@/components/select-date';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-vue-next';
import { useAddServiceFee } from '../composables';
import { toast } from '@/components/ui/toast';

const open = ref<boolean>(false);

const toggleModal = (value: boolean) => {
  open.value = value;
};

defineExpose({
  toggleModal,
});

const validationSchema = Yup.object({
  periodeAwal: Yup.string().required('Periode Awal wajib diisi'),
  periodeAkhir: Yup.string().required('Periode Akhir wajib diisi'),
});

type AddServiceFeeFormValues = Yup.InferType<typeof validationSchema>;

const initialValues: AddServiceFeeFormValues = {
  periodeAwal: '',
  periodeAkhir: '',
};

const { handleAddFee, isLoading } = useAddServiceFee();

const handleRefetch = inject<() => void>('refetch');

const formRef = ref<InstanceType<typeof Form> | null>(null);

const onSubmit = (values: Record<string, any>) => {
  const addServiceFeeValues: AddServiceFeeFormValues = {
    periodeAwal: values.periodeAwal,
    periodeAkhir: values.periodeAkhir,
  };

  handleAddFee(addServiceFeeValues, {
    onSuccess() {
      toast({
        title: 'Berhasil menambahkan laporan biaya layanan',
        variant: 'success',
      });

      if (handleRefetch) {
        handleRefetch();
      }

      toggleModal(false);

      if (formRef.value) {
        formRef.value.resetForm();
      }
    },
    onError(error) {
      toast({
        title: error.message || 'Upss terjadi kesalahan',
        variant: 'error',
      });
    },
  });
};
</script>

<template>
  <Dialog v-model:open="open">
    <DialogContent class="max-w-md md:max-w-lg grid gap-3">
      <DialogHeader>
        <DialogTitle>Tampah Laporan biaya layanan</DialogTitle>
        <DialogDescription> Menambahkan laporan biaya layanan</DialogDescription>
        <Form
          ref="formRef"
          :initial-values="initialValues"
          :validation-schema="validationSchema"
          v-slot="{ meta }"
          @submit="onSubmit"
          class="mt-2 grid gap-2"
        >
          <FormField v-slot="{ componentField }" name="periodeAwal">
            <FormItem>
              <FormLabel>Tanggal Awal</FormLabel>

              <FormControl>
                <SelectDate v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="periodeAkhir">
            <FormItem>
              <FormLabel>Tanggal Akhir</FormLabel>

              <FormControl>
                <SelectDate v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <Button class="w-full mt-3" type="submit" :disabled="!meta.valid || isLoading">
            <Loader2 class="w-4 h-4 mr-2 animate-spin" v-if="isLoading" />Simpan</Button
          >
        </Form>
      </DialogHeader>
    </DialogContent>
  </Dialog>
</template>
