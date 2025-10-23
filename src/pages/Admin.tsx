import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Mail, Download, TrendingUp } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabase, Profile, Membership, Inquiry } from '../lib/supabase';

export default function Admin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [stats, setStats] = useState({
    totalMembers: 0,
    activeMembers: 0,
    inquiries: 0,
    appDownloads: 0,
  });
  const [recentMembers, setRecentMembers] = useState<(Profile & { membership?: Membership })[]>([]);
  const [recentInquiries, setRecentInquiries] = useState<Inquiry[]>([]);

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        navigate('/login');
        return;
      }

      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .maybeSingle();

      if (profileError || profileData?.role !== 'admin') {
        navigate('/portal');
        return;
      }

      setIsAdmin(true);
      await loadDashboardData();
    } catch (error) {
      console.error('Error checking admin access:', error);
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const loadDashboardData = async () => {
    try {
      const { count: totalCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'member');

      const { count: activeCount } = await supabase
        .from('memberships')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'active');

      const { count: inquiryCount } = await supabase
        .from('inquiries')
        .select('*', { count: 'exact', head: true });

      const { count: downloadCount } = await supabase
        .from('app_downloads')
        .select('*', { count: 'exact', head: true });

      setStats({
        totalMembers: totalCount || 0,
        activeMembers: activeCount || 0,
        inquiries: inquiryCount || 0,
        appDownloads: downloadCount || 0,
      });

      const { data: membersData } = await supabase
        .from('profiles')
        .select(`
          *,
          memberships (*)
        `)
        .eq('role', 'member')
        .order('created_at', { ascending: false })
        .limit(10);

      setRecentMembers((membersData as any) || []);

      const { data: inquiriesData } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      setRecentInquiries(inquiriesData || []);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  };

  const exportInquiries = async () => {
    try {
      const { data } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (!data) return;

      const csv = [
        ['Name', 'Email', 'Phone', 'Interested In', 'Message', 'Date'],
        ...data.map(inquiry => [
          inquiry.name,
          inquiry.email,
          inquiry.phone || '',
          inquiry.interested_in || '',
          inquiry.message,
          new Date(inquiry.created_at).toLocaleDateString(),
        ])
      ].map(row => row.join(',')).join('\n');

      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `inquiries-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
    } catch (error) {
      console.error('Error exporting inquiries:', error);
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

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="bg-black min-h-screen">
      <Header />

      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-400">Manage memberships, view analytics, and track inquiries</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Total Members</p>
                  <p className="text-3xl font-black text-white">{stats.totalMembers}</p>
                </div>
                <Users className="w-10 h-10 text-[#FF6A00]" />
              </div>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Active Memberships</p>
                  <p className="text-3xl font-black text-white">{stats.activeMembers}</p>
                </div>
                <TrendingUp className="w-10 h-10 text-green-500" />
              </div>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Total Inquiries</p>
                  <p className="text-3xl font-black text-white">{stats.inquiries}</p>
                </div>
                <Mail className="w-10 h-10 text-blue-500" />
              </div>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">App Downloads</p>
                  <p className="text-3xl font-black text-white">{stats.appDownloads}</p>
                </div>
                <Download className="w-10 h-10 text-purple-500" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-6">Recent Members</h2>
              <div className="space-y-4">
                {recentMembers.map((member) => (
                  <div
                    key={member.id}
                    className="bg-black p-4 rounded border border-gray-800 flex justify-between items-center"
                  >
                    <div>
                      <p className="text-white font-semibold">{member.full_name}</p>
                      <p className="text-sm text-gray-400">
                        Joined {new Date(member.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    {member.memberships && (member.memberships as any)[0] && (
                      <span className={`px-3 py-1 rounded text-sm font-semibold ${
                        (member.memberships as any)[0].status === 'active' ? 'bg-green-900 text-green-300' :
                        (member.memberships as any)[0].status === 'trial' ? 'bg-blue-900 text-blue-300' :
                        'bg-gray-800 text-gray-400'
                      }`}>
                        {(member.memberships as any)[0].status}
                      </span>
                    )}
                  </div>
                ))}
                {recentMembers.length === 0 && (
                  <p className="text-gray-400 text-center py-8">No members yet</p>
                )}
              </div>
            </div>

            <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Recent Inquiries</h2>
                <button
                  onClick={exportInquiries}
                  className="bg-[#FF6A00] text-white px-4 py-2 rounded font-semibold hover:bg-[#e55f00] transition-colors text-sm"
                >
                  Export CSV
                </button>
              </div>
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {recentInquiries.map((inquiry) => (
                  <div
                    key={inquiry.id}
                    className="bg-black p-4 rounded border border-gray-800"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-white font-semibold">{inquiry.name}</p>
                        <p className="text-sm text-gray-400">{inquiry.email}</p>
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(inquiry.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 mb-2">{inquiry.message}</p>
                    {inquiry.interested_in && (
                      <span className="inline-block bg-gray-800 text-[#FF6A00] px-2 py-1 rounded text-xs font-semibold">
                        {inquiry.interested_in}
                      </span>
                    )}
                  </div>
                ))}
                {recentInquiries.length === 0 && (
                  <p className="text-gray-400 text-center py-8">No inquiries yet</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
