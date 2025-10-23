import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Privacy() {
  return (
    <div className="bg-black min-h-screen">
      <Header />

      <div className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-8">
            Privacy Policy
          </h1>

          <div className="bg-gray-900 p-8 rounded-lg border border-gray-800 text-gray-300 space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Introduction</h2>
              <p>
                Tiger Iron ("we," "our," or "us") respects your privacy and is committed to protecting your personal information.
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our
                website or use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Information We Collect</h2>
              <p className="mb-3">We collect information that you provide directly to us, including:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Name, email address, phone number, and other contact information</li>
                <li>Account credentials and profile information</li>
                <li>Payment and billing information</li>
                <li>Membership details and preferences</li>
                <li>Communications and inquiries you send to us</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">How We Use Your Information</h2>
              <p className="mb-3">We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide, maintain, and improve our services</li>
                <li>Process your membership and payments</li>
                <li>Send you updates, newsletters, and promotional materials</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Monitor and analyze usage patterns and trends</li>
                <li>Ensure the security and integrity of our services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Information Sharing</h2>
              <p>
                We do not sell or rent your personal information to third parties. We may share your information with:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                <li>Service providers who assist us in operating our business</li>
                <li>Payment processors to handle transactions</li>
                <li>Law enforcement or regulatory authorities when required by law</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information
                against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission
                over the internet or electronic storage is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Your Rights</h2>
              <p className="mb-3">You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Access and review your personal information</li>
                <li>Request corrections to your personal information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt-out of marketing communications</li>
                <li>Withdraw consent for data processing</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy or our data practices, please contact us at:
              </p>
              <div className="mt-3 space-y-1">
                <p>Tiger Iron</p>
                <p>123 Auburn Ave, Auburn, AL 36830</p>
                <p>Email: <a href="mailto:info@tigeriron.gym" className="text-[#FF6A00] hover:underline">info@tigeriron.gym</a></p>
                <p>Phone: <a href="tel:+15555555555" className="text-[#FF6A00] hover:underline">(555) 555-5555</a></p>
              </div>
            </section>

            <section>
              <p className="text-sm text-gray-500 mt-8">
                Last Updated: {new Date().toLocaleDateString()}
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
