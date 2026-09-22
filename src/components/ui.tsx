import { useState, useRef, useEffect } from "react";

// ── Badge ──────────────────────────────────────────────────────────────────
interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "info" | "neutral";
  size?: "sm" | "md";
  dot?: boolean;
}
export function Badge({ children, variant = "default", size = "sm", dot }: BadgeProps) {
  const variantClass = {
    default: "bg-[rgba(43,110,120,0.12)] text-[#2B6E78] border border-[rgba(43,110,120,0.2)]",
    success: "bg-[rgba(34,197,94,0.1)] text-[#16A34A] border border-[rgba(34,197,94,0.2)]",
    warning: "bg-[rgba(234,179,8,0.1)] text-[#CA8A04] border border-[rgba(234,179,8,0.2)]",
    danger: "bg-[rgba(239,68,68,0.1)] text-[#DC2626] border border-[rgba(239,68,68,0.2)]",
    info: "bg-[rgba(56,189,248,0.1)] text-[#0284C7] border border-[rgba(56,189,248,0.2)]",
    neutral: "bg-[rgba(16,27,30,0.06)] text-[#4A6064] border border-[rgba(16,27,30,0.08)]",
  }[variant];
  const dotColor = {
    default: "bg-[#2B6E78]", success: "bg-[#16A34A]", warning: "bg-[#CA8A04]",
    danger: "bg-[#DC2626]", info: "bg-[#0284C7]", neutral: "bg-[#4A6064]",
  }[variant];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-mono font-medium ${size === "sm" ? "px-2 py-0.5 text-[10px] tracking-wider" : "px-2.5 py-1 text-xs"} ${variantClass}`}>
      {dot && <span className={`size-1.5 rounded-full animate-pulse-dot ${dotColor}`} />}
      {children}
    </span>
  );
}

// ── Button ─────────────────────────────────────────────────────────────────
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
}
export function Button({ children, variant = "primary", size = "md", loading, icon, iconRight, className = "", ...props }: ButtonProps) {
  const base = "inline-flex items-center justify-center gap-2 font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2B6E78] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer select-none";
  const variants = {
    primary: "bg-[#2B6E78] text-white hover:bg-[#235761] active:bg-[#1C464C]",
    secondary: "bg-[#FFFFFF] text-[#101B1E] border border-[rgba(16,27,30,0.08)] hover:bg-[#EAF1F1] hover:border-[rgba(16,27,30,0.14)]",
    ghost: "text-[#4A6064] hover:text-[#101B1E] hover:bg-[rgba(16,27,30,0.05)]",
    danger: "bg-[rgba(239,68,68,0.1)] text-[#DC2626] border border-[rgba(239,68,68,0.2)] hover:bg-[rgba(239,68,68,0.18)]",
    outline: "border border-[rgba(43,110,120,0.4)] text-[#2B6E78] hover:bg-[rgba(43,110,120,0.08)]",
  }[variant];
  const sizes = { sm: "h-7 px-3 text-xs rounded-md", md: "h-9 px-4 text-sm rounded-md", lg: "h-11 px-6 text-sm rounded-lg" }[size];
  return (
    <button {...props} disabled={props.disabled || loading} className={`${base} ${variants} ${sizes} ${className}`}>
      {loading ? <Spinner size={size === "lg" ? "md" : "sm"} /> : icon}
      {children}
      {iconRight && !loading && iconRight}
    </button>
  );
}

// ── Spinner ────────────────────────────────────────────────────────────────
export function Spinner({ size = "sm" }: { size?: "sm" | "md" | "lg" }) {
  const s = { sm: "size-3.5", md: "size-4", lg: "size-5" }[size];
  return (
    <svg className={`animate-spin ${s}`} viewBox="0 0 24 24" fill="none">
      <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
      <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

// ── Input ──────────────────────────────────────────────────────────────────
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}
export function Input({ label, error, icon, className = "", ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-xs font-medium text-[#4A6064] tracking-wide uppercase">{label}</label>}
      <div className="relative">
        {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7C9096]">{icon}</span>}
        <input
          {...props}
          className={`w-full h-9 bg-[#FFFFFF] border border-[rgba(16,27,30,0.08)] rounded-md text-sm text-[#101B1E] placeholder:text-[#7C9096] focus:border-[#2B6E78] focus:outline-none focus:ring-1 focus:ring-[rgba(43,110,120,0.3)] transition-all ${icon ? "pl-9" : "pl-3"} pr-3 ${error ? "border-[rgba(239,68,68,0.5)]" : ""} ${className}`}
        />
      </div>
      {error && <span className="text-xs text-[#DC2626]">{error}</span>}
    </div>
  );
}

// ── Textarea ───────────────────────────────────────────────────────────────
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}
export function Textarea({ label, error, className = "", ...props }: TextareaProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-xs font-medium text-[#4A6064] tracking-wide uppercase">{label}</label>}
      <textarea
        {...props}
        className={`w-full bg-[#FFFFFF] border border-[rgba(16,27,30,0.08)] rounded-md text-sm text-[#101B1E] placeholder:text-[#7C9096] focus:border-[#2B6E78] focus:outline-none focus:ring-1 focus:ring-[rgba(43,110,120,0.3)] transition-all p-3 resize-none ${error ? "border-[rgba(239,68,68,0.5)]" : ""} ${className}`}
      />
      {error && <span className="text-xs text-[#DC2626]">{error}</span>}
    </div>
  );
}

// ── Select ─────────────────────────────────────────────────────────────────
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}
export function Select({ label, error, options, className = "", ...props }: SelectProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-xs font-medium text-[#4A6064] tracking-wide uppercase">{label}</label>}
      <select
        {...props}
        className={`w-full h-9 bg-[#FFFFFF] border border-[rgba(16,27,30,0.08)] rounded-md text-sm text-[#101B1E] focus:border-[#2B6E78] focus:outline-none focus:ring-1 focus:ring-[rgba(43,110,120,0.3)] transition-all px-3 appearance-none cursor-pointer ${className}`}
      >
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

// ── Card ───────────────────────────────────────────────────────────────────
interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}
export function Card({ children, className = "", hover, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-[#FFFFFF] border border-[rgba(16,27,30,0.07)] rounded-xl p-5 ${hover ? "hover:border-[rgba(43,110,120,0.3)] hover:bg-[#F4F8F8] transition-all cursor-pointer" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

// ── KPI Card ───────────────────────────────────────────────────────────────
interface KPICardProps {
  label: string;
  value: string;
  change?: string;
  changePositive?: boolean;
  icon?: React.ReactNode;
  accent?: boolean;
}
export function KPICard({ label, value, change, changePositive, icon, accent }: KPICardProps) {
  return (
    <Card className={accent ? "border-[rgba(43,110,120,0.3)] bg-gradient-to-br from-[rgba(43,110,120,0.08)] to-[#FFFFFF]" : ""}>
      <div className="flex items-start justify-between mb-4">
        <span className="text-xs font-medium text-[#5E7378] uppercase tracking-wider">{label}</span>
        {icon && <span className={`text-lg ${accent ? "text-[#2B6E78]" : "text-[#7C9096]"}`}>{icon}</span>}
      </div>
      <div className="text-2xl font-semibold text-[#101B1E] tracking-tight mb-1">{value}</div>
      {change && (
        <div className={`text-xs font-medium ${changePositive ? "text-[#16A34A]" : "text-[#DC2626]"}`}>
          {changePositive ? "↑" : "↓"} {change} vs last month
        </div>
      )}
    </Card>
  );
}

// ── Progress Bar ───────────────────────────────────────────────────────────
export function ProgressBar({ value, max = 100, color = "#2B6E78", label, showPercent }: { value: number; max?: number; color?: string; label?: string; showPercent?: boolean }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="w-full">
      {(label || showPercent) && (
        <div className="flex justify-between mb-1.5">
          {label && <span className="text-xs text-[#4A6064]">{label}</span>}
          {showPercent && <span className="text-xs font-mono text-[#5E7378]">{pct}%</span>}
        </div>
      )}
      <div className="h-1.5 bg-[rgba(16,27,30,0.06)] rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

// ── Avatar ─────────────────────────────────────────────────────────────────
export function Avatar({ name, size = "md", src }: { name: string; size?: "xs" | "sm" | "md" | "lg"; src?: string }) {
  const initials = name.split(" ").map(n => n[0]).slice(0, 2).join("");
  const colors = ["#2B6E78", "#6D28D9", "#0E7490", "#047857", "#B45309", "#B91C1C"];
  const color = colors[name.charCodeAt(0) % colors.length];
  const sizes = { xs: "size-6 text-[9px]", sm: "size-7 text-[10px]", md: "size-8 text-xs", lg: "size-10 text-sm" }[size];
  return (
    <div className={`${sizes} rounded-full flex items-center justify-center font-semibold flex-shrink-0 overflow-hidden`} style={{ backgroundColor: src ? "transparent" : `${color}22`, color }}>
      {src ? <img src={src} alt={name} className="w-full h-full object-cover" /> : initials}
    </div>
  );
}

// ── Tabs ───────────────────────────────────────────────────────────────────
interface TabsProps {
  tabs: { id: string; label: string; count?: number }[];
  active: string;
  onChange: (id: string) => void;
}
export function Tabs({ tabs, active, onChange }: TabsProps) {
  return (
    <div className="flex gap-1 bg-[#DCE7E7] rounded-lg p-1 border border-[rgba(16,27,30,0.06)]">
      {tabs.map(t => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${active === t.id ? "bg-[#FFFFFF] text-[#101B1E] shadow-sm" : "text-[#5E7378] hover:text-[#4A6064]"}`}
        >
          {t.label}
          {t.count !== undefined && (
            <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${active === t.id ? "bg-[rgba(43,110,120,0.15)] text-[#2B6E78]" : "bg-[rgba(16,27,30,0.05)] text-[#7C9096]"}`}>
              {t.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

// ── Table ──────────────────────────────────────────────────────────────────
interface Column<T> { key: keyof T | string; label: string; render?: (row: T) => React.ReactNode; width?: string; }
interface TableProps<T> { columns: Column<T>[]; data: T[]; onRowClick?: (row: T) => void; }
export function Table<T extends Record<string, unknown>>({ columns, data, onRowClick }: TableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[rgba(16,27,30,0.06)]">
            {columns.map(c => (
              <th key={String(c.key)} className="text-left py-3 px-4 text-[10px] font-medium text-[#7C9096] uppercase tracking-widest" style={{ width: c.width }}>
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={i}
              onClick={() => onRowClick?.(row)}
              className={`border-b border-[rgba(16,27,30,0.04)] transition-colors ${onRowClick ? "cursor-pointer hover:bg-[rgba(16,27,30,0.025)]" : ""}`}
            >
              {columns.map(c => (
                <td key={String(c.key)} className="py-3 px-4 text-[#33474B]">
                  {c.render ? c.render(row) : String(row[c.key as keyof T] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Modal ──────────────────────────────────────────────────────────────────
interface ModalProps { open: boolean; onClose: () => void; title: string; children: React.ReactNode; size?: "sm" | "md" | "lg"; }
export function Modal({ open, onClose, title, children, size = "md" }: ModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  const sizes = { sm: "max-w-sm", md: "max-w-lg", lg: "max-w-2xl" }[size];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative w-full ${sizes} bg-[#FFFFFF] border border-[rgba(16,27,30,0.1)] rounded-2xl shadow-2xl animate-fade-in`}>
        <div className="flex items-center justify-between p-5 border-b border-[rgba(16,27,30,0.07)]">
          <h3 className="text-base font-semibold text-[#101B1E]">{title}</h3>
          <button onClick={onClose} className="text-[#7C9096] hover:text-[#101B1E] transition-colors w-7 h-7 flex items-center justify-center rounded-md hover:bg-[rgba(16,27,30,0.05)]">✕</button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

// ── Toast ──────────────────────────────────────────────────────────────────
export function Toast({ message, type = "success", onClose }: { message: string; type?: "success" | "error" | "info"; onClose: () => void }) {
  useEffect(() => { const t = setTimeout(onClose, 3500); return () => clearTimeout(t); }, [onClose]);
  const colors = { success: "border-[rgba(74,222,128,0.3)] text-[#16A34A]", error: "border-[rgba(248,113,113,0.3)] text-[#DC2626]", info: "border-[rgba(43,110,120,0.3)] text-[#2B6E78]" }[type];
  const icon = { success: "✓", error: "✕", info: "ℹ" }[type];
  return (
    <div className={`fixed bottom-6 right-6 z-[100] flex items-center gap-3 bg-[#FFFFFF] border ${colors} rounded-xl px-4 py-3 shadow-2xl animate-fade-in min-w-[280px]`}>
      <span className={`text-base font-bold ${colors.split(" ")[1]}`}>{icon}</span>
      <span className="text-sm text-[#33474B] flex-1">{message}</span>
      <button onClick={onClose} className="text-[#7C9096] hover:text-[#4A6064] transition-colors ml-2">✕</button>
    </div>
  );
}

// ── Stat Row ───────────────────────────────────────────────────────────────
export function StatRow({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-[rgba(16,27,30,0.05)] last:border-0">
      <span className="text-sm text-[#4A6064]">{label}</span>
      <div className="text-right">
        <div className="text-sm font-medium text-[#101B1E]">{value}</div>
        {sub && <div className="text-xs text-[#7C9096]">{sub}</div>}
      </div>
    </div>
  );
}

// ── Divider ────────────────────────────────────────────────────────────────
export function Divider({ label }: { label?: string }) {
  if (!label) return <div className="border-t border-[rgba(16,27,30,0.07)] my-4" />;
  return (
    <div className="flex items-center gap-3 my-4">
      <div className="flex-1 border-t border-[rgba(16,27,30,0.07)]" />
      <span className="text-[10px] text-[#7C9096] font-mono uppercase tracking-widest">{label}</span>
      <div className="flex-1 border-t border-[rgba(16,27,30,0.07)]" />
    </div>
  );
}

// ── Empty State ────────────────────────────────────────────────────────────
export function EmptyState({ icon, title, description, action }: { icon: string; title: string; description?: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="text-4xl mb-4 opacity-30">{icon}</div>
      <div className="text-base font-medium text-[#33474B] mb-2">{title}</div>
      {description && <div className="text-sm text-[#7C9096] mb-6 max-w-xs">{description}</div>}
      {action}
    </div>
  );
}

// ── Search Bar ─────────────────────────────────────────────────────────────
export function SearchBar({ placeholder = "Search...", value, onChange }: { placeholder?: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7C9096] text-xs">⌕</span>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="h-8 pl-7 pr-3 bg-[rgba(16,27,30,0.04)] border border-[rgba(16,27,30,0.07)] rounded-lg text-sm text-[#101B1E] placeholder:text-[#7C9096] focus:border-[rgba(43,110,120,0.4)] focus:outline-none focus:bg-[rgba(16,27,30,0.05)] transition-all w-full"
      />
    </div>
  );
}

// ── Command Palette ────────────────────────────────────────────────────────
const CMD_RESULTS = [
  { section: "Projects", items: ["Global Travel Platform", "HealthTech Portal v2", "Atlas E-Commerce Suite", "Nova Banking App"] },
  { section: "Clients", items: ["Atlas Travel Group", "MediCore Solutions", "FinEdge Capital", "ShopNova Inc."] },
  { section: "Tasks", items: ["Implement Booking Payment API", "Design System Audit", "Deploy to AWS ECS", "Write QA Test Suite"] },
  { section: "Team", items: ["Sarah Chen — Lead Engineer", "Marcus Webb — DevOps", "Priya Nair — Designer", "Tom Okonkwo — QA"] },
];
export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => { if (open) { inputRef.current?.focus(); setQ(""); } }, [open]);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); onClose(); } if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[12vh]">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-xl bg-[#FFFFFF] border border-[rgba(16,27,30,0.12)] rounded-2xl shadow-2xl animate-fade-in overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[rgba(16,27,30,0.07)]">
          <span className="text-[#7C9096] text-base">⌕</span>
          <input
            ref={inputRef}
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Search projects, tasks, clients, team..."
            className="flex-1 bg-transparent text-sm text-[#101B1E] placeholder:text-[#7C9096] focus:outline-none"
          />
          <kbd className="text-[10px] font-mono text-[#7C9096] bg-[rgba(16,27,30,0.05)] border border-[rgba(16,27,30,0.07)] px-1.5 py-0.5 rounded">ESC</kbd>
        </div>
        <div className="max-h-80 overflow-y-auto py-2">
          {CMD_RESULTS.map(section => (
            <div key={section.section}>
              <div className="px-4 py-2 text-[10px] font-mono text-[#7C9096] uppercase tracking-widest">{section.section}</div>
              {section.items.filter(i => !q || i.toLowerCase().includes(q.toLowerCase())).map(item => (
                <button key={item} onClick={onClose} className="w-full text-left px-4 py-2 text-sm text-[#33474B] hover:bg-[rgba(16,27,30,0.04)] hover:text-[#101B1E] transition-colors">
                  {item}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
