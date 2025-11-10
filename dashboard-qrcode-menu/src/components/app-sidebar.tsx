/* eslint-disable @typescript-eslint/no-empty-object-type */
"use client";

import * as React from "react";
import {
  AudioWaveform,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Tags,
  Utensils,
  Wheat,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useNavigate, useLocation } from "react-router"; // ✅ novo import

export type DashboardSection = "products" | "categories" | "ingredients";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Cervejaria Devassa",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
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
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  activeSection: "products" | "categories" | "ingredients";
  onSelectSection: (section: "products" | "categories" | "ingredients") => void;
}

export function AppSidebar({ ...props }: AppSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const activeSection = React.useMemo(() => {
    const path = location.pathname.replace("/", "");
    return ["products", "categories", "ingredients"].includes(path)
      ? (path as DashboardSection)
      : "products";
  }, [location.pathname]);

  function handleNavigate(section: DashboardSection) {
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
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
