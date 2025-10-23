export default function CallToAction() {
  return (
    <section className="bg-[#FF6A00] py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-6">
          Ready to Start Your Journey?
        </h2>
        <p className="text-xl text-white/90 mb-8 leading-relaxed">
          Join Tiger Iron today and experience Auburn's premier 24/7 fitness facility.
          No long-term contracts, just results.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/signup"
            className="bg-black text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-gray-900 transition-all hover:scale-105"
          >
            Start Free Trial
          </a>
          <a
            href="/pricing"
            className="bg-white text-[#FF6A00] px-8 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition-all hover:scale-105"
          >
            View Pricing
          </a>
        </div>
      </div>
    </section>
  );
}
