import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabase, Plan } from '../lib/supabase';

export default function Pricing() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      const { data, error } = await supabase
        .from('plans')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');

      if (error) throw error;
      setPlans(data || []);
    } catch (error) {
      console.error('Error loading plans:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black min-h-screen">
      <Header />

      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tight mb-6">
              Membership Pricing
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Flexible membership options designed to fit your lifestyle. No hidden fees, just honest pricing.
            </p>
          </div>

          {loading ? (
            <div className="text-center text-white">Loading plans...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className="bg-gray-900 rounded-lg p-8 border-2 border-gray-800 hover:border-[#FF6A00] transition-all hover:scale-105"
                >
                  <div className="mb-6">
                    <h3 className="text-3xl font-black text-white mb-2">{plan.title}</h3>
                    <div className="flex items-baseline">
                      <span className="text-5xl font-black text-[#FF6A00]">${plan.price}</span>
                      <span className="text-gray-400 ml-2">/month</span>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="w-5 h-5 text-[#FF6A00] mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={`/signup?plan=${plan.slug}`}
                    className="block w-full bg-[#FF6A00] text-white px-6 py-4 rounded-lg text-lg font-bold text-center hover:bg-[#e55f00] transition-colors"
                  >
                    Select Plan
                  </a>
                </div>
              ))}
            </div>
          )}

          <div className="mt-16 bg-gray-900 rounded-lg p-8 max-w-4xl mx-auto border border-gray-800">
            <h3 className="text-2xl font-bold text-white mb-6">All Plans Include:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                '24/7 secure keycard access',
                'Free weights & power racks',
                'Cardio equipment',
                'Strength training zones',
                'Locker rooms & showers',
                'Free WiFi',
                'Video monitoring',
                'Mobile app access',
              ].map((feature, index) => (
                <div key={index} className="flex items-center">
                  <Check className="w-5 h-5 text-[#FF6A00] mr-3" />
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-4">
              Questions about membership? We're here to help.
            </p>
            <a
              href="/contact"
              className="inline-block border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
