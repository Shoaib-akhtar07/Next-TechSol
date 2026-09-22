import { useState, useEffect } from "react";
import PublicSite from "./pages/PublicSite";
import CustomerPortal from "./pages/CustomerPortal";
import EmployeePortal from "./pages/EmployeePortal";
import AdminPortal from "./pages/AdminPortal";
import ProjectInquiry from "./pages/ProjectInquiry";
import { CommandPalette, Toast } from "./components/ui";

type View = "public" | "inquiry" | "customer" | "employee" | "admin";

interface ToastData { message: string; type: "success" | "error" | "info" }

// ── Login Screen ───────────────────────────────────────────────────────────
function LoginScreen({ role, onLogin, onBack }: { role: "customer" | "employee" | "admin"; onLogin: () => void; onBack: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const config = {
    customer: { label: "Client Portal", badge: "Client", accent: "#4f6ef7", prefill: "james@atlasgroup.com" },
    employee: { label: "Team Workspace", badge: "Team", accent: "#4ade80", prefill: "sarah@arcanesystems.io" },
    admin: { label: "Admin Panel", badge: "Admin", accent: "#f87171", prefill: "alex@arcanesystems.io" },
  }[role];

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(); }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#09090c] flex items-center justify-center p-6 grid-pattern">
      <div className="absolute inset-0 bg-gradient-radial" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(79,110,247,0.06) 0%, transparent 60%)" }} />
      <div className="relative w-full max-w-sm animate-fade-in">
        <button onClick={onBack} className="flex items-center gap-1.5 text-xs text-[#5a5a66] hover:text-[#9494a0] mb-8 transition-colors">
          ← Back to website
        </button>
        <div className="bg-[#111118] border border-[rgba(255,255,255,0.08)] rounded-2xl p-8">
          <div className="flex items-center gap-2 mb-8">
            <div className="size-8 rounded-lg bg-[#4f6ef7] flex items-center justify-center">
              <span className="text-white font-bold text-xs font-mono">A</span>
            </div>
            <div>
              <div className="text-sm font-semibold text-[#f1f1f3]">Arcane Systems</div>
              <div className="text-[10px] text-[#5a5a66]">{config.label}</div>
            </div>
          </div>

          <h1 className="text-xl font-semibold text-[#f1f1f3] mb-1">Sign in</h1>
          <p className="text-xs text-[#5a5a66] mb-6">Access your {config.label.toLowerCase()}</p>

          <div className="space-y-4 mb-6">
            <div>
              <label className="text-[10px] font-medium text-[#9494a0] uppercase tracking-wider block mb-1.5">Email</label>
              <input
                type="email"
                value={email || config.prefill}
                onChange={e => setEmail(e.target.value)}
                className="w-full h-10 bg-[#0d0d14] border border-[rgba(255,255,255,0.08)] rounded-lg px-3 text-sm text-[#f1f1f3] focus:border-[#4f6ef7] focus:outline-none focus:ring-1 focus:ring-[rgba(79,110,247,0.3)] transition-all"
              />
            </div>
            <div>
              <label className="text-[10px] font-medium text-[#9494a0] uppercase tracking-wider block mb-1.5">Password</label>
              <input
                type="password"
                value={password || "••••••••••••"}
                onChange={e => setPassword(e.target.value)}
                className="w-full h-10 bg-[#0d0d14] border border-[rgba(255,255,255,0.08)] rounded-lg px-3 text-sm text-[#f1f1f3] focus:border-[#4f6ef7] focus:outline-none focus:ring-1 focus:ring-[rgba(79,110,247,0.3)] transition-all"
              />
            </div>
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full h-10 bg-[#4f6ef7] text-white text-sm font-medium rounded-lg hover:bg-[#3d5ce8] transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? (
              <>
                <svg className="animate-spin size-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                  <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Signing in...
              </>
            ) : "Sign In →"}
          </button>

          <div className="mt-4 text-center">
            <span className="text-[11px] text-[#5a5a66]">Demo: password pre-filled · click Sign In to continue</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Portal Selector ────────────────────────────────────────────────────────
function PortalSelector({ onSelect, onBack }: { onSelect: (role: "customer" | "employee" | "admin") => void; onBack: () => void }) {
  return (
    <div className="min-h-screen bg-[#09090c] flex items-center justify-center p-6 grid-pattern">
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(79,110,247,0.05) 0%, transparent 60%)" }} />
      <div className="relative w-full max-w-lg animate-fade-in">
        <button onClick={onBack} className="flex items-center gap-1.5 text-xs text-[#5a5a66] hover:text-[#9494a0] mb-8 transition-colors">
          ← Back to website
        </button>
        <div className="text-center mb-8">
          <div className="size-12 rounded-xl bg-[#4f6ef7] flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold font-mono text-lg">A</span>
          </div>
          <h1 className="text-2xl font-semibold text-[#f1f1f3] mb-2">Select Your Portal</h1>
          <p className="text-sm text-[#5a5a66]">Choose the experience you want to explore</p>
        </div>
        <div className="space-y-3">
          {[
            { role: "customer" as const, icon: "⊕", label: "Client Portal", desc: "Track your projects, tasks, documents, and invoices.", badge: "Client" },
            { role: "employee" as const, icon: "◎", label: "Team Workspace", desc: "Sprint board, task management, and time tracking for engineers.", badge: "Team" },
            { role: "admin" as const, icon: "◆", label: "Admin Dashboard", desc: "Management overview, CRM, AI assistant, and role management.", badge: "Admin" },
          ].map(p => (
            <button
              key={p.role}
              onClick={() => onSelect(p.role)}
              className="w-full flex items-center gap-4 p-5 bg-[#111118] border border-[rgba(255,255,255,0.07)] rounded-xl hover:border-[rgba(79,110,247,0.35)] hover:bg-[rgba(79,110,247,0.03)] transition-all text-left group"
            >
              <div className="text-2xl text-[#5a5a66] group-hover:text-[#4f6ef7] transition-colors">{p.icon}</div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-[#f1f1f3] mb-0.5">{p.label}</div>
                <div className="text-xs text-[#5a5a66]">{p.desc}</div>
              </div>
              <span className="text-[#6b6b7a] group-hover:text-[#4f6ef7] transition-colors">→</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState<View>("public");
  const [pendingRole, setPendingRole] = useState<"customer" | "employee" | "admin" | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showPortalSelector, setShowPortalSelector] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [toast, setToast] = useState<ToastData | null>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setCmdOpen(v => !v); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handlePortalLogin = (role: string) => {
    if (role === "customer" || role === "employee" || role === "admin") {
      setPendingRole(role);
      setShowLogin(true);
    } else {
      setShowPortalSelector(true);
    }
  };

  const handleLoginSuccess = () => {
    if (!pendingRole) return;
    setShowLogin(false);
    const toastMsg = { customer: "Welcome to the Client Portal", employee: "Welcome to the Team Workspace", admin: "Welcome to Admin Dashboard" }[pendingRole];
    setToast({ message: toastMsg, type: "success" });
    setView(pendingRole === "customer" ? "customer" : pendingRole === "employee" ? "employee" : "admin");
    setPendingRole(null);
  };

  const handleLogout = () => {
    setView("public");
    setToast({ message: "You've been signed out successfully.", type: "info" });
  };

  // Render login screen
  if (showLogin && pendingRole) {
    return <LoginScreen role={pendingRole} onLogin={handleLoginSuccess} onBack={() => { setShowLogin(false); setPendingRole(null); }} />;
  }

  // Render portal selector
  if (showPortalSelector) {
    return (
      <PortalSelector
        onSelect={role => { setShowPortalSelector(false); setPendingRole(role); setShowLogin(true); }}
        onBack={() => setShowPortalSelector(false)}
      />
    );
  }

  return (
    <>
      {/* Command Palette available in portal views */}
      {view !== "public" && view !== "inquiry" && (
        <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />
      )}

      {/* Toast notifications */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Main view */}
      {view === "public" && (
        <PublicSite
          onStartProject={() => setView("inquiry")}
          onPortalLogin={handlePortalLogin}
        />
      )}

      {view === "inquiry" && (
        <ProjectInquiry onClose={() => setView("public")} />
      )}

      {view === "customer" && (
        <CustomerPortal onLogout={handleLogout} />
      )}

      {view === "employee" && (
        <EmployeePortal onLogout={handleLogout} />
      )}

      {view === "admin" && (
        <AdminPortal onLogout={handleLogout} />
      )}
    </>
  );
}
