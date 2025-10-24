import { Star } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      location: 'Auburn, AL',
      rating: 5,
      text: 'Tiger Iron changed my life. The 24/7 access means I can work out at 4am before work. The community is incredibly supportive and the equipment is top-notch.',
      image: 'https://images.pexels.com/photos/3768593/pexels-photo-3768593.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      name: 'Mike Chen',
      location: 'Auburn, AL',
      rating: 5,
      text: 'Best gym in Auburn, hands down. Knowledgeable friendly staff and the facilities are always clean. Love being able to train on my schedule.',
      image: 'https://images.pexels.com/photos/3775164/pexels-photo-3775164.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      name: 'Emily Rodriguez',
      location: 'Opelika, AL',
      rating: 5,
      text: 'The app makes check-in seamless. Tiger Iron has everything I need - from free weights to cardio equipment. Highly recommend!',
      image: 'https://images.pexels.com/photos/3775087/pexels-photo-3775087.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
  ];

  return (
    <section className="bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">
            What Our Members Say
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Join hundreds of satisfied members transforming their lives
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-black p-8 rounded-lg border border-gray-800 hover:border-[#FF6A00] transition-all hover:scale-105"
            >
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="text-white font-bold">{testimonial.name}</h4>
                  <p className="text-gray-400 text-sm">{testimonial.location}</p>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#FF6A00] fill-[#FF6A00]" />
                ))}
              </div>

              <p className="text-gray-300 leading-relaxed">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
