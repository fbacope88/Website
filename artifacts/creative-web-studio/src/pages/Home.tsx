import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, useInView } from "framer-motion";
import { Menu, X, Gem, Zap, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mark } from "@/components/Mark";

const SITE_URL = import.meta.env.VITE_SITE_URL ?? "";

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

/* ==========================================================================
   Navbar
   ========================================================================== */
function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const go = (id: string) => {
    setMobileOpen(false);
    scrollToId(id);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between text-[#f5f5f7]">
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); go("hero"); }}
          className="flex items-center gap-2 font-semibold text-[15px]"
          data-testid="link-brand"
        >
          <Mark />
          Creative Web Studio
        </a>

        <nav className="hidden md:flex items-center gap-8 text-[13px] text-[#98989d]">
          <button onClick={() => go("packages")} className="hover:text-[#f5f5f7] transition-colors" data-testid="link-packages">Packages</button>
          <button onClick={() => go("process")} className="hover:text-[#f5f5f7] transition-colors" data-testid="link-process">Process</button>
          <button onClick={() => go("faq")} className="hover:text-[#f5f5f7] transition-colors" data-testid="link-faq">FAQ</button>
          <button onClick={() => go("contact")} className="hover:text-[#f5f5f7] transition-colors" data-testid="link-contact-nav">Contact</button>
          <a href="/blog" className="hover:text-[#f5f5f7] transition-colors" data-testid="link-blog">Blog</a>
          <a
            href="https://wa.me/447907313846"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#25D366] font-medium"
            data-testid="link-whatsapp"
          >
            WhatsApp
          </a>
          <button
            onClick={() => go("contact")}
            className="bg-[#2997ff] text-black text-[13px] font-semibold px-4 py-2 rounded-md hover:brightness-110 transition"
            data-testid="button-nav-cta"
          >
            Get a quote
          </button>
        </nav>

        <button className="md:hidden text-[#f5f5f7]" onClick={() => setMobileOpen((v) => !v)} data-testid="button-mobile-menu" aria-label="Toggle menu">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-black border-t border-white/10 px-6 py-4 flex flex-col gap-4 text-[#f5f5f7]">
          <button onClick={() => go("packages")} className="text-left">Packages</button>
          <button onClick={() => go("process")} className="text-left">Process</button>
          <button onClick={() => go("faq")} className="text-left">FAQ</button>
          <button onClick={() => go("contact")} className="text-left">Contact</button>
          <a href="/blog" className="text-left">Blog</a>
          <a href="https://wa.me/447907313846" target="_blank" rel="noopener noreferrer" className="text-left text-[#25D366] font-medium">WhatsApp</a>
        </div>
      )}
    </header>
  );
}

/* ==========================================================================
   Hero — huge centered type, minimal text-link CTAs, scroll + cursor 3D tilt
   on a generic browser mockup (no invented client claims).
   ========================================================================== */
function Hero() {
  const mockRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef({ mx: 0, my: 0 });

  useEffect(() => {
    const el = mockRef.current;
    if (!el) return;

    function apply() {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.min(Math.max((vh - rect.top) / (vh + rect.height), 0), 1);
      const scrollTilt = (0.5 - progress) * 12;
      el.style.transform = `rotateX(${scrollTilt + tiltRef.current.mx}deg) rotateY(${tiltRef.current.my}deg) scale(${1 - Math.abs(0.5 - progress) * 0.05})`;
    }

    function onScroll() { requestAnimationFrame(apply); }
    function onMove(e: MouseEvent) {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - (rect.left + rect.width / 2)) / rect.width;
      const py = (e.clientY - (rect.top + rect.height / 2)) / rect.height;
      tiltRef.current = { mx: -py * 5, my: px * 7 };
      apply();
    }
    function onLeave() { tiltRef.current = { mx: 0, my: 0 }; apply(); }

    const section = document.getElementById("hero");
    window.addEventListener("scroll", onScroll, { passive: true });
    section?.addEventListener("mousemove", onMove);
    section?.addEventListener("mouseleave", onLeave);
    const t = setTimeout(apply, 900);

    return () => {
      window.removeEventListener("scroll", onScroll);
      section?.removeEventListener("mousemove", onMove);
      section?.removeEventListener("mouseleave", onLeave);
      clearTimeout(t);
    };
  }, []);

  return (
    <section id="hero" className="relative pt-40 pb-24 px-6 text-center bg-black text-[#f5f5f7] overflow-hidden">
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-[40px] sm:text-6xl lg:text-[80px] font-bold leading-[1.04] tracking-tight max-w-4xl mx-auto text-balance"
        data-testid="heading-hero"
      >
        A website worthy of your business.
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="mt-5 text-lg sm:text-xl text-[#98989d] max-w-xl mx-auto"
      >
        Designed properly, built fast, live in 48&ndash;72 hours &mdash; from &pound;199.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="mt-7 flex justify-center gap-7 text-lg"
      >
        <button onClick={() => scrollToId("contact")} className="text-[#2997ff] hover:underline" data-testid="link-hero-quote">
          Get a quote &rsaquo;
        </button>
        <button onClick={() => scrollToId("packages")} className="text-[#2997ff] hover:underline" data-testid="link-hero-packages">
          See packages &rsaquo;
        </button>
      </motion.div>

      <div className="mt-16 max-w-3xl mx-auto" style={{ perspective: "1400px" }}>
        <div
          ref={mockRef}
          className="rounded-2xl overflow-hidden border border-white/10 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.8)]"
          style={{ transformStyle: "preserve-3d", willChange: "transform" }}
          data-testid="hero-mockup"
        >
          <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[#121214] border-b border-white/10">
            <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
            <span className="mx-auto text-[11px] text-[#98989d] bg-black rounded-full px-4 py-0.5">yourbusiness.co.uk</span>
          </div>
          <div className="grid sm:grid-cols-2 bg-[#0a0a0b] text-left">
            <div className="p-8 sm:p-10 flex flex-col justify-center gap-3">
              <p className="text-[11px] uppercase tracking-wider text-[#2997ff] font-semibold">Your Business Name</p>
              <p className="text-lg sm:text-xl font-bold leading-snug">A short, clear headline about what you do.</p>
              <p className="text-[13px] text-[#98989d] max-w-[24ch]">One line explaining why customers should choose you.</p>
              <span className="mt-1 inline-block w-fit text-[12px] font-semibold bg-[#2997ff] text-black rounded-md px-4 py-2">Get in touch</span>
            </div>
            <div className="min-h-[180px] relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1750056393331-82e69d28c9d9?w=1200&q=80&auto=format&fit=crop"
                alt="Laptop open on a desk, showing a website being built"
                className="absolute inset-0 w-full h-full object-cover grayscale-[35%] contrast-[1.08] brightness-[0.85]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   Process — a real sequence, presented as an interactive card carousel:
   drag/scroll or use the arrows, each card its own photo, mockup, and step.
   ========================================================================== */
const steps = [
  {
    title: "Tell us what you need",
    desc: "A quick call or form: your business, your pages, anything you already like the look of.",
    image: "https://images.unsplash.com/photo-1746792613213-c154e2891449?w=1000&q=80&auto=format&fit=crop",
  },
  {
    title: "We design and build it",
    desc: "Properly built, mobile-ready, SEO set up from day one — no drag-and-drop template shortcuts.",
    image: "https://images.unsplash.com/photo-1754548930550-be9fa88874f4?w=1000&q=80&auto=format&fit=crop",
  },
  {
    title: "It goes live",
    desc: "48–72 hours for Basic and Professional, 5–7 days for a full store. One payment, nothing recurring.",
    image: "https://images.unsplash.com/photo-1577705998148-6da4f3963bc8?w=1000&q=80&auto=format&fit=crop",
  },
];

/* ==========================================================================
   Why us
   ========================================================================== */
const reasons = [
  {
    title: "Premium quality guarantee",
    desc: "No templates. Every pixel is crafted to match your brand's unique identity.",
    icon: Gem,
  },
  {
    title: "Rapid deployment",
    desc: "Launch your site in days, not months. We respect your timeline.",
    icon: Zap,
  },
  {
    title: "Bulletproof reliability",
    desc: "Secure, scalable, and built on infrastructure that stays up.",
    icon: ShieldCheck,
  },
];

function ReasonCard({ reason, i }: { reason: (typeof reasons)[number]; i: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateX(${py * -6}deg) rotateY(${px * 8}deg) translateY(-4px)`;
  }
  function onLeave() {
    const el = cardRef.current;
    if (el) el.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)";
  }

  const Icon = reason.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group bg-[#121214] border border-white/10 rounded-2xl p-8 transition-[border-color,box-shadow] duration-300 hover:border-[#2997ff]/40 hover:shadow-[0_20px_50px_-24px_rgba(41,151,255,0.35)]"
      style={{ transformStyle: "preserve-3d", willChange: "transform" }}
      data-testid={`card-reason-${i}`}
    >
      <div className="w-11 h-11 rounded-full bg-black border border-white/10 flex items-center justify-center mb-6 text-[#2997ff] group-hover:border-[#2997ff]/40 transition-colors">
        <Icon size={20} strokeWidth={1.75} />
      </div>
      <h3 className="font-bold text-lg mb-2">{reason.title}</h3>
      <p className="text-[#98989d] text-[15px] leading-relaxed">{reason.desc}</p>
    </motion.div>
  );
}

function WhyUs() {
  return (
    <section className="bg-black text-[#f5f5f7] py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-balance leading-tight">
            We build digital assets that drive revenue.
          </h2>
          <p className="text-[#98989d] text-lg leading-relaxed">
            We aren't just order-takers. We partner with you to understand your market and craft a website that positions you as the premium option in your industry.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-6">
          {reasons.map((r, i) => (
            <ReasonCard key={r.title} reason={r} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  function scrollToCard(i: number) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[i] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  }

  function onScroll() {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = track.children[0]?.clientWidth ?? 1;
    const gap = 24;
    const i = Math.round(track.scrollLeft / (cardWidth + gap));
    setActive(Math.min(Math.max(i, 0), steps.length - 1));
  }

  return (
    <section id="process" className="bg-[#121214] text-[#f5f5f7] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-8 gap-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-balance">How it works.</h2>
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scrollToCard(Math.max(active - 1, 0))}
              className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center hover:bg-white/10 transition"
              aria-label="Previous step"
              data-testid="button-process-prev"
            >
              &larr;
            </button>
            <button
              onClick={() => scrollToCard(Math.min(active + 1, steps.length - 1))}
              className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center hover:bg-white/10 transition"
              aria-label="Next step"
              data-testid="button-process-next"
            >
              &rarr;
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          onScroll={onScroll}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-2"
          style={{ scrollbarWidth: "none" }}
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex-shrink-0 snap-start w-[82%] sm:w-[46%] lg:w-[31%] aspect-[3/4] rounded-3xl overflow-hidden group"
              data-testid={`card-process-${i}`}
            >
              <img
                src={step.image}
                alt=""
                className="absolute inset-0 w-full h-full object-cover grayscale-[30%] contrast-[1.05] brightness-[0.6] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40" />

              <div className="relative h-full flex flex-col justify-between p-7">
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-balance">{step.title}</h3>
                  <p className="text-[#d3d3d6] text-[14px] leading-relaxed max-w-[26ch]">{step.desc}</p>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => scrollToId("contact")}
                    className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 backdrop-blur border border-white/15 flex items-center justify-center hover:bg-[#2997ff] hover:text-black transition"
                    aria-label={`Get started: ${step.title}`}
                    data-testid={`button-process-cta-${i}`}
                  >
                    &rarr;
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToCard(i)}
              className={`h-1.5 rounded-full transition-all ${i === active ? "w-6 bg-[#2997ff]" : "w-1.5 bg-white/20"}`}
              aria-label={`Go to step ${i + 1}`}
              data-testid={`dot-process-${i}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   Packages — each its own 3D-tilting panel, alternating black / dark-grey.
   ========================================================================== */
type PlanId = "basic" | "professional" | "ecommerce";

const plans: {
  id: PlanId;
  name: string;
  price: string;
  eta: string;
  headline: string;
  desc: string;
  features: string[];
  alt: boolean;
  image: string;
  imageAlt: string;
}[] = [
  {
    id: "basic",
    name: "Basic",
    price: "£199",
    eta: "Live in 48 hours",
    headline: "Everything a small business needs. Nothing it doesn't.",
    desc: "A single-page, mobile-ready site built to load fast and convert.",
    features: ["3 pages (Home, About, Contact)", "Mobile-responsive design", "Contact form built in", "Core SEO setup"],
    image: "https://images.unsplash.com/photo-1754548930550-be9fa88874f4?w=900&q=80&auto=format&fit=crop",
    imageAlt: "A simple, focused workspace with a laptop showing code",
    alt: false,
  },
  {
    id: "professional",
    name: "Professional",
    price: "£399",
    eta: "Live in 72 hours",
    headline: "More pages. More visibility. More business.",
    desc: "Multi-page, SEO-optimised, and built to bring in new customers.",
    features: ["Everything in Basic", "Up to 6 pages", "Blog / news section", "Analytics set up for you"],
    image: "https://images.unsplash.com/photo-1746792613213-c154e2891449?w=900&q=80&auto=format&fit=crop",
    imageAlt: "A laptop, coffee, and plant on a wooden desk",
    alt: true,
  },
  {
    id: "ecommerce",
    name: "E-Commerce",
    price: "£599",
    eta: "Live in 5–7 days",
    headline: "Open your shop to everyone, everywhere.",
    desc: "A full online store with payments and stock built in from day one.",
    features: ["Everything in Professional", "Full online store", "Stripe payments built in", "Stock & order management"],
    image: "https://images.unsplash.com/photo-1577705998148-6da4f3963bc8?w=900&q=80&auto=format&fit=crop",
    imageAlt: "A cardboard shipping box, ready to be packed",
    alt: false,
  },
];

function PlanPanel({ plan }: { plan: (typeof plans)[number] }) {
  const [loading, setLoading] = useState(false);
  const mockRef = useRef<HTMLDivElement>(null);
  const inView = useInView(mockRef, { once: true, margin: "-80px" });

  async function handleCheckout() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: plan.id }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (data.url) window.location.href = data.url;
      else alert("Something went wrong. Please try again or contact us on WhatsApp.");
    } catch {
      alert("Unable to connect. Please try again or contact us on WhatsApp.");
    } finally {
      setLoading(false);
    }
  }

  const rotateFrom = plan.alt ? 22 : -22;

  return (
    <section className={`${plan.alt ? "bg-[#121214]" : "bg-black"} text-[#f5f5f7] py-24 px-6`} data-testid={`section-plan-${plan.id}`}>
      <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
        <div className={plan.alt ? "lg:order-2" : ""}>
          <p className="text-[13px] uppercase tracking-wider text-[#2997ff] font-semibold mb-3">{plan.name}</p>
          <h3 className="text-3xl sm:text-4xl font-bold mb-4 text-balance leading-tight">{plan.headline}</h3>
          <p className="text-[#98989d] text-lg mb-6 max-w-md">{plan.desc}</p>
          <ul className="space-y-2 mb-8 text-[15px] text-[#d3d3d6]">
            {plan.features.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-[#2997ff]" />
                {f}
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-6 flex-wrap">
            <div>
              <span className="text-3xl font-extrabold">{plan.price}</span>
              <span className="text-[#98989d] text-sm ml-2">one-time · {plan.eta}</span>
            </div>
          </div>
          <div className="mt-6 flex items-center gap-7">
            <button onClick={() => scrollToId("contact")} className="text-[#2997ff] hover:underline text-[17px]" data-testid={`link-plan-quote-${plan.id}`}>
              Get a quote &rsaquo;
            </button>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="text-[15px] font-semibold bg-[#2997ff] text-black rounded-md px-5 py-2.5 hover:brightness-110 transition disabled:opacity-60"
              data-testid={`button-checkout-${plan.id}`}
            >
              {loading ? "Redirecting…" : "Buy now"}
            </button>
          </div>
        </div>

        <div className={plan.alt ? "lg:order-1" : ""} style={{ perspective: "1000px" }}>
          <div
            ref={mockRef}
            className="rounded-xl overflow-hidden border border-white/10 shadow-[0_30px_60px_-26px_rgba(0,0,0,0.7)] mx-auto max-w-md"
            style={{
              transformStyle: "preserve-3d",
              transform: inView ? "rotateY(0deg) translateX(0)" : `rotateY(${rotateFrom}deg) translateX(${plan.alt ? 16 : -16}px)`,
              opacity: inView ? 1 : 0,
              transition: "transform 1s cubic-bezier(.16,1,.3,1), opacity 1s ease",
            }}
          >
            <div className="flex items-center gap-1.5 px-3.5 py-2 bg-[#121214] border-b border-white/10">
              <span className="w-2 h-2 rounded-full bg-white/15" />
              <span className="w-2 h-2 rounded-full bg-white/15" />
              <span className="w-2 h-2 rounded-full bg-white/15" />
              <span className="mx-auto text-[10px] text-[#98989d] bg-black rounded-full px-3 py-0.5">yourbusiness.co.uk</span>
            </div>
            <div className="min-h-[160px] relative overflow-hidden">
              <img
                src={plan.image}
                alt={plan.imageAlt}
                className="absolute inset-0 w-full h-full object-cover grayscale-[35%] contrast-[1.08] brightness-[0.85]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Packages() {
  return (
    <div id="packages">
      {plans.map((plan) => (
        <PlanPanel key={plan.id} plan={plan} />
      ))}
    </div>
  );
}

/* ==========================================================================
   FAQ — grounded in the real packages/policy above, nothing invented.
   ========================================================================== */
const faqs = [
  {
    q: "How much does a website cost?",
    a: "Three fixed packages: Basic £199, Professional £399, and E-Commerce £599 — all one-time payments, nothing recurring.",
  },
  {
    q: "How fast will my site actually be live?",
    a: "48 hours for Basic, 72 hours for Professional, and 5–7 days for a full E-Commerce store.",
  },
  {
    q: "Is this a subscription?",
    a: "No. Every package is a single, one-time payment — there's nothing to cancel and nothing billed again later.",
  },
  {
    q: "Is SEO included?",
    a: "Yes. Every package includes core SEO setup, and Professional and E-Commerce build on that as your site grows.",
  },
  {
    q: "What do you need from me to get started?",
    a: "Just your business details, the pages or features you want, and any sites you like the look of — the form below covers all of it.",
  },
  {
    q: "Can I talk to someone before I commit?",
    a: "Yes — WhatsApp us or send an enquiry and we'll come back with a fixed price and timeline within 24 hours.",
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-[#121214] text-[#f5f5f7] py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-balance">Frequently asked questions.</h2>
        <div className="divide-y divide-white/10 border-t border-b border-white/10">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-6 py-5 text-left"
                  aria-expanded={isOpen}
                  data-testid={`button-faq-${i}`}
                >
                  <span className="font-semibold text-[15px] sm:text-base">{item.q}</span>
                  <span
                    className="flex-shrink-0 text-[#98989d] transition-transform duration-300"
                    style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                  >
                    +
                  </span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="text-[#98989d] text-[15px] leading-relaxed pb-5 max-w-[52ch]">{item.a}</p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   Contact
   ========================================================================== */
function Contact() {
  const blank = { name: "", email: "", phone: "", businessName: "", websiteType: "", industry: "", timeline: "", message: "" };
  const [fields, setFields] = useState(blank);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const set = (k: keyof typeof blank) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setFields((f) => ({ ...f, [k]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  function reset() {
    setFields(blank);
    setStatus("idle");
  }

  return (
    <section id="contact" className="bg-black text-[#f5f5f7] py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3 text-balance">Ready to start your project?</h2>
        <p className="text-[#98989d] text-center mb-12">Tell us what you need — we'll come back with a fixed price and timeline within 24 hours.</p>

        {status === "success" ? (
          <div className="text-center py-10 border border-white/10 rounded-xl bg-[#121214]">
            <h3 className="text-2xl font-bold mb-2">Message sent.</h3>
            <p className="text-[#98989d] mb-6">We'll get back to you within 24 hours.</p>
            <Button onClick={reset} className="bg-[#2997ff] text-black hover:brightness-110 rounded-md px-6 h-11">
              Send another enquiry
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 bg-[#121214] border border-white/10 rounded-xl p-6 sm:p-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[13px] font-medium text-[#d3d3d6]">Full name *</label>
                <Input value={fields.name} onChange={set("name")} required placeholder="John Doe" className="h-11 bg-black border-white/15 text-[#f5f5f7] placeholder:text-[#5c5c60] focus-visible:ring-[#2997ff]" data-testid="input-name" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[13px] font-medium text-[#d3d3d6]">Phone</label>
                <Input value={fields.phone} onChange={set("phone")} placeholder="+44 7700 000000" className="h-11 bg-black border-white/15 text-[#f5f5f7] placeholder:text-[#5c5c60] focus-visible:ring-[#2997ff]" data-testid="input-phone" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-[#d3d3d6]">Email *</label>
              <Input type="email" value={fields.email} onChange={set("email")} required placeholder="john@example.com" className="h-11 bg-black border-white/15 text-[#f5f5f7] placeholder:text-[#5c5c60] focus-visible:ring-[#2997ff]" data-testid="input-email" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-[#d3d3d6]">Business name *</label>
              <Input value={fields.businessName} onChange={set("businessName")} required placeholder="e.g. Acme Ltd" className="h-11 bg-black border-white/15 text-[#f5f5f7] placeholder:text-[#5c5c60] focus-visible:ring-[#2997ff]" data-testid="input-business" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[13px] font-medium text-[#d3d3d6]">Package *</label>
                <select value={fields.websiteType} onChange={set("websiteType")} required className="w-full h-11 bg-black border border-white/15 rounded-md px-3 text-[#f5f5f7] text-sm outline-none" data-testid="input-website-type">
                  <option value="">Select…</option>
                  <option value="Basic — £199">Basic — £199</option>
                  <option value="Professional — £399">Professional — £399</option>
                  <option value="E-Commerce — £599">E-Commerce — £599</option>
                  <option value="Not sure yet">Not sure yet</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[13px] font-medium text-[#d3d3d6]">Timeline *</label>
                <select value={fields.timeline} onChange={set("timeline")} required className="w-full h-11 bg-black border border-white/15 rounded-md px-3 text-[#f5f5f7] text-sm outline-none" data-testid="input-timeline">
                  <option value="">Select…</option>
                  <option value="ASAP (48–72 hrs)">ASAP (48–72 hrs)</option>
                  <option value="Within 1 week">Within 1 week</option>
                  <option value="Within 2 weeks">Within 2 weeks</option>
                  <option value="Flexible">Flexible</option>
                </select>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-[#d3d3d6]">Industry *</label>
              <Input value={fields.industry} onChange={set("industry")} required placeholder="e.g. Plumber, cafe, dentist…" className="h-11 bg-black border-white/15 text-[#f5f5f7] placeholder:text-[#5c5c60] focus-visible:ring-[#2997ff]" data-testid="input-industry" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-[#d3d3d6]">Project details *</label>
              <Textarea value={fields.message} onChange={set("message")} required placeholder="Pages, features, anything you already like the look of…" className="min-h-[100px] bg-black border-white/15 text-[#f5f5f7] placeholder:text-[#5c5c60] focus-visible:ring-[#2997ff] resize-none" data-testid="input-message" />
            </div>
            {status === "error" && <p className="text-red-400 text-sm">Something went wrong. Please try again or WhatsApp us.</p>}
            <Button type="submit" disabled={status === "sending"} className="w-full h-12 bg-[#2997ff] text-black hover:brightness-110 font-semibold disabled:opacity-60" data-testid="button-submit-contact">
              {status === "sending" ? "Sending…" : "Send enquiry"}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}

/* ==========================================================================
   Footer
   ========================================================================== */
function Footer() {
  return (
    <footer className="bg-[#0a0a0b] text-[#98989d] py-12 px-6 border-t border-white/10">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6 text-[13px]">
        <div className="flex items-center gap-2 text-[#f5f5f7] font-semibold">
          <Mark size={20} />
          Creative Web Studio
        </div>
        <div className="flex gap-6">
          <a href="/blog" className="hover:text-[#f5f5f7] transition-colors">Blog</a>
          <a href="/privacy-policy" className="hover:text-[#f5f5f7] transition-colors">Privacy Policy</a>
          <a href="/terms-of-service" className="hover:text-[#f5f5f7] transition-colors">Terms of Service</a>
        </div>
        <p>&copy; {new Date().getFullYear()} Creative Web Studio Experts</p>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-black font-sans selection:bg-[#2997ff] selection:text-black">
      <Helmet>
        <title>Professional Web Design Agency | Creative Web Studio Experts</title>
        <meta
          name="description"
          content="Creative Web Studio Experts — professional web design for small businesses in Crewe and across the UK. Custom, mobile-ready, SEO-optimised sites live in 48–72 hours, from £199."
        />
        <meta name="robots" content="index, follow" />
        {SITE_URL && <link rel="canonical" href={`${SITE_URL}/`} />}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Professional Web Design Agency | Creative Web Studio Experts" />
        <meta
          property="og:description"
          content="Creative Web Studio Experts — professional web design for small businesses in Crewe and across the UK. Custom, mobile-ready, SEO-optimised sites live in 48–72 hours, from £199."
        />
        <meta property="og:url" content={`${SITE_URL}/`} />
        <meta property="og:image" content={`${SITE_URL}/opengraph.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <Navbar />
      <main>
        <Hero />
        <WhyUs />
        <Process />
        <Packages />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
