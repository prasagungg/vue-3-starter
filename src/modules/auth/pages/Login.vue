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
  <div class="bg-white p-4 rounded-xl sm:w-[370px] z-20 relative shadow-2xl">
    <div class="grid gap-2 text-center">
      <h3 class="text-3xl font-bold font-logo text-primary">Acquirer</h3>
      <LoginForm @submit="handleSubmit" :isLoading="isLoading" />
    </div>
  </div>
</template>
