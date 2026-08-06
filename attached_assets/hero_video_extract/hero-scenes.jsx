function useScene() { return window.useScene(); }
const Easing = new Proxy({}, { get: (_, k) => (t) => window.Easing[k](t) });
function clamp(v, a, b) { return window.clamp(v, a, b); }

// ---- Persistent layout (module scope — shared by every scene) ----
const FRAME = { x: 160, y: 120, w: 1600, h: 840, r: 16 };
const TOPBAR_H = 48;
const ADDR = { x: 760, y: 132, w: 400, h: 24, r: 12 };

const LOGO = { x: 200, y: 184, w: 22, h: 22, r: 6 };
const NAV_LINKS = [
  { x: 640, y: 190, w: 64, h: 12 },
  { x: 728, y: 190, w: 80, h: 12 },
  { x: 832, y: 190, w: 56, h: 12 },
  { x: 912, y: 190, w: 70, h: 12 },
];
const NAV_CTA = { x: 1656, y: 178, w: 104, h: 32, r: 8 };

const HEADLINE1 = { x: 200, y: 254, w: 600, h: 30, r: 6 };
const HEADLINE2 = { x: 200, y: 292, w: 420, h: 30, r: 6 };
const SUBLINE1 = { x: 200, y: 340, w: 460, h: 14, r: 4 };
const SUBLINE2 = { x: 200, y: 360, w: 380, h: 14, r: 4 };
const CTA = { x: 200, y: 396, w: 172, h: 48, r: 8 };
const CTA2 = { x: 396, y: 396, w: 132, h: 48, r: 8 };
const HERO_IMAGE = { x: 920, y: 244, w: 640, h: 200, r: 14 };

const CARD_W = 480, CARD_H = 220, CARD_Y = 480;
const CARDS = [
  { x: 200, y: CARD_Y, w: CARD_W, h: CARD_H },
  { x: 720, y: CARD_Y, w: CARD_W, h: CARD_H },
  { x: 1240, y: CARD_Y, w: CARD_W, h: CARD_H },
];

const STATS_Y = CARD_Y + CARD_H + 44;
const STATS = [200, 590, 980, 1370].map((x) => ({
  num: { x, y: STATS_Y, w: 90, h: 26, r: 6 },
  label: { x, y: STATS_Y + 38, w: 116, h: 10, r: 3 },
}));

const FOOTER_DIVIDER = { x: 200, y: STATS_Y + 96, w: 1520, h: 2 };
const FOOTER_COLS = [200, 590, 980, 1370].map((x) => ({
  heading: { x, y: FOOTER_DIVIDER.y + 24, w: 100, h: 13, r: 3 },
  links: [
    { x, y: FOOTER_DIVIDER.y + 52, w: 90, h: 10, r: 3 },
    { x, y: FOOTER_DIVIDER.y + 70, w: 110, h: 10, r: 3 },
    { x, y: FOOTER_DIVIDER.y + 88, w: 80, h: 10, r: 3 },
  ],
}));

const TOKENS = [
  { shape: "circle", size: 36, from: { x: -60, y: 200 }, to: { x: 84, y: 176 }, bob: 0 },
  { shape: "square", size: 28, from: { x: 2000, y: 260 }, to: { x: 1820, y: 216 }, bob: 1.1 },
  { shape: "circle", size: 28, from: { x: -60, y: 880 }, to: { x: 78, y: 848 }, bob: 2.2 },
  { shape: "square", size: 24, from: { x: 2000, y: 820 }, to: { x: 1830, y: 838 }, bob: 0.6 },
  { shape: "circle", size: 44, from: { x: 960, y: -80 }, to: { x: 960, y: 58 }, bob: 1.7 },
];

const NAV_LABELS = ["Features", "Pricing", "Docs", "About"];
const CARD_COPY = [
  { title: "Drag & Drop Builder", body: "Design pixel-perfect pages with an intuitive visual editor built for speed." },
  { title: "Responsive by Default", body: "Every layout adapts automatically across desktop, tablet, and mobile." },
  { title: "One-Click Publish", body: "Push your site live instantly with fast, secure global hosting included." },
];
const STAT_COPY = [
  { num: "10K+", label: "Websites launched" },
  { num: "99.9%", label: "Uptime guaranteed" },
  { num: "4.9/5", label: "Average rating" },
  { num: "24/7", label: "Customer support" },
];
const FOOTER_COPY = [
  { heading: "Product", links: ["Features", "Pricing", "Templates"] },
  { heading: "Company", links: ["About", "Careers", "Blog"] },
  { heading: "Resources", links: ["Docs", "Guides", "Support"] },
  { heading: "Legal", links: ["Privacy", "Terms", "Security"] },
];

// ---- Motion helpers (the only three transforms used anywhere) ----
const MOTION = {
  draw: (t) => Easing.easeOutCubic(clamp(t, 0, 1)),
  drift: (t) => Easing.easeInOutCubic(clamp(t, 0, 1)),
  settle: (t) => Easing.easeOutCubic(clamp(t, 0, 1)),
};

function stagger(p, start, end) {
  if (end <= start) return p >= end ? 1 : 0;
  return clamp((p - start) / (end - start), 0, 1);
}
function reveal(t) {
  return `inset(0 ${(1 - t) * 100}% 0 0 round 12px)`;
}
function lerp(a, b, t) { return a + (b - a) * t; }

const CYAN = "#0099FF";
const WHITE = "#FFFFFF";

function Outline({ rect, t, extraRound }) {
  return (
    <div style={{
      position: "absolute", left: rect.x, top: rect.y, width: rect.w, height: rect.h,
      border: `2px solid ${CYAN}`, borderRadius: rect.r ?? extraRound ?? 0,
      clipPath: reveal(t), opacity: t > 0 ? 1 : 0,
    }} />
  );
}
function FillBar({ rect, t, color, glow }) {
  return (
    <div style={{
      position: "absolute", left: rect.x, top: rect.y, width: rect.w, height: rect.h,
      background: color, borderRadius: rect.r ?? 3,
      clipPath: reveal(t), opacity: t,
      boxShadow: glow ? `0 0 ${glow}px ${CYAN}` : "none",
    }} />
  );
}
function ImageBlock({ rect, wire, fill, id, placeholder }) {
  // wire: outline+icon phase (0..1); fill: photo-fill phase (0..1)
  const cx = rect.w / 2, cy = rect.h / 2;
  const iconOpacity = wire * (1 - fill);
  return (
    <div style={{ position: "absolute", left: rect.x, top: rect.y, width: rect.w, height: rect.h, opacity: wire > 0 ? 1 : 0, overflow: "hidden", borderRadius: rect.r, border: `2px solid ${CYAN}`, clipPath: reveal(wire) }}>
      {fill > 0.03 && (
        <div style={{ position: "absolute", inset: 0, opacity: fill }}>
          <image-slot id={id} shape="rect" placeholder={placeholder}></image-slot>
        </div>
      )}
      <div style={{ position: "absolute", left: cx - 14, top: cy - 20, width: 28, height: 28, borderRadius: "50%", border: `2px solid ${CYAN}`, opacity: iconOpacity }} />
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: cy * 0.7, borderTop: `2px solid ${CYAN}`, clipPath: "polygon(0% 100%, 22% 30%, 42% 65%, 60% 15%, 100% 100%)", opacity: iconOpacity }} />
    </div>
  );
}
function Text({ x, y, w, t, size, weight, color, children, align, lh }) {
  return (
    <div style={{
      position: "absolute", left: x, top: y, width: w, opacity: t, color: color || WHITE,
      fontFamily: "system-ui,-apple-system,'Segoe UI',sans-serif", fontWeight: weight || 400,
      fontSize: size, lineHeight: lh || 1.3, letterSpacing: "-0.01em", textAlign: align || "left",
    }}>{children}</div>
  );
}

const FINAL_LINE1 = "A website worthy";
const FINAL_LINE2 = "of your business.";
const FINAL_SUB = "Designed properly, built fast, live in 48\u201372 hours \u2014 from \u00a3199.";
const FINAL_CTAS = ["Get a quote \u203a", "See packages \u203a"];

function Cursor({ localTime }) {
  const on = Math.floor(localTime * 2.4) % 2 === 0;
  return <span style={{ opacity: on ? 1 : 0, fontWeight: 400 }}>|</span>;
}

function FinalReveal({ typeProgress, ctaT, localTime }) {
  const total = FINAL_LINE1.length + FINAL_LINE2.length + FINAL_SUB.length;
  const count = Math.floor(clamp(typeProgress, 0, 1) * total);
  let remaining = count;
  function take(text) {
    const shown = clamp(remaining, 0, text.length);
    remaining -= text.length;
    return { text: text.slice(0, shown), done: shown >= text.length };
  }
  const s1 = take(FINAL_LINE1), s2 = take(FINAL_LINE2), s3 = take(FINAL_SUB);
  const typingDone = count >= total;
  return (
    <div style={{
      position: "absolute", inset: 0, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", opacity: typeProgress > 0 ? 1 : 0,
    }}>
      <div style={{
        fontFamily: "system-ui,-apple-system,'Segoe UI',sans-serif", fontWeight: 800,
        fontSize: 92, color: WHITE, lineHeight: 1.06, textAlign: "center", letterSpacing: "-0.02em",
      }}>
        <div>{s1.text}{!s1.done && !typingDone ? <Cursor localTime={localTime} /> : null}</div>
        <div>{s2.text}{s1.done && !s2.done && !typingDone ? <Cursor localTime={localTime} /> : null}</div>
      </div>
      <div style={{
        marginTop: 32, fontFamily: "system-ui,-apple-system,sans-serif", fontSize: 29,
        color: "rgba(255,255,255,0.55)", textAlign: "center", maxWidth: 1040, lineHeight: 1.45,
      }}>
        {s3.text}{s1.done && s2.done && !s3.done && !typingDone ? <Cursor localTime={localTime} /> : null}
      </div>
      <div style={{ marginTop: 42, display: "flex", gap: 48, opacity: ctaT, pointerEvents: ctaT > 0.5 ? "auto" : "none" }}>
        <a href="#quote" style={{ color: CYAN, fontSize: 25, fontWeight: 600, textDecoration: "none" }}>{FINAL_CTAS[0]}</a>
        <a href="#packages" style={{ color: CYAN, fontSize: 25, fontWeight: 600, textDecoration: "none" }}>{FINAL_CTAS[1]}</a>
      </div>
    </div>
  );
}
function Token({ tok, t, localTime }) {
  const pos = { x: lerp(tok.from.x, tok.to.x, t), y: lerp(tok.from.y, tok.to.y, t) };
  const bob = Math.sin((localTime + tok.bob) * 1.6) * 4 * t;
  return (
    <div style={{
      position: "absolute", left: pos.x - tok.size / 2, top: pos.y - tok.size / 2 + bob,
      width: tok.size, height: tok.size, opacity: t * 0.9,
      background: "transparent", border: `2px solid ${CYAN}`,
      borderRadius: tok.shape === "circle" ? "50%" : 6,
    }} />
  );
}

// ---- Shared composition: draw / elements / content / shimmer / scale / fade ----
function Composition({ draw = 0, elements = 0, content = 0, shimmer = 0, scale = 1, fade = 0, localTime = 0 }) {
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

  return (
    <div style={{ position: "absolute", inset: 0, background: "#000000" }}>
      <div style={{ position: "absolute", inset: 0, transform: `scale(${scale})`, transformOrigin: "50% 50%" }}>
        <div style={{ position: "absolute", width: 1920, height: 1080 }}>
          {/* browser frame */}
          <div style={{
            position: "absolute", left: FRAME.x, top: FRAME.y, width: FRAME.w, height: FRAME.h,
            border: `2px solid ${CYAN}`, borderRadius: FRAME.r, clipPath: reveal(topbar),
            boxShadow: glow ? `0 0 ${glow * 2}px rgba(0,153,255,${0.15 + content * 0.25})` : "none",
          }} />
          {/* topbar divider + dots + address bar */}
          <div style={{ position: "absolute", left: FRAME.x, top: FRAME.y + TOPBAR_H, width: FRAME.w, height: 2, background: CYAN, opacity: topbar, clipPath: reveal(topbar) }} />
          {[192, 216, 240].map((cx, i) => (
            <div key={i} style={{ position: "absolute", left: cx - 6, top: 138, width: 12, height: 12, borderRadius: "50%", border: `2px solid ${CYAN}`, opacity: topbar }} />
          ))}
          <Outline rect={ADDR} t={topbar} />

          {/* nav */}
          <Outline rect={LOGO} t={navT} />
          <FillBar rect={LOGO} t={elements} color={CYAN} />
          {NAV_LINKS.map((l, i) => (
            <React.Fragment key={i}>
              {content > 0.05 ? (
                <Text x={l.x} y={l.y - 3} w={140} t={navT * content} size={15} weight={500} color="rgba(255,255,255,0.75)">{NAV_LABELS[i]}</Text>
              ) : (
                <FillBar rect={l} t={0} color="rgba(255,255,255,0.45)" />
              )}
              <Outline rect={l} t={navT * (1 - content)} />
            </React.Fragment>
          ))}
          <Outline rect={NAV_CTA} t={navT} />
          <FillBar rect={NAV_CTA} t={elements * 0.9} color="rgba(0,153,255,0.18)" />
          {content > 0.05 && <Text x={NAV_CTA.x} y={NAV_CTA.y + 8} w={NAV_CTA.w} t={navT * content} size={14} weight={600} color={WHITE} align="center">Sign up</Text>}

          {/* hero text */}
          {content > 0.05 ? (
            <>
              <Text x={HEADLINE1.x} y={HEADLINE1.y - 4} w={620} t={heroT * content} size={40} weight={700}>Build a beautiful website</Text>
              <Text x={HEADLINE2.x} y={HEADLINE2.y - 4} w={620} t={heroT * content} size={40} weight={700}>in minutes, not weeks.</Text>
              <Text x={SUBLINE1.x} y={SUBLINE1.y - 2} w={460} t={heroT * content * 0.9} size={17} color="rgba(255,255,255,0.6)">Drag, drop, and publish — no code required.</Text>
              <Text x={SUBLINE2.x} y={SUBLINE2.y + 16} w={460} t={heroT * content * 0.9} size={17} color="rgba(255,255,255,0.6)">Free to start. No credit card needed.</Text>
            </>
          ) : (
            <>
              <FillBar rect={HEADLINE1} t={0} color={WHITE} />
              <FillBar rect={HEADLINE2} t={0} color={WHITE} />
              <FillBar rect={SUBLINE1} t={0} color="rgba(255,255,255,0.55)" />
              <FillBar rect={SUBLINE2} t={0} color="rgba(255,255,255,0.55)" />
            </>
          )}
          <Outline rect={HEADLINE1} t={heroT * (1 - content)} />
          <Outline rect={HEADLINE2} t={heroT * (1 - content)} />
          <Outline rect={SUBLINE1} t={heroT * (1 - content)} />
          <Outline rect={SUBLINE2} t={heroT * (1 - content)} />
          <Outline rect={CTA} t={heroT} />
          <FillBar rect={CTA} t={elements} color={CYAN} glow={glow} />
          {content > 0.05 && <Text x={CTA.x} y={CTA.y + 15} w={CTA.w} t={heroT * content} size={16} weight={600} color={WHITE} align="center">Get Started Free</Text>}
          <Outline rect={CTA2} t={heroT} />
          {content > 0.05 && <Text x={CTA2.x} y={CTA2.y + 15} w={CTA2.w} t={heroT * content} size={16} weight={600} color={CYAN} align="center">Watch Demo</Text>}

          {/* hero image */}
          <ImageBlock rect={HERO_IMAGE} wire={heroImgT} fill={content} id="hero-image" placeholder="Product screenshot" />

          {/* cards */}
          {CARDS.map((card, i) => {
            const ct = [c1, c2, c3][i];
            const thumb = { x: card.x + 24, y: card.y + 24, w: card.w - 48, h: 92, r: 8 };
            const title = { x: card.x + 24, y: card.y + 132, w: 200, h: 16, r: 4 };
            const text1 = { x: card.x + 24, y: card.y + 160, w: card.w - 200, h: 10, r: 3 };
            const text2 = { x: card.x + 24, y: card.y + 178, w: card.w - 260, h: 10, r: 3 };
            return (
              <React.Fragment key={i}>
                <Outline rect={{ ...card, r: 12 }} t={ct} />
                <ImageBlock rect={thumb} wire={ct} fill={content} id={"card-image-" + i} placeholder={"Feature photo " + (i + 1)} />
                {content > 0.05 ? (
                  <>
                    <Text x={title.x} y={title.y - 3} w={card.w - 48} t={ct * content} size={19} weight={700}>{CARD_COPY[i].title}</Text>
                    <Text x={text1.x} y={text1.y - 1} w={card.w - 48} t={ct * content * 0.85} size={13.5} color="rgba(255,255,255,0.6)" lh={1.4}>{CARD_COPY[i].body}</Text>
                  </>
                ) : (
                  <>
                    <FillBar rect={title} t={0} color={WHITE} />
                    <FillBar rect={text1} t={0} color="rgba(255,255,255,0.55)" />
                    <FillBar rect={text2} t={0} color="rgba(255,255,255,0.55)" />
                  </>
                )}
                <Outline rect={title} t={ct * (1 - content)} />
              </React.Fragment>
            );
          })}

          {/* stats */}
          {STATS.map((s, i) => (
            <React.Fragment key={i}>
              {content > 0.05 ? (
                <>
                  <Text x={s.num.x} y={s.num.y - 4} w={140} t={statsT * content} size={30} weight={700} color={CYAN}>{STAT_COPY[i].num}</Text>
                  <Text x={s.label.x} y={s.label.y + 2} w={150} t={statsT * content * 0.8} size={14} color="rgba(255,255,255,0.55)">{STAT_COPY[i].label}</Text>
                </>
              ) : (
                <>
                  <FillBar rect={s.num} t={0} color={CYAN} glow={glow * 0.4} />
                  <FillBar rect={s.label} t={0} color="rgba(255,255,255,0.5)" />
                </>
              )}
              <Outline rect={s.num} t={statsT * (1 - content)} />
              <Outline rect={s.label} t={statsT * (1 - content)} />
            </React.Fragment>
          ))}

          {/* footer */}
          <div style={{ position: "absolute", left: FOOTER_DIVIDER.x, top: FOOTER_DIVIDER.y, width: FOOTER_DIVIDER.w, height: FOOTER_DIVIDER.h, background: CYAN, opacity: footerT, clipPath: reveal(footerT) }} />
          {FOOTER_COLS.map((col, i) => (
            <React.Fragment key={i}>
              {content > 0.05 ? (
                <Text x={col.heading.x} y={col.heading.y - 3} w={140} t={footerT * content} size={15} weight={700}>{FOOTER_COPY[i].heading}</Text>
              ) : (
                <FillBar rect={col.heading} t={0} color={WHITE} />
              )}
              <Outline rect={col.heading} t={footerT * (1 - content)} />
              {col.links.map((link, j) => (
                <React.Fragment key={j}>
                  {content > 0.05 ? (
                    <Text x={link.x} y={link.y - 3} w={140} t={footerT * content * 0.75} size={13.5} color="rgba(255,255,255,0.5)">{FOOTER_COPY[i].links[j]}</Text>
                  ) : (
                    <FillBar rect={link} t={0} color="rgba(255,255,255,0.45)" />
                  )}
                  <Outline rect={link} t={footerT * (1 - content)} />
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}

          {/* floating design tokens */}
          {TOKENS.map((tok, i) => (
            <Token key={i} tok={tok} t={elements} localTime={localTime} />
          ))}

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
      {fade > 0 && <div style={{ position: "absolute", inset: 0, background: "#000000", opacity: fade }} />}
    </div>
  );
}

// ---- Scenes ----
function Blank() {
  const { progress } = useScene();
  const glow = MOTION.settle(progress) * 0.05;
  return (
    <div style={{ position: "absolute", inset: 0, background: "#000000" }}>
      <div style={{
        position: "absolute", left: "50%", top: "50%", width: 1200, height: 1200,
        transform: "translate(-50%,-50%)", borderRadius: "50%",
        background: `radial-gradient(circle, rgba(0,153,255,${glow}) 0%, transparent 70%)`,
      }} />
    </div>
  );
}

function WireframeBuild() {
  const { progress, localTime } = useScene();
  const draw = MOTION.draw(progress);
  return <Composition draw={draw} elements={0} content={0} localTime={localTime} />;
}

function DesignElements() {
  const { progress, localTime } = useScene();
  const el = MOTION.drift(progress);
  return <Composition draw={1} elements={el} content={0} localTime={localTime} />;
}

function ContentFill() {
  const { progress, localTime } = useScene();
  const content = MOTION.draw(progress);
  const shimmer = progress > 0.15 && progress < 0.85 ? MOTION.drift((progress - 0.15) / 0.7) : (progress >= 0.85 ? 1 : 0);
  return <Composition draw={1} elements={1} content={content} shimmer={progress > 0.1 ? shimmer : 0} localTime={localTime} />;
}

function CameraPullBack() {
  const { progress, localTime } = useScene();
  const scale = lerp(1.05, 1, MOTION.settle(progress));
  const mockupT = 1 - stagger(progress, 0, 0.3);
  const typeProgress = stagger(progress, 0.12, 0.95);
  const ctaT = stagger(progress, 0.88, 1);
  return (
    <div style={{ position: "absolute", inset: 0, background: "#000000" }}>
      <div style={{ position: "absolute", inset: 0, opacity: mockupT }}>
        <Composition draw={1} elements={1} content={1} scale={scale} localTime={localTime} />
      </div>
      <FinalReveal typeProgress={typeProgress} ctaT={ctaT} localTime={localTime} />
    </div>
  );
}

function HoldReset() {
  const { localTime } = useScene();
  return (
    <div style={{ position: "absolute", inset: 0, background: "#000000" }}>
      <FinalReveal typeProgress={1} ctaT={1} localTime={localTime} />
    </div>
  );
}

function HeroTweaksPanel() {
  const [tweaks, setTweak] = window.useTweaks(window.TWEAK_DEFAULTS);
  const TP = window.TweaksPanel, TS = window.TweakSection, TT = window.TweakToggle;
  return (
    <TP>
      <TS label="Playback" />
      <TT label="Motion editor" value={tweaks.motionEditor} onChange={(v) => setTweak("motionEditor", v)} />
    </TP>
  );
}

function HeroStage() {
  return React.createElement(
    "div",
    { style: { width: "100%", height: "100%", position: "relative" } },
    React.createElement(
      window.SceneStage,
      { width: 1920, height: 1080, scenes: window.OM_SCENES, playback: window.OM_PLAYBACK, bg: "#000000" },
      { Blank, WireframeBuild, DesignElements, ContentFill, CameraPullBack, HoldReset }
    )
  );
}

window.HeroScenes = { Blank, WireframeBuild, DesignElements, ContentFill, CameraPullBack, HoldReset };
window.HeroStage = HeroStage;
window.HeroTweaksPanel = HeroTweaksPanel;
