<script lang="ts" setup>
import { SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { NavCollapsible } from '../types';
import { checkIsActive } from '../utils';
import { Badge } from '@/components/ui/badge';
import { ChevronRight } from 'lucide-vue-next';
import { RouterLink } from 'vue-router';
import { ref } from 'vue';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const props = defineProps<{ item: NavCollapsible; href: string }>();

const { setOpenMobile } = useSidebar();

const isOpen = ref(checkIsActive(props.href, props.item, true));
</script>

<template>
  <SidebarMenuItem>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton :tooltip="item.title">
          <component :is="item.icon" v-if="item.icon" />
          <span>{{ item.title }}</span>
          <Badge class="text-xs rounded-full px-1 py-0" v-if="item.badge">{{ item.badge }}</Badge>
          <ChevronRight
            :class="{
              'ml-auto transition-transform duration-200 rotate-90': isOpen,
              'ml-auto transition-transform duration-200': !isOpen,
            }"
          />
        </SidebarMenuButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent side="right" align="start" :sideOffset="4">
        <DropdownMenuLabel>
          {{ item.title }} {{ item.badge ? `(${item.badge})` : '' }}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem v-for="sub in item.items" :key="`${sub.title}-${sub.url}`" asChild>
          <RouterLink :to="sub.url" @click="setOpenMobile(false)">
            <component :is="sub.icon" v-if="sub.icon" />
            <span>{{ sub.title }}</span>
            <Badge class="text-xs rounded-full px-1 py-0" v-if="sub.badge">{{ item.badge }}</Badge>
          </RouterLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </SidebarMenuItem>
</template>
