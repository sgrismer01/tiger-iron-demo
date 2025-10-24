import { Apple, Play } from 'lucide-react';

export default function Hero() {
  const handleAppDownload = (platform: string) => {
    fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/app_downloads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
      },
      body: JSON.stringify({
        platform,
        user_agent: navigator.userAgent,
        referrer: document.referrer || 'direct',
      }),
    }).catch(console.error);
  };

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          <div className="space-y-2 mb-6">
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none">
              TIGER IRON
            </h1>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">
              AUBURN'S ONLY 24/7 GYM
            </h2>
          </div>

          <p className="text-xl md:text-2xl text-white mb-8 leading-relaxed">
            Train anytime. Staffed hours plus secure 24/7 access for members.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <a
              href="/signup"
              className="bg-[#FF6A00] text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-[#e55f00] transition-all hover:scale-105 text-center"
            >
              Sign Up Now
            </a>
            <a
              href="/app"
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-white hover:text-black transition-all text-center"
            >
              Download the App
            </a>
          </div>

          <div className="flex flex-wrap gap-6 items-center">
            <a
              href="/app"
              onClick={() => handleAppDownload('ios')}
              className="flex items-center space-x-2 bg-black/50 hover:bg-black/70 px-4 py-2 rounded-lg transition-colors border border-white/20"
            >
              <Apple className="w-6 h-6 text-white" />
              <div className="text-left">
                <div className="text-xs text-gray-300">Download on the</div>
                <div className="text-sm font-semibold text-white">App Store</div>
              </div>
            </a>
            <a
              href="/app"
              onClick={() => handleAppDownload('android')}
              className="flex items-center space-x-2 bg-black/50 hover:bg-black/70 px-4 py-2 rounded-lg transition-colors border border-white/20"
            >
              <Play className="w-6 h-6 text-white" />
              <div className="text-left">
                <div className="text-xs text-gray-300">Get it on</div>
                <div className="text-sm font-semibold text-white">Google Play</div>
              </div>
            </a>
          </div>

          <p className="text-sm text-gray-300 mt-8 space-x-3">
            <span>No long-term contracts</span>
            <span className="text-[#FF6A00]">•</span>
            <span>Committed community</span>
            <span className="text-[#FF6A00]">•</span>
            <span>Strength & cardio zones</span>
          </p>
        </div>
      </div>
    </div>
  );
}
