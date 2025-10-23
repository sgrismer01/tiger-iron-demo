import { Clock, Dumbbell, Users, Zap } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Clock,
      title: '24/7 Access',
      description: 'Secure keycard entry and video monitoring. Train whenever you want, day or night.',
    },
    {
      icon: Dumbbell,
      title: 'Top Equipment',
      description: 'Free weights, power racks, cardio machines, and specialized training areas.',
    },
    {
      icon: Users,
      title: 'Personal Training & Classes',
      description: 'Expert coaches and community-driven group classes to help you reach your goals.',
    },
    {
      icon: Zap,
      title: 'Community & Support',
      description: 'Join member events, challenges, and a supportive fitness community.',
    },
  ];

  return (
    <section className="bg-black py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">
            Why Tiger Iron
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need to achieve your fitness goals in one place
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-900 p-8 rounded-lg hover:bg-gray-800 transition-all hover:scale-105 border border-gray-800"
            >
              <div className="bg-[#FF6A00] w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <feature.icon className="w-8 h-8 text-white" strokeWidth={2.5} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href="/pricing"
            className="inline-block bg-[#FF6A00] text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-[#e55f00] transition-all hover:scale-105"
          >
            View Membership Options
          </a>
        </div>
      </div>
    </section>
  );
}
