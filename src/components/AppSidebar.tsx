
import React from "react";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter,
  SidebarHeader, 
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar";
import { 
  Home, 
  BarChart2, 
  Calendar, 
  Settings, 
  User,
  Trophy, 
  Book
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AppSidebarProps {
  className?: string;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ className }) => {
  const menuItems = [
    { 
      icon: Home, 
      label: "Dashboard", 
      href: "#", 
      active: true 
    },
    { 
      icon: BarChart2, 
      label: "Analytics", 
      href: "#" 
    },
    { 
      icon: Calendar, 
      label: "Schedule", 
      href: "#" 
    },
    { 
      icon: Trophy, 
      label: "Rank", 
      href: "#" 
    },
    { 
      icon: Book, 
      label: "Journal", 
      href: "#" 
    }
  ];

  const secondaryItems = [
    { 
      icon: User, 
      label: "Profile", 
      href: "#" 
    },
    { 
      icon: Settings, 
      label: "Settings", 
      href: "#" 
    }
  ];

  return (
    <Sidebar className={cn("border-r border-sleep-100", className)}>
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-sleep-300 flex items-center justify-center">
            <User className="h-4 w-4 text-white" />
          </div>
          <span className="font-semibold text-xl text-sleep-800">Sleepmate</span>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sleep-500 text-xs font-medium px-3">
            Main
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "flex items-center gap-3 py-2 px-3 rounded-md text-sm font-medium transition-colors",
                      item.active 
                        ? "bg-sleep-100 text-sleep-800" 
                        : "hover:bg-sleep-50 text-sleep-700 hover:text-sleep-800"
                    )}
                  >
                    <a href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="text-sleep-500 text-xs font-medium px-3">
            Settings
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryItems.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton
                    asChild
                    className="flex items-center gap-3 py-2 px-3 rounded-md text-sm font-medium text-sleep-700 hover:bg-sleep-50 hover:text-sleep-800 transition-colors"
                  >
                    <a href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-6 border-t border-sleep-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-sleep-100 flex items-center justify-center">
            <User className="h-5 w-5 text-sleep-500" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-sleep-800">John Doe</p>
            <p className="text-xs text-sleep-500">john.doe@example.com</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
