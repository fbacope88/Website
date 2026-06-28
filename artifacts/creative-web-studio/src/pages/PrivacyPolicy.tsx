import { ArrowLeft } from "lucide-react";
import { Helmet } from "react-helmet-async";

const SITE_URL = import.meta.env.VITE_SITE_URL ?? "";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white font-sans text-[#1a1a2e]">
      <Helmet>
        <title>Privacy Policy | Creative Web Studio Experts</title>
        <meta name="description" content="Read the Creative Web Studio Experts privacy policy to understand how we collect, use, and protect your personal information as a UK-based web design agency." />
        <meta name="robots" content="index, follow" />
        {SITE_URL && <link rel="canonical" href={`${SITE_URL}/privacy-policy`} />}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Privacy Policy | Creative Web Studio Experts" />
        <meta property="og:description" content="Read the Creative Web Studio Experts privacy policy to understand how we collect, use, and protect your personal information as a UK-based web design agency." />
        <meta property="og:url" content={`${SITE_URL}/privacy-policy`} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Privacy Policy | Creative Web Studio Experts" />
        <meta name="twitter:description" content="Read the Creative Web Studio Experts privacy policy to understand how we collect, use, and protect your personal information as a UK-based web design agency." />
      </Helmet>
      <div className="bg-[#1a1a2e] py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <a
            href="/"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </a>
          <h1 className="text-3xl md:text-4xl font-bold text-white">Privacy Policy</h1>
          <p className="text-gray-400 mt-2">Last updated: June 2025</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-14 space-y-10 text-gray-700 leading-relaxed">

        <section>
          <h2 className="text-xl font-bold text-[#1a1a2e] mb-3">1. Who We Are</h2>
          <p>
            Creative Web Studio Experts is a UK-based web design agency. Our contact email is{" "}
            <a href="mailto:creativewebstudioexpert@gmail.com" className="text-[#0066FF] hover:underline">
              creativewebstudioexpert@gmail.com
            </a>
            . When we refer to "we", "us" or "our" in this policy, we mean Creative Web Studio Experts.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#1a1a2e] mb-3">2. What Information We Collect</h2>
          <p>We only collect information you voluntarily provide to us. This may include:</p>
          <ul className="list-disc list-inside mt-3 space-y-2">
            <li>Your full name and email address</li>
            <li>Your phone number (optional)</li>
            <li>Your business or brand name</li>
            <li>Details about your project or website requirements</li>
            <li>Payment information processed securely via Stripe (we never store card details)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#1a1a2e] mb-3">3. How We Use Your Information</h2>
          <p>We use the information you provide to:</p>
          <ul className="list-disc list-inside mt-3 space-y-2">
            <li>Respond to your enquiries and project requests</li>
            <li>Process payments for services</li>
            <li>Send you updates about your project</li>
            <li>Improve our website and services</li>
          </ul>
          <p className="mt-3">
            We will never sell, rent, or share your personal information with third parties for marketing purposes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#1a1a2e] mb-3">4. Third-Party Services</h2>
          <p>We use the following third-party services which may process your data:</p>
          <ul className="list-disc list-inside mt-3 space-y-2">
            <li><strong>Stripe</strong> — secure payment processing. View their privacy policy at stripe.com/privacy.</li>
            <li><strong>Google (Gmail)</strong> — for receiving and managing enquiry emails.</li>
            <li><strong>Make.com</strong> — for workflow automation related to enquiries.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#1a1a2e] mb-3">5. Cookies</h2>
          <p>
            Our website may use essential cookies to ensure basic functionality. We do not use tracking or advertising cookies. By using our site, you consent to essential cookies being placed on your device.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#1a1a2e] mb-3">6. Data Retention</h2>
          <p>
            We retain your personal information only for as long as necessary to fulfil the purpose it was collected for, or as required by law. Enquiry data is typically retained for up to 2 years.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#1a1a2e] mb-3">7. Your Rights</h2>
          <p>Under UK GDPR, you have the right to:</p>
          <ul className="list-disc list-inside mt-3 space-y-2">
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to or restrict processing of your data</li>
            <li>Lodge a complaint with the ICO (ico.org.uk)</li>
          </ul>
          <p className="mt-3">
            To exercise any of these rights, email us at{" "}
            <a href="mailto:creativewebstudioexpert@gmail.com" className="text-[#0066FF] hover:underline">
              creativewebstudioexpert@gmail.com
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#1a1a2e] mb-3">8. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated date. Continued use of our website constitutes acceptance of the updated policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#1a1a2e] mb-3">9. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at{" "}
            <a href="mailto:creativewebstudioexpert@gmail.com" className="text-[#0066FF] hover:underline">
              creativewebstudioexpert@gmail.com
            </a>
            .
          </p>
        </section>
      </div>

      <footer className="bg-[#05050A] text-gray-500 text-center py-6 text-sm">
        &copy; {new Date().getFullYear()} Creative Web Studio Experts. All rights reserved.
      </footer>
    </div>
  );
}
