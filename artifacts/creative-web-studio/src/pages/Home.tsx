import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useInView, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, CheckCircle2, Code, Layout, Smartphone, Zap, Search, MessageSquare, Menu, X, Star, ShieldCheck, Clock, Award, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

function Counter({ from, to, duration = 2 }: { from: number; to: number; duration?: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });
  
  useEffect(() => {
    if (!inView) return;
    
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      
      const current = Math.floor(progress * (to - from) + from);
      if (nodeRef.current) {
        nodeRef.current.textContent = current.toString();
      }
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        if (nodeRef.current) nodeRef.current.textContent = to.toString();
      }
    };
    
    window.requestAnimationFrame(step);
  }, [inView, from, to, duration]);

  return <span ref={nodeRef}>{from}</span>;
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-[#1a1a2e] text-white shadow-lg" : "bg-transparent text-[#1a1a2e]"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      data-testid="navbar"
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <button onClick={() => scrollTo("hero")} className="flex items-center gap-2 outline-none">
          <img src="/assets/logo.png" alt="Creative Web Studio Experts" className="h-10 w-auto" data-testid="img-logo-nav" />
        </button>

        <nav className="hidden md:flex items-center gap-8 font-medium">
          <button onClick={() => scrollTo("services")} className="hover:text-[#0066FF] transition-colors" data-testid="link-services">Services</button>
          <button onClick={() => scrollTo("why-us")} className="hover:text-[#0066FF] transition-colors" data-testid="link-why-us">Why Us</button>
          <button onClick={() => scrollTo("portfolio")} className="hover:text-[#0066FF] transition-colors" data-testid="link-portfolio">Portfolio</button>
          <button onClick={() => scrollTo("pricing")} className="hover:text-[#0066FF] transition-colors" data-testid="link-pricing">Pricing</button>
          <button onClick={() => scrollTo("testimonials")} className="hover:text-[#0066FF] transition-colors" data-testid="link-testimonials">Reviews</button>
          <a
            href="https://wa.me/447907313846"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="button-nav-whatsapp"
            className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold px-4 py-2 rounded-full transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white flex-shrink-0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp
          </a>
          <Button 
            className="rounded-full px-6 bg-[#0066FF] hover:bg-[#0052cc] text-white relative overflow-hidden group"
            onClick={() => scrollTo("contact")}
            data-testid="button-nav-cta"
          >
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            Get Started
          </Button>
        </nav>

        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} data-testid="button-mobile-menu">
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#1a1a2e] text-white overflow-hidden border-t border-gray-800"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              <button onClick={() => scrollTo("services")} className="text-left py-2 border-b border-gray-800">Services</button>
              <button onClick={() => scrollTo("why-us")} className="text-left py-2 border-b border-gray-800">Why Us</button>
              <button onClick={() => scrollTo("portfolio")} className="text-left py-2 border-b border-gray-800">Portfolio</button>
              <button onClick={() => scrollTo("pricing")} className="text-left py-2 border-b border-gray-800">Pricing</button>
              <button onClick={() => scrollTo("testimonials")} className="text-left py-2 border-b border-gray-800">Reviews</button>
              <button onClick={() => scrollTo("contact")} className="text-left py-2 text-[#0066FF] font-bold">Get Started</button>
              <a href="https://wa.me/447907313846" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 py-2 text-[#25D366] font-bold" data-testid="link-mobile-whatsapp">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#25D366]"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);

  return (
    <section id="hero" className="relative min-h-[100dvh] flex items-center pt-20 overflow-hidden bg-[#FAFCFF]">
      {/* Animated Circuit Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 10 10 L 40 10 L 40 40 L 70 40 L 70 70 L 90 70" fill="none" stroke="#0066FF" strokeWidth="1" strokeDasharray="5,5">
                <animate attributeName="stroke-dashoffset" values="10;0" dur="2s" repeatCount="indefinite" />
              </path>
              <circle cx="10" cy="10" r="2" fill="#0066FF" />
              <circle cx="90" cy="70" r="2" fill="#0066FF" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>
      
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ y: y2 }}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex bg-[#E8F0FF] text-[#0066FF] px-4 py-2 rounded-full text-sm font-semibold mb-6 items-center gap-2 shadow-sm border border-blue-100"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0066FF] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0066FF]"></span>
            </span>
            Premium Digital Agency
          </motion.div>
          <h1 className="text-5xl lg:text-7xl font-bold leading-[1.1] mb-6 text-[#1a1a2e] tracking-tight">
            Professional Web Design from <span className="text-[#0066FF] relative inline-block">£100
              <motion.span 
                className="absolute -bottom-2 left-0 w-full h-1 bg-[#0066FF] rounded-full"
                initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ delay: 1, duration: 0.8 }}
              />
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-lg leading-relaxed">
            We build high-converting, stunning websites that establish immediate trust. Fast delivery. Premium quality. Built for ambitious businesses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-[#0066FF] hover:bg-[#0052cc] text-white rounded-full px-8 h-14 text-lg relative overflow-hidden group shadow-[0_0_30px_rgba(0,102,255,0.4)] hover:shadow-[0_0_40px_rgba(0,102,255,0.6)] transition-all"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              data-testid="button-hero-start"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
              Start Your Project
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="rounded-full px-8 h-14 text-lg border-gray-300 text-[#1a1a2e] hover:bg-gray-100 transition-colors"
              onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
              data-testid="button-hero-work"
            >
              View Our Work
            </Button>
          </div>
          
          <div className="mt-12 flex flex-wrap items-center gap-6 text-sm text-gray-600 font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#0066FF]" /> 100% Satisfaction
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#0066FF]" /> Fast Turnaround
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#0066FF]" /> SEO Optimized
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="relative lg:h-[600px] flex items-center justify-center"
          style={{ y: y1 }}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-[#E8F0FF] via-[#E8F0FF]/50 to-transparent rounded-full blur-[80px] opacity-80" />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative z-10 w-full max-w-lg"
          >
            <img 
              src="/assets/banner.png" 
              alt="Professional Web Design £100" 
              className="w-full drop-shadow-2xl rounded-2xl border border-white/50"
              data-testid="img-hero-banner"
            />
          </motion.div>
          
          {/* Floating Stats / Elements */}
          <motion.div 
            animate={{ y: [0, -15, 0] }} 
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute top-[10%] -left-4 md:-left-12 bg-white p-4 rounded-xl shadow-xl border border-gray-100 flex items-center gap-4 z-20"
          >
            <div className="w-12 h-12 rounded-full bg-[#E8F0FF] flex items-center justify-center text-[#0066FF]">
              <Layout className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Design Quality</p>
              <p className="font-bold text-[#1a1a2e] text-lg">Pixel Perfect</p>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 20, 0] }} 
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[15%] -right-4 md:-right-8 bg-[#1a1a2e] text-white p-5 rounded-xl shadow-2xl flex items-center gap-4 z-20"
          >
            <div className="w-12 h-12 rounded-full bg-[#0066FF] flex items-center justify-center">
              <Code className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-gray-300 font-medium uppercase tracking-wider">Performance</p>
              <p className="font-bold text-lg">Clean & Fast</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="py-16 bg-[#0066FF] text-white relative z-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/20">
          <div className="text-center px-4">
            <div className="text-4xl md:text-5xl font-bold mb-2 tracking-tight">
              <Counter from={0} to={100} />+
            </div>
            <div className="text-blue-100 font-medium">Projects Delivered</div>
          </div>
          <div className="text-center px-4">
            <div className="text-4xl md:text-5xl font-bold mb-2 tracking-tight">
              <Counter from={0} to={100} />+
            </div>
            <div className="text-blue-100 font-medium">Happy Clients</div>
          </div>
          <div className="text-center px-4">
            <div className="text-4xl md:text-5xl font-bold mb-2 tracking-tight flex items-center justify-center gap-1">
              <Counter from={0} to={5} /> <Star className="w-8 h-8 fill-current text-[#FFD700]" />
            </div>
            <div className="text-blue-100 font-medium">Average Rating</div>
          </div>
          <div className="text-center px-4">
            <div className="text-4xl md:text-5xl font-bold mb-2 tracking-tight">
              <Counter from={0} to={24} />h
            </div>
            <div className="text-blue-100 font-medium">Initial Drafts</div>
          </div>
        </div>
      </div>
    </section>
  );
}

const services = [
  { icon: Layout, title: "Bespoke Web Design", desc: "Custom-crafted designs that perfectly capture your brand identity and engage your target audience instantly." },
  { icon: Smartphone, title: "Mobile Optimization", desc: "Flawless responsive experiences across all devices, ensuring your site looks perfect on phones, tablets, and desktops." },
  { icon: Search, title: "SEO Foundation", desc: "Built-in SEO best practices, clean semantics, and fast loading to help you rank higher on Google from day one." },
  { icon: Zap, title: "High Performance", desc: "Lightning-fast load times using modern frameworks, maximizing conversions and reducing bounce rates." },
  { icon: Code, title: "E-Commerce Ready", desc: "Powerful online stores with seamless checkout flows that turn casual visitors into loyal paying customers." },
  { icon: MessageSquare, title: "Ongoing Support", desc: "Dedicated maintenance, regular updates, and priority assistance whenever you need to scale or adjust." }
];

function Services() {
  return (
    <section id="services" className="py-24 bg-white relative">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-[#0066FF] font-bold tracking-wider uppercase text-sm mb-4 block">Our Expertise</span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a2e] mb-6">Everything You Need to Succeed</h2>
          <p className="text-lg text-gray-600">We handle the technical heavy lifting, design complex interfaces, and build robust systems so you can focus entirely on growing your business.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              className="group bg-[#FAFCFF] p-8 rounded-3xl border border-gray-100 transition-all duration-500 hover:bg-white hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,102,255,0.15)] relative overflow-hidden"
              data-testid={`card-service-${i}`}
            >
              {/* Glowing hover border effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#0066FF]/30 rounded-3xl transition-colors duration-500 pointer-events-none" />
              
              <div className="w-16 h-16 bg-white border border-gray-100 shadow-sm text-[#0066FF] rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#0066FF] group-hover:text-white transition-colors duration-300">
                <service.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-[#1a1a2e] mb-4 group-hover:text-[#0066FF] transition-colors">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  return (
    <section id="why-us" className="py-24 bg-[#1a1a2e] text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#0066FF]/20 to-transparent blur-3xl opacity-50 pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[#0066FF] font-bold tracking-wider uppercase text-sm mb-4 block">Why Choose Us</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">We build digital assets that drive revenue.</h2>
            <p className="text-xl text-gray-400 mb-10 leading-relaxed">
              We aren't just order-takers. We partner with you to understand your market and craft a website that positions you as the premium option in your industry.
            </p>

            <div className="space-y-8">
              {[
                { icon: Award, title: "Premium Quality Guarantee", desc: "No templates. Every pixel is crafted to match your brand's unique identity." },
                { icon: Clock, title: "Rapid Deployment", desc: "Launch your site in days, not months. We respect your timeline." },
                { icon: ShieldCheck, title: "Bulletproof Reliability", desc: "Secure, scalable, and hosted on top-tier infrastructure." }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="flex gap-5"
                >
                  <div className="flex-shrink-0 w-14 h-14 bg-[#0066FF]/20 text-[#0066FF] rounded-2xl flex items-center justify-center border border-[#0066FF]/30">
                    <item.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                    <p className="text-gray-400">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-[#24243e] rounded-3xl p-2 shadow-2xl border border-gray-700/50 relative z-10 overflow-hidden">
               <div className="bg-[#1a1a2e] rounded-2xl overflow-hidden relative group">
                 <img 
                   src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop" 
                   alt="Web Design Process" 
                   className="w-full h-[500px] object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" 
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-transparent to-transparent" />
                 <div className="absolute bottom-8 left-8 right-8">
                   <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl">
                     <div className="flex items-center gap-4 mb-4">
                       <div className="flex -space-x-4">
                         {[1,2,3].map(i => (
                           <div key={i} className="w-10 h-10 rounded-full border-2 border-[#24243e] bg-gray-300 flex items-center justify-center overflow-hidden">
                             <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Team" className="w-full h-full object-cover" />
                           </div>
                         ))}
                       </div>
                       <p className="text-sm font-medium text-white">Join 100+ Happy Customers</p>
                     </div>
                     <p className="text-white/80 text-sm">"The fastest and highest quality agency we've ever worked with. A complete game changer."</p>
                   </div>
                 </div>
               </div>
            </div>
            
            {/* Decorative block */}
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#0066FF] rounded-full blur-[80px] opacity-40 -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Portfolio() {

  return (
    <section id="portfolio" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <span className="text-[#0066FF] font-bold tracking-wider uppercase text-sm mb-4 block">Our Work</span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a2e] mb-4">Latest Projects</h2>
            <p className="text-gray-600 text-lg">Our last three completed client projects — live and ready to explore.</p>
          </motion.div>
        </div>

        {/* Featured live projects */}
        <div className="grid md:grid-cols-2 gap-10 mb-10">
          {[
            { href: "https://lnacarsales.co.uk", domain: "lnacarsales.co.uk", title: "LNA Car Sales", category: "Automotive Sales & Dealership", badge: "Live" },
            { href: "https://freshbuysltd.co.uk", domain: "freshbuysltd.co.uk", title: "Fresh Buys Ltd", category: "Retail & Online Shopping", badge: "Live" },
            { href: "https://myfreshbuys.co.uk", domain: "myfreshbuys.co.uk", title: "Amazon FBA", category: "E-Commerce & Online Retail", badge: "Live" },
          ].map((site, i) => (
            <motion.a
              key={site.domain}
              href={site.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group block cursor-pointer"
              data-testid={`card-portfolio-featured-${i}`}
            >
              <div className="relative rounded-3xl overflow-hidden bg-white shadow-md border border-gray-100 mb-6" style={{ height: "300px" }}>
                <div className="absolute top-0 left-0 right-0 h-10 bg-gray-100 border-b border-gray-200 flex items-center px-4 gap-2 z-20">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <div className="ml-4 flex-1 bg-white border border-gray-200 rounded-full h-6 flex items-center px-3 gap-2 max-w-xs">
                    <div className="w-3 h-3 text-gray-400 flex-shrink-0">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                    </div>
                    <span className="text-xs text-gray-500 font-mono truncate">{site.domain}</span>
                  </div>
                </div>
                <iframe
                  src={site.href}
                  title={site.title}
                  className="absolute top-10 inset-x-0 bottom-0 w-full h-[calc(100%-40px)] border-none pointer-events-none"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[#0066FF]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 flex items-center justify-center">
                  <span className="bg-white text-[#0066FF] px-6 py-3 rounded-full font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    Visit Live Site
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center px-2">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-2xl font-bold text-[#1a1a2e] group-hover:text-[#0066FF] transition-colors">{site.title}</h3>
                    <span className="bg-[#E8F0FF] text-[#0066FF] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">{site.badge}</span>
                  </div>
                  <p className="text-gray-500">{site.category}</p>
                </div>
                <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 group-hover:bg-[#0066FF] group-hover:text-white group-hover:border-transparent transition-all">
                  <ArrowRight className="w-5 h-5 -rotate-45" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}

function Pricing() {
  const [loading, setLoading] = useState<string | null>(null);

  async function handleCheckout(plan: string) {
    setLoading(plan);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json() as { url?: string; error?: string };
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Something went wrong. Please try again or contact us on WhatsApp.");
      }
    } catch {
      alert("Unable to connect. Please try again or contact us on WhatsApp.");
    } finally {
      setLoading(null);
    }
  }

  return (
    <section id="pricing" className="py-24 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-[#0066FF] font-bold tracking-wider uppercase text-sm mb-4 block">Pricing</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#1a1a2e]">Simple, Transparent Pricing</h2>
          <p className="text-lg text-gray-600">High-end design doesn't have to break the bank. No hidden fees, no surprises.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
          {/* Basic Plan — Most Popular */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className="bg-[#0066FF] p-10 rounded-3xl shadow-2xl relative shadow-[0_20px_50px_rgba(0,102,255,0.3)] hover:shadow-[0_30px_60px_rgba(0,102,255,0.4)] transition-all transform z-10"
            data-testid="card-pricing-basic"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1a1a2e] text-white px-6 py-1.5 rounded-full text-sm font-bold shadow-lg uppercase tracking-wider">
              Most Popular
            </div>
            <h3 className="text-2xl font-bold mb-2 text-white">Basic</h3>
            <p className="text-blue-100 mb-6 h-12">Everything you need to establish a powerful, professional online presence.</p>
            <div className="text-5xl font-extrabold text-white mb-8">£100<span className="text-lg text-blue-200 font-medium">/site</span></div>
            <ul className="space-y-4 mb-10 text-white">
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-white" /> 3 Pages (Home, About, Contact)</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-white" /> Mobile Responsive Design</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-white" /> Contact Forms & Lead Gen</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-white" /> Advanced SEO Setup</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-white" /> Fast Delivery (48–72h)</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-white" /> Social Media Links</li>
              <li className="flex items-center gap-3 text-blue-300"><X className="w-5 h-5" /> E-Commerce</li>
            </ul>
            <Button
              className="w-full bg-white text-[#0066FF] hover:bg-gray-50 rounded-xl h-14 font-bold text-lg shadow-lg disabled:opacity-70"
              onClick={() => handleCheckout("basic")}
              disabled={loading !== null}
              data-testid="button-choose-basic"
            >
              {loading === "basic" ? "Redirecting…" : "Get Started — £100"}
            </Button>
          </motion.div>

          {/* Professional Plan */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="bg-[#FAFCFF] p-10 rounded-3xl border border-gray-200 hover:border-[#0066FF]/50 transition-all shadow-sm group"
            data-testid="card-pricing-professional"
          >
            <h3 className="text-2xl font-bold mb-2 text-[#1a1a2e]">Professional</h3>
            <p className="text-gray-500 mb-6 h-12">A feature-rich site built to grow your business and generate leads.</p>
            <div className="text-5xl font-extrabold text-[#0066FF] mb-8">£200<span className="text-lg text-gray-500 font-medium">/site</span></div>
            <ul className="space-y-4 mb-10 text-gray-700">
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-[#0066FF]" /> Everything in Basic</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-[#0066FF]" /> Up to 6 Pages</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-[#0066FF]" /> Premium Animations & Motion</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-[#0066FF]" /> Blog / News Section</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-[#0066FF]" /> Google Analytics Integration</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-[#0066FF]" /> 2 Weeks Free Support</li>
            </ul>
            <Button
              className="w-full bg-white text-[#1a1a2e] border-2 border-gray-200 hover:border-[#0066FF] hover:text-[#0066FF] rounded-xl h-14 font-bold text-lg transition-all shadow-none disabled:opacity-70"
              onClick={() => handleCheckout("professional")}
              disabled={loading !== null}
              data-testid="button-choose-professional"
            >
              {loading === "professional" ? "Redirecting…" : "Choose Professional"}
            </Button>
          </motion.div>

          {/* E-Commerce Plan */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="bg-[#1a1a2e] text-white p-10 rounded-3xl border border-[#2a2a4e] hover:border-[#0066FF]/50 transition-all shadow-xl group"
            data-testid="card-pricing-ecommerce"
          >
            <h3 className="text-2xl font-bold mb-2">E-Commerce</h3>
            <p className="text-gray-400 mb-6 h-12">Complete online stores ready to process payments and manage stock.</p>
            <div className="text-5xl font-extrabold text-[#0066FF] mb-8">£999<span className="text-lg text-gray-500 font-medium">/site</span></div>
            <ul className="space-y-4 mb-10 text-gray-300">
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-[#0066FF]" /> Everything in Basic</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-[#0066FF]" /> Full Online Store</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-[#0066FF]" /> Payment Gateway Setup</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-[#0066FF]" /> CMS & Inventory</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-[#0066FF]" /> 1 Month Free Support</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-[#0066FF]" /> Analytics Integration</li>
            </ul>
            <Button
              className="w-full bg-[#2a2a4e] text-white hover:bg-[#0066FF] rounded-xl h-14 font-bold text-lg transition-colors border-transparent disabled:opacity-70"
              onClick={() => handleCheckout("ecommerce")}
              disabled={loading !== null}
              data-testid="button-choose-ecommerce"
            >
              {loading === "ecommerce" ? "Redirecting…" : "Choose E-Commerce"}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-[#FAFCFF]">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#0066FF] font-bold tracking-wider uppercase text-sm mb-4 block">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a2e] mb-6">Don't just take our word for it.</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Sarah Jenkins", role: "Founder, StyleCo", quote: "The £100 starter package was unbelievable value. We had our site up in 2 days and the design was far better than agencies quoting £2k+." },
            { name: "Marcus Reed", role: "CEO, TechFlow", quote: "Creative Web Studio delivered an incredible e-commerce platform. Our conversion rate increased by 40% in the first month alone." },
            { name: "Elena Gomez", role: "Director, Artisan", quote: "Sharp, professional, and fast. The communication was excellent throughout the process. Highly recommend their professional package." }
          ].map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
            >
              <div className="flex text-[#FFD700] mb-6">
                {[1,2,3,4,5].map(star => <Star key={star} className="w-5 h-5 fill-current" />)}
              </div>
              <p className="text-gray-700 text-lg mb-8 italic">"{testimonial.quote}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i+30}`} alt={testimonial.name} />
                </div>
                <div>
                  <h4 className="font-bold text-[#1a1a2e]">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const blank = { name: "", email: "", phone: "", businessName: "", websiteType: "", industry: "", timeline: "", message: "" };
  const [fields, setFields] = useState(blank);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const set = (k: keyof typeof blank) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setFields(f => ({ ...f, [k]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  function reset() {
    setFields(blank);
    setStatus("idle");
  }

  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-[#E8F0FF] to-transparent rounded-full blur-[120px] opacity-70 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto bg-[#1a1a2e] rounded-[3rem] p-8 md:p-16 shadow-2xl overflow-hidden relative">
          
          {/* Decorative shapes inside card */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#0066FF] rounded-full blur-[80px] opacity-40" />
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-white relative z-10"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to start your project?</h2>
            <p className="text-xl text-gray-400 mb-10 leading-relaxed">
              Fill out the form and our team will get back to you within 24 hours with a free consultation and proposal.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-5 p-6 bg-white/5 rounded-2xl border border-white/10">
                <div className="w-3 h-3 bg-[#25D366] rounded-full animate-pulse" />
                <p className="text-white font-medium">Currently accepting new projects</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 md:p-10 rounded-3xl shadow-xl relative z-10"
          >
            {status === "success" ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-[#1a1a2e] mb-2">Message Sent!</h3>
                <p className="text-gray-600 mb-6">We'll get back to you within 24 hours.</p>
                <Button onClick={reset} className="bg-[#0066FF] hover:bg-[#0052cc] text-white rounded-xl px-8 h-12">
                  Send Another Enquiry
                </Button>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-[#1a1a2e]">Full Name *</label>
                    <Input placeholder="John Doe" value={fields.name} onChange={set("name")} className="h-12 bg-gray-50 border-gray-200 focus:border-[#0066FF] rounded-xl px-4" data-testid="input-name" required />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-[#1a1a2e]">Phone Number</label>
                    <Input placeholder="+44 7700 000000" value={fields.phone} onChange={set("phone")} className="h-12 bg-gray-50 border-gray-200 focus:border-[#0066FF] rounded-xl px-4" data-testid="input-phone" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-bold text-[#1a1a2e]">Email Address *</label>
                  <Input type="email" placeholder="john@example.com" value={fields.email} onChange={set("email")} className="h-12 bg-gray-50 border-gray-200 focus:border-[#0066FF] rounded-xl px-4" data-testid="input-email" required />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-bold text-[#1a1a2e]">Business / Brand Name *</label>
                  <Input placeholder="e.g. Acme Ltd" value={fields.businessName} onChange={set("businessName")} className="h-12 bg-gray-50 border-gray-200 focus:border-[#0066FF] rounded-xl px-4" data-testid="input-business" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-[#1a1a2e]">Website Package *</label>
                    <select value={fields.websiteType} onChange={set("websiteType")} required className="w-full h-12 bg-gray-50 border border-gray-200 focus:border-[#0066FF] rounded-xl px-4 text-gray-700 text-sm outline-none" data-testid="input-website-type">
                      <option value="">Select a package…</option>
                      <option value="Basic — £100">Basic — £100</option>
                      <option value="Professional — £200">Professional — £200</option>
                      <option value="E-Commerce — £999">E-Commerce — £999</option>
                      <option value="Not sure yet">Not sure yet</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-[#1a1a2e]">Ideal Timeline *</label>
                    <select value={fields.timeline} onChange={set("timeline")} required className="w-full h-12 bg-gray-50 border border-gray-200 focus:border-[#0066FF] rounded-xl px-4 text-gray-700 text-sm outline-none" data-testid="input-timeline">
                      <option value="">Select timeline…</option>
                      <option value="ASAP (48–72 hrs)">ASAP (48–72 hrs)</option>
                      <option value="Within 1 week">Within 1 week</option>
                      <option value="Within 2 weeks">Within 2 weeks</option>
                      <option value="Within a month">Within a month</option>
                      <option value="Flexible">Flexible</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-bold text-[#1a1a2e]">Industry / Type of Business *</label>
                  <Input placeholder="e.g. Car dealership, clothing, restaurant…" value={fields.industry} onChange={set("industry")} className="h-12 bg-gray-50 border-gray-200 focus:border-[#0066FF] rounded-xl px-4" data-testid="input-industry" required />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-bold text-[#1a1a2e]">Project Details *</label>
                  <Textarea placeholder="Tell us what you need — pages, features, colours, any sites you like the look of…" value={fields.message} onChange={set("message")} className="min-h-[110px] bg-gray-50 border-gray-200 focus:border-[#0066FF] rounded-xl text-sm p-4 resize-none" data-testid="input-message" required />
                </div>
                {status === "error" && (
                  <p className="text-red-500 text-sm">Something went wrong. Please try again or WhatsApp us.</p>
                )}
                <Button type="submit" disabled={status === "sending"} className="w-full h-14 text-lg rounded-xl bg-[#0066FF] hover:bg-[#0052cc] text-white shadow-lg shadow-blue-500/30 transition-all hover:shadow-blue-500/50 disabled:opacity-70" data-testid="button-submit-contact">
                  {status === "sending" ? "Sending…" : "Send Enquiry"}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#05050A] text-gray-400 py-16 border-t border-gray-800">
      <div className="container mx-auto px-6 text-center md:text-left">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-2">
            <img src="/assets/logo.png" alt="Logo" className="h-10 w-auto mb-6 mx-auto md:mx-0" />
            <p className="max-w-md mx-auto md:mx-0 leading-relaxed text-gray-500">
              Premium web design agency delivering high-converting, stunning websites starting from just £100. We build the digital future of ambitious brands.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Quick Links</h4>
            <ul className="space-y-3">
              <li><button onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-white transition-colors">Services</button></li>
              <li><button onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-white transition-colors">Portfolio</button></li>
              <li><button onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-white transition-colors">Pricing</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Legal</h4>
            <ul className="space-y-3">
              <li><a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-900 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} Creative Web Studio Experts. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white selection:bg-[#0066FF] selection:text-white font-sans text-[#1a1a2e]">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Services />
        <WhyUs />
        <Portfolio />
        <Testimonials />
        <Pricing />
        <Contact />
      </main>
      <Footer />

    </div>
  );
}
