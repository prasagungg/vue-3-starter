<script setup lang="ts">
import * as Yup from 'yup';

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';

const emits = defineEmits(['submit']);

defineProps<{
  isLoading: boolean;
}>();

const validationSchema = Yup.object({
  otp: Yup.string().required('Wajib diisi'),
});

type OtpFormValues = Yup.InferType<typeof validationSchema>;

const initialValues: OtpFormValues = {
  otp: '',
};

const onSubmit = (values: Record<string, any>) => {
  const body: OtpFormValues = {
    otp: values.otp,
  };

  emits('submit', body);
};
</script>

<template>
  <Form
    :initial-values="initialValues"
    :validation-schema="validationSchema"
    v-slot="{ meta }"
    @submit="onSubmit"
    class="mt-2 grid gap-2 text-left"
  >
    <FormField v-slot="{ componentField, errors }" name="otp">
      <FormItem>
        <FormControl>
          <div class="relative w-full items-center">
            <Input
              type="text"
              v-bind="componentField"
              class="pl-14"
              :isValid="errors.length === 0"
            />
            <span
              class="absolute start-0 inset-y-0 flex items-center justify-center px-2 cursor-pointer"
            >
              {{ `${$route.query.prefix} - ` }}
            </span>
          </div>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button class="w-full mt-3" type="submit" :disabled="!meta.valid || isLoading">
      <Loader2 class="w-4 h-4 mr-2 animate-spin" v-if="isLoading" />Kirim</Button
    >
  </Form>
</template>
