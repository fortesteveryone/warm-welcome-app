import { useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, Users, UserPlus, Settings,
  Search, Menu, X, ChevronsLeft, ChevronsRight, Plus, LogOut,
} from "lucide-react";
import logoAsset from "@/assets/growbylead-logo.png.asset.json";
import { NotificationsBell } from "./notifications";
import { ComplaintBoxButton } from "./complaint-box";

type NavItem = { label: string; to: string; icon: typeof LayoutDashboard; exact?: boolean };
const NAV: NavItem[] = [
  { label: "Overview", to: "/dashboard", icon: LayoutDashboard, exact: true },
  { label: "Leads", to: "/dashboard/leads", icon: UserPlus },
  { label: "Contacts", to: "/dashboard/contacts", icon: Users },
  
  
  
  
  { label: "Settings", to: "/dashboard/settings", icon: Settings },
];

export function DashboardLayout({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const path = useRouterState({ select: (r) => r.location.pathname });
  const active = (to: string, exact?: boolean) => (exact ? path === to : path === to || path.startsWith(to + "/"));

  return (
    <div className="dash-scope flex min-h-screen w-full bg-background text-foreground">
      {/* Sidebar — desktop */}
      <aside
        className={`hidden shrink-0 border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-[width] duration-200 md:flex md:flex-col ${
          collapsed ? "md:w-[68px]" : "md:w-[240px]"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-3">
          <Link to="/" className="flex items-center gap-2 overflow-hidden">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground text-sm font-bold">G</span>
            {!collapsed && <span className="truncate text-sm font-semibold tracking-tight">Grow By Lead</span>}
          </Link>
          {!collapsed && (
            <button
              onClick={() => setCollapsed(true)}
              className="grid h-7 w-7 place-items-center rounded-md text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              aria-label="Collapse"
            >
              <ChevronsLeft className="h-4 w-4" />
            </button>
          )}
        </div>

        <nav className="flex-1 space-y-0.5 overflow-y-auto p-2">
          {NAV.map((item) => {
            const Icon = item.icon;
            const isActive = active(item.to, item.exact);
            return (
              <Link
                key={item.to}
                to={item.to}
                title={collapsed ? item.label : undefined}
                className={`flex items-center gap-3 rounded-md px-2.5 py-2 text-sm transition ${
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                } ${collapsed ? "justify-center" : ""}`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-sidebar-border p-2">
          {collapsed ? (
            <button
              onClick={() => setCollapsed(false)}
              className="grid h-9 w-full place-items-center rounded-md text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              aria-label="Expand"
            >
              <ChevronsRight className="h-4 w-4" />
            </button>
          ) : (
            <div className="flex items-center gap-2.5 rounded-md p-2">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground text-[11px] font-semibold">
                NS
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium">Nasir S.</div>
                <div className="truncate text-[11px] text-sidebar-foreground/60">nasir@growbylead.com</div>
              </div>
              <button className="grid h-7 w-7 place-items-center rounded-md text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground" aria-label="Sign out">
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Sidebar — mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden" onClick={() => setMobileOpen(false)}>
          <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" />
          <aside
            className="absolute left-0 top-0 flex h-full w-[260px] flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
              <Link to="/" className="flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground text-sm font-bold">G</span>
                <span className="text-sm font-semibold tracking-tight">Grow By Lead</span>
              </Link>
              <button onClick={() => setMobileOpen(false)} className="grid h-8 w-8 place-items-center rounded-md hover:bg-sidebar-accent" aria-label="Close">
                <X className="h-4 w-4" />
              </button>
            </div>
            <nav className="flex-1 space-y-0.5 overflow-y-auto p-2">
              {NAV.map((item) => {
                const Icon = item.icon;
                const isActive = active(item.to, item.exact);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 rounded-md px-2.5 py-2.5 text-sm ${
                      isActive
                        ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-xl md:px-6">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="grid h-9 w-9 place-items-center rounded-md border border-border text-foreground hover:bg-card md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-4 w-4" />
            </button>
            <div className="relative hidden max-w-md flex-1 items-center md:flex">
              <Search className="pointer-events-none absolute left-3 h-4 w-4 text-muted-foreground" />
              <input
                placeholder="Search leads, contacts, deals…"
                className="h-9 w-full rounded-md border border-border bg-card/50 pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:border-foreground/40 focus:outline-none"
              />
              <kbd className="absolute right-2 hidden rounded border border-border bg-background px-1.5 py-0.5 text-[10px] text-muted-foreground lg:inline-block">
                ⌘K
              </kbd>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="hidden items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-sm font-medium text-background hover:bg-foreground/90 sm:inline-flex">
              <Plus className="h-3.5 w-3.5" /> New lead
            </button>
            <ComplaintBoxButton />
            <NotificationsBell />
            <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-emerald-500/40 to-sky-700/40 text-[12px] font-semibold ring-1 ring-border">
              NS
            </span>
          </div>
        </header>
        <main className="flex-1 px-4 py-6 md:px-8 md:py-8">{children}</main>
      </div>
    </div>
  );
}
