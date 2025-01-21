<script lang="ts" setup>
import { sidebarData } from '@/layouts/main-layout/data';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '../ui/command';
import { ScrollArea } from '../ui/scroll-area';
import { ArrowRightIcon, LaptopIcon, MoonIcon, SunIcon } from 'lucide-vue-next';
import { useVModel } from '@vueuse/core';
import { useThemeStore } from '@/stores';

const props = defineProps<{
  open: boolean;
}>();

const emits = defineEmits<{
  (e: 'update:open', payload: boolean): void;
}>();

const open = useVModel(props, 'open', emits, {
  passive: true,
});

const runCommand = (command: () => unknown) => {
  open.value = false;
  command(); //
};

const themeStore = useThemeStore();
</script>

<template>
  <CommandDialog modal v-model:open="open">
    <CommandInput placeholder="Type a command or search..." />
    <CommandList>
      <ScrollArea type="hover" class="h-72 pr-1">
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup
          v-for="group in sidebarData.navGroups"
          :key="group.title"
          :heading="group.title"
        >
          <template v-for="(navItem, index) in group.items">
            <CommandItem
              v-if="navItem.url"
              :key="`${navItem.url}-${index}`"
              :value="navItem.title"
              @click="runCommand(() => $router.push(navItem.url))"
            >
              <div class="mr-2 flex h-4 w-4 items-center justify-center">
                <ArrowRightIcon class="size-2 text-muted-foreground/80" />
              </div>
              {{ navItem.title }}
            </CommandItem>

            <CommandItem
              v-for="(subItem, i) in navItem.items || []"
              :key="`${subItem.url}-${i}`"
              :value="subItem.title"
              @click="runCommand(() => $router.push(subItem.url))"
            >
              <div class="mr-2 flex h-4 w-4 items-center justify-center">
                <ArrowRightIcon class="size-2 text-muted-foreground/80" />
              </div>
              {{ subItem.title }}
            </CommandItem>
          </template>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Theme">
          <CommandItem value="light" @click="runCommand(() => themeStore.setTheme('light'))">
            <SunIcon class="mr-2" /> <span>Light</span>
          </CommandItem>
          <CommandItem value="dark" @click="runCommand(() => themeStore.setTheme('dark'))">
            <MoonIcon class="scale-90 mr-2" /> <span>Dark</span>
          </CommandItem>
          <CommandItem value="system" @click="runCommand(() => themeStore.setTheme('system'))">
            <LaptopIcon class="mr-2" /> <span>System</span>
          </CommandItem>
        </CommandGroup>
      </ScrollArea>
    </CommandList>
  </CommandDialog>
</template>
