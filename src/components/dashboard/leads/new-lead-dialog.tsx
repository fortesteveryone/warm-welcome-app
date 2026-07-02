import { FormDialog, Field, fieldCls, textareaCls, gridCls } from "@/components/dashboard/form-dialog";
import {
  LEAD_OWNERS, LEAD_SOURCES, LEAD_STAGES,
  type Lead, type LeadSource, type LeadStatus,
} from "@/lib/leads-data";

export function NewLeadDialog({ open, onClose, onCreate }: { open: boolean; onClose: () => void; onCreate: (l: Lead) => void }) {
  return (
    <FormDialog
      open={open}
      onClose={onClose}
      title="New lead"
      description="Add a lead manually. It will appear at the top of the list."
      submitLabel="Create lead"
      onSubmit={(e) => {
        e.preventDefault();
        const f = e.currentTarget as HTMLFormElement;
        const d = new FormData(f);
        const name = String(d.get("name") || "").trim();
        if (!name) return;
        const score = Number(d.get("score") || 50);
        const company = String(d.get("company") || "");
        const headline = String(d.get("headline") || "").trim() ||
          `${name.split(" ")[0]} from ${company || "their company"} is looking for help with a new project — open to see details.`;
        const topic = String(d.get("topic") || "").trim() || "New inbound lead";
        const now = new Date();
        const pad = (n: number) => String(n).padStart(2, "0");
        const lead: Lead = {
          id: `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now().toString(36)}`,
          name,
          company,
          role: String(d.get("role") || ""),
          source: (d.get("source") as LeadSource) || "instagram",
          score,
          status: (d.get("status") as LeadStatus) || (score > 75 ? "hot" : score > 50 ? "warm" : "cold"),
          stage: String(d.get("stage") || "New"),
          owner: String(d.get("owner") || LEAD_OWNERS[0]),
          updated: "just now",
          email: String(d.get("email") || ""),
          phone: String(d.get("phone") || ""),
          city: String(d.get("city") || ""),
          country: String(d.get("country") || ""),
          website: String(d.get("website") || ""),
          tags: String(d.get("tags") || "").split(",").map((t) => t.trim()).filter(Boolean),
          about: String(d.get("about") || ""),
          dealValue: Number(d.get("dealValue") || 0),
          createdAt: now.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
          category: "Website Design",
          intent: "Medium",
          platform: ((d.get("source") as string) || "instagram") as Lead["platform"],
          qualification: "unreviewed",
          favourite: false,
          headline,
          topic,
          comments: 0,
          drafts: 0,
          postedAt: `${pad(now.getDate())}-${pad(now.getMonth() + 1)}-${now.getFullYear()} | ${pad(now.getHours())}:${pad(now.getMinutes())}`,
          postExcerpt: String(d.get("about") || headline),
          postUrl: "",
          authorHandle: "@" + String(d.get("name") || "new").toLowerCase().replace(/[^a-z0-9]+/g, "."),
          urgency: "This week",
          reactions: 0,
          shares: 0,
          replyAngles: [],
          flag: "🌐",
        };
        onCreate(lead);
        f.reset();
      }}
    >
      <div className={gridCls}>
        <Field label="Name"><input name="name" required className={fieldCls} placeholder="Full name" /></Field>
        <Field label="Company"><input name="company" className={fieldCls} placeholder="Acme Inc." /></Field>
        <Field label="Role"><input name="role" className={fieldCls} placeholder="Founder, CMO…" /></Field>
        <Field label="Source">
          <select name="source" className={fieldCls} defaultValue="instagram">
            {LEAD_SOURCES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>
        <Field label="Stage">
          <select name="stage" className={fieldCls} defaultValue="New">
            {LEAD_STAGES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>
        <Field label="Owner">
          <select name="owner" className={fieldCls} defaultValue={LEAD_OWNERS[0]}>
            {LEAD_OWNERS.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </Field>
        <Field label="Temperature">
          <select name="status" className={fieldCls} defaultValue="warm">
            <option value="hot">hot</option><option value="warm">warm</option><option value="cold">cold</option>
          </select>
        </Field>
        <Field label="Score (0–100)"><input name="score" type="number" min={0} max={100} defaultValue={60} className={fieldCls} /></Field>
        <Field label="Topic"><input name="topic" className={fieldCls} placeholder="e.g. Video editor for YouTube vlog" /></Field>
        <Field label="Email"><input name="email" type="email" className={fieldCls} placeholder="name@company.com" /></Field>
        <Field label="Phone"><input name="phone" className={fieldCls} placeholder="+1 555…" /></Field>
        <Field label="Country"><input name="country" className={fieldCls} placeholder="Country" /></Field>
        <Field label="Headline (what they're looking for)" span={2}><textarea name="headline" className={textareaCls} placeholder="Khansa Maroof is looking for a website developer to work on a portfolio website update and…" /></Field>
        <Field label="Tags (comma separated)" span={2}><input name="tags" className={fieldCls} placeholder="VIP, SaaS" /></Field>
        <Field label="About / notes" span={2}><textarea name="about" className={textareaCls} placeholder="Short context about this lead…" /></Field>
      </div>
    </FormDialog>
  );
}
