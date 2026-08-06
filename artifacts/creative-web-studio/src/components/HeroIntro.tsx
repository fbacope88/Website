import { useCallback, useEffect, useRef, useState } from "react";

/* ==========================================================================
   HeroIntro — animated "wireframe build" hero intro, ported from the
   uploaded motion design (attached_assets/Animated_hero_video_design_*).

   Timeline (plays once per page load, desktop only):
     0.0–1.8s  WireframeBuild  — blueprint outlines draw in
     1.8–3.6s  DesignElements  — fills, buttons and floating tokens settle
     3.6–5.4s  ContentFill     — real content + shimmer sweep
     5.4–7.6s  CameraPullBack  — wireframe fades to black, headline types on

   Skipped entirely (static hero shown) when:
     - prefers-reduced-motion
     - viewport < 768px
     - user scrolls or presses a key during the intro
   ========================================================================== */

const ACCENT = "#2997ff";
const WHITE = "#FFFFFF";

const D1 = 1.8, D2 = 1.8, D3 = 1.8, D4 = 2.2;
const T1 = D1, T2 = T1 + D2, T3 = T2 + D3, TOTAL = T3 + D4;

const HEADLINE_TEXT = "A website worthy of your business.";
const SUB_TEXT = "Designed properly, built fast, live in 48\u201372 hours \u2014 from \u00a3199.";

/* ---- easing / math helpers ---- */
const clamp = (v: number, a: number, b: number) => Math.min(Math.max(v, a), b);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeOutCubic = (t: number) => 1 - Math.pow(1 - clamp(t, 0, 1), 3);
const easeInOutCubic = (t: number) => {
  const x = clamp(t, 0, 1);
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};
const stagger = (p: number, s: number, e: number) =>
  e <= s ? (p >= e ? 1 : 0) : clamp((p - s) / (e - s), 0, 1);
const reveal = (t: number) => `inset(0 ${(1 - t) * 100}% 0 0 round 12px)`;

/* ---- persistent layout (1920x1080 design space) ---- */
type Rect = { x: number; y: number; w: number; h: number; r?: number };

const FRAME: Rect = { x: 160, y: 120, w: 1600, h: 840, r: 16 };
const TOPBAR_H = 48;
const ADDR: Rect = { x: 760, y: 132, w: 400, h: 24, r: 12 };
const LOGO: Rect = { x: 200, y: 184, w: 22, h: 22, r: 6 };
const NAV_LINKS: Rect[] = [
  { x: 640, y: 190, w: 64, h: 12 },
  { x: 728, y: 190, w: 80, h: 12 },
  { x: 832, y: 190, w: 56, h: 12 },
  { x: 912, y: 190, w: 70, h: 12 },
];
const NAV_CTA: Rect = { x: 1656, y: 178, w: 104, h: 32, r: 8 };
const HEADLINE1: Rect = { x: 200, y: 254, w: 600, h: 30, r: 6 };
const HEADLINE2: Rect = { x: 200, y: 292, w: 420, h: 30, r: 6 };
const SUBLINE1: Rect = { x: 200, y: 340, w: 460, h: 14, r: 4 };
const SUBLINE2: Rect = { x: 200, y: 360, w: 380, h: 14, r: 4 };
const CTA: Rect = { x: 200, y: 396, w: 172, h: 48, r: 8 };
const CTA2: Rect = { x: 396, y: 396, w: 132, h: 48, r: 8 };
const HERO_IMAGE: Rect = { x: 920, y: 244, w: 640, h: 200, r: 14 };

const CARD_W = 480, CARD_H = 220, CARD_Y = 480;
const CARDS: Rect[] = [
  { x: 200, y: CARD_Y, w: CARD_W, h: CARD_H },
  { x: 720, y: CARD_Y, w: CARD_W, h: CARD_H },
  { x: 1240, y: CARD_Y, w: CARD_W, h: CARD_H },
];

const STATS_Y = CARD_Y + CARD_H + 44;
const STATS = [200, 590, 980, 1370].map((x) => ({
  num: { x, y: STATS_Y, w: 90, h: 26, r: 6 } as Rect,
  label: { x, y: STATS_Y + 38, w: 116, h: 10, r: 3 } as Rect,
}));

const FOOTER_DIVIDER = { x: 200, y: STATS_Y + 96, w: 1520, h: 2 };
const FOOTER_COLS = [200, 590, 980, 1370].map((x) => ({
  heading: { x, y: FOOTER_DIVIDER.y + 24, w: 100, h: 13, r: 3 } as Rect,
  links: [
    { x, y: FOOTER_DIVIDER.y + 52, w: 90, h: 10, r: 3 } as Rect,
    { x, y: FOOTER_DIVIDER.y + 70, w: 110, h: 10, r: 3 } as Rect,
    { x, y: FOOTER_DIVIDER.y + 88, w: 80, h: 10, r: 3 } as Rect,
  ],
}));

const TOKENS = [
  { shape: "circle", size: 36, from: { x: -60, y: 200 }, to: { x: 84, y: 176 }, bob: 0 },
  { shape: "square", size: 28, from: { x: 2000, y: 260 }, to: { x: 1820, y: 216 }, bob: 1.1 },
  { shape: "circle", size: 28, from: { x: -60, y: 880 }, to: { x: 78, y: 848 }, bob: 2.2 },
  { shape: "square", size: 24, from: { x: 2000, y: 820 }, to: { x: 1830, y: 838 }, bob: 0.6 },
  { shape: "circle", size: 44, from: { x: 960, y: -80 }, to: { x: 960, y: 58 }, bob: 1.7 },
];

/* ---- demo-site copy shown inside the wireframe (generic client site,
        no invented claims — the stats are Creative Web Studio's real offer) ---- */
const NAV_LABELS = ["Home", "Services", "About", "Contact"];
const CARD_COPY = [
  { title: "Clear Messaging", body: "Customers see exactly what you do within seconds of landing." },
  { title: "Mobile Friendly", body: "Looks sharp on every phone, tablet, and desktop screen." },
  { title: "Found on Google", body: "Structured properly so local customers can actually find you." },
];
const STAT_COPY = [
  { num: "48\u201372h", label: "Typical build time" },
  { num: "\u00a3199", label: "Starting price" },
  { num: "100%", label: "Mobile responsive" },
  { num: "UK", label: "Design & support" },
];
const FOOTER_COPY = [
  { heading: "Services", links: ["Web Design", "Hosting", "Updates"] },
  { heading: "Company", links: ["About", "Blog", "Contact"] },
  { heading: "Resources", links: ["FAQ", "Process", "Pricing"] },
  { heading: "Legal", links: ["Privacy", "Terms", "Cookies"] },
];

/* ==========================================================================
   Wireframe composition primitives
   ========================================================================== */
function Outline({ rect, t }: { rect: Rect; t: number }) {
  if (t <= 0) return null;
  return (
    <div style={{
      position: "absolute", left: rect.x, top: rect.y, width: rect.w, height: rect.h,
      border: `2px solid ${ACCENT}`, borderRadius: rect.r ?? 0,
      clipPath: reveal(t),
    }} />
  );
}

function FillBar({ rect, t, color, glow }: { rect: Rect; t: number; color: string; glow?: number }) {
  if (t <= 0) return null;
  return (
    <div style={{
      position: "absolute", left: rect.x, top: rect.y, width: rect.w, height: rect.h,
      background: color, borderRadius: rect.r ?? 3,
      clipPath: reveal(t), opacity: t,
      boxShadow: glow ? `0 0 ${glow}px ${ACCENT}` : "none",
    }} />
  );
}

function ImageBlock({ rect, wire, fill }: { rect: Rect; wire: number; fill: number }) {
  if (wire <= 0) return null;
  const cx = rect.w / 2, cy = rect.h / 2;
  const iconOpacity = wire * (1 - fill);
  return (
    <div style={{
      position: "absolute", left: rect.x, top: rect.y, width: rect.w, height: rect.h,
      overflow: "hidden", borderRadius: rect.r, border: `2px solid ${ACCENT}`, clipPath: reveal(wire),
    }}>
      {fill > 0.03 && (
        <div style={{
          position: "absolute", inset: 0, opacity: fill,
          background: `linear-gradient(135deg, rgba(41,151,255,0.30), rgba(41,151,255,0.05) 55%, rgba(255,255,255,0.06))`,
        }} />
      )}
      <div style={{ position: "absolute", left: cx - 14, top: cy - 20, width: 28, height: 28, borderRadius: "50%", border: `2px solid ${ACCENT}`, opacity: iconOpacity }} />
      <div style={{
        position: "absolute", left: 0, right: 0, bottom: 0, height: cy * 0.7,
        borderTop: `2px solid ${ACCENT}`,
        clipPath: "polygon(0% 100%, 22% 30%, 42% 65%, 60% 15%, 100% 100%)", opacity: iconOpacity,
      }} />
    </div>
  );
}

function WText({ x, y, w, t, size, weight, color, children, align, lh }: {
  x: number; y: number; w: number; t: number; size: number;
  weight?: number; color?: string; children: React.ReactNode; align?: "left" | "center"; lh?: number;
}) {
  if (t <= 0) return null;
  return (
    <div style={{
      position: "absolute", left: x, top: y, width: w, opacity: t, color: color || WHITE,
      fontFamily: "system-ui,-apple-system,'Segoe UI',sans-serif", fontWeight: weight || 400,
      fontSize: size, lineHeight: lh || 1.3, letterSpacing: "-0.01em", textAlign: align || "left",
    }}>{children}</div>
  );
}

function Composition({ draw, elements, content, shimmer, scale, time }: {
  draw: number; elements: number; content: number; shimmer: number; scale: number; time: number;
}) {
  const topbar = stagger(draw, 0, 0.12);
  const navT = stagger(draw, 0.08, 0.22);
  const heroT = stagger(draw, 0.16, 0.36);
  const heroImgT = stagger(draw, 0.24, 0.46);
  const c1 = stagger(draw, 0.34, 0.54);
  const c2 = stagger(draw, 0.42, 0.62);
  const c3 = stagger(draw, 0.5, 0.7);
  const statsT = stagger(draw, 0.6, 0.78);
  const footerT = stagger(draw, 0.72, 0.95);
  const glow = content * 18;
  const hasContent = content > 0.05;

  return (
    <div style={{ position: "absolute", inset: 0, background: "#000" }}>
      <div style={{ position: "absolute", inset: 0, transform: `scale(${scale})`, transformOrigin: "50% 50%" }}>
        <div style={{ position: "absolute", width: 1920, height: 1080 }}>
          {/* browser frame */}
          <div style={{
            position: "absolute", left: FRAME.x, top: FRAME.y, width: FRAME.w, height: FRAME.h,
            border: `2px solid ${ACCENT}`, borderRadius: FRAME.r, clipPath: reveal(topbar),
            boxShadow: glow ? `0 0 ${glow * 2}px rgba(41,151,255,${0.15 + content * 0.25})` : "none",
          }} />
          <div style={{ position: "absolute", left: FRAME.x, top: FRAME.y + TOPBAR_H, width: FRAME.w, height: 2, background: ACCENT, opacity: topbar, clipPath: reveal(topbar) }} />
          {[192, 216, 240].map((cx, i) => (
            <div key={i} style={{ position: "absolute", left: cx - 6, top: 138, width: 12, height: 12, borderRadius: "50%", border: `2px solid ${ACCENT}`, opacity: topbar }} />
          ))}
          <Outline rect={ADDR} t={topbar} />

          {/* nav */}
          <Outline rect={LOGO} t={navT} />
          <FillBar rect={LOGO} t={elements} color={ACCENT} />
          {NAV_LINKS.map((l, i) => (
            <span key={i}>
              {hasContent && (
                <WText x={l.x} y={l.y - 3} w={140} t={navT * content} size={15} weight={500} color="rgba(255,255,255,0.75)">{NAV_LABELS[i]}</WText>
              )}
              <Outline rect={l} t={navT * (1 - content)} />
            </span>
          ))}
          <Outline rect={NAV_CTA} t={navT} />
          <FillBar rect={NAV_CTA} t={elements * 0.9} color="rgba(41,151,255,0.18)" />
          {hasContent && <WText x={NAV_CTA.x} y={NAV_CTA.y + 8} w={NAV_CTA.w} t={navT * content} size={14} weight={600} align="center">Get a quote</WText>}

          {/* hero text */}
          {hasContent && (
            <>
              <WText x={HEADLINE1.x} y={HEADLINE1.y - 4} w={620} t={heroT * content} size={40} weight={700}>Your business, front</WText>
              <WText x={HEADLINE2.x} y={HEADLINE2.y - 4} w={620} t={heroT * content} size={40} weight={700}>and centre online.</WText>
              <WText x={SUBLINE1.x} y={SUBLINE1.y - 2} w={460} t={heroT * content * 0.9} size={17} color="rgba(255,255,255,0.6)">A clean, modern site that turns visitors into customers.</WText>
              <WText x={SUBLINE2.x} y={SUBLINE2.y + 16} w={460} t={heroT * content * 0.9} size={17} color="rgba(255,255,255,0.6)">Built for you — fast, affordable, done right.</WText>
            </>
          )}
          <Outline rect={HEADLINE1} t={heroT * (1 - content)} />
          <Outline rect={HEADLINE2} t={heroT * (1 - content)} />
          <Outline rect={SUBLINE1} t={heroT * (1 - content)} />
          <Outline rect={SUBLINE2} t={heroT * (1 - content)} />
          <Outline rect={CTA} t={heroT} />
          <FillBar rect={CTA} t={elements} color={ACCENT} glow={glow} />
          {hasContent && <WText x={CTA.x} y={CTA.y + 15} w={CTA.w} t={heroT * content} size={16} weight={600} align="center">Get in touch</WText>}
          <Outline rect={CTA2} t={heroT} />
          {hasContent && <WText x={CTA2.x} y={CTA2.y + 15} w={CTA2.w} t={heroT * content} size={16} weight={600} color={ACCENT} align="center">Learn more</WText>}

          {/* hero image */}
          <ImageBlock rect={HERO_IMAGE} wire={heroImgT} fill={content} />

          {/* cards */}
          {CARDS.map((card, i) => {
            const ct = [c1, c2, c3][i];
            const thumb: Rect = { x: card.x + 24, y: card.y + 24, w: card.w - 48, h: 92, r: 8 };
            const title: Rect = { x: card.x + 24, y: card.y + 132, w: 200, h: 16, r: 4 };
            return (
              <span key={i}>
                <Outline rect={{ ...card, r: 12 }} t={ct} />
                <ImageBlock rect={thumb} wire={ct} fill={content} />
                {hasContent && (
                  <>
                    <WText x={title.x} y={title.y - 3} w={card.w - 48} t={ct * content} size={19} weight={700}>{CARD_COPY[i].title}</WText>
                    <WText x={title.x} y={title.y + 25} w={card.w - 48} t={ct * content * 0.85} size={13.5} color="rgba(255,255,255,0.6)" lh={1.4}>{CARD_COPY[i].body}</WText>
                  </>
                )}
                <Outline rect={title} t={ct * (1 - content)} />
              </span>
            );
          })}

          {/* stats */}
          {STATS.map((s, i) => (
            <span key={i}>
              {hasContent && (
                <>
                  <WText x={s.num.x} y={s.num.y - 4} w={160} t={statsT * content} size={30} weight={700} color={ACCENT}>{STAT_COPY[i].num}</WText>
                  <WText x={s.label.x} y={s.label.y + 2} w={170} t={statsT * content * 0.8} size={14} color="rgba(255,255,255,0.55)">{STAT_COPY[i].label}</WText>
                </>
              )}
              <Outline rect={s.num} t={statsT * (1 - content)} />
              <Outline rect={s.label} t={statsT * (1 - content)} />
            </span>
          ))}

          {/* footer */}
          <div style={{ position: "absolute", left: FOOTER_DIVIDER.x, top: FOOTER_DIVIDER.y, width: FOOTER_DIVIDER.w, height: FOOTER_DIVIDER.h, background: ACCENT, opacity: footerT, clipPath: reveal(footerT) }} />
          {FOOTER_COLS.map((col, i) => (
            <span key={i}>
              {hasContent ? (
                <WText x={col.heading.x} y={col.heading.y - 3} w={140} t={footerT * content} size={15} weight={700}>{FOOTER_COPY[i].heading}</WText>
              ) : null}
              <Outline rect={col.heading} t={footerT * (1 - content)} />
              {col.links.map((link, j) => (
                <span key={j}>
                  {hasContent ? (
                    <WText x={link.x} y={link.y - 3} w={140} t={footerT * content * 0.75} size={13.5} color="rgba(255,255,255,0.5)">{FOOTER_COPY[i].links[j]}</WText>
                  ) : null}
                  <Outline rect={link} t={footerT * (1 - content)} />
                </span>
              ))}
            </span>
          ))}

          {/* floating design tokens */}
          {TOKENS.map((tok, i) => {
            const t = elements;
            if (t <= 0) return null;
            const px = lerp(tok.from.x, tok.to.x, t);
            const py = lerp(tok.from.y, tok.to.y, t) + Math.sin((time + tok.bob) * 1.6) * 4 * t;
            return (
              <div key={i} style={{
                position: "absolute", left: px - tok.size / 2, top: py - tok.size / 2,
                width: tok.size, height: tok.size, opacity: t * 0.9,
                border: `2px solid ${ACCENT}`,
                borderRadius: tok.shape === "circle" ? "50%" : 6,
              }} />
            );
          })}

          {/* shimmer sweep */}
          {shimmer > 0 && (
            <div style={{
              position: "absolute", left: FRAME.x, top: FRAME.y, width: FRAME.w, height: FRAME.h,
              overflow: "hidden", borderRadius: FRAME.r, pointerEvents: "none",
            }}>
              <div style={{
                position: "absolute", top: 0, left: `${-40 + shimmer * 160}%`, width: "30%", height: "100%",
                background: "linear-gradient(75deg, transparent, rgba(255,255,255,0.16), transparent)",
                transform: "skewX(-20deg)",
              }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   Typed text — full text always in the DOM (SEO-safe); characters are
   revealed by opacity so layout and wrapping never shift.
   ========================================================================== */
function TypedChars({ text, shown }: { text: string; shown: number }) {
  return (
    <>
      {text.split("").map((ch, i) => (
        <span key={i} style={{ opacity: i < shown ? 1 : 0 }} aria-hidden={i >= shown}>
          {ch}
        </span>
      ))}
    </>
  );
}

function Cursor({ time }: { time: number }) {
  const on = Math.floor(time * 2.4) % 2 === 0;
  return (
    <span style={{ display: "inline-block", width: 0, overflow: "visible", opacity: on ? 1 : 0, fontWeight: 400 }} aria-hidden>
      |
    </span>
  );
}

/* ==========================================================================
   HeroIntro
   ========================================================================== */
export function HeroIntro({ onQuote, onPackages, onDone }: {
  onQuote: () => void;
  onPackages: () => void;
  onDone?: () => void;
}) {
  // "pending" (pre-JS / prerender) renders the finished hero — SEO-safe.
  const [mode, setMode] = useState<"pending" | "playing" | "done">("pending");
  const [t, setT] = useState(0);
  const [stageW, setStageW] = useState(1200);
  const doneFired = useRef(false);
  const rafRef = useRef(0);
  const lastRef = useRef(0);
  const tRef = useRef(0);

  const finish = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    setMode("done");
    if (!doneFired.current) {
      doneFired.current = true;
      onDone?.();
    }
  }, [onDone]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || window.innerWidth < 768) {
      finish();
      return;
    }

    const sizeStage = () => {
      setStageW(Math.min(window.innerWidth * 0.94, 1440, Math.max(320, (window.innerHeight - 150) * (16 / 9))));
    };
    sizeStage();
    setMode("playing");

    lastRef.current = performance.now();
    const tick = (now: number) => {
      const dt = Math.min((now - lastRef.current) / 1000, 0.1);
      lastRef.current = now;
      tRef.current += dt;
      if (tRef.current >= TOTAL) {
        setT(TOTAL);
        finish();
        return;
      }
      setT(tRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    // any scroll / key press skips the intro
    const skip = () => finish();
    window.addEventListener("wheel", skip, { passive: true });
    window.addEventListener("touchmove", skip, { passive: true });
    window.addEventListener("keydown", skip);
    window.addEventListener("resize", sizeStage);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("wheel", skip);
      window.removeEventListener("touchmove", skip);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("resize", sizeStage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const playing = mode === "playing";
  const tt = playing ? t : TOTAL;

  /* derive animation values */
  const draw = tt < T1 ? easeOutCubic(tt / D1) : 1;
  const elements = tt < T1 ? 0 : tt < T2 ? easeInOutCubic((tt - T1) / D2) : 1;
  const fillP = tt < T2 ? 0 : clamp((tt - T2) / D3, 0, 1);
  const content = easeOutCubic(fillP);
  const shimmer =
    tt >= T2 && tt < T3
      ? fillP > 0.15 && fillP < 0.85
        ? easeInOutCubic((fillP - 0.15) / 0.7)
        : fillP >= 0.85 ? 1 : 0
      : 0;
  const p4 = clamp((tt - T3) / D4, 0, 1);
  const overlayOpacity = 1 - stagger(p4, 0, 0.3);
  const scale = lerp(1.05, 1, easeOutCubic(p4));
  const typeProgress = playing ? stagger(p4, 0.12, 0.95) : 1;
  const ctaT = playing ? stagger(p4, 0.88, 1) : 1;

  /* typing */
  const totalChars = HEADLINE_TEXT.length + SUB_TEXT.length;
  const count = Math.floor(typeProgress * totalChars);
  const h1Shown = clamp(count, 0, HEADLINE_TEXT.length);
  const subShown = clamp(count - HEADLINE_TEXT.length, 0, SUB_TEXT.length);
  const typingH1 = playing && h1Shown < HEADLINE_TEXT.length && typeProgress > 0;
  const typingSub = playing && !typingH1 && subShown < SUB_TEXT.length && typeProgress > 0;
  const stageH = (stageW * 9) / 16;
  const stageScale = stageW / 1920;

  return (
    <>
      {/* Finished hero text — always in the DOM */}
      <h1
        className="text-[40px] sm:text-6xl lg:text-[80px] font-bold leading-[1.04] tracking-tight max-w-4xl mx-auto text-balance"
        data-testid="heading-hero"
        aria-label={HEADLINE_TEXT}
      >
        {playing ? (
          <>
            <TypedChars text={HEADLINE_TEXT} shown={h1Shown} />
            {typingH1 && <Cursor time={tt} />}
          </>
        ) : (
          HEADLINE_TEXT
        )}
      </h1>
      <p className="mt-5 text-lg sm:text-xl text-[#98989d] max-w-xl mx-auto" aria-label={SUB_TEXT}>
        {playing ? (
          <>
            <TypedChars text={SUB_TEXT} shown={subShown} />
            {typingSub && <Cursor time={tt} />}
          </>
        ) : (
          SUB_TEXT
        )}
      </p>
      <div
        className="mt-7 flex justify-center gap-7 text-lg"
        style={{ opacity: ctaT, transition: playing ? "none" : "opacity 0.5s", pointerEvents: ctaT > 0.5 ? "auto" : "none" }}
      >
        <button onClick={onQuote} className="text-[#2997ff] hover:underline" data-testid="link-hero-quote">
          Get a quote &rsaquo;
        </button>
        <button onClick={onPackages} className="text-[#2997ff] hover:underline" data-testid="link-hero-packages">
          See packages &rsaquo;
        </button>
      </div>

      {/* Wireframe-build overlay (covers the hero section while playing) */}
      {playing && overlayOpacity > 0 && (
        <div
          className="absolute inset-0 z-30"
          style={{ background: "#000", opacity: overlayOpacity }}
          data-testid="hero-intro-overlay"
          aria-hidden
        >
          <div
            style={{
              position: "fixed",
              left: "50%",
              top: "50%",
              width: stageW,
              height: stageH,
              transform: "translate(-50%, -50%)",
              overflow: "hidden",
            }}
          >
            <div style={{ position: "absolute", width: 1920, height: 1080, transform: `scale(${stageScale})`, transformOrigin: "top left" }}>
              <div style={{ position: "absolute", width: 1920, height: 1080 }}>
                <Composition draw={draw} elements={elements} content={content} shimmer={shimmer} scale={scale} time={tt} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
