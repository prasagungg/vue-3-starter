<script setup lang="ts">
import * as Yup from 'yup';

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-vue-next';
import { useForgotPassword } from '../composables';
import { toast } from '@/components/ui/toast';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Email tidak valid')
    .required('Email wajib diisi')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Email harus memiliki format yang benar (misalnya: example@domain.com)'
    ),
});

type ForgotPasswordValue = Yup.InferType<typeof validationSchema>;

const initialValues: ForgotPasswordValue = {
  email: '',
};

const { isLoading, handleForgotPassword } = useForgotPassword();

const onSubmit = (values: Record<string, any>) => {
  const body: ForgotPasswordValue = {
    email: values.email,
  };

  handleForgotPassword(body, {
    onSuccess() {
      toast({
        variant: 'success',
        description: 'Email sudah terkirim!',
      });
    },
    onError(error) {
      toast({
        variant: 'error',
        description: error.message || 'Upps terjadi sesuatu yang salah',
      });
    },
  });
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
    <FormField v-slot="{ componentField, errors }" name="email">
      <FormItem>
        <FormControl>
          <div class="relative w-full items-center">
            <Input
              type="email"
              placeholder="Masukan email kamu"
              v-bind="componentField"
              :isValid="errors.length === 0"
            />
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
