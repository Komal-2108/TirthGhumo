"use client";

import { FaWhatsapp,FaFacebook, FaLinkedin, FaInstagram, FaPhone } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-gradient-to-b from-white to-[#f6e8bb] border-t-white py-12 md:px-3 text-gray-800">
            <div className="flex justify-between flex-col md:flex-row md:items-start md:gap-50 px-8 md:px-14">

                {/* Company Info */}
                <div className="w-full  mb-10 md:mb-0 flex flex-col items-center ">
                    <p className="text-[16px] md:w-lg leading-relaxed text-center font-sans italic">
                        At <span className="font-bold italic">Tirth Ghumo</span>, we believe every journey should reflect our motto —{" "}
                        <span className="font-bold italic">Aastha Bhi, Suvidha Bhi.</span> As a trusted travel agency, we organize hassle-free
                        spiritual tours designed for your comfort and peace of mind. With{" "}
                        <span className="font-bold">800+ happy travelers</span>, we’re committed to making every trip a meaningful and memorable
                        experience.
                    </p>

                    {/* Social Icons */}
                    <div className="flex items-center space-x-5 mt-8">
                        <a href="#" className="bg-[#ffffff] p-3 rounded-full hover:bg-yellow-500 transition text-yellow-500 hover:text-[#ffffff] ">
                            <FaInstagram size={18} className="" />
                        </a>
                        <a href="#" className="bg-[#ffffff] p-3 rounded-full hover:bg-yellow-500 transition text-yellow-500 hover:text-[#ffffff]">
                            <FaWhatsapp size={18} className="" />
                        </a>
                        <a href="#" className="bg-[#ffffff] p-3 rounded-full hover:bg-yellow-500 transition text-yellow-500 hover:text-[#ffffff]">
                            <FaFacebook size={18} className="" />
                        </a>
                        <a href="#" className="bg-[#ffffff] p-3 rounded-full hover:bg-yellow-500 transition text-yellow-500 hover:text-[#ffffff]">
                            <FaLinkedin size={18} className="" />
                        </a>
                        <a href="#" className="bg-[#ffffff] p-3 rounded-full hover:bg-yellow-500 transition text-yellow-500 hover:text-[#ffffff]">
                            <FaPhone size={18} className="" />
                        </a>
                    </div>
                </div>

                <div className=" flex md:flex-col w-full  md:gap-40 justify-between lg:flex-row ">
                    {/* Informations */}
                    <div>
                        <h3 className="font-bold mb-5 text-gray-900">Informations</h3>
                        <ul className="space-y-4 text-sm">
                            <li><a href="#" className="hover:text-yellow-600 font-san font-semibold ">About Us</a></li>
                            <li><a href="#" className="hover:text-yellow-600 font-san font-semibold">Blog</a></li>
                            <li><a href="#" className="hover:text-yellow-600 font-san font-semibold">Testimonial</a></li>
                        </ul>
                    </div>

                    {/* Helpful Links */}
                    <div className="md:w-30 ">
                        <h3 className="font-bold mb-5 text-gray-900 ">Helpful Links</h3>
                        <ul className="space-y-4 text-sm">
                            <li><a href="#" className="hover:text-yellow-600 font-san font-semibold">Careers</a></li>
                            <li><a href="#" className="hover:text-yellow-600 font-san font-semibold">Supports</a></li>
                            <li><a href="#" className="hover:text-yellow-600 font-san font-semibold">T&Cs</a></li>
                        </ul>
                    </div>

                    {/* Our Services */}
                    <div className="md:w-30">
                        <h3 className="font-bold mb-5 text-gray-900">Our Services</h3>
                        <ul className="space-y-4 text-sm ">
                            <li><a href="#" className="hover:text-yellow-600 font-san font-semibold">Photography</a></li>

                            
                            <li>
                                <a
                                    href="#"
                                    className="inline-block text-gray-900 hover:text-yellow-600 font-san font-semibold transition"
                                >
                                    Support 24/7
                                </a>
                            </li>

                            <li><a href="#" className="hover:text-yellow-600 font-san font-semibold">Packages</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}
