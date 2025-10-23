import { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabase';

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interestedIn: 'trial',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const { error: insertError } = await supabase
        .from('inquiries')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          interested_in: formData.interestedIn,
          message: formData.message,
          source: document.referrer || 'direct',
        });

      if (insertError) throw insertError;

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        interestedIn: 'trial',
        message: '',
      });
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
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
              Get in Touch
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Have questions? We're here to help you start your fitness journey.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
                <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>

                {success && (
                  <div className="bg-green-900/50 border border-green-600 text-green-200 p-4 rounded mb-6">
                    Thank you for reaching out! We'll reply within 24 hours.
                  </div>
                )}

                {error && (
                  <div className="bg-red-900/50 border border-red-600 text-red-200 p-4 rounded mb-6">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-white font-semibold mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-black border border-gray-700 text-white px-4 py-3 rounded focus:outline-none focus:border-[#FF6A00]"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">Email *</label>
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
                    <label className="block text-white font-semibold mb-2">Interested In *</label>
                    <select
                      name="interestedIn"
                      value={formData.interestedIn}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-black border border-gray-700 text-white px-4 py-3 rounded focus:outline-none focus:border-[#FF6A00]"
                    >
                      <option value="trial">Free Trial</option>
                      <option value="membership">Membership</option>
                      <option value="pt">Personal Training</option>
                      <option value="classes">Group Classes</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full bg-black border border-gray-700 text-white px-4 py-3 rounded focus:outline-none focus:border-[#FF6A00]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#FF6A00] text-white px-6 py-4 rounded-lg text-lg font-bold hover:bg-[#e55f00] transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
                <h2 className="text-2xl font-bold text-white mb-6">Visit Us</h2>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="w-6 h-6 text-[#FF6A00] flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-white font-semibold mb-1">Address</h3>
                      <p className="text-gray-400">
                        123 Auburn Ave<br />
                        Auburn, AL 36830
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Phone className="w-6 h-6 text-[#FF6A00] flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-white font-semibold mb-1">Phone</h3>
                      <a href="tel:+15555555555" className="text-gray-400 hover:text-[#FF6A00] transition-colors">
                        (555) 555-5555
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Mail className="w-6 h-6 text-[#FF6A00] flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-white font-semibold mb-1">Email</h3>
                      <a href="mailto:info@tigeriron.gym" className="text-gray-400 hover:text-[#FF6A00] transition-colors">
                        info@tigeriron.gym
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Clock className="w-6 h-6 text-[#FF6A00] flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-white font-semibold mb-2">Hours</h3>
                      <div className="text-gray-400 space-y-1">
                        <p className="font-semibold text-[#FF6A00]">24/7 Access for Members</p>
                        <p className="mt-2 font-semibold text-white">Staffed Hours:</p>
                        <p>Mon-Fri: 5am - 10pm</p>
                        <p>Sat-Sun: 7am - 8pm</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3347.5!2d-85.48!3d32.60!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDM2JzAwLjAiTiA4NcKwMjgnNDguMCJX!5e0!3m2!1sen!2sus!4v1234567890"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
