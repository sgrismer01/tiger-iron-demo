import { useState } from 'react';
import { Menu, X, Dumbbell } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  supabase.auth.onAuthStateChange((event, session) => {
    (async () => {
      setUser(session?.user ?? null);
    })();
  });

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-3">
            <Dumbbell className="w-8 h-8 text-[#FF6A00]" strokeWidth={2.5} />
            <a href="/" className="text-white text-2xl font-bold tracking-tight">
              TIGER IRON
            </a>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-white hover:text-[#FF6A00] transition-colors font-medium">
              Home
            </a>
            <a href="/pricing" className="text-white hover:text-[#FF6A00] transition-colors font-medium">
              Pricing
            </a>
            <a href="/contact" className="text-white hover:text-[#FF6A00] transition-colors font-medium">
              Contact
            </a>
            <a href="/app" className="text-white hover:text-[#FF6A00] transition-colors font-medium">
              App
            </a>
            <span className="text-[#FF6A00] text-sm font-semibold border border-[#FF6A00] px-3 py-1 rounded">
              OPEN 24/7
            </span>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <a
              href="/app"
              className="bg-[#FF6A00] text-white px-5 py-2.5 rounded font-semibold hover:bg-[#e55f00] transition-colors"
            >
              Download App
            </a>
            {user ? (
              <>
                <a
                  href="/portal"
                  className="border border-white text-white px-5 py-2.5 rounded font-semibold hover:bg-white hover:text-black transition-colors"
                >
                  My Account
                </a>
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-[#FF6A00] transition-colors font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <a
                href="/login"
                className="border border-white text-white px-5 py-2.5 rounded font-semibold hover:bg-white hover:text-black transition-colors"
              >
                Member Login
              </a>
            )}
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-black border-t border-gray-900">
          <div className="px-4 py-6 space-y-4">
            <a href="/" className="block text-white hover:text-[#FF6A00] transition-colors font-medium text-lg">
              Home
            </a>
            <a href="/pricing" className="block text-white hover:text-[#FF6A00] transition-colors font-medium text-lg">
              Pricing
            </a>
            <a href="/contact" className="block text-white hover:text-[#FF6A00] transition-colors font-medium text-lg">
              Contact
            </a>
            <a href="/app" className="block text-white hover:text-[#FF6A00] transition-colors font-medium text-lg">
              App
            </a>
            <div className="pt-4 space-y-3">
              <a
                href="/app"
                className="block w-full bg-[#FF6A00] text-white px-5 py-3 rounded font-semibold text-center hover:bg-[#e55f00] transition-colors"
              >
                Download App
              </a>
              {user ? (
                <>
                  <a
                    href="/portal"
                    className="block w-full border border-white text-white px-5 py-3 rounded font-semibold text-center hover:bg-white hover:text-black transition-colors"
                  >
                    My Account
                  </a>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-white hover:text-[#FF6A00] transition-colors font-medium text-center"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <a
                  href="/login"
                  className="block w-full border border-white text-white px-5 py-3 rounded font-semibold text-center hover:bg-white hover:text-black transition-colors"
                >
                  Member Login
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
