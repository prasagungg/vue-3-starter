<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next';
import { Button } from '../ui/button';
import { RouteParamsRaw } from 'vue-router';

type Breadcrumb = {
  name: string;
  routeName?: string;
  params?: RouteParamsRaw;
};

type Props = {
  title: string;
  breadcrumbs?: Breadcrumb[];
  backButton?: boolean;
};

withDefaults(defineProps<Props>(), {
  backButton: false,
});
</script>

<template>
  <nav aria-label="breadcrumb" class="my-4">
    <div class="flex items-center">
      <slot name="icon"></slot>
      <Button variant="ghost" size="icon" v-if="backButton" @click="$router.back()">
        <ArrowLeft class="text-neutral w-5 h-5 md:w-7 md:h-7" />
      </Button>
      <h1 class="font-semibold md:text-4xl text-xl">{{ title }}</h1>
    </div>
    <ol
      class="flex items-center text-center space-x-2 mt-1 md:mt-2 text-neutral-grey-dark"
      v-if="breadcrumbs"
    >
      <li v-for="(breadcrumb, index) in breadcrumbs" class="cursor-default text-sm md:text-base">
        <template v-if="breadcrumb.routeName">
          <router-link
            :to="{ name: breadcrumb.routeName, params: breadcrumb.params }"
            class="after:ml-2 hover:text-primary-darker"
            :class="
              breadcrumbs.length - 1 === index
                ? 'text-primary font-semibold'
                : `after:content-['/']`
            "
          >
            {{ breadcrumb.name }}
          </router-link>
        </template>
        <template v-else>
          <span
            class="after:ml-2"
            :class="
              breadcrumbs.length - 1 === index
                ? 'text-primary font-semibold'
                : `after:content-['/']`
            "
          >
            {{ breadcrumb.name }}
          </span>
        </template>
      </li>
    </ol>
  </nav>
</template>
