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
import { ref } from 'vue';
import { Eye, EyeOff, Loader2 } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';

const emits = defineEmits(['submit']);

defineProps<{
  isLoading: boolean;
}>();

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Email tidak valid')
    .required('Email wajib diisi')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Email harus memiliki format yang benar (misalnya: example@domain.com)'
    ),
  password: Yup.string().required('Kata sandi wajib diisi'),
});

const showPassword = ref<boolean>(false);

type LoginFormValues = Yup.InferType<typeof validationSchema>;

const initialValues: LoginFormValues = {
  email: '',
  password: '',
};

const onSubmit = (values: Record<string, any>) => {
  const loginValues: LoginFormValues = {
    email: values.email,
    password: values.password,
  };

  emits('submit', loginValues);
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
        <FormLabel>Email</FormLabel>

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
    <RouterLink
      :to="{ name: 'forgot-password' }"
      class="grid place-content-end text-sm text-primary"
      >Lupa Password</RouterLink
    >

    <Button class="w-full mt-3" type="submit" :disabled="!meta.valid || isLoading">
      <Loader2 class="w-4 h-4 mr-2 animate-spin" v-if="isLoading" />Login</Button
    >
  </Form>
</template>
