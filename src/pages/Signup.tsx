import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabase, Plan } from '../lib/supabase';

export default function Signup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: '',
  });

  useEffect(() => {
    loadPlans();
    const params = new URLSearchParams(window.location.search);
    const planSlug = params.get('plan');
    if (planSlug) {
      setSelectedPlan(planSlug);
      setStep(2);
    }
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
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handlePlanSelect = (planSlug: string) => {
    setSelectedPlan(planSlug);
    setStep(2);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;

      if (authData.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: authData.user.id,
            full_name: formData.fullName,
            phone: formData.phone,
            role: 'member',
          });

        if (profileError) throw profileError;

        const plan = plans.find((p) => p.slug === selectedPlan);
        if (plan) {
          const { error: membershipError } = await supabase
            .from('memberships')
            .insert({
              user_id: authData.user.id,
              plan_id: plan.id,
              status: 'trial',
              start_date: new Date().toISOString(),
            });

          if (membershipError) throw membershipError;
        }

        setStep(3);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during signup');
    } finally {
      setLoading(false);
    }
  };

  const selectedPlanData = plans.find((p) => p.slug === selectedPlan);

  return (
    <div className="bg-black min-h-screen">
      <Header />

      <div className="pt-32 pb-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">
              Join Tiger Iron
            </h1>
            <div className="flex justify-center items-center space-x-4 text-sm">
              <div className={`flex items-center ${step >= 1 ? 'text-[#FF6A00]' : 'text-gray-600'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold mr-2 ${step >= 1 ? 'bg-[#FF6A00] text-white' : 'bg-gray-800 text-gray-600'}`}>
                  1
                </div>
                <span>Choose Plan</span>
              </div>
              <div className="w-12 h-px bg-gray-800"></div>
              <div className={`flex items-center ${step >= 2 ? 'text-[#FF6A00]' : 'text-gray-600'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold mr-2 ${step >= 2 ? 'bg-[#FF6A00] text-white' : 'bg-gray-800 text-gray-600'}`}>
                  2
                </div>
                <span>Create Account</span>
              </div>
              <div className="w-12 h-px bg-gray-800"></div>
              <div className={`flex items-center ${step >= 3 ? 'text-[#FF6A00]' : 'text-gray-600'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold mr-2 ${step >= 3 ? 'bg-[#FF6A00] text-white' : 'bg-gray-800 text-gray-600'}`}>
                  3
                </div>
                <span>Complete</span>
              </div>
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-6">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  onClick={() => handlePlanSelect(plan.slug)}
                  className="bg-gray-900 p-6 rounded-lg border-2 border-gray-800 hover:border-[#FF6A00] cursor-pointer transition-all"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{plan.title}</h3>
                      <ul className="text-sm text-gray-400 space-y-1">
                        {plan.features.slice(0, 2).map((feature, index) => (
                          <li key={index}>• {feature}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-black text-[#FF6A00]">${plan.price}</div>
                      <div className="text-gray-400">/month</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">Selected Plan:</h3>
                <div className="flex justify-between items-center bg-black p-4 rounded">
                  <span className="text-white font-semibold">{selectedPlanData?.title}</span>
                  <span className="text-[#FF6A00] font-bold">${selectedPlanData?.price}/month</span>
                </div>
              </div>

              <form onSubmit={handleSignup} className="space-y-4">
                {error && (
                  <div className="bg-red-900/50 border border-red-600 text-red-200 p-3 rounded">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-white font-semibold mb-2">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-black border border-gray-700 text-white px-4 py-3 rounded focus:outline-none focus:border-[#FF6A00]"
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-black border border-gray-700 text-white px-4 py-3 rounded focus:outline-none focus:border-[#FF6A00]"
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-black border border-gray-700 text-white px-4 py-3 rounded focus:outline-none focus:border-[#FF6A00]"
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-black border border-gray-700 text-white px-4 py-3 rounded focus:outline-none focus:border-[#FF6A00]"
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-black border border-gray-700 text-white px-4 py-3 rounded focus:outline-none focus:border-[#FF6A00]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#FF6A00] text-white px-6 py-4 rounded-lg text-lg font-bold hover:bg-[#e55f00] transition-colors disabled:opacity-50"
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>
              </form>
            </div>
          )}

          {step === 3 && (
            <div className="bg-gray-900 p-8 rounded-lg border border-gray-800 text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-black text-white mb-4">Welcome to Tiger Iron!</h2>
              <p className="text-gray-400 mb-8">
                Your account has been created successfully. Download our app to get your keycard access set up.
              </p>
              <div className="space-y-4">
                <a
                  href="/app"
                  className="block w-full bg-[#FF6A00] text-white px-6 py-4 rounded-lg text-lg font-bold hover:bg-[#e55f00] transition-colors"
                >
                  Download the App
                </a>
                <a
                  href="/portal"
                  className="block w-full border border-white text-white px-6 py-4 rounded-lg text-lg font-bold hover:bg-white hover:text-black transition-colors"
                >
                  Go to My Account
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
