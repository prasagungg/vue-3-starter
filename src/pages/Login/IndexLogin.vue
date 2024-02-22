<script setup lang="ts"></script>

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
    <div class="grid place-content-center px-5">
      <h3 class="text-2xl font-bold">Bot Template</h3>
    </div>
  </div>
</template>
