import { useState, type FormEvent } from "react";
import { LifeBuoy, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { FormDialog, Field, fieldCls, textareaCls } from "./form-dialog";

const TOPICS = [
  "Bug / something broken",
  "Wrong or low-quality lead",
  "Billing & credits",
  "Feature request",
  "Account / login",
  "Other",
] as const;

type Complaint = {
  id: string;
  topic: (typeof TOPICS)[number];
  severity: "low" | "medium" | "high";
  subject: string;
  message: string;
  email: string;
  submittedAt: string;
};

function loadAll(): Complaint[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem("complaints") || "[]"); } catch { return []; }
}

export function ComplaintBoxButton() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget;
    const d = new FormData(f);
    const subject = String(d.get("subject") || "").trim();
    const message = String(d.get("message") || "").trim();
    if (subject.length < 3 || message.length < 10) {
      toast.error("Please add a short subject and at least 10 characters of detail.");
      return;
    }
    const entry: Complaint = {
      id: `c_${Date.now().toString(36)}`,
      topic: (d.get("topic") as Complaint["topic"]) || "Other",
      severity: (d.get("severity") as Complaint["severity"]) || "medium",
      subject: subject.slice(0, 120),
      message: message.slice(0, 2000),
      email: String(d.get("email") || "").slice(0, 200),
      submittedAt: new Date().toISOString(),
    };
    const all = loadAll();
    all.unshift(entry);
    try { localStorage.setItem("complaints", JSON.stringify(all.slice(0, 50))); } catch { /* noop */ }
    f.reset();
    setSent(true);
    toast.success("Complaint received", {
      description: `Ticket #${entry.id.slice(-6).toUpperCase()} — our team will reply within 24h.`,
    });
    setTimeout(() => { setSent(false); setOpen(false); }, 1400);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        title="Send a complaint or feedback"
        className="hidden h-9 items-center gap-1.5 rounded-md border border-border bg-card/50 px-3 text-sm text-muted-foreground hover:bg-card hover:text-foreground sm:inline-flex"
      >
        <LifeBuoy className="h-3.5 w-3.5" /> Complaint
      </button>

      <FormDialog
        open={open}
        onClose={() => setOpen(false)}
        title="Send us a complaint"
        description="Tell us what went wrong. We read every message and reply within 24 hours."
        submitLabel={sent ? "Sent" : "Send complaint"}
        onSubmit={onSubmit}
      >
        {sent ? (
          <div className="grid place-items-center gap-2 py-8 text-center">
            <CheckCircle2 className="h-10 w-10 text-emerald-400" />
            <div className="text-sm font-medium">Thanks — your complaint is in.</div>
            <div className="text-xs text-muted-foreground">A support agent will follow up by email.</div>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Topic">
              <select name="topic" className={fieldCls} defaultValue={TOPICS[0]}>
                {TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </Field>
            <Field label="Severity">
              <select name="severity" className={fieldCls} defaultValue="medium">
                <option value="low">Low — minor annoyance</option>
                <option value="medium">Medium — slowing me down</option>
                <option value="high">High — blocking my work</option>
              </select>
            </Field>
            <Field label="Subject" span={2}>
              <input name="subject" required minLength={3} maxLength={120} className={fieldCls} placeholder="Short summary of the issue" />
            </Field>
            <Field label="What happened?" span={2}>
              <textarea name="message" required minLength={10} maxLength={2000} className={textareaCls} placeholder="Steps you took, what you expected, what happened instead…" />
            </Field>
            <Field label="Reply-to email (optional)" span={2}>
              <input name="email" type="email" maxLength={200} className={fieldCls} placeholder="you@company.com" />
            </Field>
          </div>
        )}
      </FormDialog>
    </>
  );
}
