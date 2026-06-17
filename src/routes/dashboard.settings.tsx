import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { User, CreditCard, Bell, Plug, Shield, Users as UsersIcon, Check, Instagram, Linkedin, Facebook, Twitter } from "lucide-react";
import { PageHeader, Panel, Badge, Avatar, Mono } from "@/components/dashboard/dash-ui";
import { CreditPackages } from "@/components/dashboard/credit-packages";


export const Route = createFileRoute("/dashboard/settings")({
  component: SettingsPage,
});

const TABS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "team", label: "Team", icon: UsersIcon },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "integrations", label: "Integrations", icon: Plug },
  { id: "security", label: "Security", icon: Shield },
] as const;

function SettingsPage() {
  const [tab, setTab] = useState<typeof TABS[number]["id"]>("profile");
  return (
    <div className="space-y-6">
      <PageHeader kicker="Settings" title="Workspace settings" description="Manage your account, team, billing, and connected platforms." />

      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <aside>
          <nav className="space-y-0.5">
            {TABS.map((t) => {
              const Icon = t.icon;
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm transition ${
                    active ? "bg-foreground/10 text-foreground" : "text-muted-foreground hover:bg-card hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {t.label}
                </button>
              );
            })}
          </nav>
        </aside>

        <div className="min-w-0 space-y-6">
          {tab === "profile" && <ProfilePanel />}
          {tab === "team" && <TeamPanel />}
          {tab === "billing" && <BillingPanel />}
          {tab === "notifications" && <NotificationsPanel />}
          {tab === "integrations" && <IntegrationsPanel />}
          {tab === "security" && <SecurityPanel />}
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
const inputCls = "h-9 w-full rounded-md border border-border bg-background px-3 text-sm focus:border-foreground/40 focus:outline-none";

function ProfilePanel() {
  return (
    <Panel title="Profile">
      <div className="space-y-5 p-5">
        <div className="flex items-center gap-4">
          <Avatar name="Nasir Smith" className="h-16 w-16 text-lg" />
          <button className="rounded-md border border-border px-3 py-1.5 text-sm hover:bg-card">Upload photo</button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full name"><input defaultValue="Nasir Smith" className={inputCls} /></Field>
          <Field label="Email"><input defaultValue="nasir@growbylead.com" className={inputCls} /></Field>
          <Field label="Role"><input defaultValue="Founder" className={inputCls} /></Field>
          <Field label="Timezone">
            <select className={inputCls}><option>Asia/Dhaka (GMT+6)</option><option>UTC</option><option>America/New_York</option></select>
          </Field>
        </div>
        <div className="flex justify-end gap-2 border-t border-border pt-4">
          <button className="rounded-md border border-border px-3 py-1.5 text-sm hover:bg-card">Cancel</button>
          <button className="rounded-md bg-foreground px-3 py-1.5 text-sm font-medium text-background hover:bg-foreground/90">Save changes</button>
        </div>
      </div>
    </Panel>
  );
}

function TeamPanel() {
  const team = [
    { name: "Nasir Smith", email: "nasir@growbylead.com", role: "Owner" },
    { name: "Sara Park", email: "sara@growbylead.com", role: "Admin" },
    { name: "Mei Chen", email: "mei@growbylead.com", role: "Member" },
    { name: "David O.", email: "david@growbylead.com", role: "Member" },
  ];
  return (
    <Panel title="Team members" actions={<button className="rounded-md bg-foreground px-3 py-1.5 text-xs font-medium text-background hover:bg-foreground/90">Invite</button>}>
      <ul className="divide-y divide-border">
        {team.map((m) => (
          <li key={m.email} className="flex items-center gap-3 px-5 py-3">
            <Avatar name={m.name} />
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium">{m.name}</div>
              <div className="text-xs text-muted-foreground">{m.email}</div>
            </div>
            <Badge tone={m.role === "Owner" ? "success" : m.role === "Admin" ? "warm" : "muted"}>{m.role}</Badge>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

function BillingPanel() {
  return (
    <>
      <Panel title="Current plan">
        <div className="flex flex-wrap items-center justify-between gap-4 p-5">
          <div>
            <div className="text-lg font-semibold">Growth · $99/mo</div>
            <div className="text-xs text-muted-foreground">Renews on Sep 28, 2026 · 12 seats included</div>
          </div>
          <div className="flex gap-2">
            <button className="rounded-md border border-border px-3 py-1.5 text-sm hover:bg-card">Cancel</button>
            <button className="rounded-md bg-foreground px-3 py-1.5 text-sm font-medium text-background hover:bg-foreground/90">Upgrade</button>
          </div>
        </div>
        <div className="grid gap-4 border-t border-border p-5 sm:grid-cols-3">
          {[
            { l: "Leads used", v: "1,284 / 5,000" },
            { l: "Emails sent", v: "3,116 / 10,000" },
            { l: "Seats", v: "4 / 12" },
          ].map((u) => (
            <div key={u.l}>
              <Mono className="text-muted-foreground">{u.l}</Mono>
              <div className="mt-1 text-sm font-semibold">{u.v}</div>
            </div>
          ))}
        </div>
      </Panel>
      <Panel
        title="Credit packages"
        description="Buy credits in packs — never expires on the Agency pack. 1 credit unlocks 1 lead."
      >
        <div className="p-5">
          <CreditPackages />
        </div>
      </Panel>
      <Panel title="Payment method">

        <div className="flex items-center justify-between p-5">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-14 place-items-center rounded-md bg-gradient-to-br from-indigo-500 to-sky-500 text-xs font-bold text-white">VISA</span>
            <div>
              <div className="text-sm font-medium">•••• 4242</div>
              <div className="text-xs text-muted-foreground">Expires 09/28</div>
            </div>
          </div>
          <button className="rounded-md border border-border px-3 py-1.5 text-sm hover:bg-card">Update</button>
        </div>
      </Panel>
    </>
  );
}

function NotificationsPanel() {
  const items = [
    { l: "New hot leads", d: "Get notified when a lead scores 80+", on: true },
    { l: "Campaign replies", d: "Email + in-app for every reply", on: true },
    { l: "Weekly digest", d: "Performance summary every Monday", on: true },
    { l: "Billing alerts", d: "When you hit 80% of plan limits", on: false },
  ];
  return (
    <Panel title="Notifications">
      <ul className="divide-y divide-border">
        {items.map((i) => (
          <li key={i.l} className="flex items-center justify-between gap-4 px-5 py-3.5">
            <div>
              <div className="text-sm font-medium">{i.l}</div>
              <div className="text-xs text-muted-foreground">{i.d}</div>
            </div>
            <span className={`relative inline-flex h-5 w-9 cursor-pointer items-center rounded-full ${i.on ? "bg-foreground" : "bg-card border border-border"}`}>
              <span className={`inline-block h-4 w-4 rounded-full bg-background shadow transition ${i.on ? "translate-x-4" : "translate-x-0.5"}`} />
            </span>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

function IntegrationsPanel() {
  const apps = [
    { name: "Instagram", icon: Instagram, color: "text-rose-400", connected: true },
    { name: "LinkedIn", icon: Linkedin, color: "text-sky-400", connected: true },
    { name: "Facebook", icon: Facebook, color: "text-indigo-400", connected: false },
    { name: "X / Twitter", icon: Twitter, color: "text-foreground", connected: false },
  ];
  return (
    <Panel title="Integrations" description="Connect your social platforms to source leads.">
      <ul className="divide-y divide-border">
        {apps.map((a) => {
          const Icon = a.icon;
          return (
            <li key={a.name} className="flex items-center justify-between gap-4 px-5 py-4">
              <div className="flex items-center gap-3">
                <span className={`grid h-10 w-10 place-items-center rounded-md border border-border bg-card ${a.color}`}><Icon className="h-5 w-5" /></span>
                <div>
                  <div className="text-sm font-medium">{a.name}</div>
                  <div className="text-xs text-muted-foreground">{a.connected ? "Connected · syncing every 30 min" : "Not connected"}</div>
                </div>
              </div>
              {a.connected ? (
                <button className="inline-flex items-center gap-1.5 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs text-emerald-400">
                  <Check className="h-3.5 w-3.5" /> Connected
                </button>
              ) : (
                <button className="rounded-md bg-foreground px-3 py-1.5 text-xs font-medium text-background hover:bg-foreground/90">Connect</button>
              )}
            </li>
          );
        })}
      </ul>
    </Panel>
  );
}

function SecurityPanel() {
  return (
    <>
      <Panel title="Password">
        <div className="space-y-4 p-5">
          <Field label="Current password"><input type="password" className={inputCls} /></Field>
          <Field label="New password"><input type="password" className={inputCls} /></Field>
          <div className="flex justify-end"><button className="rounded-md bg-foreground px-3 py-1.5 text-sm font-medium text-background hover:bg-foreground/90">Update</button></div>
        </div>
      </Panel>
      <Panel title="Two-factor authentication">
        <div className="flex items-center justify-between p-5">
          <div className="text-sm">Add an extra layer of security to your account.</div>
          <button className="rounded-md border border-border px-3 py-1.5 text-sm hover:bg-card">Enable 2FA</button>
        </div>
      </Panel>
    </>
  );
}
