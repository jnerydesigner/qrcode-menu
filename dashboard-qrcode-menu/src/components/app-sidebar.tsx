/* eslint-disable @typescript-eslint/no-empty-object-type */
"use client";

import * as React from "react";
import {

  GalleryVerticalEnd,
  Tags,
  Utensils,
  Wheat,
  House,
  QrCode
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

export type DashboardSection = "/" | "products" | "categories" | "ingredients" | "qrcode";


interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  company: CompanyType | undefined
  activeSection: "/" | "products" | "categories" | "ingredients" | "qrcode";
}

export function AppSidebar({ company, activeSection, ...props }: AppSidebarProps) {

  const data = {
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
      {
        title: "QR Code",
        value: "qrcode" satisfies DashboardSection,
        icon: QrCode,
      },
    ]
  };
  const navigate = useNavigate();

  function handleNavigate(section: DashboardSection) {
    if (section === "/") {
      navigate("/dashboard");
      return;
    }
    navigate(`/dashboard/${section}`);
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
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
