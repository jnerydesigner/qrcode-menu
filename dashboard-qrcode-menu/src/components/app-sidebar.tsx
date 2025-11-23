/* eslint-disable @typescript-eslint/no-empty-object-type */
"use client";

import * as React from "react";
import {

  GalleryVerticalEnd,
  Tags,
  Utensils,
  Wheat,
  House
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useNavigate } from "react-router";
import type { CompanyType } from "@/types/company.type";

export type DashboardSection = "/" | "products" | "categories" | "ingredients";


interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  company: CompanyType | undefined
  activeSection: "/" | "products" | "categories" | "ingredients";
}

export function AppSidebar({ company, activeSection, ...props }: AppSidebarProps) {

  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    teams: [
      {
        name: company?.name ?? "Carregando...",
        logo: company?.image_small ?? GalleryVerticalEnd,
        plan: "Enterprise",
      }
    ],
    navMain: [
      {
        title: "Home",
        value: "/" satisfies DashboardSection,
        icon: House,
      },
      {
        title: "Lista de produtos",
        value: "products" satisfies DashboardSection,
        icon: Utensils,
      },
      {
        title: "Lista de categorias",
        value: "categories" satisfies DashboardSection,
        icon: Tags,
      },
      {
        title: "Lista de ingredientes",
        value: "ingredients" satisfies DashboardSection,
        icon: Wheat,
      },
    ]
  };
  const navigate = useNavigate();

  function handleNavigate(section: DashboardSection) {
    if (section === "/") {
      navigate("/");
      return;
    }
    navigate(`/${section}`);
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={data.navMain}
          activeValue={activeSection}
          onSelect={(value) => handleNavigate(value as DashboardSection)}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
