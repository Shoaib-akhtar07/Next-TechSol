import { useState } from "react";
import { Badge, Button, Card, KPICard, ProgressBar, Avatar, Tabs, EmptyState } from "../components/ui";

const NAV_ITEMS = [
  { id: "dashboard", icon: "⊞", label: "My Dashboard" },
  { id: "tasks", icon: "◎", label: "My Tasks", badge: 12 },
  { id: "projects", icon: "◫", label: "Projects", badge: 4 },
  { id: "sprint", icon: "⬡", label: "Sprint Board" },
  { id: "time", icon: "◉", label: "Time Tracking" },
  { id: "messages", icon: "◆", label: "Messages", badge: 5 },
  { id: "team", icon: "⊕", label: "Team" },
  { id: "notifications", icon: "⬘", label: "Notifications", badge: 3 },
];

function EmpSidebar({ active, onChange, onLogout }: { active: string; onChange: (id: string) => void; onLogout: () => void }) {
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
          <Badge variant="success" size="sm">Team</Badge>
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
          <Avatar name="Sarah Chen" size="sm" />
          <div>
            <div className="text-xs font-medium text-[#f1f1f3]">Sarah Chen</div>
            <div className="text-[10px] text-[#5a5a66]">Lead Engineer</div>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="w-full justify-start text-xs" onClick={onLogout}>← Sign out</Button>
      </div>
    </aside>
  );
}

function EmpTopBar({ title }: { title: string }) {
  return (
    <div className="h-14 flex items-center justify-between px-6 border-b border-[rgba(255,255,255,0.07)] flex-shrink-0">
      <div className="text-sm font-semibold text-[#f1f1f3]">{title}</div>
      <div className="flex items-center gap-3">
        <Badge variant="info" dot>Sprint 9 — Active</Badge>
        <button className="relative w-8 h-8 flex items-center justify-center rounded-lg text-[#6b6b7a] hover:text-[#f1f1f3] hover:bg-[rgba(255,255,255,0.05)] transition-all">
          <span>◆</span>
          <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-[#f87171]" />
        </button>
        <Avatar name="Sarah Chen" size="sm" />
      </div>
    </div>
  );
}

// ── Employee Dashboard ─────────────────────────────────────────────────────
function EmpDashboard() {
  return (
    <div className="flex-1 overflow-y-auto p-6 animate-fade-in">
      <div className="max-w-6xl">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-[#f1f1f3]">Good morning, Sarah.</h2>
          <p className="text-sm text-[#5a5a66] mt-0.5">Sprint 9 · 6 days remaining · 3 tasks need your attention.</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <KPICard label="My Open Tasks" value="12" icon="◎" accent />
          <KPICard label="Overdue" value="2" icon="⬘" />
          <KPICard label="Completed This Week" value="8" icon="◆" />
          <KPICard label="Hours Logged Today" value="4.5h" icon="◉" />
        </div>
        <div className="grid lg:grid-cols-3 gap-5">
          {/* Today's Tasks */}
          <div className="lg:col-span-2 space-y-5">
            <Card>
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-semibold text-[#f1f1f3]">Today's Tasks</div>
                <Badge variant="warning" dot>2 overdue</Badge>
              </div>
              {[
                { id: "TSK-091", title: "Implement Booking Payment API", project: "Global Travel Platform", status: "In Progress", priority: "High", est: "4h" },
                { id: "TSK-088", title: "Fix auth token refresh race condition", project: "Global Travel Platform", status: "In Progress", priority: "Critical", est: "2h" },
                { id: "TSK-094", title: "Write unit tests for search module", project: "Global Travel Platform", status: "Todo", priority: "Medium", est: "3h" },
                { id: "TSK-085", title: "Code review — Priya's PR #47", project: "Mobile App v2.0", status: "Todo", priority: "High", est: "1h" },
              ].map(t => (
                <div key={t.id} className="flex items-center gap-3 py-3 border-b border-[rgba(255,255,255,0.05)] last:border-0">
                  <input type="checkbox" className="rounded accent-[#4f6ef7]" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-[#c4c4cc] truncate">{t.title}</div>
                    <div className="text-[11px] text-[#5a5a66]">{t.project}</div>
                  </div>
                  <Badge variant={t.priority === "Critical" ? "danger" : t.priority === "High" ? "warning" : "neutral"} size="sm">{t.priority}</Badge>
                  <span className="text-[11px] font-mono text-[#5a5a66] hidden sm:block">{t.est}</span>
                </div>
              ))}
            </Card>

            {/* Sprint Progress */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-semibold text-[#f1f1f3]">Sprint 9 — Global Travel Platform</div>
                <Badge variant="info">6d left</Badge>
              </div>
              <ProgressBar value={18} max={24} label="Tasks Completed" showPercent />
              <div className="grid grid-cols-4 gap-3 mt-4">
                {[
                  { label: "Todo", count: 4, color: "#5a5a66" },
                  { label: "In Progress", count: 6, color: "#4f6ef7" },
                  { label: "Review", count: 2, color: "#facc15" },
                  { label: "Done", count: 12, color: "#4ade80" },
                ].map(s => (
                  <div key={s.label} className="text-center bg-[#0d0d14] rounded-lg p-2">
                    <div className="text-lg font-semibold" style={{ color: s.color }}>{s.count}</div>
                    <div className="text-[10px] text-[#5a5a66]">{s.label}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-5">
            {/* Project allocation */}
            <Card>
              <div className="text-sm font-semibold text-[#f1f1f3] mb-4">Project Allocation</div>
              {[
                { name: "Global Travel Platform", pct: 60 },
                { name: "Mobile App v2.0", pct: 25 },
                { name: "API Integration Suite", pct: 15 },
              ].map(p => (
                <div key={p.name} className="mb-3 last:mb-0">
                  <ProgressBar value={p.pct} label={p.name} showPercent color="#4f6ef7" />
                </div>
              ))}
            </Card>

            {/* Time tracking */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-semibold text-[#f1f1f3]">Time Today</div>
                <Button size="sm" variant="primary">Log Time</Button>
              </div>
              {[
                { task: "Payment API work", time: "2h 15m", project: "GTP" },
                { task: "Auth bug investigation", time: "1h 30m", project: "GTP" },
                { task: "Code review PR #46", time: "45m", project: "MAv2" },
              ].map(t => (
                <div key={t.task} className="flex items-center justify-between py-2 border-b border-[rgba(255,255,255,0.05)] last:border-0">
                  <div>
                    <div className="text-xs text-[#c4c4cc]">{t.task}</div>
                    <div className="text-[10px] font-mono text-[#5a5a66]">{t.project}</div>
                  </div>
                  <span className="text-xs font-mono text-[#9494a0]">{t.time}</span>
                </div>
              ))}
              <div className="flex items-center justify-between pt-3 border-t border-[rgba(255,255,255,0.08)] mt-2">
                <span className="text-xs text-[#6b6b7a]">Total</span>
                <span className="text-sm font-semibold font-mono text-[#f1f1f3]">4h 30m</span>
              </div>
            </Card>

            {/* Recent activity */}
            <Card>
              <div className="text-sm font-semibold text-[#f1f1f3] mb-3">Activity</div>
              {[
                { msg: "You moved TSK-088 to In Progress", time: "30m ago" },
                { msg: "Priya commented on your PR #44", time: "1h ago" },
                { msg: "Sprint 9 planning completed", time: "Yesterday" },
              ].map((a, i) => (
                <div key={i} className="flex gap-2.5 py-2.5 border-b border-[rgba(255,255,255,0.05)] last:border-0">
                  <div className="size-1.5 rounded-full bg-[#4f6ef7] mt-1.5 flex-shrink-0" />
                  <div>
                    <div className="text-[11px] text-[#9494a0]">{a.msg}</div>
                    <div className="text-[10px] text-[#5a5a66]">{a.time}</div>
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

// ── Kanban Sprint Board ────────────────────────────────────────────────────
function SprintBoard() {
  const columns = [
    {
      id: "backlog", label: "Backlog", color: "#5a5a66",
      tasks: [
        { id: "TSK-098", title: "Implement notification webhooks", priority: "Medium", assignee: "Marcus Webb" },
        { id: "TSK-097", title: "Add i18n support for 5 languages", priority: "Low", assignee: "Tom Okonkwo" },
      ],
    },
    {
      id: "todo", label: "To Do", color: "#9494a0",
      tasks: [
        { id: "TSK-094", title: "Write unit tests for search module", priority: "Medium", assignee: "Sarah Chen" },
        { id: "TSK-095", title: "Database migration script v4", priority: "High", assignee: "Marcus Webb" },
        { id: "TSK-085", title: "Code review — PR #47", priority: "High", assignee: "Sarah Chen" },
      ],
    },
    {
      id: "inprogress", label: "In Progress", color: "#4f6ef7",
      tasks: [
        { id: "TSK-091", title: "Implement Booking Payment API", priority: "High", assignee: "Sarah Chen" },
        { id: "TSK-088", title: "Fix auth token refresh race", priority: "Critical", assignee: "Sarah Chen" },
        { id: "TSK-090", title: "Mobile checkout flow design", priority: "High", assignee: "Priya Nair" },
      ],
    },
    {
      id: "review", label: "Code Review", color: "#facc15",
      tasks: [
        { id: "TSK-082", title: "Search results pagination", priority: "Medium", assignee: "Tom Okonkwo" },
        { id: "TSK-083", title: "User profile API endpoint", priority: "High", assignee: "Marcus Webb" },
      ],
    },
    {
      id: "done", label: "Done", color: "#4ade80",
      tasks: [
        { id: "TSK-078", title: "Hotel listing API v2", priority: "High", assignee: "Sarah Chen" },
        { id: "TSK-079", title: "Auth middleware refactor", priority: "Medium", assignee: "Marcus Webb" },
        { id: "TSK-080", title: "Error boundary components", priority: "Low", assignee: "Priya Nair" },
      ],
    },
  ];

  const priorityColor: Record<string, string> = {
    Critical: "#f87171", High: "#facc15", Medium: "#9494a0", Low: "#5a5a66",
  };

  return (
    <div className="flex-1 overflow-x-auto p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-[#f1f1f3]">Sprint 9 — Board</h2>
        <div className="flex gap-2">
          <Badge variant="info" dot>Sprint active</Badge>
          <Button size="sm" variant="secondary">+ Add Task</Button>
        </div>
      </div>
      <div className="flex gap-4 min-w-max pb-4">
        {columns.map(col => (
          <div key={col.id} className="w-64 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <div className="size-2 rounded-full" style={{ backgroundColor: col.color }} />
              <span className="text-xs font-semibold text-[#c4c4cc]">{col.label}</span>
              <span className="text-[10px] font-mono text-[#5a5a66] ml-auto bg-[rgba(255,255,255,0.05)] px-1.5 py-0.5 rounded-full">{col.tasks.length}</span>
            </div>
            <div className="flex flex-col gap-2">
              {col.tasks.map(task => (
                <div key={task.id} className="bg-[#111118] border border-[rgba(255,255,255,0.07)] rounded-xl p-3 hover:border-[rgba(79,110,247,0.3)] cursor-pointer transition-all group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-[#5a5a66]">{task.id}</span>
                    <div className="size-1.5 rounded-full" style={{ backgroundColor: priorityColor[task.priority] }} />
                  </div>
                  <div className="text-xs font-medium text-[#c4c4cc] leading-relaxed mb-3">{task.title}</div>
                  <div className="flex items-center gap-1.5">
                    <Avatar name={task.assignee} size="xs" />
                    <span className="text-[10px] text-[#5a5a66] truncate">{task.assignee.split(" ")[0]}</span>
                  </div>
                </div>
              ))}
              <button className="w-full border border-dashed border-[rgba(255,255,255,0.08)] rounded-xl py-2 text-[11px] text-[#5a5a66] hover:border-[rgba(79,110,247,0.25)] hover:text-[#4f6ef7] transition-all">
                + Add task
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function EmployeePortal({ onLogout }: { onLogout: () => void }) {
  const [activeView, setActiveView] = useState("dashboard");
  const titles: Record<string, string> = {
    dashboard: "My Dashboard", tasks: "My Tasks", projects: "Projects",
    sprint: "Sprint Board", time: "Time Tracking", messages: "Messages",
    team: "Team", notifications: "Notifications",
  };
  const renderView = () => {
    switch (activeView) {
      case "dashboard": return <EmpDashboard />;
      case "sprint": return <SprintBoard />;
      default: return (
        <div className="flex-1 flex items-center justify-center">
          <EmptyState icon="⊡" title={`${titles[activeView] || activeView}`} description="This section is under active development." action={<Button size="sm" variant="secondary">Go to Dashboard</Button>} />
        </div>
      );
    }
  };
  return (
    <div className="h-screen flex bg-[#09090c] overflow-hidden">
      <EmpSidebar active={activeView} onChange={setActiveView} onLogout={onLogout} />
      <div className="flex-1 flex flex-col min-w-0">
        <EmpTopBar title={titles[activeView] || activeView} />
        {renderView()}
      </div>
    </div>
  );
}
