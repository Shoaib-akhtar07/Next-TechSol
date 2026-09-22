import { useState } from "react";
import { Button, Badge } from "../components/ui";

// ── Tech Node Grid Visual ──────────────────────────────────────────────────
function TechVisual() {
  const nodes = [
    { label: "React", x: 20, y: 15 }, { label: "Next.js", x: 55, y: 8 }, { label: "TypeScript", x: 80, y: 20 },
    { label: "Node.js", x: 10, y: 50 }, { label: "Python", x: 45, y: 42 }, { label: "Go", x: 78, y: 48 },
    { label: "PostgreSQL", x: 22, y: 78 }, { label: "Redis", x: 55, y: 72 }, { label: "Kubernetes", x: 85, y: 75 },
    { label: "GPT-4", x: 38, y: 25 }, { label: "AWS", x: 65, y: 30 }, { label: "Docker", x: 15, y: 65 },
  ];
  const connections = [
    [0, 1], [1, 2], [4, 5], [4, 6], [3, 6], [7, 8], [9, 10], [1, 9], [5, 8], [4, 11], [10, 8],
  ];
  return (
    <div className="relative w-full h-64 opacity-60">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {connections.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
            stroke="color-mix(in_srgb,var(--primary)_20%,transparent)" strokeWidth="0.3"
          />
        ))}
        {nodes.map((n, i) => (
          <circle key={i} cx={n.x} cy={n.y} r="0.8" fill="var(--primary)" opacity="0.6" />
        ))}
      </svg>
      {nodes.map((n, i) => (
        <div
          key={i}
          className="absolute font-mono text-[9px] text-[#4A6064] whitespace-nowrap"
          style={{ left: `${n.x}%`, top: `${n.y}%`, transform: "translate(-50%,-50%)", marginTop: 10 }}
        >
          {n.label}
        </div>
      ))}
    </div>
  );
}

// ── Service Card ───────────────────────────────────────────────────────────
function ServiceCard({ icon, title, desc, tags, onLearnMore }: { icon: string; title: string; desc: string; tags: string[]; onLearnMore?: () => void }) {
  return (
    <div className="group bg-[#FFFFFF] border border-[rgba(16,27,30,0.07)] rounded-xl p-6 hover:border-[color-mix(in_srgb,var(--primary)_30%,transparent)] hover:bg-[color-mix(in_srgb,var(--primary)_2%,transparent)] transition-all duration-300 cursor-pointer">
      <div className="text-2xl mb-4">{icon}</div>
      <h3 className="text-base font-semibold text-[var(--foreground)] mb-2">{title}</h3>
      <p className="text-sm text-[#5E7378] leading-relaxed mb-4">{desc}</p>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {tags.map(t => (
          <span key={t} className="text-[10px] font-mono text-[#7C9096] bg-[rgba(16,27,30,0.04)] border border-[rgba(16,27,30,0.06)] px-2 py-0.5 rounded-full">{t}</span>
        ))}
      </div>
      <button onClick={onLearnMore} className="text-xs text-[var(--primary)] hover:text-[color-mix(in_srgb,var(--primary)_60%,white)] transition-colors font-medium flex items-center gap-1">
        Learn more <span className="group-hover:translate-x-0.5 transition-transform">→</span>
      </button>
    </div>
  );
}

// ── Process Step ───────────────────────────────────────────────────────────
function ProcessStep({ num, title, desc, active }: { num: string; title: string; desc: string; active?: boolean }) {
  return (
    <div className={`relative flex gap-4 group ${active ? "opacity-100" : "opacity-60 hover:opacity-90 transition-opacity"}`}>
      <div className="flex flex-col items-center">
        <div className={`size-9 rounded-full flex items-center justify-center text-xs font-mono font-bold flex-shrink-0 border transition-colors ${active ? "bg-[var(--primary)] border-[var(--primary)] text-white" : "bg-[#FFFFFF] border-[rgba(16,27,30,0.12)] text-[#5E7378] group-hover:border-[color-mix(in_srgb,var(--primary)_30%,transparent)]"}`}>
          {num}
        </div>
        <div className="w-px flex-1 bg-[rgba(16,27,30,0.07)] mt-2" />
      </div>
      <div className="pb-8">
        <div className="text-sm font-semibold text-[var(--foreground)] mb-1">{title}</div>
        <div className="text-xs text-[#5E7378] leading-relaxed">{desc}</div>
      </div>
    </div>
  );
}

// ── Industry Card ──────────────────────────────────────────────────────────
function IndustryCard({ icon, name, desc }: { icon: string; name: string; desc: string }) {
  return (
    <div className="bg-[#FFFFFF] border border-[rgba(16,27,30,0.07)] rounded-xl p-5 hover:border-[color-mix(in_srgb,var(--primary)_25%,transparent)] transition-all group cursor-pointer">
      <div className="text-xl mb-3">{icon}</div>
      <div className="text-sm font-semibold text-[var(--foreground)] mb-1.5">{name}</div>
      <div className="text-xs text-[#5E7378] leading-relaxed">{desc}</div>
    </div>
  );
}

// ── Tech Pill ──────────────────────────────────────────────────────────────
function TechGroup({ label, techs }: { label: string; techs: string[] }) {
  return (
    <div>
      <div className="text-[10px] font-mono text-[#7C9096] uppercase tracking-widest mb-3">{label}</div>
      <div className="flex flex-wrap gap-2">
        {techs.map(t => (
          <span key={t} className="text-xs font-mono text-[#4A6064] bg-[rgba(16,27,30,0.04)] border border-[rgba(16,27,30,0.07)] px-2.5 py-1 rounded-md hover:border-[color-mix(in_srgb,var(--primary)_30%,transparent)] hover:text-[#33474B] transition-all cursor-default">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function PublicSite({ onStartProject, onPortalLogin }: { onStartProject: () => void; onPortalLogin: (role: string) => void }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeProcess, setActiveProcess] = useState(0);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[rgba(16,27,30,0.07)] bg-[color-mix(in_srgb,var(--background)_85%,transparent)] backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-7 rounded-lg bg-[var(--primary)] flex items-center justify-center">
              <span className="text-white font-bold text-xs font-mono">N</span>
            </div>
            <span className="font-semibold text-[var(--foreground)] tracking-tight">Next TechSol</span>
          </div>
          <div className="hidden lg:flex items-center gap-6 text-sm text-[#4A6064]">
            {["Services", "Solutions", "Industries", "Work", "Company", "Resources"].map(item => (
              <button key={item} className="hover:text-[var(--foreground)] transition-colors">{item}</button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2">
              <button onClick={() => onPortalLogin("customer")} className="text-xs text-[#4A6064] hover:text-[var(--foreground)] transition-colors px-3 py-1.5 rounded-md hover:bg-[rgba(16,27,30,0.04)]">
                Client Portal
              </button>
              <button onClick={() => onPortalLogin("employee")} className="text-xs text-[#4A6064] hover:text-[var(--foreground)] transition-colors px-3 py-1.5 rounded-md hover:bg-[rgba(16,27,30,0.04)]">
                Team
              </button>
            </div>
            <Button size="sm" onClick={onStartProject}>Start a Project</Button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden text-[#4A6064] hover:text-[var(--foreground)] w-8 h-8 flex items-center justify-center">
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[rgba(16,27,30,0.07)] bg-[var(--background)] px-6 py-4 flex flex-col gap-3">
            {["Services", "Solutions", "Industries", "Work", "Company", "Resources", "Client Portal", "Team"].map(item => (
              <button key={item} className="text-sm text-left text-[#4A6064] hover:text-[var(--foreground)] py-1">{item}</button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative pt-28 pb-24 px-6 grid-pattern overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--background)]" />
        <div className="absolute top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-[var(--primary)] rounded-full opacity-[0.04] blur-[100px] pointer-events-none" />
        <div className="relative max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <Badge dot>Now accepting projects for Q1 2026</Badge>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-[var(--foreground)] leading-[1.05] tracking-tight mb-6 max-w-4xl">
            We Build the Software<br />
            <span className="text-[var(--primary)]">Behind Ambitious</span><br />
            Businesses.
          </h1>
          <p className="text-lg text-[#5E7378] max-w-2xl mb-10 leading-relaxed">
            We design, engineer and operate digital products, intelligent systems and software infrastructure built for scale.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" onClick={onStartProject}>Start a Project</Button>
            <Button size="lg" variant="secondary">Explore Our Work →</Button>
          </div>
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { value: "50+", label: "Projects Delivered" },
              { value: "15+", label: "Technologies" },
              { value: "10+", label: "Industries" },
              { value: "24/7", label: "Technical Support" },
            ].map(stat => (
              <div key={stat.label}>
                <div className="text-3xl font-semibold text-[var(--foreground)] tracking-tight">{stat.value}</div>
                <div className="text-xs text-[#7C9096] mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Visual */}
      <section className="py-16 px-6 border-y border-[rgba(16,27,30,0.06)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <div className="text-[10px] font-mono text-[#7C9096] uppercase tracking-widest mb-3">Engineering Ecosystem</div>
            <h2 className="text-2xl font-semibold text-[var(--foreground)]">Full-Stack Technology Capability</h2>
          </div>
          <TechVisual />
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-lg mb-12">
            <div className="text-[10px] font-mono text-[var(--primary)] uppercase tracking-widest mb-3">Services</div>
            <h2 className="text-3xl font-semibold text-[var(--foreground)] mb-3">What We Engineer</h2>
            <p className="text-sm text-[#5E7378] leading-relaxed">End-to-end software engineering across product, infrastructure, intelligence, and design.</p>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
            <ServiceCard
              icon="⬡"
              title="Digital Product Engineering"
              desc="From concept to production — web apps, mobile platforms, SaaS architecture, and enterprise software."
              tags={["React", "Next.js", "iOS", "Android", "Node.js"]}
              onLearnMore={() => {}}
            />
            <ServiceCard
              icon="◈"
              title="AI & Automation"
              desc="LLM-powered applications, AI agents, RAG systems, and intelligent business automation pipelines."
              tags={["GPT-4", "LangChain", "RAG", "Agents", "Python"]}
              onLearnMore={() => {}}
            />
            <ServiceCard
              icon="⬘"
              title="Engineering & Infrastructure"
              desc="Scalable API architecture, cloud infrastructure, DevOps pipelines, and database engineering."
              tags={["AWS", "GCP", "Kubernetes", "PostgreSQL", "Go"]}
              onLearnMore={() => {}}
            />
            <ServiceCard
              icon="◉"
              title="Product Design"
              desc="UI/UX strategy, design systems, rapid prototyping, and end-to-end product design for complex interfaces."
              tags={["Figma", "Design Systems", "UX Research", "Motion"]}
              onLearnMore={() => {}}
            />
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 px-6 bg-[#DCE7E7] border-y border-[rgba(16,27,30,0.06)]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-lg mb-12">
            <div className="text-[10px] font-mono text-[var(--primary)] uppercase tracking-widest mb-3">Stack</div>
            <h2 className="text-3xl font-semibold text-[var(--foreground)] mb-3">Technology Capabilities</h2>
            <p className="text-sm text-[#5E7378]">A production-grade engineering stack across every layer of the modern application.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <TechGroup label="Frontend" techs={["React", "Next.js", "TypeScript", "Vue.js", "React Native"]} />
            <TechGroup label="Backend" techs={["Node.js", "Python", "Go", "FastAPI", "GraphQL", "REST"]} />
            <TechGroup label="Cloud / DevOps" techs={["AWS", "GCP", "Azure", "Docker", "Kubernetes", "Terraform"]} />
            <TechGroup label="AI / Data" techs={["GPT-4", "Claude", "LangChain", "PostgreSQL", "Redis", "Elasticsearch"]} />
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-lg mb-12">
            <div className="text-[10px] font-mono text-[var(--primary)] uppercase tracking-widest mb-3">Industries</div>
            <h2 className="text-3xl font-semibold text-[var(--foreground)] mb-3">Sectors We Serve</h2>
            <p className="text-sm text-[#5E7378]">Deep domain expertise across the industries where software creates the most value.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3">
            {[
              { icon: "✈", name: "Travel & Tourism", desc: "Booking engines, PMS, OTA integrations" },
              { icon: "⚕", name: "Healthcare", desc: "EHR systems, telemedicine, HIPAA compliance" },
              { icon: "◎", name: "FinTech", desc: "Payments, lending platforms, regulatory tech" },
              { icon: "⊞", name: "E-commerce", desc: "Marketplace platforms, inventory, fulfilment" },
              { icon: "◫", name: "Education", desc: "LMS, adaptive learning, credentialing" },
              { icon: "⊡", name: "Logistics", desc: "Route optimization, tracking, warehouse ops" },
              { icon: "⊟", name: "Real Estate", desc: "PropTech, CRM, listing platforms" },
              { icon: "⊕", name: "Enterprise", desc: "ERP, workflow automation, data pipelines" },
              { icon: "◆", name: "Startups", desc: "MVP, product iteration, scale strategy" },
            ].map(ind => <IndustryCard key={ind.name} {...ind} />)}
          </div>
        </div>
      </section>

      {/* AI Section */}
      <section className="py-20 px-6 bg-[#DCE7E7] border-y border-[rgba(16,27,30,0.06)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-[10px] font-mono text-[var(--primary)] uppercase tracking-widest mb-3">Artificial Intelligence</div>
              <h2 className="text-3xl font-semibold text-[var(--foreground)] mb-4 leading-snug">
                AI as an Engineering<br />Discipline — Not a Feature
              </h2>
              <p className="text-sm text-[#5E7378] leading-relaxed mb-8">
                We integrate intelligence at the infrastructure level. From LLM-powered applications to autonomous agents and intelligent automation pipelines — built to production standard.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {["AI Agents", "RAG Systems", "Document Intelligence", "LLM Integrations", "Business Automation", "Predictive Analytics"].map(cap => (
                  <div key={cap} className="flex items-center gap-2 text-xs text-[#4A6064]">
                    <div className="size-1.5 rounded-full bg-[var(--primary)]" />
                    {cap}
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              {[
                { label: "Business Problem", icon: "◎", desc: "Complex operational challenge requiring automation" },
                { label: "AI Intelligence Layer", icon: "◈", desc: "LLM reasoning, RAG retrieval, agent orchestration" },
                { label: "Automation Pipeline", icon: "⬡", desc: "Workflow execution, integrations, human-in-the-loop" },
                { label: "Business Outcome", icon: "◆", desc: "Measurable efficiency, accuracy, and scale gains" },
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-[#FFFFFF] border border-[rgba(16,27,30,0.07)] rounded-xl">
                  <div className="text-[var(--primary)] text-lg flex-shrink-0">{step.icon}</div>
                  <div>
                    <div className="text-xs font-semibold text-[var(--foreground)] mb-0.5">{step.label}</div>
                    <div className="text-xs text-[#7C9096]">{step.desc}</div>
                  </div>
                  {i < 3 && <div className="ml-auto text-[#A3B4B7] text-xs">↓</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <div className="text-[10px] font-mono text-[var(--primary)] uppercase tracking-widest mb-3">Process</div>
              <h2 className="text-3xl font-semibold text-[var(--foreground)] mb-4">How We Deliver</h2>
              <p className="text-sm text-[#5E7378] leading-relaxed mb-8">
                A structured engineering process built for predictability, transparency, and quality — at every stage of the project lifecycle.
              </p>
              <Button onClick={onStartProject}>Start a Project →</Button>
            </div>
            <div>
              {[
                { num: "01", title: "Discover", desc: "Deep-dive into your business, users, technical landscape, and constraints." },
                { num: "02", title: "Strategy", desc: "Architecture planning, technology selection, roadmap, and resourcing." },
                { num: "03", title: "Design", desc: "UX research, wireframing, design system, and high-fidelity prototypes." },
                { num: "04", title: "Engineer", desc: "Production-grade development with CI/CD, testing, and code review." },
                { num: "05", title: "Test", desc: "QA, performance, security, and acceptance testing with client review." },
                { num: "06", title: "Deploy", desc: "Production deployment with zero-downtime pipelines and monitoring." },
                { num: "07", title: "Scale", desc: "Ongoing performance, new features, infrastructure scaling, and support." },
              ].map((step, i) => (
                <ProcessStep key={step.num} {...step} active={i === activeProcess} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 px-6 bg-[#DCE7E7] border-y border-[rgba(16,27,30,0.06)]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="text-[10px] font-mono text-[var(--primary)] uppercase tracking-widest mb-3">Work</div>
              <h2 className="text-3xl font-semibold text-[var(--foreground)]">Selected Projects</h2>
            </div>
            <Button variant="ghost" size="sm">View All →</Button>
          </div>
          <div className="grid lg:grid-cols-3 gap-5">
            {[
              {
                client: "Atlas Travel Group",
                industry: "Travel & Tourism",
                project: "Global Travel Platform",
                challenge: "Legacy booking system causing 30% cart abandonment across 40+ markets.",
                outcome: "47% increase in booking completion. $2.4M annual revenue uplift.",
                tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
                timeline: "6 months",
                img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&h=300&fit=crop&auto=format",
              },
              {
                client: "MediCore Solutions",
                industry: "Healthcare",
                project: "Clinical Data Platform",
                challenge: "Fragmented patient records across 12 hospital systems with no unified view.",
                outcome: "Unified records for 800K patients. 60% reduction in admin overhead.",
                tech: ["Python", "FastAPI", "AWS", "HL7 FHIR"],
                timeline: "9 months",
                img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=300&fit=crop&auto=format",
              },
              {
                client: "FinEdge Capital",
                industry: "FinTech",
                project: "Investment Portal",
                challenge: "Manual onboarding taking 2 weeks per client. No self-serve compliance workflow.",
                outcome: "Onboarding reduced to 4 hours. 3x client capacity without additional headcount.",
                tech: ["Next.js", "Go", "Kubernetes", "Redis"],
                timeline: "5 months",
                img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=300&fit=crop&auto=format",
              },
            ].map(cs => (
              <div key={cs.client} className="bg-[#FFFFFF] border border-[rgba(16,27,30,0.07)] rounded-xl overflow-hidden hover:border-[color-mix(in_srgb,var(--primary)_30%,transparent)] transition-all group">
                <div className="h-44 overflow-hidden">
                  <img src={cs.img} alt={cs.project} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-mono text-[#7C9096]">{cs.client}</span>
                    <span className="text-[#A3B4B7]">·</span>
                    <Badge variant="neutral" size="sm">{cs.industry}</Badge>
                  </div>
                  <h3 className="text-sm font-semibold text-[var(--foreground)] mb-2">{cs.project}</h3>
                  <p className="text-xs text-[#5E7378] mb-3 leading-relaxed">{cs.outcome}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {cs.tech.map(t => <span key={t} className="text-[10px] font-mono text-[#7C9096] bg-[rgba(16,27,30,0.04)] px-2 py-0.5 rounded border border-[rgba(16,27,30,0.06)]">{t}</span>)}
                  </div>
                  <button className="text-xs text-[var(--primary)] font-medium hover:text-[color-mix(in_srgb,var(--primary)_60%,white)] transition-colors">View Case Study →</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 px-6 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[var(--primary)] opacity-[0.05] blur-[120px] rounded-full pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center">
          <div className="text-[10px] font-mono text-[var(--primary)] uppercase tracking-widest mb-4">Get Started</div>
          <h2 className="text-4xl md:text-5xl font-semibold text-[var(--foreground)] mb-6 leading-tight">
            Have a Complex Problem?<br />
            <span className="text-[var(--primary)]">Let's Engineer the Solution.</span>
          </h2>
          <p className="text-base text-[#5E7378] mb-10 max-w-lg mx-auto leading-relaxed">
            Tell us about your project. We'll match you with the right engineering team within 48 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button size="lg" onClick={onStartProject}>Start a Project</Button>
            <Button size="lg" variant="secondary">Talk to an Engineer</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[rgba(16,27,30,0.07)] bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="size-7 rounded-lg bg-[var(--primary)] flex items-center justify-center">
                  <span className="text-white font-bold text-xs font-mono">N</span>
                </div>
                <span className="font-semibold text-[var(--foreground)]">Next TechSol</span>
              </div>
              <p className="text-xs text-[#7C9096] leading-relaxed max-w-xs">
                Engineering the software infrastructure behind ambitious businesses globally.
              </p>
            </div>
            {[
              { title: "Services", links: ["Web Applications", "Mobile Apps", "SaaS Platforms", "AI Solutions", "Cloud & DevOps"] },
              { title: "Company", links: ["About", "Careers", "Blog", "Press", "Contact"] },
              { title: "Industries", links: ["Travel", "Healthcare", "FinTech", "E-commerce", "Enterprise"] },
              { title: "Resources", links: ["Documentation", "Case Studies", "Blog", "Newsletter", "Status"] },
            ].map(col => (
              <div key={col.title}>
                <div className="text-xs font-semibold text-[var(--foreground)] mb-3">{col.title}</div>
                <div className="flex flex-col gap-2">
                  {col.links.map(l => <a key={l} href="#" className="text-xs text-[#7C9096] hover:text-[#4A6064] transition-colors">{l}</a>)}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-[rgba(16,27,30,0.07)] pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-[11px] text-[#7C9096]">© 2026 Next TechSol. All rights reserved.</div>
            <div className="flex gap-4">
              {["Privacy Policy", "Terms", "Security", "Cookie Policy"].map(l => (
                <a key={l} href="#" className="text-[11px] text-[#7C9096] hover:text-[#4A6064] transition-colors">{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
