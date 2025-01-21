<script lang="ts" setup>
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { NavCollapsible } from '../types';
import { checkIsActive } from '../utils';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronRight } from 'lucide-vue-next';
import { RouterLink } from 'vue-router';
import { ref } from 'vue';

const props = defineProps<{ item: NavCollapsible; href: string }>();

const { setOpenMobile } = useSidebar();

const isOpen = ref(checkIsActive(props.href, props.item, true));

function toggleCollapsible() {
  isOpen.value = !isOpen.value;
}
</script>

<template>
  <Collapsible asChild :defaultOpen="isOpen">
    <SidebarMenuItem>
      <CollapsibleTrigger as-child @click="toggleCollapsible">
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
      </CollapsibleTrigger>
      <CollapsibleContent class="CollapsibleContent">
        <SidebarMenuSub>
          <SidebarMenuSubItem v-for="nav in item.items" :key="nav.title">
            <SidebarMenuSubButton asChild :isActive="checkIsActive(href, nav)">
              <RouterLink :to="nav.url" @click="setOpenMobile(false)">
                <component :is="nav.icon" v-if="nav.icon" />
                <span>{{ nav.title }}</span>
                <Badge class="text-xs rounded-full px-1 py-0" v-if="nav.badge">{{
                  nav.badge
                }}</Badge>
              </RouterLink>
            </SidebarMenuSubButton>
          </SidebarMenuSubItem>
        </SidebarMenuSub>
      </CollapsibleContent>
    </SidebarMenuItem>
  </Collapsible>
</template>
