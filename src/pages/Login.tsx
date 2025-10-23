import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabase';

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (loginError) throw loginError;

      if (data.user) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .maybeSingle();

        if (profileData?.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/portal');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black min-h-screen">
      <Header />

      <div className="pt-32 pb-20">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">
              Member Login
            </h1>
            <p className="text-gray-400">
              Access your account and manage your membership
            </p>
          </div>

          <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="bg-red-900/50 border border-red-600 text-red-200 p-3 rounded">
                  {error}
                </div>
              )}

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

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#FF6A00] text-white px-6 py-4 rounded-lg text-lg font-bold hover:bg-[#e55f00] transition-colors disabled:opacity-50"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Don't have an account?{' '}
                <a href="/signup" className="text-[#FF6A00] hover:underline font-semibold">
                  Sign up here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
