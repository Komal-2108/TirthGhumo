'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import { Menu, X } from "lucide-react";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function PaymentPage() {
    const router = useRouter();
    const [formData, setFormData] = useState(null);
    const [screenshot, setScreenshot] = useState(null);
    const [acknowledged, setAcknowledged] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    useEffect(() => {
        const savedData = localStorage.getItem('RegistrationFormData');
        if (savedData) {
            setFormData(JSON.parse(savedData));
        } else {
            router.replace('/');
        }

        const handleBeforeUnload = () => {
            localStorage.removeItem('RegistrationFormData');
        };

        const handlePopState = () => {
            localStorage.removeItem('RegistrationFormData');
            router.replace('/');
        };

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden') {
                localStorage.removeItem('RegistrationFormData');
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        window.addEventListener('popstate', handlePopState);
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            window.removeEventListener('popstate', handlePopState);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [router]);


    const handleFileChange = (e) => {
        setScreenshot(e.target.files[0]);
    };

    const handleSubmit = async () => {
        if (!acknowledged) {
            alert('Please check the acknowledgement box before submitting.');
            return;
        }

        if (!screenshot) {
            alert('Please upload your payment screenshot.');
            return;
        }

        setIsSubmitting(true);

        const data = new FormData();
        // data.append('payment_screenshot', screenshot);
        // data.append('form_data', JSON.stringify(formData));
        data.append('full_name', formData.fullName);
        data.append('email_address', formData.email);
        data.append('age', formData.age);
        data.append('gender', formData.gender);
        data.append('contact_number', formData.contactNumber);
        data.append('whatsapp_number', formData.whatsappNumber);
        data.append('college_name', formData.collegeName);
        data.append('pick_up_loc', formData.pickUpLocation);
        data.append('drop_loc', formData.dropLocation);
        data.append('meal_preference', formData.mealPreference);
        data.append('trip_exp_level', formData.experienceLevel);
        data.append('medical_details', formData.medicalDetails);
        data.append('agree', 'true');
        data.append('payment_screenshot', screenshot, screenshot.name);

        try {
            const response = await fetch(`${API_URL}/odt_booking`, {
                method: 'POST',
                body: data,
            });
            
            if (response.ok) {
                alert('Registration complete!');
                localStorage.removeItem('RegistrationFormData');
                sessionStorage.setItem('paymentSuccess', 'true'); // to handle direct access to success page
                router.push('/success');
            } else {
                alert('Failed to submit data. Please try again.');
            }
        } catch (error) {
            alert('Network error while sending data to backend.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!formData) return <p className="text-center p-8">Loading...</p>;

    return (
        <div className="min-h-screen bg-[#FFFDF9] py-12 px-4 sm:px-6 lg:px-8">
            {/* Navbar */}
            <nav className="w-full h-16 fixed top-0 left-0 z-50 bg-gradient-to-r from-white/80 via-amber-50/70 to-orange-100/70 backdrop-blur-md shadow-sm border-b border-orange-200">
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-full relative">

                    {/* Logo (Always visible) */}
                    <div className="flex items-center space-x-3">
                        <Image
                            src="/logo.png"
                            alt="Tirth Ghumo Logo"
                            width={160}
                            height={60}
                            className="rounded-xl hover:scale-105 transition-transform duration-300"
                        />
                    </div>

                    {/* Centered Navigation Links (Hidden on mobile) */}
                    <div className="hidden md:flex flex-1 justify-center">
                        <div className="flex items-center space-x-8 text-gray-700 font-semibold text-sm md:text-base">
                            <a href="https://tirthghumo.in/" className="hover:text-orange-600 transition-colors">
                                Home
                            </a>
                            <a href="#register" className="hover:text-orange-600 transition-colors">
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

                    {/* Hamburger Button (Visible on mobile) */}
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
            <div className="max-w-5xl mx-auto mt-10">
                <h1 className="text-3xl font-extrabold text-center text-[#1C1C1E]">
                    Almost There!
                </h1>
                <p className="text-center text-gray-500 mt-2">
                    Please review your details and complete the payment to secure your spot.
                </p>

                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* LEFT COLUMN - SUMMARY */}
                    <div className="bg-white rounded-2xl shadow border border-gray-100 p-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Registration Summary</h2>
                        <div className="space-y-4 text-lg text-gray-700">
                            <div className="grid grid-cols-2 gap-y-5">
                                <p><strong>Full Name</strong><br />{formData.fullName}</p>
                                <p><strong>Email Address</strong><br />{formData.email}</p>

                                <p><strong>Contact Number</strong><br />{formData.contactNumber}</p>
                                <p><strong>Whatsapp Number</strong><br />{formData.whatsappNumber}</p>

                                <p><strong>Age & Gender</strong><br />{formData.age}, {formData.gender}</p>
                                <p><strong>College Name</strong><br />{formData.collegeName}</p>

                                <p><strong>Pick Up Location</strong><br />{formData.pickUpLocation}</p>
                                <p><strong>Drop Location</strong><br />{formData.dropLocation}</p>

                                <p><strong>Meal Preference</strong><br />{formData.mealPreference || '—'}</p>
                                <p><strong>Trek Experience</strong><br />{formData.experienceLevel}</p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN - PAYMENT */}
                    <div className="bg-white rounded-2xl shadow border border-gray-100 p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Complete Your Payment</h2>
                        <p className="text-sm text-gray-500 mb-4">
                            Scan the QR code using any UPI app.
                        </p>

                        {/* QR IMAGE */}
                        <div className="flex flex-col justify-center items-center mb-6 ">
                            <a href='/payment/QR.jpg' download="TirthGhumo_QR.jpg" >
                                <Image
                                    src="/payment/QR.jpg"
                                    alt="QR Code"
                                    width={240}
                                    height={240}
                                    className="rounded-lg shadow-xl hover:scale-105 transition-transform duration-300"
                                />

                            </a>
                            <p className="text-lg text-gray-500 mt-5 underline ">UPI ID : 6204289831@ybl</p>
                            {/* Download QR */}
                            <a
                                href="/payment/QR.jpg" download="TirthGhumo_QR.jpg" className='mt-4 inline-block text-lg text-blue-600 hover:underline'
                            >
                                Download QR
                            </a>
                        </div>

                        {/* FILE UPLOAD */}
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Upload Payment Screenshot
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center mb-4">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                                id="upload"
                            />
                            <label htmlFor="upload" className="cursor-pointer text-green-700 font-medium">
                                Click to upload
                            </label>
                            {screenshot && (
                                <p className="mt-2 text-sm text-gray-500">
                                    ✅ {screenshot.name}
                                </p>
                            )}
                            <p className="text-xs text-gray-400 mt-1">PNG, JPG, or JPEG</p>
                        </div>

                        {/* ACKNOWLEDGEMENT */}
                        <div className="flex items-start mb-6">
                            <input
                                type="checkbox"
                                checked={acknowledged}
                                onChange={(e) => setAcknowledged(e.target.checked)}
                                className="mt-1 mr-2"
                            />
                            <label className="text-sm text-black font-bold">
                                Our team will do everything to ensure you have a memorable trip. In case of unforeseen weather conditions , unavoidable circumstances or cancellation from your side , refunds cannot be provided. Thank you for your kind understanding. 🌿✨ Acknowledgement : Travel date : 9th Nov  I understand and agree to the above terms with love & respect.

                            </label>
                        </div>

                        {/* SUBMIT BUTTON */}
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-full flex items-center justify-center gap-2 disabled:bg-gray-400"
                        >
                            {isSubmitting ? 'Submitting...' : ' Submit & Secure My Spot'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
