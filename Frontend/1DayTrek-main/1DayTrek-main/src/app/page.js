'use client';
import Footer from '@/component/footer';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import VideoTestimonial from '@/component/video.js';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect } from 'react';
import { ArrowLeftCircle, ArrowRightCircle, Star } from 'lucide-react';
import dynamic from "next/dynamic";
import { Menu, X } from "lucide-react";

//swiper
export default function TrekRegistration() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const VideoTestimonials = dynamic(
    () => import("@/component/video.js"),
    { ssr: false }
  );

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

  const testimonials = [
    {
      name: "Ms. Aaradhana",
      text: "Tirth Ghumo made our Panchmarhi friend trip completely hassle free and smooth. Food, accomodation and travel was perfectly arranged. Truely a stress-free experience.",
      image: "/reviews/thumbnail1.jpg",
      highlight: false,
      rating: 5,
    },
    {
      name: "Mr. Vatsal",
      text: "Had an amzing time with Tirth Ghumo. Every moment was full of fun and excitement. From delicious food to thrilling adventures, everything was perfectly on track and made  the trip truly unforgettable.",
      image: "/reviews/thumbnail2.jpg",
      highlight: false,
      rating: 5,
    },
    {
      name: "Ms. Shruti",
      text: "I had been thinking of taking a break for a long time. Thank you, Tirth Ghumo, for making it happen. Created memories that will last a lifetime.",
      image: "/reviews/thumbnail3.jpg",
      highlight: false,
      rating: 5,
    },
    {
      name: "Mr. Adarsh",
      text: "Everything went so smoothly with Tirth Ghumo. It truly felt less like a trip with a company and more like a journey with friends. The comfort, care, and vibe made the whole experience unforgettable.",
      image: "/reviews/thumbnail4.jpg",
      highlight: false,
      rating: 5,
    },
    {
      name: "Ms. Sakshi",
      text: "Amazing experience with Tirth Ghumo! Professional, knowledgeable and friendly team. Perfectly curated itinerary and unforgettable memories.",
      image: "/reviews/thumbnail5.jpg",
      highlight: false,
      rating: 5,
    },
    {
      name: "Mr. Sagar & Mrs.Komal",
      text: "Our first trip after marriage couldn't have been more perfect! Panchmarhi's scenic beauty, the adventures, and Tirth Ghumo's well-planned itinerary made everything smooth and stress-free. A big thanks to the team for adding a friendly, homely vibe that made our journey even more special.",
      image: "/reviews/thumbnail6.jpg",
      highlight: false,
      rating: 5,
    },
  ];


  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    type: null,
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    if (typeof window !== "undefined") {
  localStorage.setItem('RegistrationFormData', JSON.stringify(formData));
}

    router.push('/payment');
  };

  //carousel 
  const [emblaRefGallery, emblaApiGallery] = useEmblaCarousel({ loop: false, align: "start" });
  const [emblaRefTestimonials, emblaApiTestimonials] = useEmblaCarousel({ loop: false, align: "start" });



  const scrollPrevGallery = useCallback(() => {
    if (emblaApiGallery) emblaApiGallery.scrollPrev();
  }, [emblaApiGallery]);

  const scrollNextGallery = useCallback(() => {
    if (emblaApiGallery) emblaApiGallery.scrollNext();
  }, [emblaApiGallery]);


  const scrollPrevTestimonials = useCallback(() => {
    if (emblaApiTestimonials) emblaApiTestimonials.scrollPrev();
  }, [emblaApiTestimonials]);

  const scrollNextTestimonials = useCallback(() => {
    if (emblaApiTestimonials) emblaApiTestimonials.scrollNext();
  }, [emblaApiTestimonials]);

  // Scroll sideways
  useEffect(() => {
    if (!emblaApiGallery) return;

    const node = emblaApiGallery.containerNode();

    const handleWheel = (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        e.deltaX > 0 ? emblaApiGallery.scrollNext() : emblaApiGallery.scrollPrev();
      }
    };

    node.addEventListener("wheel", handleWheel, { passive: false });

    return () => node.removeEventListener("wheel", handleWheel);
  }, [emblaApiGallery]);

  useEffect(() => {
    if (!emblaApiTestimonials) return;

    const node = emblaApiTestimonials.containerNode();

    const handleWheel = (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        e.deltaX > 0 ? emblaApiTestimonials.scrollNext() : emblaApiTestimonials.scrollPrev();
      }
    };

    node.addEventListener("wheel", handleWheel, { passive: false });

    return () => node.removeEventListener("wheel", handleWheel);
  }, [emblaApiTestimonials]);


  const gallery = [
    {
      src: "/trek/bhojpur.jpg",
      title: "Bhojpur",
      desc: "A historical site with ancient temple.",
    },
    {
      src: "/trek/TheAscent1.jpg",
      title: "The Ascent",
      desc: "A challenging climb with rewarding views.",
    },
    {
      src: "/trek/riverside.jpg",
      title: "Riverside",
      desc: "Discover the local nature.",
    },
    {
      src: "/trek/summit.jpg",
      title: "Summit Success",
      desc: "Celebrating the achievement together.",
    },
    {
      src: "/trek/summit.jpg",
      title: "Summit Success",
      desc: "Celebrating the achievement together.",
    },
    {
      src: "/trek/summit.jpg",
      title: "Summit Success",
      desc: "Celebrating the achievement together.",
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-t to-amber-100 via-orange-50 from-white overflow-hidden ">


      <nav className="w-full h-16 fixed top-0 left-0 z-50 bg-gradient-to-r from-white/80 via-amber-50/70 to-orange-100/70 backdrop-blur-md shadow-sm border-b border-orange-200">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-full relative">


          <div className="flex items-center space-x-3">
            <Image
              src="/logo.png"
              alt="Tirth Ghumo Logo"
              width={200}
              height={60}
              className="rounded-xl hover:scale-105 transition-transform duration-300"
              
            />
          </div>


          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex items-center space-x-8 text-gray-700 font-semibold text-sm md:text-base">
              <a href="https://tirthghumo.in/" className="hover:text-orange-600 transition-colors">
                Home
              </a>
              <a href="#register"  className="hover:text-orange-600 transition-colors">
                Register
              </a>
              <a href="#about" className="hover:text-orange-600 transition-colors">
                About
              </a>
              <a href="#contact" className="hover:text-orange-600 transition-colors">
                Contact
              </a>
            </div>
          </div>


          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-700 focus:outline-none"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="md:hidden bg-gradient-to-b from-white/90 to-amber-100/80 backdrop-blur-md shadow-md border-t border-orange-200">
            <div className="flex flex-col items-center py-4 space-y-4 text-gray-700 font-semibold text-base">
              <a
                href="https://tirthghumo.in/"
                className="hover:text-orange-600 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="#register"
                className="hover:text-orange-600 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </a>
              <a
                href="#about"
                className="hover:text-orange-600 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                About
              </a>
              <a
                href="#contact"
                className="hover:text-orange-600 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </nav>
      {/* <div className="fixed inset-0 -z-10">
        <Image
          src="/trek/bg.png"
          alt="Mountain background"
          fill
          priority
          className="object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-orange-200/30 mix-blend-overlay" />
      </div> */}


      <div className="relative z-10">
        {/* Hero Section */}
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

        {/* About The Trek */}
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 mb-10 text-center relative">
            About the Trek
            <span className="block w-20 h-1 bg-gradient-to-r from-orange-400 to-amber-300 mx-auto mt-3 rounded-full"></span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: "🗺️", title: "Destination", desc: "Just 70km from Bhopal" },
              { icon: "⛰️", title: "Difficulty", desc: "Intermediate (6km Trek)" },
              { icon: "⏱️", title: "Duration", desc: "8 Hours of fun & exploration" },
              { icon: "⭐", title: "Highlights", desc: "Panoramic Views, Riverside, Waterfall" },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm">
                <div className="text-2xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>


        {/* 🗓️ Itinerary Section */}
        <section className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 mb-10 text-center relative">
            Trek Itinerary
            <span className="block w-20 h-1 bg-gradient-to-r from-orange-400 to-amber-300 mx-auto mt-3 rounded-full"></span>
          </h2>


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "AC Traveller Ride",
                desc: "Comfortable AC bus from Bhopal to Bhojpur ensuring a relaxed and scenic journey.",
                icon: "🚌",
              },

              {
                title: "Sightseeing & Exploration",
                desc: "Explore Bhojpur’s ancient temples and scenic trails as per the planned route.",
                icon: "🗺️",
              },
              {
                title: "Breakfast at Bhojpur",
                desc: "Start your day with a delicious complimentary breakfast amidst serene surroundings.",
                icon: "🍳",
              },
              {
                title: "Fun Games & Group Activities",
                desc: "Bond with fellow trekkers through fun outdoor games and team-building sessions.",
                icon: "🎯",
              },
              {
                title: "Refreshing Drinks at Trek",
                desc: "Stay energized with cool refreshments and light snacks at the trek location.",
                icon: "🥤",
              },
              {
                title: "Maggie by the Riverside",
                desc: "Enjoy a comforting bowl of maggie with a riverside view — a trekker’s delight!",
                icon: "🍜",
              },
              {
                title: "Campfire Cooking",
                desc: "End the adventure with a cozy campfire and live cooking experience.",
                icon: "🔥",
              },
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



        {/* Glimpses from the Trail */}
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 mb-10 text-center relative">
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
            <button
              onClick={scrollPrevGallery}
              className="w-12 h-12 bg-orange-400 rounded-full hover:bg-orange-300 flex items-center justify-center"
            >
              <ArrowLeftCircle size={30} className="text-white" />
            </button>
            <button
              onClick={scrollNextGallery}
              className="w-12 h-12 bg-orange-400 rounded-full hover:bg-orange-300 flex items-center justify-center"
            >
              <ArrowRightCircle size={30} className="text-white" />
            </button>
          </div>
        </div>

        {/* Testimonials Section */}
        <section className="w-full py-16 px-4 mt-17 md:px-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 mb-10 text-center relative">
            What our Trekkers say
            <span className="block w-20 h-1 bg-gradient-to-r from-orange-400 to-amber-300 mx-auto mt-3 rounded-full"></span>
          </h2>


          <div className="overflow-hidden w-full" ref={emblaRefTestimonials}>
            <div className="flex gap-6 sm:gap-10 md:gap-16 px-2 sm:px-6">
              {testimonials.map((person, index) => (
                <div
                  key={index}
                  className="
            flex-[0_0_95%] sm:flex-[0_0_70%] md:flex-[0_0_30%]
            bg-white rounded-2xl p-6 shadow-md
            hover:scale-105 transition-transform duration-300 my-4
          "
                >

                  <div className="flex flex-col items-center text-center mb-4">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-orange-200 shadow-md">
                      <Image
                        src={person.image}
                        alt={person.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-blue-900 text-lg md:text-xl font-bold mt-3">
                      {person.name}
                    </h3>
                  </div>

                  <div className="flex items-center justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={
                          i < person.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>


                  <p className="text-gray-600 text-sm md:text-base font-medium text-center leading-relaxed">
                    “{person.text}”
                  </p>
                </div>
              ))}
            </div>
          </div>



          {/* Testimonial Controls */}
          <div className="flex justify-center mt-8 gap-4">
            <button
              onClick={scrollPrevTestimonials}
              className="
        w-10 h-10 sm:w-12 sm:h-12
        rounded-full bg-orange-400 hover:bg-orange-300
        flex items-center justify-center
        transition-transform hover:scale-110
      "
            >
              <ArrowLeftCircle size={24} className="text-white sm:size-30" />
            </button>

            <button
              onClick={scrollNextTestimonials}
              className="
        w-10 h-10 sm:w-12 sm:h-12
        rounded-full bg-orange-400 hover:bg-orange-300
        flex items-center justify-center
        transition-transform hover:scale-110
      "
            >
              <ArrowRightCircle size={24} className="text-white sm:size-30" />
            </button>
          </div>
        </section>


        {/* Registration Form */}
        <div id="register" className="max-w-3xl mx-auto px-4 py-16">
          <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Secure Your Spot</h2>

            {submitStatus.type && (
              <div
                className={`mb-6 p-4 rounded-lg ${submitStatus.type === 'success'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
                  }`}
              >
                {submitStatus.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name<span className='text-red-600 text-sm'>*</span>
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

              {/* Age & Gender */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age & Gender<span className='text-red-600 text-sm'>*</span>
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    placeholder="Age"
                    required
                    min="5"
                    max="100"
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    &nbsp;
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-700"
                  >
                    <option value="">Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
              </div>

              {/* Contact Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Number<span className='text-red-600 text-sm'>*</span>
                </label>
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  placeholder="946589XXXX"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-700"
                />
              </div>

              {/* Emergency Contact */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Whatsapp Number <span className='text-red-600 text-sm'>*</span>
                </label>
                <input
                  type="text"
                  name="whatsappNumber"
                  value={formData.whatsappNumber}
                  onChange={handleInputChange}
                  placeholder="946589XXXX"
                  maxLength={10}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-700"
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address<span className='text-red-600 text-sm'>*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-700"
                />
              </div>

              {/* College Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  College Name
                </label>
                <input
                  type="text"
                  name="collegeName"
                  value={formData.collegeName}
                  onChange={handleInputChange}
                  placeholder="University of Adventure"
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-700"
                />
              </div>

              {/* Pick Up & Drop Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pick Up Location<span className='text-red-600 text-sm'>*</span>
                  </label>
                  <select
                    name="pickUpLocation"
                    value={formData.pickUpLocation}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-700"
                  >
                    <option value="">Select pick up point</option>
                    <option value="LNCT , Raisen Road">LNCT , Raisen Road</option>
                    <option value="Siddharth Lake City">Siddharth Lake City</option>
                    <option value="Anand Nagar">Anand Nagar</option>
                    <option value="Ratnagiri">Ratnagiri</option>
                    <option value="Piplani Petrol Pump">Piplani Petrol Pump</option>
                    <option value="Indrapuri BHEL GATE">Indrapuri BHEL GATE</option>
                    <option value="Jyoti Talkies , M.P.Nagar">Jyoti Talkies , M.P.Nagar</option>
                    <option value="Rani Kamlapati Station">Rani Kamlapati Station</option>

                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Drop Location<span className='text-red-600 text-sm'>*</span>
                  </label>
                  <select
                    name="dropLocation"
                    value={formData.dropLocation}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-700"
                  >
                    <option value="">Select pick up point</option>
                    <option value="LNCT , Raisen Road">LNCT , Raisen Road</option>
                    <option value="Siddharth Lake City">Siddharth Lake City</option>
                    <option value="Anand Nagar">Anand Nagar</option>
                    <option value="Ratnagiri">Ratnagiri</option>
                    <option value="Piplani Petrol Pump">Piplani Petrol Pump</option>
                    <option value="Indrapuri BHEL GATE">Indrapuri BHEL GATE</option>
                    <option value="Jyoti Talkies , M.P.Nagar">Jyoti Talkies , M.P.Nagar</option>
                    <option value="Rani Kamlapati Station">Rani Kamlapati Station</option>
                  </select>
                </div>
              </div>

              {/* Meal options */}

              <div>
                <label className=" block text-sm font-medium text-gray-700 mb-2 ">
                  Meal Preference<span className='text-red-600 text-sm'>*</span>
                </label>
                <select
                  name='mealPreference'
                  value={formData.mealPreference}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-700"
                >
                  <option value="">Select meal preference</option>
                  <option value="Yes">Meal</option>
                  <option value="No">No Meal</option>
                </select>
              </div>

              {/* Trek Experience Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Trek Experience Level<span className='text-red-600 text-sm'>*</span>
                </label>
                <select
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-700"
                >
                  <option value="">Select your experience</option>
                  <option value="beginner">Beginner - First time trekker</option>
                  <option value="intermediate">Intermediate - Done a few treks</option>
                  <option value="advanced">Advanced - Experienced trekker</option>
                  <option value="expert">Expert - Professional level</option>

                </select>
              </div>

              {/* Additional Comments */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Medical Details
                </label>
                <textarea
                  name="medicalDetails"
                  value={formData.medicalDetails}
                  onChange={handleInputChange}
                  placeholder="Any medical conditions or allergies?"
                  rows={2}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-700"
                />
              </div>

              {/* Payment Details */}
              {/* <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <h3 className="font-bold text-gray-800 mb-3">Payment Details</h3>
              <p className="text-gray-600 text-sm mb-3">
                You will be redirected to our secure payment partner after clicking the button below.
              </p>
              <p className="text-2xl font-bold text-gray-800">Total: $99.00</p>
            </div> */}
              <div>

              </div>
              {/* Submit Button */}
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
        <VideoTestimonials />
        <Footer />
      </div>
    </div >
  );
}
