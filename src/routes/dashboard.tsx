import { createFileRoute, Outlet } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Grow By Lead CRM" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  ),
});
