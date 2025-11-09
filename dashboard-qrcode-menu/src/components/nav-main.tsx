import { type LucideIcon } from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

type NavMainItem = {
  title: string
  value: string
  icon?: LucideIcon
}

type NavMainProps = {
  items: NavMainItem[]
  activeValue?: string
  onSelect?: (value: string) => void
}

export function NavMain({ items, activeValue, onSelect }: NavMainProps) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Listas</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.value}>
            <SidebarMenuButton
              isActive={item.value === activeValue}
              onClick={() => onSelect?.(item.value)}
              tooltip={item.title}
            >
              {item.icon && <item.icon />}
              <span>{item.title}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
