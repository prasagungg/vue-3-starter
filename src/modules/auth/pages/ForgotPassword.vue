<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { ArrowLeft } from 'lucide-vue-next';
import { ForgotPasswordForm } from '../components';

const router = useRouter();

const onBack = () => {
  router.push({ name: 'login' });
};
</script>

<template>
  <div class="bg-white p-4 rounded-xl sm:w-[370px] grid gap-3 z-20 relative shadow-2xl">
    <div class="flex justify-between">
      <div
        @click="onBack"
        class="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none cursor-pointer"
      >
        <ArrowLeft class="w-4 h-4" />
      </div>
    </div>

    <h3 class="text-3xl font-bold text-primary text-center">Lupa kata sandi</h3>
    <ForgotPasswordForm />
  </div>
</template>
