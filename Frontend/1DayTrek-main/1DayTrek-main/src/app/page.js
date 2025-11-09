'use client';
import Footer from '@/component/footer';
import { useRouter } from 'next/navigation';
import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeftCircle, ArrowRightCircle } from 'lucide-react';
import { Menu, X } from 'lucide-react';

export default function TrekRegistration() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    gender: '',
    contactNumber: '',
    whatsappNumber: '',
    email: '',
    collegeName: '',
    pickUpLocation: '',
    dropLocation: '',
    mealPreference: '',
    experienceLevel: '',
    medicalDetails: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: null, message: '' });

  // 🌿 Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🧾 Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    if (typeof window !== 'undefined') {
      localStorage.setItem('RegistrationFormData', JSON.stringify(formData));
    }

    router.push('/payment');
  };

  // 🎠 Embla Carousel for Gallery
  const [emblaRefGallery, emblaApiGallery] = useEmblaCarousel({ loop: false, align: 'start' });

  const scrollPrevGallery = useCallback(() => {
    if (emblaApiGallery) emblaApiGallery.scrollPrev();
  }, [emblaApiGallery]);

  const scrollNextGallery = useCallback(() => {
    if (emblaApiGallery) emblaApiGallery.scrollNext();
  }, [emblaApiGallery]);

  // 🖱️ Enable sideways scrolling on trackpads/mice
  useEffect(() => {
    if (!emblaApiGallery) return;
    const node = emblaApiGallery.containerNode();

    const handleWheel = (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        e.deltaX > 0 ? emblaApiGallery.scrollNext() : emblaApiGallery.scrollPrev();
      }
    };

    node.addEventListener('wheel', handleWheel, { passive: false });
    return () => node.removeEventListener('wheel', handleWheel);
  }, [emblaApiGallery]);

  // 📸 Gallery Items
  const gallery = [
    { src: '/trek/bhojpur.jpg', title: 'Bhojpur', desc: 'A historical site with ancient temple.' },
    { src: '/trek/TheAscent1.jpg', title: 'The Ascent', desc: 'A challenging climb with rewarding views.' },
    { src: '/trek/riverside.jpg', title: 'Riverside', desc: 'Discover the local nature.' },
    { src: '/trek/summit.jpg', title: 'Summit Success', desc: 'Celebrating the achievement together.' },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-t to-amber-100 via-orange-50 from-white overflow-hidden">
      {/* 🌄 Navbar */}
      <nav className="w-full h-16 fixed top-0 left-0 z-50 bg-gradient-to-r from-white/80 via-amber-50/70 to-orange-100/70 backdrop-blur-md shadow-sm border-b border-orange-200">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-full relative">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Image
              src="/logo.png"
              alt="Tirth Ghumo Logo"
              width={200}
              height={60}
              className="rounded-xl hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex items-center space-x-8 text-gray-700 font-semibold text-sm md:text-base">
              <a href="https://tirthghumo.in/" className="hover:text-orange-600 transition-colors">Home</a>
              <a href="#register" className="hover:text-orange-600 transition-colors">Register</a>
              <a href="#about" className="hover:text-orange-600 transition-colors">About</a>
              <a href="#contact" className="hover:text-orange-600 transition-colors">Contact</a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-gray-700 focus:outline-none">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="md:hidden bg-gradient-to-b from-white/90 to-amber-100/80 backdrop-blur-md shadow-md border-t border-orange-200">
            <div className="flex flex-col items-center py-4 space-y-4 text-gray-700 font-semibold text-base">
              {['Home', 'Register', 'About', 'Contact'].map((link, i) => (
                <a
                  key={i}
                  href={link === 'Home' ? 'https://tirthghumo.in/' : `#${link.toLowerCase()}`}
                  className="hover:text-orange-600 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* 🏞️ Hero Section */}
      <div className="relative h-[400px] rounded-3xl mx-4 mt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
        <Image
          src="/trek/hero.jpg"
          alt="Mountain landscape at sunrise"
          width={1200}
          height={600}
          className="w-full h-full object-cover object-[center_-500px]"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-5xl font-bold mb-3">1 Day Adventure Trek</h1>
          <p className="text-lg mb-6">November 23, 2025 | Join the Adventure</p>
          <a
            href="#register"
            className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-full font-semibold transition-colors"
          >
            Register Now
          </a>
        </div>
      </div>

      {/* 🧭 About Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 mb-10 text-center">
          About the Trek
          <span className="block w-20 h-1 bg-gradient-to-r from-orange-400 to-amber-300 mx-auto mt-3 rounded-full"></span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { icon: '🗺️', title: 'Destination', desc: 'Just 70km from Bhopal' },
            { icon: '⛰️', title: 'Difficulty', desc: 'Intermediate (6km Trek)' },
            { icon: '⏱️', title: 'Duration', desc: '8 Hours of fun & exploration' },
            { icon: '⭐', title: 'Highlights', desc: 'Panoramic Views, Riverside, Waterfall' },
          ].map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm">
              <div className="text-2xl mb-3">{item.icon}</div>
              <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 🗓️ Itinerary */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 mb-10 text-center">
          Trek Itinerary
          <span className="block w-20 h-1 bg-gradient-to-r from-orange-400 to-amber-300 mx-auto mt-3 rounded-full"></span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: '🚌', title: 'AC Traveller Ride', desc: 'Comfortable AC bus from Bhopal to Bhojpur ensuring a relaxed and scenic journey.' },
            { icon: '🗺️', title: 'Sightseeing & Exploration', desc: 'Explore Bhojpur’s ancient temples and scenic trails.' },
            { icon: '🍳', title: 'Breakfast at Bhojpur', desc: 'Start your day with a delicious complimentary breakfast.' },
            { icon: '🎯', title: 'Fun Games & Group Activities', desc: 'Bond with trekkers through fun outdoor games and challenges.' },
            { icon: '🥤', title: 'Refreshing Drinks at Trek', desc: 'Stay hydrated with cool drinks and snacks.' },
            { icon: '🍜', title: 'Maggie by the Riverside', desc: 'Enjoy maggie by the riverside — a trekker’s delight!' },
            { icon: '🔥', title: 'Campfire Cooking', desc: 'End with a cozy campfire and live cooking experience.' },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-4 bg-white shadow-md rounded-2xl p-5 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-3xl bg-gradient-to-br from-orange-300 to-amber-200 rounded-full p-3">
                {item.icon}
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800 mb-1">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🖼️ Gallery */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 mb-10 text-center">
          Glimpses from the Trail
          <span className="block w-20 h-1 bg-gradient-to-r from-orange-400 to-amber-300 mx-auto mt-3 rounded-full"></span>
        </h2>

        <div className="overflow-hidden" ref={emblaRefGallery}>
          <div className="flex gap-6">
            {gallery.map((item, idx) => (
              <div
                key={idx}
                className="flex-[0_0_80%] md:flex-[0_0_25%] rounded-2xl overflow-hidden shadow-xl bg-white m-5"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4">
                  <h3 className="font-bold text-gray-800 mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery Controls */}
        <div className="flex justify-center mt-6 gap-4">
          <button onClick={scrollPrevGallery} className="w-12 h-12 bg-orange-400 rounded-full hover:bg-orange-300 flex items-center justify-center">
            <ArrowLeftCircle size={30} className="text-white" />
          </button>
          <button onClick={scrollNextGallery} className="w-12 h-12 bg-orange-400 rounded-full hover:bg-orange-300 flex items-center justify-center">
            <ArrowRightCircle size={30} className="text-white" />
          </button>
        </div>
      </div>

      {/* 📝 Registration Form */}
      <div id="register" className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Secure Your Spot</h2>

          {submitStatus.type && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                submitStatus.type === 'success'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {submitStatus.message}
            </div>
          )}

          {/* ✅ Form Fields */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name<span className="text-red-600 text-sm">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="John Doe"
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-700"
              />
            </div>

            {/* Age, Gender, Contact, etc... (same as before) */}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-4 rounded-full transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Processing...' : 'Secure My Spot'}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
