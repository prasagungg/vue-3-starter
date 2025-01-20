<script lang="ts" setup>
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/toast';
import axios from 'axios';
import { Loader2 } from 'lucide-vue-next';
import { ref } from 'vue';

const nomorMeter = ref<string>('');
const isLoading = ref<boolean>(false);
const responseData = ref<any>(null);

const onClick = async () => {
  isLoading.value = true;

  const body = { customerId: nomorMeter.value, terminalId: 'bapak rendi ganteng banget sekali' };
  const appSource = 'PAG';
  const timestamp = new Date().toISOString();
  const dummySignature = 'dummy-signature';

  try {
    const response = await axios.post(
      'https://dev-single-switching.beyondkwh.id/solo-gateway/v1.0/prepaid/inquiry',
      body,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-PARTNER-ID': '0339ce6e-5aa9-4918-ba5f-400c9a9ee976',
          'X-APP-SOURCE': appSource,
          'X-ACQUIRER-CODE': 'ICPY',
          'X-TIMESTAMP': timestamp,
          'X-SIGNATURE': dummySignature,
        },
      }
    );

    responseData.value = response.data;
  } catch (error: any) {
    toast({ variant: 'error', title: error.message || 'upss terjadi kesalahan' });
  } finally {
    isLoading.value = false;
  }
};
</script>
<template>
  <div class="bg-white p-4 rounded-xl sm:w-[370px] z-20 relative shadow-2xl">
    <div class="grid gap-2">
      <h3 class="text-3xl font-bold font-logo text-primary">Inquiry</h3>
      <div class="grid gap-4">
        <div>
          <Input v-model="nomorMeter" placeholder="nomor meter" />
        </div>
        <Button class="w-full mt-3" :disabled="isLoading" @click="onClick">
          <Loader2 class="w-4 h-4 mr-2 animate-spin" v-if="isLoading" />Inquiry</Button
        >

        {{ responseData }}
      </div>
    </div>
  </div>
</template>
