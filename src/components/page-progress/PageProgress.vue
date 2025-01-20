<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

onMounted(() => {
  NProgress.configure({ showSpinner: false });

  const router = useRouter();

  const routeChangeStart = () => NProgress.start();
  const routeChangeEnd = () => NProgress.done();

  router.beforeEach((_to, _from, next) => {
    routeChangeStart();
    next();
  });

  router.afterEach(() => {
    routeChangeEnd();
  });

  onUnmounted(() => {
    router.beforeEach((_to, _from, next) => {
      routeChangeEnd();
      next();
    });
  });
});
</script>

<template></template>
<style>
#nprogress .bar {
  background: #6f5643;
  height: '1000px';
}
</style>
