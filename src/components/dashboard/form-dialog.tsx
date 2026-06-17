import { useEffect, type FormEvent, type ReactNode } from "react";
import { X } from "lucide-react";
import { Mono } from "./dash-ui";

export function FormDialog({
  open,
  onClose,
  title,
  description,
  submitLabel = "Save",
  onSubmit,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  submitLabel?: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-background/70 backdrop-blur-sm"
      />
      <div className="relative z-10 w-full max-w-lg rounded-xl border border-border bg-card shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
          <div className="min-w-0">
            <Mono className="text-muted-foreground">Quick add</Mono>
            <h2 className="mt-0.5 text-base font-semibold tracking-tight">{title}</h2>
            {description && <p className="mt-1 text-xs text-muted-foreground">{description}</p>}
          </div>
          <button
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-md text-muted-foreground hover:bg-background hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <form onSubmit={onSubmit} className="space-y-4 p-5">
          {children}
          <div className="flex items-center justify-end gap-2 border-t border-border pt-4">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-9 items-center rounded-md border border-border bg-card px-3 text-sm hover:bg-background"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex h-9 items-center rounded-md bg-foreground px-3 text-sm font-medium text-background hover:bg-foreground/90"
            >
              {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function Field({
  label,
  children,
  span = 1,
}: {
  label: string;
  children: ReactNode;
  span?: 1 | 2;
}) {
  return (
    <label className={`block ${span === 2 ? "sm:col-span-2" : ""}`}>
      <Mono className="text-muted-foreground">{label}</Mono>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

export const fieldCls =
  "h-9 w-full rounded-md border border-border bg-background/60 px-3 text-sm focus:border-foreground/40 focus:outline-none";
export const textareaCls =
  "min-h-[80px] w-full rounded-md border border-border bg-background/60 px-3 py-2 text-sm focus:border-foreground/40 focus:outline-none";
export const gridCls = "grid gap-3 sm:grid-cols-2";
