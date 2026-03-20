import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Outlet } from "react-router-dom";
import { HeartPulse } from "lucide-react";

export function AppLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 via-sky-50/40 to-cyan-50/40">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="sticky top-0 z-10 flex h-14 items-center border-b border-border/50 bg-white/70 px-4 backdrop-blur-sm">
            <SidebarTrigger className="mr-4" />
          </header>
          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
            <Outlet />
          </main>
          <footer className="border-t border-primary/10 bg-gradient-to-r from-white via-sky-50/80 to-cyan-50/80 px-6 py-4 text-foreground">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary/15 to-accent/20 ring-1 ring-primary/20">
                  <HeartPulse className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold tracking-wide">Health Vault</p>
                  <p className="text-xs text-muted-foreground">Clinical Dashboard</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Securely managing your health data</p>
            </div>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
}
