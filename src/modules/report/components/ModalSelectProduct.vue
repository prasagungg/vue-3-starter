<script setup lang="ts">
import { ref } from 'vue';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form } from 'vee-validate';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import * as Yup from 'yup';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

import { Loader2 } from 'lucide-vue-next';
import { useExportServiceFee } from '../composables';
import { toast } from '@/components/ui/toast';

const props = defineProps<{
  row: {
    id: number;
    acquirerCode: string;
  };
}>();

const open = ref<boolean>(false);

const toggleModal = (value: boolean) => {
  open.value = value;
};

defineExpose({
  toggleModal,
});

const items = [
  {
    id: 'PREPAID',
    label: 'Prepaid',
  },
  {
    id: 'POSTPAID',
    label: 'Postpaid',
  },
  {
    id: 'NONTAGLIS',
    label: 'Nontaglis',
  },
];

const validationSchema = Yup.object({
  products: Yup.array().min(1, 'produk wajib diisi').required('produk wajib diisi'),
});

type ExportSelectProductFormValues = Yup.InferType<typeof validationSchema>;

const initialValues: ExportSelectProductFormValues = {
  products: [],
};

const { handleExportServiceFee, isLoading } = useExportServiceFee();

const onSubmit = (values: Record<string, any>) => {
  const body = values.products.map((item: string) => {
    return {
      id: props.row.id,
      acquirerCode: props.row.acquirerCode,
      jenisTransaksi: item,
    };
  });

  handleExportServiceFee(body, {
    onSuccess() {
      toggleModal(false);

      toast({
        title: 'Berhasil mengekspor data',
        variant: 'success',
      });
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
        <DialogTitle>Ekspor Biaya Layanan</DialogTitle>
        <DialogDescription> Melakukan ekspor berdasarkan produk</DialogDescription>
      </DialogHeader>

      <Form
        ref="formRef"
        :initial-values="initialValues"
        :validation-schema="validationSchema"
        @submit="onSubmit"
        class="mt-2 grid gap-2"
        v-slot="{ meta }"
      >
        <FormField name="products">
          <FormItem>
            <FormControl>
              <FormField
                v-for="item in items"
                v-slot="{ value, handleChange }"
                :key="item.id"
                name="products"
              >
                <FormItem :key="item.id" class="flex flex-row items-center space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      :checked="value.includes(item.id)"
                      @update:checked="
                        (checked) => {
                          if (Array.isArray(value)) {
                            handleChange(
                              checked ? [...value, item.id] : value.filter((id) => id !== item.id)
                            );
                          }
                        }
                      "
                    />
                  </FormControl>
                  <FormLabel class="font-normal text-neutral">
                    {{ item.label }}
                  </FormLabel>
                </FormItem>
              </FormField>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <Button class="w-full mt-4" :disabled="!meta.valid || isLoading">
          <Loader2 class="w-4 h-4 mr-2 animate-spin" v-if="isLoading" />Ekspor</Button
        >
      </Form>
    </DialogContent>
  </Dialog>
</template>
