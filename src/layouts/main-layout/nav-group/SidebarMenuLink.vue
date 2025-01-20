<script lang="ts" setup>
import { SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { NavLink } from '../types';
import { checkIsActive } from '../utils';
import { RouterLink } from 'vue-router';
import { Badge } from '@/components/ui/badge';

defineProps<{ item: NavLink; href: string }>();

const { setOpenMobile } = useSidebar();
</script>
<template>
  <SidebarMenuItem>
    <SidebarMenuButton as-child :is-active="checkIsActive(href, item)" :tooltip="item.title">
      <RouterLink :to="item.url" @click="setOpenMobile(false)">
        <item.icon v-if="item.icon" />
        <span>{{ item.title }}</span>
        <Badge class="text-xs rounded-full px-1 py-0" v-if="item.badge">{{ item.badge }}</Badge>
      </RouterLink>
    </SidebarMenuButton>
  </SidebarMenuItem>
</template>
