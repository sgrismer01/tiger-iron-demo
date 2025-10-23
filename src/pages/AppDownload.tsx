import { Apple, Play, Smartphone, Bell, Key, Calendar } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AppDownload() {
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

  const features = [
    {
      icon: Key,
      title: 'Digital Check-In',
      description: 'Use your phone as your keycard for seamless 24/7 gym access.',
    },
    {
      icon: Calendar,
      title: 'Class Schedule',
      description: 'View and book group fitness classes directly from your phone.',
    },
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Get updates on new classes, gym announcements, and membership info.',
    },
    {
      icon: Smartphone,
      title: 'Track Progress',
      description: 'Monitor your visits, track your fitness journey, and stay motivated.',
    },
  ];

  return (
    <div className="bg-black min-h-screen">
      <Header />

      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tight mb-6">
              Download the App
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              Get the Tiger Iron mobile app for seamless check-in, class bookings, and more.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="#"
                onClick={() => handleAppDownload('ios')}
                className="flex items-center space-x-3 bg-white text-black px-6 py-4 rounded-lg hover:bg-gray-100 transition-all hover:scale-105"
              >
                <Apple className="w-8 h-8" />
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="text-lg font-bold">App Store</div>
                </div>
              </a>
              <a
                href="#"
                onClick={() => handleAppDownload('android')}
                className="flex items-center space-x-3 bg-white text-black px-6 py-4 rounded-lg hover:bg-gray-100 transition-all hover:scale-105"
              >
                <Play className="w-8 h-8" />
                <div className="text-left">
                  <div className="text-xs">Get it on</div>
                  <div className="text-lg font-bold">Google Play</div>
                </div>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <img
                src="https://images.pexels.com/photos/3756165/pexels-photo-3756165.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Mobile app preview"
                className="rounded-lg shadow-2xl"
              />
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
                Your Gym in Your Pocket
              </h2>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                The Tiger Iron app gives you complete control over your fitness journey.
                From keyless entry to class bookings, everything you need is right at your fingertips.
              </p>

              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-[#FF6A00] p-3 rounded-lg flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                      <p className="text-gray-400">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-8 md:p-12 border border-gray-800">
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6 text-center">
              How to Get Started
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="bg-[#FF6A00] w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-black mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Download the App</h3>
                <p className="text-gray-400">
                  Get the Tiger Iron app from the App Store or Google Play.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-[#FF6A00] w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-black mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Sign In</h3>
                <p className="text-gray-400">
                  Log in with your Tiger Iron membership credentials.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-[#FF6A00] w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-black mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Start Training</h3>
                <p className="text-gray-400">
                  Use the app for check-in, class bookings, and tracking your progress.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-gray-400 mb-6">
              Not a member yet?
            </p>
            <a
              href="/signup"
              className="inline-block bg-[#FF6A00] text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-[#e55f00] transition-all hover:scale-105"
            >
              Join Tiger Iron Today
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
