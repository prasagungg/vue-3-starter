<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { LoginDTO } from '../api';
import { LoginForm } from '../components';
import { useLogin } from '../composables';
import { toast } from '@/components/ui/toast';

const { handleLogin, isLoading } = useLogin();

const route = useRoute();
const router = useRouter();

const handleRedirect = () => {
  const redirectPath = route.query.redirect as string;

  if (redirectPath) {
    router.push({ path: redirectPath });
  } else {
    router.push({ name: 'dashboard' });
  }
};

const redirectToOTP = (prefix: string) => {
  router.push({ name: 'otp', query: { prefix } });
};

const handleSubmit = (values: LoginDTO) => {
  handleLogin(values, {
    onSuccess(data) {
      const { require2FAVerify, prefixOTPCode } = data.data;

      if (require2FAVerify) {
        redirectToOTP(prefixOTPCode);
      } else {
        handleRedirect();
      }

      toast({
        title: require2FAVerify
          ? 'Kode OTP telah dikirim ke email Anda'
          : 'Anda berhasil masuk. Semoga harimu menyenangkan!',
        variant: 'success',
      });
    },
    onError(error) {
      toast({
        title: error.message,
        variant: 'error',
      });
    },
  });
};
</script>

<template>
  <div
    class="container relative grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0"
  >
    <div class="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
      <div class="absolute inset-0 bg-zinc-900" />
      <div class="relative z-20 flex items-center text-lg font-medium">BOT Template</div>

      <img
        src="@/assets/images/login.svg"
        class="relative m-auto h-[301px] w-[1000px]"
        alt="Vite"
      />
    </div>
    <div class="lg:p-8">
      <div class="mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[350px]">
        <div class="flex flex-col space-y-2 text-left">
          <h1 class="text-2xl font-semibold tracking-tight">Login</h1>
          <p class="text-sm text-muted-foreground">
            Enter your email and password below <br />
            to log into your account
          </p>
        </div>
        <LoginForm @submit="handleSubmit" :isLoading="isLoading" />
      </div>
    </div>
  </div>
</template>
