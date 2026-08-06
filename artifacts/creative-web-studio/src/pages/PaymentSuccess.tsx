import { motion } from "framer-motion";
import { CheckCircle2, Mail, MessageCircle, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { Mark } from "@/components/Mark";

export default function PaymentSuccess() {
  return (
    <div className="min-h-screen bg-black text-[#f5f5f7] flex items-center justify-center px-6 py-16">
      <Helmet>
        <title>Payment Successful | Creative Web Studio Experts</title>
        <meta name="description" content="Your payment was received. Creative Web Studio Experts will be in touch within 24 hours to kick off your web design project." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="bg-[#121214] border border-white/10 rounded-3xl p-10 sm:p-12 max-w-lg w-full text-center"
      >
        <div className="flex items-center justify-center gap-2 text-[13px] font-semibold text-[#98989d] mb-8">
          <Mark size={18} />
          Creative Web Studio
        </div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
          className="w-20 h-20 rounded-full bg-[#2997ff]/10 border border-[#2997ff]/30 flex items-center justify-center mx-auto mb-8"
        >
          <CheckCircle2 className="w-10 h-10 text-[#2997ff]" />
        </motion.div>

        <h1 className="text-3xl font-bold mb-4 text-balance">Payment successful.</h1>
        <p className="text-[#98989d] text-lg mb-8 leading-relaxed">
          Thank you for choosing Creative Web Studio Experts. We've received your payment and will be in touch within 24 hours to kick off your project.
        </p>

        <div className="bg-black border border-white/10 rounded-2xl p-6 mb-8 text-left space-y-3">
          <p className="text-[11px] font-semibold text-[#2997ff] uppercase tracking-wider mb-1">What happens next</p>
          <p className="flex items-center gap-3 text-[15px]"><Mail size={16} className="text-[#98989d] flex-shrink-0" /> Confirmation email on its way to you</p>
          <p className="flex items-center gap-3 text-[15px]"><MessageCircle size={16} className="text-[#98989d] flex-shrink-0" /> We'll WhatsApp you within 24 hours</p>
          <p className="flex items-center gap-3 text-[15px]"><Rocket size={16} className="text-[#98989d] flex-shrink-0" /> Project kickoff scheduled</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild className="flex-1 bg-[#2997ff] text-black hover:brightness-110 rounded-xl h-12 font-semibold">
            <a href="/">Back to home</a>
          </Button>
          <a
            href="https://wa.me/447907313846"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold px-4 py-3 rounded-xl transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp us
          </a>
        </div>
      </motion.div>
    </div>
  );
}
