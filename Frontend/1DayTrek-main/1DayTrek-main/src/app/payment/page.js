'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PaymentPage() {
    const router = useRouter();
    const [formData, setFormData] = useState(null);
    const [screenshot, setScreenshot] = useState(null);
    const [acknowledged, setAcknowledged] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

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
            const response = await fetch("https://disciplined-forgiveness-production.up.railway.app/odt_booking",  {
                method: 'POST',
                body: data,
            });

            if (response.ok) {
                alert('Registration complete!');
                localStorage.removeItem('RegistrationFormData');
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
            <div className="max-w-5xl mx-auto">
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
                                <img
                                    src="/payment/QR.jpg"
                                    alt="QR Code"
                                    className="w-60 h-auto object-cover rounded-lg shadow-xl hover:scale-108 transition-transform duration-300 "

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
