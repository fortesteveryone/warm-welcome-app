import { useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutGrid, Inbox, UsersRound, Star, Bell,
  Search, Menu, X, ChevronsLeft, ChevronsRight, Plus, LogOut,
} from "lucide-react";
import logoUrl from "@/assets/postly-logo.png";

type NavItem = { label: string; to: string; icon: typeof LayoutGrid; exact?: boolean };
const NAV: NavItem[] = [
  { label: "Overview",         to: "/dashboard",                icon: LayoutGrid, exact: true },
  { label: "Manage Leads",     to: "/dashboard/leads",          icon: Inbox },
  { label: "Manage Contacts",  to: "/dashboard/contacts",       icon: UsersRound },
  { label: "Favourites Leads", to: "/dashboard/favourites",     icon: Star },
  { label: "Notifications",    to: "/dashboard/notifications",  icon: Bell },
];

const USER = {
  name: "Abdullah Al Mahfuz",
  email: "almahfuz2019@gmail.com",
  initials: "AM",
};

export function DashboardLayout({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const path = useRouterState({ select: (r) => r.location.pathname });
  const active = (to: string, exact?: boolean) =>
    exact ? path === to : path === to || path.startsWith(to + "/");

  return (
    <div className="dashboard-noir dark flex min-h-screen w-full bg-background text-foreground">
      {/* Sidebar — desktop */}
      <aside
        className={`hidden shrink-0 border-r border-border bg-[oklch(0.06_0_0)] transition-[width] duration-200 md:flex md:flex-col ${
          collapsed ? "md:w-[72px]" : "md:w-[248px]"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-border px-3">
          <Link to="/" className="flex items-center gap-2 overflow-hidden">
            <img src={logoUrl} alt="Postly" className="h-8 w-auto shrink-0 brightness-0 invert" />
            {!collapsed && <span className="truncate text-sm font-semibold tracking-tight">Postly</span>}
          </Link>
          {!collapsed && (
            <button
              onClick={() => setCollapsed(true)}
              className="grid h-7 w-7 place-items-center rounded-md text-muted-foreground hover:bg-card hover:text-foreground"
              aria-label="Collapse"
            >
              <ChevronsLeft className="h-4 w-4" />
            </button>
          )}
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-2.5">
          {NAV.map((item) => {
            const Icon = item.icon;
            const isActive = active(item.to, item.exact);
            return (
              <Link
                key={item.to}
                to={item.to}
                title={collapsed ? item.label : undefined}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition ${
                  isActive
                    ? "bg-[color:var(--signal)]/15 text-[color:var(--signal)] ring-1 ring-[color:var(--signal)]/30"
                    : "text-muted-foreground hover:bg-card hover:text-foreground"
                } ${collapsed ? "justify-center" : ""}`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-border p-2.5">
          {collapsed ? (
            <button
              onClick={() => setCollapsed(false)}
              className="grid h-9 w-full place-items-center rounded-md text-muted-foreground hover:bg-card hover:text-foreground"
              aria-label="Expand"
            >
              <ChevronsRight className="h-4 w-4" />
            </button>
          ) : (
            <div className="flex items-center gap-2.5 rounded-lg bg-card/70 p-2 ring-1 ring-border">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-[color:var(--signal)] to-emerald-700 text-[12px] font-semibold text-black">
                {USER.initials}
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium">{USER.name}</div>
                <div className="truncate text-[11px] text-muted-foreground">{USER.email}</div>
              </div>
              <button className="grid h-7 w-7 place-items-center rounded-md text-muted-foreground hover:bg-background hover:text-foreground" aria-label="Sign out">
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Sidebar — mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden" onClick={() => setMobileOpen(false)}>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <aside
            className="dashboard-noir dark absolute left-0 top-0 flex h-full w-[280px] flex-col border-r border-border bg-[oklch(0.06_0_0)] text-foreground"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-16 items-center justify-between border-b border-border px-4">
              <Link to="/" className="flex items-center gap-2">
                <img src={logoUrl} alt="" className="h-8 w-auto brightness-0 invert" />
                <span className="text-sm font-semibold tracking-tight">Postly</span>
              </Link>
              <button onClick={() => setMobileOpen(false)} className="grid h-8 w-8 place-items-center rounded-md hover:bg-card" aria-label="Close">
                <X className="h-4 w-4" />
              </button>
            </div>
            <nav className="flex-1 space-y-1 overflow-y-auto p-2.5">
              {NAV.map((item) => {
                const Icon = item.icon;
                const isActive = active(item.to, item.exact);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${
                      isActive
                        ? "bg-[color:var(--signal)]/15 text-[color:var(--signal)] ring-1 ring-[color:var(--signal)]/30"
                        : "text-muted-foreground hover:bg-card"
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
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-border bg-[oklch(0.04_0_0)]/85 px-4 backdrop-blur-xl md:px-6">
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
                placeholder="Search leads, contacts…"
                className="h-9 w-full rounded-md border border-border bg-card/60 pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:border-[color:var(--signal)]/40 focus:outline-none"
              />
              <kbd className="absolute right-2 hidden rounded border border-border bg-background px-1.5 py-0.5 text-[10px] text-muted-foreground lg:inline-block">
                ⌘K
              </kbd>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/dashboard/leads" className="hidden items-center gap-1.5 rounded-md bg-[color:var(--signal)] px-3 py-1.5 text-sm font-medium text-black shadow-[0_6px_20px_-8px_color-mix(in_oklab,var(--signal)_60%,transparent)] hover:brightness-110 sm:inline-flex">
              <Plus className="h-3.5 w-3.5" /> New lead
            </Link>
            <Link
              to="/dashboard/notifications"
              className="relative grid h-9 w-9 place-items-center rounded-md border border-border bg-card/60 text-muted-foreground hover:text-foreground"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[color:var(--signal)]" />
            </Link>
            <span className="grid h-9 w-9 place-items-center rounded-md bg-gradient-to-br from-[color:var(--signal)] to-emerald-700 text-[12px] font-semibold text-black">
              {USER.initials}
            </span>
          </div>
        </header>
        <main className="flex-1 px-4 py-6 md:px-8 md:py-8">{children}</main>
      </div>
    </div>
  );
}
