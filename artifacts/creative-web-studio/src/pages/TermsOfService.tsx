import { useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Helmet } from "react-helmet-async";

const SITE_URL = import.meta.env.VITE_SITE_URL ?? "";

export default function TermsOfService() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-white font-sans text-[#1a1a2e]">
      <Helmet>
        <title>Terms of Service | Creative Web Studio Experts</title>
        <meta name="description" content="Read the Creative Web Studio Experts terms of service governing your use of our website and professional web design services for UK businesses." />
        <meta name="robots" content="index, follow" />
        {SITE_URL && <link rel="canonical" href={`${SITE_URL}/terms-of-service`} />}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Terms of Service | Creative Web Studio Experts" />
        <meta property="og:description" content="Read the Creative Web Studio Experts terms of service governing your use of our website and professional web design services for UK businesses." />
        <meta property="og:url" content={`${SITE_URL}/terms-of-service`} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Terms of Service | Creative Web Studio Experts" />
        <meta name="twitter:description" content="Read the Creative Web Studio Experts terms of service governing your use of our website and professional web design services for UK businesses." />
      </Helmet>
      <div className="bg-[#1a1a2e] py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-white">Terms of Service</h1>
          <p className="text-gray-400 mt-2">Last updated: June 2025</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-14 space-y-10 text-gray-700 leading-relaxed">

        <section>
          <h2 className="text-xl font-bold text-[#1a1a2e] mb-3">1. Introduction</h2>
          <p>
            These Terms of Service ("Terms") govern your use of the Creative Web Studio Experts website and any services provided by us. By engaging our services or using our website, you agree to be bound by these Terms.
          </p>
          <p className="mt-3">
            Creative Web Studio Experts is a UK-based web design agency. Contact us at{" "}
            <a href="mailto:creativewebstudioexpert@gmail.com" className="text-[#0066FF] hover:underline">
              creativewebstudioexpert@gmail.com
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#1a1a2e] mb-3">2. Services</h2>
          <p>We provide professional web design and development services, including but not limited to:</p>
          <ul className="list-disc list-inside mt-3 space-y-2">
            <li>Basic website design (from £100)</li>
            <li>Professional website design (from £200)</li>
            <li>E-Commerce website design (from £999)</li>
            <li>Website revisions and updates</li>
          </ul>
          <p className="mt-3">
            All pricing and package details are as listed on our website at the time of purchase. We reserve the right to update pricing for future projects.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#1a1a2e] mb-3">3. Payments</h2>
          <p>
            Payments are processed securely via Stripe. By making a payment, you agree to Stripe's Terms of Service. We do not store any card or payment details on our servers.
          </p>
          <p className="mt-3">
            All prices are shown in GBP (£) and are inclusive of any applicable taxes unless stated otherwise. Payment is required upfront before project work commences.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#1a1a2e] mb-3">4. Refunds & Cancellations</h2>
          <p>
            We aim to deliver high-quality work on every project. If you are not satisfied, please contact us within 7 days of delivery and we will work to resolve any issues.
          </p>
          <p className="mt-3">
            Refunds are considered on a case-by-case basis. Once significant work has commenced on your project, refunds may not be available. Any refund requests should be made to{" "}
            <a href="mailto:creativewebstudioexpert@gmail.com" className="text-[#0066FF] hover:underline">
              creativewebstudioexpert@gmail.com
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#1a1a2e] mb-3">5. Project Timelines</h2>
          <p>
            We will always aim to deliver within the agreed timeline. Timelines are estimates and may be affected by the timely provision of content, assets, and feedback from you. Delays caused by the client do not constitute grounds for a refund.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#1a1a2e] mb-3">6. Intellectual Property</h2>
          <p>
            Upon receipt of full payment, all design and code produced for your project becomes your property. We retain the right to display completed work in our portfolio unless you request otherwise in writing.
          </p>
          <p className="mt-3">
            You are responsible for ensuring that any content, images, or materials you provide to us do not infringe any third-party intellectual property rights.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#1a1a2e] mb-3">7. Client Responsibilities</h2>
          <p>You agree to:</p>
          <ul className="list-disc list-inside mt-3 space-y-2">
            <li>Provide accurate and complete information for your project</li>
            <li>Supply all required content, images, and branding in a timely manner</li>
            <li>Provide feedback and approvals within a reasonable timeframe</li>
            <li>Not use our services for any unlawful or harmful purpose</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#1a1a2e] mb-3">8. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, Creative Web Studio Experts shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services or website. Our total liability to you shall not exceed the amount you paid for the relevant service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#1a1a2e] mb-3">9. Governing Law</h2>
          <p>
            These Terms are governed by and construed in accordance with the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#1a1a2e] mb-3">10. Changes to These Terms</h2>
          <p>
            We may update these Terms from time to time. Continued use of our website or services after any changes constitutes your acceptance of the new Terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#1a1a2e] mb-3">11. Contact</h2>
          <p>
            For any questions about these Terms, please contact us at{" "}
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
