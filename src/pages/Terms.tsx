import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Terms() {
  return (
    <div className="bg-black min-h-screen">
      <Header />

      <div className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-8">
            Terms of Service
          </h1>

          <div className="bg-gray-900 p-8 rounded-lg border border-gray-800 text-gray-300 space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Acceptance of Terms</h2>
              <p>
                By accessing or using Tiger Iron's facilities, website, or services, you agree to be bound by these
                Terms of Service. If you do not agree with any part of these terms, you may not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Membership Terms</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Memberships are personal and non-transferable</li>
                <li>Members must be at least 18 years old or have parental consent</li>
                <li>Monthly memberships auto-renew unless cancelled</li>
                <li>Cancellations must be submitted according to your membership plan terms</li>
                <li>No refunds for partial months or unused time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Facility Rules</h2>
              <p className="mb-3">All members must:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Present valid membership credentials for facility access</li>
                <li>Use equipment properly and safely</li>
                <li>Clean equipment after use</li>
                <li>Wear appropriate athletic attire and closed-toe shoes</li>
                <li>Respect other members and staff</li>
                <li>Follow all posted rules and staff instructions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Prohibited Conduct</h2>
              <p className="mb-3">The following activities are strictly prohibited:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Harassment, intimidation, or threatening behavior</li>
                <li>Theft or damage to property</li>
                <li>Unauthorized photography or video recording</li>
                <li>Use of drugs or alcohol on premises</li>
                <li>Sharing or transferring membership access</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Liability and Assumption of Risk</h2>
              <p>
                Use of Tiger Iron facilities involves inherent risks, including risk of injury. By using our facilities,
                you acknowledge these risks and agree to assume full responsibility for any injuries or damages that may
                occur. Tiger Iron, its owners, employees, and agents are not liable for any injuries, losses, or damages
                arising from your use of our facilities or services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Payment Terms</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>All fees are due in advance according to your membership plan</li>
                <li>Payment methods on file will be automatically charged for recurring memberships</li>
                <li>Failed payments may result in suspension of membership privileges</li>
                <li>Late fees may apply for overdue accounts</li>
                <li>All fees are non-refundable unless required by law</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Termination</h2>
              <p>
                Tiger Iron reserves the right to suspend or terminate any membership at any time for violation of
                these terms, non-payment, or conduct that threatens the safety or comfort of other members or staff.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately
                upon posting. Your continued use of our services after changes are posted constitutes acceptance of the
                modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Contact Information</h2>
              <p>
                For questions about these Terms of Service, please contact us:
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
