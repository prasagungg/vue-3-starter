<script setup lang="ts"></script>

<template>
  <div class="w-full h-screen bg-primary-soft relative">
    <div class="grid place-content-center h-full">
      <slot />
    </div>
    <div class="bg-auth-header w-full h-[70vh] absolute bottom-0 bg-no-repeat bg-cover"></div>
  </div>
</template>
