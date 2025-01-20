<script lang="ts" setup>
import { useAuthStore } from '@/stores';
import { ArrowLeft, Loader2 } from 'lucide-vue-next';
import { useRoute, useRouter } from 'vue-router';
import { OtpForm } from '../components';
import { useResendOtp, useValidateOtp } from '../composables';
import { validateOtpDTO } from '../api';
import { toast } from '@/components/ui/toast';
import { useCountdown } from '@/composables';
import { onMounted } from 'vue';
import { Button } from '@/components/ui/button';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const onBack = () => {
  authStore.resetCredentials();
  router.push({ name: 'login', query: { redirect: route.query.redirect } });
};

const { handleValidateOtp, isLoading } = useValidateOtp();
const { formattedTime, timeLeft, start, reset } = useCountdown();

const { handleResendOtp, isLoading: isLoadingOtp } = useResendOtp();

const handleSubmit = (values: validateOtpDTO) => {
  const body = {
    otp: `${route.query.prefix}${values.otp}`,
  };

  handleValidateOtp(body, {
    onSuccess() {
      router.push({ name: 'dashboard' });

      toast({
        title: 'Anda berhasil masuk. Semoga harimu menyenangkan!',
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

const resendOtp = () => {
  handleResendOtp({
    onSuccess(data) {
      router.push({ name: 'otp', query: { prefix: data.data.prefixCode } });

      reset();

      toast({
        title: 'Kode OTP telah dikirim ke email Anda',
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

onMounted(() => {
  start();
});
</script>

<template>
  <div class="bg-white p-4 rounded-xl sm:w-[370px] z-20 relative shadow-2xl">
    <div class="flex justify-between mb-4">
      <div
        @click="onBack"
        class="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none cursor-pointer"
      >
        <ArrowLeft class="w-4 h-4" />
      </div>
    </div>
    <div class="text-center">
      <h3 class="text-3xl font-bold text-primary">Masukkan kode OTP</h3>
      <p class="text-sm mt-2">
        Harap masukkan kode tersebut dalam waktu 5 menit sebelum kadaluarsa.
      </p>
    </div>
    <OtpForm @submit="handleSubmit" :is-loading="isLoading" />
    <h4 class="text-center text-md mt-4" v-if="timeLeft > 0">
      Kirim ulang kode OTP pada {{ formattedTime }}
    </h4>
    <h4 class="text-center text-md mt-4" v-else>
      Tidak menerima kode?
      <Button variant="link" class="px-0" @click="resendOtp" :disabled="isLoadingOtp"
        ><Loader2 class="w-4 h-4 mr-2 animate-spin" v-if="isLoadingOtp" />
        <template v-else>Kirim Ulang</template>
      </Button>
    </h4>
  </div>
</template>
