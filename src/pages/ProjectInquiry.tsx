import { useState } from "react";
import { Button, Input, Textarea, Select } from "../components/ui";

const STEPS = [
  { id: 1, label: "Project Type" },
  { id: 2, label: "Business Info" },
  { id: 3, label: "Requirements" },
  { id: 4, label: "Budget" },
  { id: 5, label: "Timeline" },
  { id: 6, label: "Attachments" },
  { id: 7, label: "Review" },
];

interface FormData {
  projectTypes: string[];
  company: string;
  name: string;
  email: string;
  country: string;
  phone: string;
  description: string;
  budget: string;
  timeline: string;
  files: string[];
}

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }, (_, i) => i + 1).map(step => (
        <div key={step} className="flex items-center gap-2">
          <div className={`size-7 rounded-full flex items-center justify-center text-[11px] font-mono font-semibold transition-all ${step < current ? "bg-[#2B6E78] text-white" : step === current ? "bg-[#2B6E78] text-white ring-4 ring-[rgba(43,110,120,0.2)]" : "bg-[rgba(16,27,30,0.05)] text-[#7C9096] border border-[rgba(16,27,30,0.08)]"}`}>
            {step < current ? "✓" : step}
          </div>
          {step < total && <div className={`w-8 h-px transition-colors ${step < current ? "bg-[#2B6E78]" : "bg-[rgba(16,27,30,0.08)]"}`} />}
        </div>
      ))}
    </div>
  );
}

type ProjectType = { id: string; icon: string; label: string };

function Step1({ data, onChange }: { data: string[]; onChange: (types: string[]) => void }) {
  const types: ProjectType[] = [
    { id: "web", icon: "⬡", label: "Web Application" },
    { id: "mobile", icon: "◫", label: "Mobile Application" },
    { id: "saas", icon: "◎", label: "SaaS Platform" },
    { id: "ai", icon: "◈", label: "AI / Machine Learning" },
    { id: "api", icon: "⊞", label: "API Development" },
    { id: "automation", icon: "⬘", label: "Automation" },
    { id: "enterprise", icon: "⊕", label: "Enterprise Software" },
    { id: "other", icon: "◆", label: "Other" },
  ];
  const toggle = (id: string) => {
    onChange(data.includes(id) ? data.filter(t => t !== id) : [...data, id]);
  };
  return (
    <div>
      <div className="text-lg font-semibold text-[#101B1E] mb-1">What are you building?</div>
      <div className="text-sm text-[#5E7378] mb-6">Select all that apply. You can choose more than one.</div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {types.map(t => (
          <button
            key={t.id}
            onClick={() => toggle(t.id)}
            className={`p-4 rounded-xl border text-left transition-all ${data.includes(t.id) ? "bg-[rgba(43,110,120,0.1)] border-[#2B6E78] shadow-[0_0_0_1px_rgba(43,110,120,0.4)]" : "bg-[#FFFFFF] border-[rgba(16,27,30,0.07)] hover:border-[rgba(43,110,120,0.25)] hover:bg-[rgba(43,110,120,0.03)]"}`}
          >
            <div className={`text-xl mb-2 ${data.includes(t.id) ? "text-[#2B6E78]" : "text-[#7C9096]"}`}>{t.icon}</div>
            <div className={`text-xs font-medium ${data.includes(t.id) ? "text-[#101B1E]" : "text-[#4A6064]"}`}>{t.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function Step2({ data, onChange }: { data: Partial<FormData>; onChange: (d: Partial<FormData>) => void }) {
  return (
    <div>
      <div className="text-lg font-semibold text-[#101B1E] mb-1">Tell us about your business</div>
      <div className="text-sm text-[#5E7378] mb-6">This helps us match you with the right engineering team.</div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Input label="Company Name" placeholder="Atlas Travel Group" value={data.company || ""} onChange={e => onChange({ ...data, company: e.target.value })} />
        <Input label="Your Name" placeholder="James Mitchell" value={data.name || ""} onChange={e => onChange({ ...data, name: e.target.value })} />
        <Input label="Email Address" type="email" placeholder="james@atlasgroup.com" value={data.email || ""} onChange={e => onChange({ ...data, email: e.target.value })} />
        <Input label="Phone Number" type="tel" placeholder="+1 (555) 000-0000" value={data.phone || ""} onChange={e => onChange({ ...data, phone: e.target.value })} />
        <div className="sm:col-span-2">
          <Select
            label="Country"
            value={data.country || ""}
            onChange={e => onChange({ ...data, country: e.target.value })}
            options={[
              { value: "", label: "Select your country..." },
              { value: "us", label: "United States" },
              { value: "uk", label: "United Kingdom" },
              { value: "ca", label: "Canada" },
              { value: "au", label: "Australia" },
              { value: "de", label: "Germany" },
              { value: "fr", label: "France" },
              { value: "sg", label: "Singapore" },
              { value: "ae", label: "UAE" },
              { value: "other", label: "Other" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

function Step3({ data, onChange }: { data: Partial<FormData>; onChange: (d: Partial<FormData>) => void }) {
  return (
    <div>
      <div className="text-lg font-semibold text-[#101B1E] mb-1">Project Requirements</div>
      <div className="text-sm text-[#5E7378] mb-6">Describe your project in as much detail as you can. Include current challenges, desired outcomes, and any technical requirements.</div>
      <Textarea
        label="Project Description"
        placeholder="We need to build a global travel booking platform that handles hotel, flight, and activity reservations. The system needs to support 40+ countries, 5 languages, and integrate with multiple third-party suppliers..."
        value={data.description || ""}
        onChange={e => onChange({ ...data, description: e.target.value })}
        rows={10}
      />
      <div className="mt-4 p-4 bg-[rgba(43,110,120,0.05)] border border-[rgba(43,110,120,0.15)] rounded-xl">
        <div className="text-xs font-semibold text-[#2B6E78] mb-2">💡 Tips for a better response</div>
        <div className="grid sm:grid-cols-2 gap-1.5">
          {["Describe the business problem you're solving", "Mention any existing systems to integrate with", "Share your technical preferences if any", "Describe your target users"].map(tip => (
            <div key={tip} className="text-[11px] text-[#5E7378] flex items-start gap-1.5">
              <span className="text-[#2B6E78]">→</span> {tip}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Step4({ data, onChange }: { data: Partial<FormData>; onChange: (d: Partial<FormData>) => void }) {
  const ranges = [
    { id: "10-25k", label: "$10,000 – $25,000", sub: "Small scope / MVP" },
    { id: "25-50k", label: "$25,000 – $50,000", sub: "Mid-size project" },
    { id: "50-100k", label: "$50,000 – $100,000", sub: "Complex platform" },
    { id: "100-250k", label: "$100,000 – $250,000", sub: "Enterprise solution" },
    { id: "250k+", label: "$250,000+", sub: "Large scale system" },
    { id: "discuss", label: "Let's discuss", sub: "Flexible / equity" },
  ];
  return (
    <div>
      <div className="text-lg font-semibold text-[#101B1E] mb-1">Project Budget</div>
      <div className="text-sm text-[#5E7378] mb-6">Select the range that best fits your budget. This helps us scope the project correctly.</div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {ranges.map(r => (
          <button
            key={r.id}
            onClick={() => onChange({ ...data, budget: r.id })}
            className={`p-4 rounded-xl border text-left transition-all ${data.budget === r.id ? "bg-[rgba(43,110,120,0.1)] border-[#2B6E78]" : "bg-[#FFFFFF] border-[rgba(16,27,30,0.07)] hover:border-[rgba(43,110,120,0.25)]"}`}
          >
            <div className={`text-sm font-semibold mb-1 ${data.budget === r.id ? "text-[#101B1E]" : "text-[#33474B]"}`}>{r.label}</div>
            <div className="text-[11px] text-[#7C9096]">{r.sub}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function Step5({ data, onChange }: { data: Partial<FormData>; onChange: (d: Partial<FormData>) => void }) {
  const options = [
    { id: "asap", label: "ASAP", sub: "Start immediately" },
    { id: "1-3m", label: "1–3 months", sub: "Near term" },
    { id: "3-6m", label: "3–6 months", sub: "This quarter" },
    { id: "6-12m", label: "6–12 months", sub: "Long-range plan" },
    { id: "12m+", label: "12+ months", sub: "Multi-phase program" },
    { id: "flexible", label: "Flexible", sub: "No strict deadline" },
  ];
  return (
    <div>
      <div className="text-lg font-semibold text-[#101B1E] mb-1">Desired Timeline</div>
      <div className="text-sm text-[#5E7378] mb-6">When would you like to start, and what's your expected delivery window?</div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {options.map(o => (
          <button
            key={o.id}
            onClick={() => onChange({ ...data, timeline: o.id })}
            className={`p-4 rounded-xl border text-left transition-all ${data.timeline === o.id ? "bg-[rgba(43,110,120,0.1)] border-[#2B6E78]" : "bg-[#FFFFFF] border-[rgba(16,27,30,0.07)] hover:border-[rgba(43,110,120,0.25)]"}`}
          >
            <div className={`text-sm font-semibold mb-1 ${data.timeline === o.id ? "text-[#101B1E]" : "text-[#33474B]"}`}>{o.label}</div>
            <div className="text-[11px] text-[#7C9096]">{o.sub}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function Step6() {
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState<string[]>([]);
  return (
    <div>
      <div className="text-lg font-semibold text-[#101B1E] mb-1">Attachments</div>
      <div className="text-sm text-[#5E7378] mb-6">Upload any relevant documents — briefs, specs, designs, or existing materials.</div>
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => { e.preventDefault(); setDragging(false); const f = Array.from(e.dataTransfer.files).map(f => f.name); setFiles(prev => [...prev, ...f]); }}
        className={`border-2 border-dashed rounded-xl p-10 text-center transition-all ${dragging ? "border-[#2B6E78] bg-[rgba(43,110,120,0.06)]" : "border-[rgba(16,27,30,0.1)] hover:border-[rgba(43,110,120,0.3)] bg-[rgba(16,27,30,0.02)]"}`}
      >
        <div className="text-3xl mb-3 opacity-40">⬡</div>
        <div className="text-sm font-medium text-[#33474B] mb-1">Drag & drop files here</div>
        <div className="text-xs text-[#7C9096] mb-4">PDF, DOCX, images, ZIP — Max 50MB per file</div>
        <Button variant="secondary" size="sm">Browse Files</Button>
      </div>
      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map(f => (
            <div key={f} className="flex items-center gap-3 p-3 bg-[#FFFFFF] border border-[rgba(16,27,30,0.07)] rounded-lg">
              <span className="text-sm">📄</span>
              <span className="text-xs text-[#33474B] flex-1">{f}</span>
              <button className="text-[#7C9096] hover:text-[#DC2626] transition-colors" onClick={() => setFiles(prev => prev.filter(x => x !== f))}>✕</button>
            </div>
          ))}
        </div>
      )}
      <div className="mt-4 p-3 bg-[rgba(250,204,21,0.05)] border border-[rgba(250,204,21,0.15)] rounded-xl">
        <div className="text-[11px] text-[#33474B] flex items-start gap-2">
          <span className="text-[#CA8A04]">⚠</span>
          Do not upload confidential or sensitive information. All files are encrypted in transit and storage.
        </div>
      </div>
    </div>
  );
}

function Step7({ data }: { data: FormData }) {
  const typeLabels: Record<string, string> = { web: "Web Application", mobile: "Mobile Application", saas: "SaaS Platform", ai: "AI / ML", api: "API Development", automation: "Automation", enterprise: "Enterprise Software", other: "Other" };
  const budgetLabels: Record<string, string> = { "10-25k": "$10K – $25K", "25-50k": "$25K – $50K", "50-100k": "$50K – $100K", "100-250k": "$100K – $250K", "250k+": "$250K+", discuss: "To Discuss" };
  const timelineLabels: Record<string, string> = { asap: "ASAP", "1-3m": "1–3 months", "3-6m": "3–6 months", "6-12m": "6–12 months", "12m+": "12+ months", flexible: "Flexible" };
  return (
    <div>
      <div className="text-lg font-semibold text-[#101B1E] mb-1">Review Your Submission</div>
      <div className="text-sm text-[#5E7378] mb-6">Please review your project details before submitting.</div>
      <div className="space-y-4">
        {[
          { label: "Project Types", value: data.projectTypes.map(t => typeLabels[t]).join(", ") || "—" },
          { label: "Company", value: data.company || "—" },
          { label: "Contact", value: data.name && data.email ? `${data.name} — ${data.email}` : "—" },
          { label: "Country", value: data.country || "—" },
          { label: "Budget Range", value: budgetLabels[data.budget] || "—" },
          { label: "Timeline", value: timelineLabels[data.timeline] || "—" },
          { label: "Requirements", value: data.description ? `${data.description.substring(0, 120)}...` : "—" },
        ].map(item => (
          <div key={item.label} className="flex gap-4 py-3 border-b border-[rgba(16,27,30,0.05)]">
            <div className="w-32 flex-shrink-0 text-xs text-[#7C9096]">{item.label}</div>
            <div className="text-xs text-[#33474B] flex-1">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SuccessState({ refNo, onDone }: { refNo: string; onDone: () => void }) {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="max-w-md text-center animate-fade-in">
        <div className="size-16 rounded-full bg-[rgba(74,222,128,0.15)] border border-[rgba(74,222,128,0.3)] flex items-center justify-center text-2xl mx-auto mb-6">✓</div>
        <h2 className="text-2xl font-semibold text-[#101B1E] mb-2">Project Request Received</h2>
        <p className="text-sm text-[#5E7378] mb-6">Our engineering team will review your submission and respond within 48 hours with a detailed proposal.</p>
        <div className="bg-[#FFFFFF] border border-[rgba(16,27,30,0.07)] rounded-xl p-4 mb-8">
          <div className="text-xs text-[#7C9096] mb-1">Your Reference Number</div>
          <div className="text-xl font-mono font-semibold text-[#2B6E78]">{refNo}</div>
          <div className="text-[11px] text-[#7C9096] mt-1">Keep this for your records</div>
        </div>
        <div className="flex gap-3 justify-center">
          <Button onClick={onDone}>Back to Home</Button>
          <Button variant="secondary">Check Status</Button>
        </div>
      </div>
    </div>
  );
}

export default function ProjectInquiry({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [refNo] = useState(`ARQ-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9000) + 1000)}`);
  const [formData, setFormData] = useState<FormData>({
    projectTypes: [], company: "", name: "", email: "", country: "", phone: "",
    description: "", budget: "", timeline: "", files: [],
  });

  const canProceed = () => {
    if (step === 1) return formData.projectTypes.length > 0;
    if (step === 2) return formData.name && formData.email && formData.company;
    if (step === 3) return formData.description.length > 50;
    if (step === 4) return !!formData.budget;
    if (step === 5) return !!formData.timeline;
    return true;
  };

  if (submitted) return <SuccessState refNo={refNo} onDone={onClose} />;

  return (
    <div className="min-h-screen bg-[#C7D3D4] flex flex-col">
      {/* Header */}
      <div className="border-b border-[rgba(16,27,30,0.07)] px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="size-6 rounded-md bg-[#2B6E78] flex items-center justify-center">
            <span className="text-white font-bold text-[10px] font-mono">N</span>
          </div>
          <span className="text-sm font-semibold text-[#101B1E]">Start a Project</span>
        </div>
        <button onClick={onClose} className="text-[#7C9096] hover:text-[#101B1E] transition-colors w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[rgba(16,27,30,0.05)]">✕</button>
      </div>

      <div className="flex-1 flex flex-col items-center py-10 px-6">
        <div className="w-full max-w-2xl">
          {/* Step indicator */}
          <div className="flex items-center justify-between mb-10">
            <StepIndicator current={step} total={STEPS.length} />
            <div className="text-xs text-[#7C9096] font-mono">Step {step} of {STEPS.length}</div>
          </div>

          {/* Step content */}
          <div className="animate-fade-in min-h-[320px]">
            {step === 1 && <Step1 data={formData.projectTypes} onChange={types => setFormData(d => ({ ...d, projectTypes: types }))} />}
            {step === 2 && <Step2 data={formData} onChange={d => setFormData(prev => ({ ...prev, ...d }))} />}
            {step === 3 && <Step3 data={formData} onChange={d => setFormData(prev => ({ ...prev, ...d }))} />}
            {step === 4 && <Step4 data={formData} onChange={d => setFormData(prev => ({ ...prev, ...d }))} />}
            {step === 5 && <Step5 data={formData} onChange={d => setFormData(prev => ({ ...prev, ...d }))} />}
            {step === 6 && <Step6 />}
            {step === 7 && <Step7 data={formData} />}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-[rgba(16,27,30,0.07)]">
            <Button variant="ghost" onClick={() => step === 1 ? onClose() : setStep(s => s - 1)}>
              {step === 1 ? "← Cancel" : "← Back"}
            </Button>
            <div className="flex gap-3">
              {step === 7 ? (
                <Button size="lg" onClick={() => setSubmitted(true)}>Submit Project Request →</Button>
              ) : (
                <Button
                  onClick={() => setStep(s => s + 1)}
                  disabled={!canProceed()}
                >
                  {step === 6 ? "Review Submission →" : "Continue →"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
