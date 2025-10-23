import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, CreditCard, Calendar, Download } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabase, Profile, Membership, Plan } from '../lib/supabase';

export default function Portal() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [membership, setMembership] = useState<(Membership & { plan: Plan }) | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        navigate('/login');
        return;
      }

      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (profileError) throw profileError;
      setProfile(profileData);

      const { data: membershipData, error: membershipError } = await supabase
        .from('memberships')
        .select(`
          *,
          plan:plans(*)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (membershipError && membershipError.code !== 'PGRST116') {
        throw membershipError;
      }

      if (membershipData) {
        setMembership(membershipData as any);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-500';
      case 'trial':
        return 'text-blue-500';
      case 'canceled':
        return 'text-yellow-500';
      case 'expired':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="bg-black min-h-screen">
        <Header />
        <div className="pt-32 flex items-center justify-center">
          <div className="text-white text-xl">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen">
      <Header />

      <div className="pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-2">
              My Account
            </h1>
            <p className="text-gray-400">Welcome back, {profile?.full_name}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
              <div className="flex items-center space-x-3 mb-6">
                <User className="w-6 h-6 text-[#FF6A00]" />
                <h2 className="text-2xl font-bold text-white">Profile Information</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400">Full Name</label>
                  <p className="text-white font-semibold">{profile?.full_name}</p>
                </div>

                <div>
                  <label className="text-sm text-gray-400">Email</label>
                  <p className="text-white font-semibold">{profile?.id}</p>
                </div>

                {profile?.phone && (
                  <div>
                    <label className="text-sm text-gray-400">Phone</label>
                    <p className="text-white font-semibold">{profile.phone}</p>
                  </div>
                )}

                <div>
                  <label className="text-sm text-gray-400">Member Since</label>
                  <p className="text-white font-semibold">
                    {new Date(profile?.created_at || '').toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {membership && (
              <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
                <div className="flex items-center space-x-3 mb-6">
                  <CreditCard className="w-6 h-6 text-[#FF6A00]" />
                  <h2 className="text-2xl font-bold text-white">Membership</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-400">Current Plan</label>
                    <p className="text-white font-semibold text-xl">{membership.plan.title}</p>
                  </div>

                  <div>
                    <label className="text-sm text-gray-400">Status</label>
                    <p className={`font-bold text-lg uppercase ${getStatusColor(membership.status)}`}>
                      {membership.status}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm text-gray-400">Start Date</label>
                    <p className="text-white font-semibold">
                      {new Date(membership.start_date).toLocaleDateString()}
                    </p>
                  </div>

                  {membership.end_date && (
                    <div>
                      <label className="text-sm text-gray-400">End Date</label>
                      <p className="text-white font-semibold">
                        {new Date(membership.end_date).toLocaleDateString()}
                      </p>
                    </div>
                  )}

                  <div className="pt-4">
                    <a
                      href="/pricing"
                      className="block w-full bg-[#FF6A00] text-white px-6 py-3 rounded-lg text-center font-bold hover:bg-[#e55f00] transition-colors"
                    >
                      Upgrade Plan
                    </a>
                  </div>
                </div>
              </div>
            )}

            {!membership && (
              <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
                <div className="flex items-center space-x-3 mb-6">
                  <CreditCard className="w-6 h-6 text-[#FF6A00]" />
                  <h2 className="text-2xl font-bold text-white">Membership</h2>
                </div>

                <p className="text-gray-400 mb-6">
                  You don't have an active membership yet. Choose a plan to get started.
                </p>

                <a
                  href="/pricing"
                  className="block w-full bg-[#FF6A00] text-white px-6 py-3 rounded-lg text-center font-bold hover:bg-[#e55f00] transition-colors"
                >
                  View Membership Plans
                </a>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
              <div className="flex items-center space-x-3 mb-6">
                <Calendar className="w-6 h-6 text-[#FF6A00]" />
                <h2 className="text-2xl font-bold text-white">Quick Actions</h2>
              </div>

              <div className="space-y-3">
                <a
                  href="/app"
                  className="block w-full border border-white text-white px-6 py-3 rounded-lg text-center font-semibold hover:bg-white hover:text-black transition-colors"
                >
                  Download Mobile App
                </a>
                <a
                  href="/contact"
                  className="block w-full border border-white text-white px-6 py-3 rounded-lg text-center font-semibold hover:bg-white hover:text-black transition-colors"
                >
                  Contact Support
                </a>
              </div>
            </div>

            <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
              <div className="flex items-center space-x-3 mb-6">
                <Download className="w-6 h-6 text-[#FF6A00]" />
                <h2 className="text-2xl font-bold text-white">Resources</h2>
              </div>

              <div className="space-y-4 text-gray-400">
                <p>
                  <strong className="text-white">Hours:</strong><br />
                  24/7 Access for Members<br />
                  Staffed: Mon-Fri 5am-10pm, Sat-Sun 7am-8pm
                </p>
                <p>
                  <strong className="text-white">Location:</strong><br />
                  123 Auburn Ave, Auburn, AL 36830
                </p>
                <p>
                  <strong className="text-white">Phone:</strong><br />
                  <a href="tel:+15555555555" className="text-[#FF6A00] hover:underline">
                    (555) 555-5555
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
