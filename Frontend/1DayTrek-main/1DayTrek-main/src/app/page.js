'use client';
import Footer from '@/component/footer';
import {useRouter} from 'next/navigation';
import { useState } from 'react';

export default function TrekRegistration() {
  const router = useRouter();
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
    experienceLevel: '',
    medicalDetails: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    type: null,
    message: ''
  });

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev, 
            [name]: value
        }));
    };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    localStorage.setItem('RegistrationFormData', JSON.stringify(formData));
    router.push('/payment');
  };

  return (
    <div className="min-h-screen bg-[#f5f1e8]">
      {/* Hero Section */}
      <div className="relative h-[400px] rounded-3xl mx-4 mt-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
        <img
          src="/trek/1Day (3).jpg"
          alt="Mountain landscape at sunrise"
          className="w-full h-full object-cover object-[center_-500px] "
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-5xl font-bold mb-3">1 Day Adventure Trek</h1>
          <p className="text-lg mb-6">November 9, 2025 | Join the Adventure</p>
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
        <h2 className="text-3xl font-bold text-gray-800 mb-8">About The Trek</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="text-2xl mb-3">🗺️</div>
            <h3 className="font-bold text-gray-800 mb-2">Destination</h3>
            <p className="text-gray-600 text-sm">70km from Bhopal</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="text-2xl mb-3">⛰️</div>
            <h3 className="font-bold text-gray-800 mb-2">Difficulty</h3>
            <p className="text-gray-600 text-sm">Intermediate (6km Trek)</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="text-2xl mb-3">⏱️</div>
            <h3 className="font-bold text-gray-800 mb-2">Duration</h3>
            <p className="text-gray-600 text-sm">8 Hours</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="text-2xl mb-3">⭐</div>
            <h3 className="font-bold text-gray-800 mb-2">Highlights</h3>
            <p className="text-gray-600 text-sm">Panoramic Views, Waterfall</p>
          </div>
        </div>
      </div>

      {/* Glimpses from the Trail */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Glimpses from the Trail</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 ">
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src="/trek/bhojpur.jpg"
              alt="The Ascent"
              className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
            />
            <div className="bg-white h-full p-4">
              <h3 className="font-bold text-gray-800 mb-1">Bhojpur</h3>
              <p className="text-gray-600 text-sm">A historical site with ancient temple.</p>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80"
              alt="Serenity Lake"
              className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
            />
            <div className="bg-white p-4 h-full">
              <h3 className="font-bold text-gray-800 mb-1">The Ascent</h3>
              <p className="text-gray-600 text-sm">A challenging climb with rewarding views.</p>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src="/trek/riverside.jpg"
              alt="Riverside"
              className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300 "
            />
            <div className="bg-white p-4 h-full">
              <h3 className="font-bold text-gray-800 mb-1">Riverside</h3>
              <p className="text-gray-600 text-sm">Discover the local nature.</p>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src="/trek/summit.jpg"
              alt="Summit Success"
              className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300 "
            />
            <div className="bg-white p-4 h-full">
              <h3 className="font-bold text-gray-800 mb-1">Summit Success</h3>
              <p className="text-gray-600 text-sm">Celebrating the achievement together.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Form */}
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
                maaxlength={10}
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
                <option value="I can do 6km Trek">I can do 6km Trek</option>

              </select>
            </div>

            {/* Additional Comments */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Medical Details
              </label>
              <textarea
                name="additionalComments"
                value={formData.additionalComments}
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

      {/* Footer */}
      {/* <footer className="bg-white py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex justify-center space-x-6 mb-4">
            <a href="mailto:contact@sunrisepeak.com" className="text-gray-600 hover:text-gray-800">
              contact@sunrisepeak.com
            </a>
            <span className="text-gray-400">|</span>
            <a href="tel:+15555873569" className="text-gray-600 hover:text-gray-800">
              +1 (555) TREK-NOW
            </a>
          </div>
          <div className="flex justify-center space-x-4">
            <a href="#" className="text-gray-600 hover:text-gray-800">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
                <path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
              </svg>
            </a>
          </div>
        </div>
      </footer> */}
      <Footer />
    </div>
  );
}