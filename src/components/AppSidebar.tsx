import { LayoutDashboard, FolderHeart, Activity, UserCircle, LogOut, HeartPulse, FileText } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useAuth } from "@/hooks/useAuth";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const navItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Records", url: "/records", icon: FolderHeart },
  { title: "Vitals", url: "/vitals", icon: Activity },
  { title: "Profile", url: "/profile", icon: UserCircle },
  { title: "Documentation", url: "/documentation", icon: FileText },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { signOut, user } = useAuth();

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-sidebar-border/70 bg-gradient-to-b from-white via-sky-50/40 to-cyan-50/40"
    >
      <SidebarContent>
        <SidebarGroup className="pt-4">
          <SidebarGroupLabel className="h-auto px-3 pb-4">
            {!collapsed ? (
              <div className="w-full rounded-xl border border-sidebar-border/70 bg-white/95 px-3 py-3 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/25 ring-1 ring-primary/20">
                    <HeartPulse className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-[11px] uppercase tracking-[0.16em] text-sidebar-foreground/60">Health Vault</p>
                    <p className="truncate text-base font-semibold tracking-tight text-foreground">Clinical Dashboard</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-lg border border-sidebar-border/70 bg-white/95 shadow-sm ring-1 ring-primary/15">
                <HeartPulse className="h-4 w-4 text-primary" />
              </div>
            )}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="rounded-xl border border-transparent px-2.5 py-2.5 text-sidebar-foreground/90 transition-all hover:border-sidebar-border/80 hover:bg-white/80 hover:shadow-sm"
                      activeClassName="border-primary/30 bg-white text-primary shadow-sm ring-1 ring-primary/10 font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="m-3 rounded-xl border border-sidebar-border/70 bg-white/90 p-2 shadow-sm">
        {!collapsed && user && <p className="mb-1 truncate px-2 text-xs text-muted-foreground">{user.email}</p>}
        <Button
          variant="ghost"
          size="sm"
          onClick={signOut}
          className="w-full justify-start rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
        >
          <LogOut className="h-4 w-4 mr-2" />
          {!collapsed && "Sign Out"}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
