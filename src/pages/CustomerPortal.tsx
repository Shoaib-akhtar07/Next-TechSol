import { useState } from "react";
import { Badge, Button, Card, KPICard, ProgressBar, Avatar, Tabs, Table, EmptyState, SearchBar } from "../components/ui";

type NavItem = { id: string; icon: string; label: string; badge?: number };

const NAV_ITEMS: NavItem[] = [
  { id: "dashboard", icon: "⊞", label: "Dashboard" },
  { id: "projects", icon: "◫", label: "Projects", badge: 3 },
  { id: "tasks", icon: "◎", label: "Tasks", badge: 7 },
  { id: "messages", icon: "◉", label: "Messages", badge: 2 },
  { id: "documents", icon: "⬡", label: "Documents" },
  { id: "invoices", icon: "◈", label: "Invoices" },
  { id: "support", icon: "⊕", label: "Support" },
  { id: "notifications", icon: "◆", label: "Notifications", badge: 4 },
  { id: "settings", icon: "⊟", label: "Settings" },
];

function Sidebar({ active, onChange, onLogout }: { active: string; onChange: (id: string) => void; onLogout: () => void }) {
  return (
    <aside className="w-56 flex-shrink-0 bg-[var(--background)] border-r border-[rgba(16,27,30,0.07)] flex flex-col">
      <div className="h-14 flex items-center px-4 border-b border-[rgba(16,27,30,0.07)]">
        <div className="flex items-center gap-2">
          <div className="size-6 rounded-md bg-[var(--primary)] flex items-center justify-center">
            <span className="text-white font-bold text-[10px] font-mono">N</span>
          </div>
          <span className="text-sm font-semibold text-[var(--foreground)]">Next TechSol</span>
        </div>
        <div className="ml-auto">
          <Badge variant="info" size="sm">Client</Badge>
        </div>
      </div>
      <div className="flex-1 py-3 overflow-y-auto">
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            onClick={() => onChange(item.id)}
            className={`w-full flex items-center gap-2.5 px-4 py-2 text-sm transition-all ${active === item.id ? "text-[var(--foreground)] bg-[color-mix(in_srgb,var(--primary)_10%,transparent)] border-r-2 border-[var(--primary)]" : "text-[#5E7378] hover:text-[#4A6064] hover:bg-[rgba(16,27,30,0.02)]"}`}
          >
            <span className="text-base w-5 text-center">{item.icon}</span>
            <span className="flex-1 text-left">{item.label}</span>
            {item.badge && (
              <span className="text-[10px] font-mono bg-[color-mix(in_srgb,var(--primary)_20%,transparent)] text-[var(--primary)] px-1.5 py-0.5 rounded-full">{item.badge}</span>
            )}
          </button>
        ))}
      </div>
      <div className="p-4 border-t border-[rgba(16,27,30,0.07)]">
        <div className="flex items-center gap-2.5 mb-3">
          <Avatar name="James Mitchell" size="sm" />
          <div>
            <div className="text-xs font-medium text-[var(--foreground)]">James Mitchell</div>
            <div className="text-[10px] text-[#7C9096]">Atlas Travel Group</div>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="w-full justify-start text-xs" onClick={onLogout}>← Sign out</Button>
      </div>
    </aside>
  );
}

function TopBar({ title, subtitle, onSearch }: { title: string; subtitle?: string; onSearch?: (v: string) => void }) {
  const [q, setQ] = useState("");
  return (
    <div className="h-14 flex items-center justify-between px-6 border-b border-[rgba(16,27,30,0.07)] flex-shrink-0">
      <div>
        <div className="text-sm font-semibold text-[var(--foreground)]">{title}</div>
        {subtitle && <div className="text-xs text-[#7C9096]">{subtitle}</div>}
      </div>
      <div className="flex items-center gap-3">
        {onSearch && <SearchBar value={q} onChange={v => { setQ(v); onSearch(v); }} placeholder="Search..." />}
        <button className="relative w-8 h-8 flex items-center justify-center rounded-lg text-[#5E7378] hover:text-[var(--foreground)] hover:bg-[rgba(16,27,30,0.05)] transition-all">
          <span>◆</span>
          <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-[var(--primary)]" />
        </button>
        <Avatar name="James Mitchell" size="sm" />
      </div>
    </div>
  );
}

// ── Dashboard ──────────────────────────────────────────────────────────────
function Dashboard() {
  return (
    <div className="flex-1 overflow-y-auto p-6 animate-fade-in">
      <div className="max-w-6xl">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">Good morning, James.</h2>
          <p className="text-sm text-[#7C9096] mt-0.5">Here's what needs your attention today.</p>
        </div>
        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <KPICard label="Active Projects" value="3" icon="◫" accent />
          <KPICard label="Open Tasks" value="7" icon="◎" />
          <KPICard label="Pending Approvals" value="2" icon="⊕" />
          <KPICard label="Outstanding Invoices" value="$24,500" icon="◈" />
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          {/* Active Projects */}
          <div className="lg:col-span-2">
            <Card>
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-semibold text-[var(--foreground)]">Active Projects</div>
                <Button variant="ghost" size="sm">View all →</Button>
              </div>
              <div className="space-y-4">
                {[
                  { name: "Global Travel Platform", phase: "Development", progress: 68, status: "on-track", due: "Mar 15, 2026" },
                  { name: "Mobile App v2.0", phase: "Design", progress: 30, status: "on-track", due: "Apr 28, 2026" },
                  { name: "API Integration Suite", phase: "Testing", progress: 85, status: "review", due: "Feb 28, 2026" },
                ].map(p => (
                  <div key={p.name} className="p-4 bg-[#DCE7E7] rounded-xl border border-[rgba(16,27,30,0.05)]">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium text-[var(--foreground)]">{p.name}</div>
                      <Badge variant={p.status === "on-track" ? "success" : "warning"} size="sm" dot>{p.phase}</Badge>
                    </div>
                    <ProgressBar value={p.progress} showPercent color={p.progress > 80 ? "#16A34A" : "var(--primary)"} />
                    <div className="text-[11px] text-[#7C9096] mt-2">Due {p.due}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right column */}
          <div className="space-y-5">
            <Card>
              <div className="text-sm font-semibold text-[var(--foreground)] mb-3">Pending Approvals</div>
              {[
                { title: "Homepage Design v3", type: "Design Review", urgent: true },
                { title: "Payment Gateway Spec", type: "Technical Review", urgent: false },
              ].map(a => (
                <div key={a.title} className="flex items-start gap-3 py-3 border-b border-[rgba(16,27,30,0.05)] last:border-0">
                  <div className={`size-1.5 rounded-full mt-1.5 flex-shrink-0 ${a.urgent ? "bg-[#CA8A04]" : "bg-[#7C9096]"}`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-[#33474B] truncate">{a.title}</div>
                    <div className="text-[11px] text-[#7C9096]">{a.type}</div>
                  </div>
                  <Button size="sm" variant="outline" className="text-[10px] h-6 px-2 flex-shrink-0">Review</Button>
                </div>
              ))}
            </Card>

            <Card>
              <div className="text-sm font-semibold text-[var(--foreground)] mb-3">Recent Messages</div>
              {[
                { from: "Sarah Chen", msg: "Design review scheduled for Friday 2pm", time: "2h ago" },
                { from: "Project Bot", msg: "Sprint 7 completed — 23/24 tasks done", time: "5h ago" },
              ].map(m => (
                <div key={m.from} className="flex gap-3 py-3 border-b border-[rgba(16,27,30,0.05)] last:border-0">
                  <Avatar name={m.from} size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[11px] font-medium text-[#33474B]">{m.from}</span>
                      <span className="text-[10px] text-[#7C9096]">{m.time}</span>
                    </div>
                    <div className="text-[11px] text-[#7C9096] truncate">{m.msg}</div>
                  </div>
                </div>
              ))}
            </Card>

            <Card>
              <div className="text-sm font-semibold text-[var(--foreground)] mb-3">Upcoming Milestones</div>
              {[
                { title: "API v2 Go-Live", date: "Feb 28", status: "danger" as const },
                { title: "Design Handoff", date: "Mar 5", status: "warning" as const },
                { title: "Beta Launch", date: "Mar 20", status: "success" as const },
              ].map(m => (
                <div key={m.title} className="flex items-center justify-between py-2 border-b border-[rgba(16,27,30,0.05)] last:border-0">
                  <div className="flex items-center gap-2">
                    <div className={`size-1.5 rounded-full ${m.status === "danger" ? "bg-[#DC2626]" : m.status === "warning" ? "bg-[#CA8A04]" : "bg-[#16A34A]"}`} />
                    <span className="text-xs text-[#33474B]">{m.title}</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#7C9096]">{m.date}</span>
                </div>
              ))}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Projects ───────────────────────────────────────────────────────────────
function Projects() {
  const [activeTab, setActiveTab] = useState("active");
  return (
    <div className="flex-1 overflow-y-auto p-6 animate-fade-in">
      <div className="max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">Projects</h2>
          <Tabs tabs={[{id:"active",label:"Active",count:3},{id:"completed",label:"Completed",count:8},{id:"all",label:"All"}]} active={activeTab} onChange={setActiveTab} />
        </div>
        <div className="grid lg:grid-cols-2 gap-5">
          {[
            { name: "Global Travel Platform", phase: "Development", progress: 68, health: "On Track", client: "Atlas Travel Group", team: ["Sarah Chen", "Marcus Webb", "Tom Okonkwo"], start: "Oct 2025", end: "Mar 2026", budget: "$84,000", spent: 60 },
            { name: "Mobile App v2.0", phase: "Design", progress: 30, health: "On Track", client: "Atlas Travel Group", team: ["Priya Nair", "Sarah Chen"], start: "Jan 2026", end: "Apr 2026", budget: "$38,000", spent: 28 },
            { name: "API Integration Suite", phase: "Testing", progress: 85, health: "Needs Review", client: "Atlas Travel Group", team: ["Marcus Webb", "Tom Okonkwo"], start: "Dec 2025", end: "Feb 2026", budget: "$22,000", spent: 82 },
          ].map(p => (
            <div key={p.name} className="bg-[#FFFFFF] border border-[rgba(16,27,30,0.07)] rounded-xl p-5 hover:border-[color-mix(in_srgb,var(--primary)_25%,transparent)] transition-all">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-sm font-semibold text-[var(--foreground)] mb-1">{p.name}</div>
                  <div className="text-[11px] text-[#7C9096]">{p.client}</div>
                </div>
                <Badge variant={p.health === "On Track" ? "success" : "warning"} dot>{p.health}</Badge>
              </div>
              <div className="mb-4">
                <ProgressBar value={p.progress} showPercent label="Overall Progress" />
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4 text-center">
                <div className="bg-[#DCE7E7] rounded-lg p-2">
                  <div className="text-xs font-mono text-[var(--foreground)]">{p.phase}</div>
                  <div className="text-[10px] text-[#7C9096]">Current Phase</div>
                </div>
                <div className="bg-[#DCE7E7] rounded-lg p-2">
                  <div className="text-xs font-mono text-[var(--foreground)]">{p.budget}</div>
                  <div className="text-[10px] text-[#7C9096]">Budget</div>
                </div>
                <div className="bg-[#DCE7E7] rounded-lg p-2">
                  <div className="text-xs font-mono text-[var(--foreground)]">{p.end}</div>
                  <div className="text-[10px] text-[#7C9096]">Due Date</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex -space-x-1">
                  {p.team.map(name => <Avatar key={name} name={name} size="xs" />)}
                </div>
                <Button variant="ghost" size="sm">View Details →</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Tasks ──────────────────────────────────────────────────────────────────
function Tasks() {
  const tasks = [
    { id: "TSK-041", title: "Review homepage wireframes", project: "Global Travel Platform", status: "Approval Needed", priority: "High", due: "Feb 24", assignee: "Priya Nair" },
    { id: "TSK-037", title: "Provide API credentials for payment gateway", project: "API Integration Suite", status: "Blocked", priority: "Critical", due: "Feb 22", assignee: "Marcus Webb" },
    { id: "TSK-039", title: "UAT for search results page", project: "Global Travel Platform", status: "In Progress", priority: "Medium", due: "Feb 26", assignee: "Tom Okonkwo" },
    { id: "TSK-034", title: "Sign off on design tokens", project: "Mobile App v2.0", status: "Pending", priority: "Low", due: "Mar 1", assignee: "Priya Nair" },
    { id: "TSK-028", title: "Approve database schema v2", project: "API Integration Suite", status: "Completed", priority: "High", due: "Feb 15", assignee: "Sarah Chen" },
  ];
  const statusColor: Record<string, "warning" | "danger" | "info" | "success" | "neutral"> = {
    "Approval Needed": "warning", "Blocked": "danger", "In Progress": "info", "Pending": "neutral", "Completed": "success",
  };
  const priorityColor: Record<string, "danger" | "warning" | "neutral" | "info"> = {
    "Critical": "danger", "High": "warning", "Medium": "neutral", "Low": "info",
  };
  return (
    <div className="flex-1 overflow-y-auto p-6 animate-fade-in">
      <div className="max-w-6xl">
        <h2 className="text-xl font-semibold text-[var(--foreground)] mb-6">Tasks</h2>
        <Card className="!p-0 overflow-hidden">
          <Table
            columns={[
              { key: "id", label: "ID", width: "80px", render: r => <span className="font-mono text-[10px] text-[#7C9096]">{String(r.id)}</span> },
              { key: "title", label: "Task", render: r => <span className="text-[var(--foreground)] font-medium">{String(r.title)}</span> },
              { key: "project", label: "Project", render: r => <span className="text-xs text-[#5E7378]">{String(r.project)}</span> },
              { key: "status", label: "Status", render: r => <Badge variant={statusColor[String(r.status)] || "neutral"} dot>{String(r.status)}</Badge> },
              { key: "priority", label: "Priority", render: r => <Badge variant={priorityColor[String(r.priority)] || "neutral"}>{String(r.priority)}</Badge> },
              { key: "due", label: "Due", render: r => <span className="font-mono text-[11px] text-[#7C9096]">{String(r.due)}</span> },
              { key: "assignee", label: "Assigned", render: r => <div className="flex items-center gap-1.5"><Avatar name={String(r.assignee)} size="xs" /><span className="text-xs text-[#5E7378]">{String(r.assignee)}</span></div> },
            ]}
            data={tasks as Record<string, unknown>[]}
          />
        </Card>
      </div>
    </div>
  );
}

// ── Documents ──────────────────────────────────────────────────────────────
function Documents() {
  const [search, setSearch] = useState("");
  const docs = [
    { name: "Project Scope — Global Travel Platform.pdf", category: "Contracts", size: "1.2 MB", date: "Jan 15, 2026", status: "Signed" },
    { name: "UI Design System v2.fig", category: "Designs", size: "18.4 MB", date: "Feb 10, 2026", status: "Latest" },
    { name: "Technical Requirements Document.docx", category: "Requirements", size: "340 KB", date: "Oct 5, 2025", status: "Approved" },
    { name: "Invoice #INV-2026-007.pdf", category: "Invoices", size: "82 KB", date: "Feb 1, 2026", status: "Paid" },
    { name: "API Specification v2.pdf", category: "Deliverables", size: "560 KB", date: "Feb 18, 2026", status: "Review" },
  ];
  return (
    <div className="flex-1 overflow-y-auto p-6 animate-fade-in">
      <div className="max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">Documents</h2>
          <div className="flex gap-3">
            <SearchBar value={search} onChange={setSearch} placeholder="Search documents..." />
            <Button size="sm">Upload</Button>
          </div>
        </div>
        <div className="flex gap-2 mb-5">
          {["All", "Contracts", "Designs", "Requirements", "Invoices", "Deliverables"].map(cat => (
            <button key={cat} className="text-xs px-3 py-1.5 rounded-lg border border-[rgba(16,27,30,0.07)] text-[#5E7378] hover:text-[var(--foreground)] hover:border-[color-mix(in_srgb,var(--primary)_30%,transparent)] transition-all">
              {cat}
            </button>
          ))}
        </div>
        <Card className="!p-0 overflow-hidden">
          <Table
            columns={[
              { key: "name", label: "File", render: r => <div className="flex items-center gap-2"><span className="text-base">📄</span><span className="text-[var(--foreground)] text-xs font-medium">{String(r.name)}</span></div> },
              { key: "category", label: "Category", render: r => <Badge variant="neutral" size="sm">{String(r.category)}</Badge> },
              { key: "size", label: "Size", render: r => <span className="font-mono text-[11px] text-[#7C9096]">{String(r.size)}</span> },
              { key: "date", label: "Date", render: r => <span className="text-xs text-[#5E7378]">{String(r.date)}</span> },
              { key: "status", label: "Status", render: r => <Badge variant={String(r.status) === "Signed" || String(r.status) === "Paid" || String(r.status) === "Approved" ? "success" : String(r.status) === "Latest" ? "info" : "warning"} size="sm">{String(r.status)}</Badge> },
              { key: "actions", label: "", render: () => <div className="flex gap-2"><Button size="sm" variant="ghost">Preview</Button><Button size="sm" variant="secondary">Download</Button></div> },
            ]}
            data={docs as Record<string, unknown>[]}
          />
        </Card>
      </div>
    </div>
  );
}

// ── Invoices ───────────────────────────────────────────────────────────────
function Invoices() {
  const invoices = [
    { id: "INV-2026-009", desc: "Development Milestone 4 — Sprint 8-9", amount: "$18,000", date: "Feb 20, 2026", due: "Mar 6, 2026", status: "Unpaid" },
    { id: "INV-2026-007", desc: "Design Phase Completion", amount: "$12,500", date: "Feb 1, 2026", due: "Feb 15, 2026", status: "Paid" },
    { id: "INV-2026-005", desc: "Development Milestone 3 — Sprint 6-7", amount: "$18,000", date: "Jan 10, 2026", due: "Jan 25, 2026", status: "Paid" },
    { id: "INV-2025-019", desc: "API Integration — Phase 1", amount: "$6,000", date: "Dec 5, 2025", due: "Dec 20, 2025", status: "Paid" },
  ];
  return (
    <div className="flex-1 overflow-y-auto p-6 animate-fade-in">
      <div className="max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">Invoices</h2>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <KPICard label="Outstanding" value="$18,000" icon="◈" />
          <KPICard label="Paid This Month" value="$12,500" icon="◎" />
          <KPICard label="Total Project" value="$84,000" icon="◆" accent />
        </div>
        <Card className="!p-0 overflow-hidden">
          <Table
            columns={[
              { key: "id", label: "Invoice", render: r => <span className="font-mono text-[11px] text-[var(--primary)]">{String(r.id)}</span> },
              { key: "desc", label: "Description", render: r => <span className="text-xs text-[#33474B]">{String(r.desc)}</span> },
              { key: "amount", label: "Amount", render: r => <span className="font-semibold text-sm text-[var(--foreground)]">{String(r.amount)}</span> },
              { key: "date", label: "Issued", render: r => <span className="text-xs text-[#5E7378]">{String(r.date)}</span> },
              { key: "due", label: "Due", render: r => <span className="text-xs text-[#5E7378]">{String(r.due)}</span> },
              { key: "status", label: "Status", render: r => <Badge variant={String(r.status) === "Paid" ? "success" : "warning"} dot>{String(r.status)}</Badge> },
              { key: "actions", label: "", render: r => <div className="flex gap-1">{String(r.status) === "Unpaid" && <Button size="sm" variant="primary">Pay Now</Button>}<Button size="sm" variant="ghost">View</Button></div> },
            ]}
            data={invoices as Record<string, unknown>[]}
          />
        </Card>
      </div>
    </div>
  );
}

// ── Notifications ──────────────────────────────────────────────────────────
function Notifications() {
  const notifs = [
    { type: "task", icon: "◎", title: "Approval Required", desc: "Homepage Design v3 needs your review and approval.", time: "2h ago", unread: true },
    { type: "invoice", icon: "◈", title: "Invoice Generated", desc: "Invoice INV-2026-009 for $18,000 has been issued.", time: "1d ago", unread: true },
    { type: "project", icon: "◫", title: "Sprint 9 Started", desc: "Development milestone 4 has begun on Global Travel Platform.", time: "2d ago", unread: true },
    { type: "message", icon: "◉", title: "New Message", desc: "Sarah Chen: \"Can we schedule a design review call?\"", time: "2d ago", unread: false },
    { type: "milestone", icon: "◆", title: "Milestone Reached", desc: "API Integration Suite — QA phase completed successfully.", time: "4d ago", unread: false },
  ];
  return (
    <div className="flex-1 overflow-y-auto p-6 animate-fade-in">
      <div className="max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">Notifications</h2>
          <Button variant="ghost" size="sm">Mark all as read</Button>
        </div>
        <div className="space-y-2">
          {notifs.map((n, i) => (
            <div key={i} className={`flex gap-4 p-4 rounded-xl border transition-all ${n.unread ? "bg-[color-mix(in_srgb,var(--primary)_5%,transparent)] border-[color-mix(in_srgb,var(--primary)_15%,transparent)]" : "bg-[#FFFFFF] border-[rgba(16,27,30,0.06)]"}`}>
              <div className={`text-lg ${n.unread ? "text-[var(--primary)]" : "text-[#7C9096]"}`}>{n.icon}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-medium text-[var(--foreground)]">{n.title}</span>
                  {n.unread && <span className="size-1.5 rounded-full bg-[var(--primary)]" />}
                </div>
                <div className="text-xs text-[#5E7378]">{n.desc}</div>
              </div>
              <div className="text-[11px] text-[#7C9096] whitespace-nowrap">{n.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CustomerPortal({ onLogout }: { onLogout: () => void }) {
  const [activeView, setActiveView] = useState("dashboard");
  const titles: Record<string, string> = {
    dashboard: "Dashboard", projects: "Projects", tasks: "Tasks",
    messages: "Messages", documents: "Documents", invoices: "Invoices",
    support: "Support", notifications: "Notifications", settings: "Settings",
  };
  const renderView = () => {
    switch (activeView) {
      case "dashboard": return <Dashboard />;
      case "projects": return <Projects />;
      case "tasks": return <Tasks />;
      case "documents": return <Documents />;
      case "invoices": return <Invoices />;
      case "notifications": return <Notifications />;
      default: return (
        <div className="flex-1 flex items-center justify-center">
          <EmptyState icon="⊡" title={`${titles[activeView]} — Coming Soon`} description="This section is under active development." />
        </div>
      );
    }
  };
  return (
    <div className="h-screen flex bg-[var(--background)] overflow-hidden">
      <Sidebar active={activeView} onChange={setActiveView} onLogout={onLogout} />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar title={titles[activeView]} subtitle="Atlas Travel Group" />
        {renderView()}
      </div>
    </div>
  );
}
