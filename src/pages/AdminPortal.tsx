import { useState } from "react";
import { Badge, Button, Card, KPICard, ProgressBar, Avatar, Tabs, Table, EmptyState, Modal, StatRow, Divider } from "../components/ui";

const NAV_ITEMS = [
  { id: "dashboard", icon: "⊞", label: "Dashboard" },
  { id: "leads", icon: "◎", label: "Leads", badge: 14 },
  { id: "customers", icon: "⊕", label: "Customers" },
  { id: "projects", icon: "◫", label: "Projects" },
  { id: "employees", icon: "◆", label: "Employees" },
  { id: "teams", icon: "⬡", label: "Teams" },
  { id: "invoices", icon: "◈", label: "Invoices" },
  { id: "analytics", icon: "⬘", label: "Analytics" },
  { id: "roles", icon: "◉", label: "Roles & Permissions" },
  { id: "ai", icon: "⊟", label: "AI Assistant" },
  { id: "settings", icon: "⊡", label: "Settings" },
];

function AdminSidebar({ active, onChange, onLogout }: { active: string; onChange: (id: string) => void; onLogout: () => void }) {
  return (
    <aside className="w-56 flex-shrink-0 bg-[#0a0a10] border-r border-[rgba(255,255,255,0.07)] flex flex-col">
      <div className="h-14 flex items-center px-4 border-b border-[rgba(255,255,255,0.07)]">
        <div className="flex items-center gap-2">
          <div className="size-6 rounded-md bg-[#4f6ef7] flex items-center justify-center">
            <span className="text-white font-bold text-[10px] font-mono">A</span>
          </div>
          <span className="text-sm font-semibold text-[#f1f1f3]">Arcane</span>
        </div>
        <div className="ml-auto">
          <Badge variant="danger" size="sm">Admin</Badge>
        </div>
      </div>
      <div className="flex-1 py-3 overflow-y-auto">
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            onClick={() => onChange(item.id)}
            className={`w-full flex items-center gap-2.5 px-4 py-2 text-sm transition-all ${active === item.id ? "text-[#f1f1f3] bg-[rgba(79,110,247,0.1)] border-r-2 border-[#4f6ef7]" : "text-[#6b6b7a] hover:text-[#9494a0] hover:bg-[rgba(255,255,255,0.02)]"}`}
          >
            <span className="text-base w-5 text-center">{item.icon}</span>
            <span className="flex-1 text-left">{item.label}</span>
            {item.badge && (
              <span className="text-[10px] font-mono bg-[rgba(79,110,247,0.2)] text-[#4f6ef7] px-1.5 py-0.5 rounded-full">{item.badge}</span>
            )}
          </button>
        ))}
      </div>
      <div className="p-4 border-t border-[rgba(255,255,255,0.07)]">
        <div className="flex items-center gap-2.5 mb-3">
          <Avatar name="Alex Rivera" size="sm" />
          <div>
            <div className="text-xs font-medium text-[#f1f1f3]">Alex Rivera</div>
            <div className="text-[10px] text-[#5a5a66]">Super Admin</div>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="w-full justify-start text-xs" onClick={onLogout}>← Sign out</Button>
      </div>
    </aside>
  );
}

function AdminTopBar({ title }: { title: string }) {
  return (
    <div className="h-14 flex items-center justify-between px-6 border-b border-[rgba(255,255,255,0.07)] flex-shrink-0">
      <div className="text-sm font-semibold text-[#f1f1f3]">{title}</div>
      <div className="flex items-center gap-3">
        <kbd className="text-[10px] font-mono text-[#5a5a66] bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.07)] px-1.5 py-0.5 rounded">⌘K</kbd>
        <button className="relative w-8 h-8 flex items-center justify-center rounded-lg text-[#6b6b7a] hover:text-[#f1f1f3] hover:bg-[rgba(255,255,255,0.05)] transition-all">
          <span>◆</span>
          <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-[#f87171]" />
        </button>
        <Avatar name="Alex Rivera" size="sm" />
      </div>
    </div>
  );
}

// ── Executive Dashboard ────────────────────────────────────────────────────
function ExecDashboard() {
  return (
    <div className="flex-1 overflow-y-auto p-6 animate-fade-in">
      <div className="max-w-7xl">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-[#f1f1f3]">Management Overview</h2>
          <p className="text-sm text-[#5a5a66] mt-0.5">February 2026 · Last updated 5 minutes ago</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <KPICard label="Monthly Revenue" value="$142K" change="18.4%" changePositive icon="◈" accent />
          <KPICard label="Active Projects" value="11" change="3 new" changePositive icon="◫" />
          <KPICard label="Pipeline Value" value="$380K" change="22%" changePositive icon="◎" />
          <KPICard label="Team Utilization" value="84%" change="4%" changePositive icon="◆" />
        </div>

        <div className="grid lg:grid-cols-3 gap-5 mb-5">
          {/* Revenue Chart */}
          <div className="lg:col-span-2">
            <Card>
              <div className="flex items-center justify-between mb-5">
                <div className="text-sm font-semibold text-[#f1f1f3]">Revenue — Last 6 Months</div>
                <Badge variant="success" dot>+18.4% MoM</Badge>
              </div>
              <div className="relative h-40 flex items-end gap-3 pt-4">
                {[
                  { month: "Sep", val: 88 }, { month: "Oct", val: 94 }, { month: "Nov", val: 108 },
                  { month: "Dec", val: 118 }, { month: "Jan", val: 126 }, { month: "Feb", val: 142 },
                ].map((d, i, arr) => (
                  <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                    <div className="text-[10px] font-mono text-[#6b6b7a]">${d.val}K</div>
                    <div
                      className="w-full rounded-t-md transition-all"
                      style={{
                        height: `${(d.val / 160) * 120}px`,
                        background: i === arr.length - 1 ? "linear-gradient(to top, #4f6ef7, #6f8ef9)" : "rgba(79,110,247,0.2)",
                      }}
                    />
                    <div className="text-[10px] text-[#5a5a66]">{d.month}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-5">
            <Card>
              <div className="text-sm font-semibold text-[#f1f1f3] mb-4">Project Health</div>
              {[
                { label: "On Track", count: 8, pct: 73, color: "#4ade80" },
                { label: "At Risk", count: 2, pct: 18, color: "#facc15" },
                { label: "Delayed", count: 1, pct: 9, color: "#f87171" },
              ].map(s => (
                <div key={s.label} className="mb-3 last:mb-0">
                  <ProgressBar value={s.pct} label={`${s.label} (${s.count})`} showPercent color={s.color} />
                </div>
              ))}
            </Card>
            <Card>
              <div className="text-sm font-semibold text-[#f1f1f3] mb-3">Key Metrics</div>
              <StatRow label="Avg. Project Delivery" value="98.2%" sub="vs 97.8% last mo." />
              <StatRow label="Client Satisfaction" value="4.8 / 5.0" sub="Based on 12 reviews" />
              <StatRow label="Avg. Time to Win" value="14 days" sub="Lead to signed contract" />
              <StatRow label="Open Support Tickets" value="3" sub="All below SLA" />
            </Card>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-5">
          {/* Active Projects Table */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-semibold text-[#f1f1f3]">Active Projects</div>
              <Button variant="ghost" size="sm">View all →</Button>
            </div>
            {[
              { name: "Global Travel Platform", client: "Atlas Travel Group", pm: "Marcus Webb", health: "On Track", progress: 68 },
              { name: "HealthTech Portal v2", client: "MediCore Solutions", pm: "Sarah Chen", health: "On Track", progress: 44 },
              { name: "Investment Portal", client: "FinEdge Capital", pm: "Tom Okonkwo", health: "At Risk", progress: 91 },
              { name: "E-Commerce Suite", client: "ShopNova Inc.", pm: "Priya Nair", health: "On Track", progress: 22 },
            ].map(p => (
              <div key={p.name} className="flex items-center gap-3 py-2.5 border-b border-[rgba(255,255,255,0.05)] last:border-0">
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-[#c4c4cc] truncate">{p.name}</div>
                  <div className="text-[10px] text-[#5a5a66]">{p.client} · {p.pm}</div>
                </div>
                <div className="w-20 hidden sm:block">
                  <ProgressBar value={p.progress} color={p.health === "At Risk" ? "#facc15" : "#4ade80"} />
                </div>
                <Badge variant={p.health === "On Track" ? "success" : "warning"} size="sm">{p.health}</Badge>
              </div>
            ))}
          </Card>

          {/* CRM Pipeline */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-semibold text-[#f1f1f3]">Sales Pipeline</div>
              <Badge variant="info">$380K total</Badge>
            </div>
            {[
              { stage: "New", count: 5, value: "$68K", color: "#6b6b7a" },
              { stage: "Contacted", count: 4, value: "$54K", color: "#9494a0" },
              { stage: "Qualified", count: 3, value: "$86K", color: "#4f6ef7" },
              { stage: "Proposal", count: 4, value: "$112K", color: "#facc15" },
              { stage: "Negotiation", count: 2, value: "$60K", color: "#4ade80" },
            ].map(s => (
              <div key={s.stage} className="flex items-center gap-3 py-2 border-b border-[rgba(255,255,255,0.05)] last:border-0">
                <div className="size-2 rounded-full flex-shrink-0" style={{ background: s.color }} />
                <span className="text-xs text-[#c4c4cc] flex-1">{s.stage}</span>
                <span className="text-[11px] font-mono text-[#5a5a66]">{s.count} leads</span>
                <span className="text-xs font-semibold text-[#f1f1f3]">{s.value}</span>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}

// ── CRM Leads ──────────────────────────────────────────────────────────────
function CRMLeads() {
  const [activeTab, setActiveTab] = useState("all");
  const leads = [
    { company: "NorthStar Logistics", contact: "Daniel Park", email: "d.park@northstar.io", stage: "Proposal", value: "$42,000", source: "Website", assigned: "Marcus Webb", updated: "2h ago" },
    { company: "BrightPath Education", contact: "Emma Torres", email: "emma@brightpath.com", stage: "Qualified", value: "$28,000", source: "Referral", assigned: "Sarah Chen", updated: "5h ago" },
    { company: "Vertex Real Estate", contact: "Robert Kim", email: "r.kim@vertexre.com", stage: "Negotiation", value: "$65,000", source: "LinkedIn", assigned: "Alex Rivera", updated: "1d ago" },
    { company: "CloudNine SaaS", contact: "Aisha Johnson", email: "aisha@cloudnine.io", stage: "Contacted", value: "$18,000", source: "Cold Outreach", assigned: "Tom Okonkwo", updated: "2d ago" },
    { company: "MegaCorp Enterprise", contact: "Chris Brennan", email: "cbrennan@megacorp.com", stage: "New", value: "$120,000", source: "Conference", assigned: "Alex Rivera", updated: "3d ago" },
  ];
  const stageColor: Record<string, "neutral" | "info" | "warning" | "success" | "default"> = {
    New: "neutral", Contacted: "neutral", Qualified: "info", Proposal: "warning", Negotiation: "success",
  };
  return (
    <div className="flex-1 overflow-y-auto p-6 animate-fade-in">
      <div className="max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-[#f1f1f3]">Lead Management</h2>
          <div className="flex gap-3">
            <Tabs tabs={[{id:"all",label:"All",count:14},{id:"mine",label:"My Leads",count:5},{id:"new",label:"New",count:5}]} active={activeTab} onChange={setActiveTab} />
            <Button size="sm">+ Add Lead</Button>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-3 mb-6">
          {["New", "Contacted", "Qualified", "Proposal", "Negotiation"].map((stage, i) => (
            <div key={stage} className="bg-[#111118] border border-[rgba(255,255,255,0.07)] rounded-xl p-3 text-center">
              <div className="text-lg font-semibold text-[#f1f1f3]">{[5, 4, 3, 4, 2][i]}</div>
              <div className="text-[10px] text-[#5a5a66]">{stage}</div>
            </div>
          ))}
        </div>
        <Card className="!p-0 overflow-hidden">
          <Table
            columns={[
              { key: "company", label: "Company", render: r => <span className="font-medium text-[#f1f1f3]">{String(r.company)}</span> },
              { key: "contact", label: "Contact", render: r => <div className="flex items-center gap-1.5"><Avatar name={String(r.contact)} size="xs" /><span className="text-xs text-[#9494a0]">{String(r.contact)}</span></div> },
              { key: "stage", label: "Stage", render: r => <Badge variant={stageColor[String(r.stage)] || "neutral"} dot>{String(r.stage)}</Badge> },
              { key: "value", label: "Est. Value", render: r => <span className="font-semibold text-[#f1f1f3]">{String(r.value)}</span> },
              { key: "assigned", label: "Assigned", render: r => <div className="flex items-center gap-1.5"><Avatar name={String(r.assigned)} size="xs" /><span className="text-xs text-[#6b6b7a]">{String(r.assigned)}</span></div> },
              { key: "updated", label: "Updated", render: r => <span className="text-[11px] text-[#5a5a66]">{String(r.updated)}</span> },
              { key: "actions", label: "", render: () => <div className="flex gap-1"><Button size="sm" variant="ghost">View</Button></div> },
            ]}
            data={leads as Record<string, unknown>[]}
          />
        </Card>
      </div>
    </div>
  );
}

// ── Roles & Permissions ────────────────────────────────────────────────────
function RolesPermissions() {
  const roles = [
    { name: "Super Admin", users: 2, color: "#f87171", desc: "Full system access" },
    { name: "Admin", users: 3, color: "#facc15", desc: "All except destructive ops" },
    { name: "Project Manager", users: 5, color: "#4f6ef7", desc: "Project & team control" },
    { name: "Developer", users: 12, color: "#4ade80", desc: "Task and code access" },
    { name: "Designer", users: 4, color: "#38bdf8", desc: "Design and assets" },
    { name: "Finance", users: 2, color: "#a78bfa", desc: "Billing & invoices" },
    { name: "Client", users: 28, color: "#9494a0", desc: "Read-only project view" },
  ];
  const perms = [
    { group: "Projects", items: ["View", "Create", "Edit", "Delete", "Archive"] },
    { group: "Tasks", items: ["View", "Create", "Assign", "Delete", "Admin"] },
    { group: "Clients", items: ["View", "Create", "Edit", "Delete", "Export"] },
    { group: "Billing", items: ["View Invoices", "Create", "Approve", "Payment", "Export"] },
    { group: "Team", items: ["View", "Add Member", "Edit Roles", "Remove", "Audit"] },
  ];
  const matrix: Record<string, Record<string, boolean[]>> = {
    "Super Admin": { Projects: [true, true, true, true, true], Tasks: [true, true, true, true, true], Clients: [true, true, true, true, true], Billing: [true, true, true, true, true], Team: [true, true, true, true, true] },
    "Admin": { Projects: [true, true, true, true, true], Tasks: [true, true, true, true, true], Clients: [true, true, true, false, true], Billing: [true, true, true, true, true], Team: [true, true, true, false, true] },
    "Project Manager": { Projects: [true, true, true, false, false], Tasks: [true, true, true, true, false], Clients: [true, false, false, false, false], Billing: [true, false, false, false, false], Team: [true, false, false, false, false] },
    "Developer": { Projects: [true, false, false, false, false], Tasks: [true, true, false, false, false], Clients: [false, false, false, false, false], Billing: [false, false, false, false, false], Team: [true, false, false, false, false] },
  };
  const [activeRole, setActiveRole] = useState("Admin");
  return (
    <div className="flex-1 overflow-y-auto p-6 animate-fade-in">
      <div className="max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-[#f1f1f3]">Roles & Permissions</h2>
          <Button size="sm">+ New Role</Button>
        </div>
        <div className="grid lg:grid-cols-4 gap-5">
          <div>
            <div className="text-xs font-semibold text-[#9494a0] mb-3 uppercase tracking-wider">Roles</div>
            <div className="space-y-1.5">
              {roles.map(r => (
                <button
                  key={r.name}
                  onClick={() => setActiveRole(r.name)}
                  className={`w-full text-left p-3 rounded-xl border transition-all ${activeRole === r.name ? "bg-[rgba(79,110,247,0.08)] border-[rgba(79,110,247,0.3)]" : "bg-[#111118] border-[rgba(255,255,255,0.07)] hover:border-[rgba(255,255,255,0.12)]"}`}
                >
                  <div className="flex items-center gap-2 mb-0.5">
                    <div className="size-2 rounded-full" style={{ background: r.color }} />
                    <span className="text-xs font-medium text-[#f1f1f3]">{r.name}</span>
                  </div>
                  <div className="text-[10px] text-[#5a5a66] ml-4">{r.users} users · {r.desc}</div>
                </button>
              ))}
            </div>
          </div>
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs font-semibold text-[#9494a0] uppercase tracking-wider">Permission Matrix — {activeRole}</div>
              <Button size="sm" variant="secondary">Edit Permissions</Button>
            </div>
            <Card>
              {perms.map(perm => (
                <div key={perm.group} className="mb-4 last:mb-0">
                  <div className="text-[10px] font-mono text-[#5a5a66] uppercase tracking-widest mb-2">{perm.group}</div>
                  <div className="grid grid-cols-5 gap-2">
                    {perm.items.map((item, i) => {
                      const allowed = matrix[activeRole]?.[perm.group]?.[i] ?? false;
                      return (
                        <div key={item} className={`flex items-center gap-1.5 p-2 rounded-lg border text-[11px] ${allowed ? "bg-[rgba(74,222,128,0.06)] border-[rgba(74,222,128,0.15)] text-[#4ade80]" : "bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.05)] text-[#3a3a48]"}`}>
                          <span>{allowed ? "✓" : "✕"}</span>
                          <span className="hidden lg:block truncate">{item}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── AI Project Assistant ───────────────────────────────────────────────────
function AIAssistant() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi Alex. I'm connected to your project context. I can help you create tasks, analyze project health, generate reports, or answer questions about your projects. What would you like to do?", ts: "9:04 AM" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [pendingAction, setPendingAction] = useState<{ type: string; data: string[] } | null>(null);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", content: input, ts: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (input.toLowerCase().includes("authentication") || input.toLowerCase().includes("auth")) {
        setMessages(prev => [...prev, {
          role: "assistant",
          content: "I've analyzed your project requirements. Here are the suggested tasks for the Authentication module:",
          ts: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }]);
        setPendingAction({
          type: "create_tasks",
          data: ["User Entity & Schema", "Registration API Endpoint", "Login API Endpoint", "JWT Token Generation", "Refresh Token Logic", "MFA Implementation", "Password Reset Flow", "Frontend Login UI", "Auth Middleware", "QA Testing Suite"],
        });
      } else {
        setMessages(prev => [...prev, {
          role: "assistant",
          content: `I understand you're asking about "${input}". Based on your current project context, I can see 11 active projects and the Global Travel Platform is your most critical delivery this quarter. Would you like me to run a health analysis or generate a specific report?`,
          ts: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }]);
      }
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden animate-fade-in">
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="size-12 rounded-2xl bg-[rgba(79,110,247,0.15)] border border-[rgba(79,110,247,0.3)] flex items-center justify-center text-2xl mx-auto mb-3">◈</div>
            <div className="text-sm font-semibold text-[#f1f1f3]">Arcane AI Assistant</div>
            <div className="text-xs text-[#5a5a66]">Connected to your project workspace</div>
          </div>
          <div className="space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                {msg.role === "assistant" ? (
                  <div className="size-7 rounded-full bg-[rgba(79,110,247,0.2)] border border-[rgba(79,110,247,0.3)] flex items-center justify-center text-[#4f6ef7] text-xs flex-shrink-0">◈</div>
                ) : (
                  <Avatar name="Alex Rivera" size="sm" />
                )}
                <div className={`max-w-lg ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                  <div className={`px-4 py-3 rounded-2xl text-sm ${msg.role === "user" ? "bg-[#4f6ef7] text-white rounded-tr-sm" : "bg-[#111118] border border-[rgba(255,255,255,0.08)] text-[#c4c4cc] rounded-tl-sm"}`}>
                    {msg.content}
                  </div>
                  <span className="text-[10px] text-[#5a5a66]">{msg.ts}</span>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-3">
                <div className="size-7 rounded-full bg-[rgba(79,110,247,0.2)] border border-[rgba(79,110,247,0.3)] flex items-center justify-center text-[#4f6ef7] text-xs">◈</div>
                <div className="bg-[#111118] border border-[rgba(255,255,255,0.08)] px-4 py-3 rounded-2xl rounded-tl-sm">
                  <div className="flex gap-1.5 items-center h-4">
                    {[0, 150, 300].map(delay => (
                      <div key={delay} className="size-1.5 rounded-full bg-[#4f6ef7] animate-bounce" style={{ animationDelay: `${delay}ms` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            {pendingAction && (
              <div className="bg-[rgba(79,110,247,0.06)] border border-[rgba(79,110,247,0.2)] rounded-2xl p-4">
                <div className="text-xs font-semibold text-[#4f6ef7] mb-3">⚠ Action Requires Confirmation — Create Tasks</div>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {pendingAction.data.map(task => (
                    <div key={task} className="flex items-center gap-2 text-xs text-[#c4c4cc]">
                      <div className="size-1.5 rounded-full bg-[#4f6ef7]" />
                      {task}
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => { setPendingAction(null); setMessages(prev => [...prev, { role: "assistant", content: `✓ Created ${pendingAction.data.length} tasks in the Authentication Epic. They've been added to the backlog and are ready for sprint assignment.`, ts: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]); }}>
                    Create {pendingAction.data.length} Tasks
                  </Button>
                  <Button size="sm" variant="secondary">Modify</Button>
                  <Button size="sm" variant="ghost" onClick={() => setPendingAction(null)}>Cancel</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="border-t border-[rgba(255,255,255,0.07)] p-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex gap-2 mb-3">
            {["Create tasks for auth module", "Project health report", "Analyze sprint velocity", "Who's overloaded?"].map(s => (
              <button key={s} onClick={() => setInput(s)} className="text-[11px] px-3 py-1.5 bg-[#111118] border border-[rgba(255,255,255,0.08)] rounded-full text-[#6b6b7a] hover:text-[#f1f1f3] hover:border-[rgba(79,110,247,0.3)] transition-all whitespace-nowrap">
                {s}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !e.shiftKey && handleSend()}
              placeholder="Ask me anything about your projects..."
              className="flex-1 h-10 bg-[#111118] border border-[rgba(255,255,255,0.08)] rounded-xl px-4 text-sm text-[#f1f1f3] placeholder:text-[#5a5a66] focus:border-[rgba(79,110,247,0.4)] focus:outline-none transition-all"
            />
            <Button onClick={handleSend} disabled={!input.trim() || loading}>Send</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Employees ──────────────────────────────────────────────────────────────
function Employees() {
  const team = [
    { name: "Sarah Chen", role: "Lead Engineer", dept: "Engineering", skills: ["React", "Node.js", "PostgreSQL"], projects: 3, workload: 90, status: "Active" },
    { name: "Marcus Webb", role: "DevOps Engineer", dept: "Engineering", skills: ["Kubernetes", "AWS", "Terraform"], projects: 4, workload: 75, status: "Active" },
    { name: "Priya Nair", role: "Product Designer", dept: "Design", skills: ["Figma", "UX Research", "Motion"], projects: 2, workload: 60, status: "Active" },
    { name: "Tom Okonkwo", role: "QA Engineer", dept: "Quality", skills: ["Playwright", "Jest", "Selenium"], projects: 3, workload: 80, status: "Active" },
    { name: "Yuki Tanaka", role: "Backend Engineer", dept: "Engineering", skills: ["Python", "FastAPI", "Redis"], projects: 2, workload: 45, status: "On Leave" },
  ];
  return (
    <div className="flex-1 overflow-y-auto p-6 animate-fade-in">
      <div className="max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-[#f1f1f3]">Team</h2>
          <Button size="sm">+ Add Member</Button>
        </div>
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {team.map(emp => (
            <Card key={emp.name} hover>
              <div className="flex items-start gap-3 mb-4">
                <Avatar name={emp.name} size="md" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-[#f1f1f3]">{emp.name}</div>
                  <div className="text-xs text-[#6b6b7a]">{emp.role}</div>
                  <div className="text-[10px] font-mono text-[#5a5a66]">{emp.dept}</div>
                </div>
                <Badge variant={emp.status === "Active" ? "success" : "warning"} size="sm" dot>{emp.status}</Badge>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {emp.skills.map(s => <span key={s} className="text-[10px] font-mono text-[#5a5a66] bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] px-2 py-0.5 rounded-full">{s}</span>)}
              </div>
              <ProgressBar value={emp.workload} label="Workload" showPercent color={emp.workload > 85 ? "#f87171" : emp.workload > 70 ? "#facc15" : "#4ade80"} />
              <div className="text-[11px] text-[#5a5a66] mt-2">{emp.projects} active projects</div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AdminPortal({ onLogout }: { onLogout: () => void }) {
  const [activeView, setActiveView] = useState("dashboard");
  const titles: Record<string, string> = {
    dashboard: "Management Dashboard", leads: "Lead Management", customers: "Customers",
    projects: "Projects", employees: "Team", teams: "Teams",
    invoices: "Invoices", analytics: "Analytics", roles: "Roles & Permissions",
    ai: "AI Assistant", settings: "Settings",
  };
  const renderView = () => {
    switch (activeView) {
      case "dashboard": return <ExecDashboard />;
      case "leads": return <CRMLeads />;
      case "roles": return <RolesPermissions />;
      case "ai": return <AIAssistant />;
      case "employees": return <Employees />;
      default: return (
        <div className="flex-1 flex items-center justify-center">
          <EmptyState icon="⊡" title={titles[activeView]} description="This module is under active development." action={<Button size="sm" variant="secondary" onClick={() => setActiveView("dashboard")}>Back to Dashboard</Button>} />
        </div>
      );
    }
  };
  return (
    <div className="h-screen flex bg-[#09090c] overflow-hidden">
      <AdminSidebar active={activeView} onChange={setActiveView} onLogout={onLogout} />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminTopBar title={titles[activeView] || activeView} />
        {renderView()}
      </div>
    </div>
  );
}
