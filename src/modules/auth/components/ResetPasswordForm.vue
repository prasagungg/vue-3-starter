<script setup lang="ts">
import * as Yup from 'yup';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Loader2 } from 'lucide-vue-next';
import { useResetPassword } from '../composables';
import { toast } from '@/components/ui/toast';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const validationSchema = Yup.object({
  password: Yup.string()
    .min(8, 'Kata sandi harus memiliki minimal 8 karakter')
    .required('Kata sandi wajib diisi'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Konfirmasi kata sandi harus sama dengan kata sandi')
    .required('Konfirmasi kata sandi wajib diisi'),
});

type ResetPasswordValue = Yup.InferType<typeof validationSchema>;

const initialValues: ResetPasswordValue = {
  password: '',
  confirmPassword: '',
};

const route = useRoute();
const router = useRouter();

const { isLoading, handleResetPassword } = useResetPassword(route.params.token as string);

const onSubmit = (values: Record<string, any>) => {
  const body = {
    newPassword: values.password,
  };

  handleResetPassword(body, {
    onSuccess() {
      toast({
        variant: 'success',
        description: 'Your password has been successfully reset. You can now log in.',
      });

      router.push({
        name: 'login',
      });
    },
    onError(error) {
      toast({
        variant: 'error',
        description: error.message || 'Upps something when wrong',
      });
    },
  });
};

const showPassword = ref<boolean>(false);
const showConfirmPassword = ref<boolean>(false);
</script>

<template>
  <Form
    :initial-values="initialValues"
    :validation-schema="validationSchema"
    v-slot="{ meta }"
    @submit="onSubmit"
    class="mt-2 grid gap-2 text-left"
  >
    <FormField v-slot="{ componentField, errors }" name="password">
      <FormItem>
        <FormLabel>Kata sandi</FormLabel>

        <FormControl>
          <div class="relative w-full items-center">
            <Input
              :type="showPassword ? 'text' : 'password'"
              placeholder="Masukan kata sandi kamu"
              v-bind="componentField"
              class="pr-10"
              :isValid="errors.length === 0"
            />
            <span
              @click="showPassword = !showPassword"
              class="absolute end-0 inset-y-0 flex items-center justify-center px-2 cursor-pointer"
            >
              <Eye v-if="showPassword" />
              <EyeOff v-else />
            </span>
          </div>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField, errors }" name="confirmPassword">
      <FormItem>
        <FormLabel>Konfirmasi kata sandi</FormLabel>

        <FormControl>
          <div class="relative w-full items-center">
            <Input
              :type="showConfirmPassword ? 'text' : 'password'"
              placeholder="Masukan konfirmasi kata sandi kamu"
              v-bind="componentField"
              class="pr-10"
              :isValid="errors.length === 0"
            />
            <span
              @click="showConfirmPassword = !showConfirmPassword"
              class="absolute end-0 inset-y-0 flex items-center justify-center px-2 cursor-pointer"
            >
              <Eye v-if="showConfirmPassword" />
              <EyeOff v-else />
            </span>
          </div>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button class="w-full mt-3" type="submit" :disabled="!meta.valid || isLoading">
      <Loader2 class="w-4 h-4 mr-2 animate-spin" v-if="isLoading" />Simpan</Button
    >
  </Form>
</template>
