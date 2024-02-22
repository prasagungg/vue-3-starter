<script setup lang="ts">
import { LoginForm } from './components';
</script>

<template>
  <div class="grid grid-cols-[3fr_2fr]">
    <div class="bg-primary-soft h-screen p-5 grid place-content-center relative">
      <img
        src="@/assets/logo-pln-mobile.svg"
        alt="logo-pln"
        class="w-[75px] absolute top-4 left-4"
        fetchpriority="high"
      />
      <img src="@/assets/images/login.svg" alt="logo-login" fetchpriority="high" class="h-80" />
    </div>
    <div class="grid place-content-center max-w-xs mx-auto">
      <LoginForm />
    </div>
  </div>
</template>
