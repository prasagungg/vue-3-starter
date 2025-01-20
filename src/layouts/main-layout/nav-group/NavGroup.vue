<script lang="ts" setup>
import { SidebarGroup, SidebarGroupLabel, SidebarMenu } from '@/components/ui/sidebar';
import { NavGroup } from '../types';
import { SidebarMenuCollapsible, SidebarMenuLink } from '.';

defineProps<{
  nav: NavGroup;
}>();
</script>

<template>
  <SidebarGroup>
    <SidebarGroupLabel>{{ nav.title }}</SidebarGroupLabel>
    <SidebarMenu>
      <template v-for="item in nav.items" :key="`${item.title}-${item.url}`">
        <SidebarMenuLink v-if="!item.items" :item="item" :href="$route.fullPath" />

        <SidebarMenuCollapsible v-else :item="item" :href="$route.fullPath" />
      </template>
    </SidebarMenu>
  </SidebarGroup>
</template>
