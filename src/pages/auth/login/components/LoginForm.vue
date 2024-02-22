<script setup lang="ts">
import { useToggle } from '@vueuse/core';

import * as z from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';

import { toTypedSchema } from '@vee-validate/zod';

const loginFormSchema = toTypedSchema(
  z.object({
    email: z
      .string({
        required_error: 'Harap masukan email.',
      })
      .email('Email tidak valid'),
    password: z.string({
      required_error: 'Harap masukan password',
    }),
  })
);

const [showPassord, toggle] = useToggle(false);
</script>

<template>
  <div class="grid gap-3">
    <div>
      <h3 class="text-2xl font-bold">Bot Template</h3>
      <p class="text-sm text-neutral-grey-dark">
        Masukkan Email dan Password Anda untuk masuk ke Bot Template
      </p>
    </div>
    <Form :validation-schema="loginFormSchema" class="grid gap-3">
      <FormField v-slot="{ componentField, errors }" name="email">
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input
              type="email"
              placeholder="Email"
              v-bind="componentField"
              :isValid="errors.length === 0"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="password">
        <FormItem>
          <FormLabel>Passowrd</FormLabel>
          <FormControl>
            <div class="relative w-full max-w-sm items-center">
              <Input
                :type="showPassord ? 'text' : 'password'"
                placeholder="password"
                v-bind="componentField"
                class="pr-10"
              />
              <span
                @click="toggle(!showPassord)"
                class="absolute end-0 inset-y-0 flex items-center justify-center px-2 cursor-pointer"
              >
                <i class="icon text-neutral" :class="showPassord ? 'icon-eye-off' : 'icon-eye'"></i>
              </span>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </Form>
  </div>
</template>
