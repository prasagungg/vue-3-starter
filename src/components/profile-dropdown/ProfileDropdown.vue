<script lang="ts" setup>
import { RouterLink } from 'vue-router';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" class="relative h-8 w-8 rounded-full">
        <Avatar class="h-8 w-8">
          <AvatarImage src="/avatars/01.png" alt="@shadcn" />
          <AvatarFallback class="dark:text-black">SN</AvatarFallback>
        </Avatar>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56" align="end">
      <DropdownMenuLabel class="font-normal">
        <div class="flex flex-col space-y-1">
          <p class="text-sm font-medium leading-none">satnaing</p>
          <p class="text-xs leading-none text-muted-foreground">satnaingdev@gmail.com</p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem asChild>
          <RouterLink to="/settings">
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </RouterLink>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <RouterLink to="/settings">
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </RouterLink>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <RouterLink to="/settings">
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </RouterLink>
        </DropdownMenuItem>
        <DropdownMenuItem>New Team</DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        Log out
        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
