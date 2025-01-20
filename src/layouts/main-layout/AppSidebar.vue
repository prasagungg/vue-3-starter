<script lang="ts" setup>
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar';
import { NavGroup } from './nav-group';
import { sidebarData } from './data';

const { open } = useSidebar();
</script>

<template>
  <Sidebar collapsible="icon" variant="floating">
    <SidebarHeader>
      <div class="p-1">
        <h3 class="text-center font-semibold" v-if="open">BOT TEMPLATE</h3>
        <h3 class="font-semibold" v-else>BO</h3>
      </div>
    </SidebarHeader>
    <SidebarContent>
      <NavGroup v-for="nav in sidebarData.navGroups" :nav="nav" :key="nav.title" />
    </SidebarContent>
    <SidebarRail />
  </Sidebar>
</template>
