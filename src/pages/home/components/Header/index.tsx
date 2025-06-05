"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const headerStyle = {
        height: "90px",
        background:
            "linear-gradient(180deg, #383838 0%, rgba(56, 56, 56, 0) 94%)",
    };

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300`}
            style={headerStyle}
        >
            <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-full">
                <Image
                    src="/assets/image/Logo.png"
                    alt="logo"
                    width={150}
                    height={30}
                    className="cursor-pointer"
                    style={{
                        position: "absolute",
                        top: "-20px",
                        left: "160px",
                    }}
                />

                {/* Desktop Navigation */}
                <nav
                    className="hidden md:flex space-x-10"
                    style={{
                        marginLeft: "400px",
                    }}
                >
                    <Link
                        href="#"
                        className="text-white hover:text-orange-500 transition-colors"
                    >
                        Home
                    </Link>
                    <Link
                        href="#programs"
                        className="text-white hover:text-orange-500 transition-colors"
                    >
                        Programs
                    </Link>
                    <Link
                        href="#universities"
                        className="text-white hover:text-orange-500 transition-colors"
                    >
                        Universities
                    </Link>
                    <Link
                        href="#about"
                        className="text-white hover:text-orange-500 transition-colors"
                    >
                        About Us
                    </Link>
                    <Link
                        href="#contact"
                        className="text-white hover:text-orange-500 transition-colors"
                    >
                        Contact
                    </Link>
                </nav>

                <div className="hidden md:flex items-center space-x-4">
                    <Link
                        href="/login"
                        className="px-2 py-1 rounded-md  text-white transition-colors"
                    >
                        LOGIN
                    </Link>
                    <Link
                        href="/register"
                        className="px-2 py-1 border rounded-md text-white transition-colors"
                    >
                        REGISTER
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white focus:outline-none"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? (
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    ) : (
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-black bg-opacity-80 shadow-lg py-4">
                    <div className="flex flex-col space-y-4 px-6">
                        <Link
                            href="#"
                            className="text-white hover:text-orange-500 transition-colors py-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="#programs"
                            className="text-white hover:text-orange-500 transition-colors py-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Programs
                        </Link>
                        <Link
                            href="#universities"
                            className="text-white hover:text-orange-500 transition-colors py-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Universities
                        </Link>
                        <Link
                            href="#about"
                            className="text-white hover:text-orange-500 transition-colors py-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            About Us
                        </Link>
                        <Link
                            href="#contact"
                            className="text-white hover:text-orange-500 transition-colors py-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Contact
                        </Link>
                        <div className="flex flex-col space-y-3 pt-3 border-t border-gray-600">
                            <Link
                                href="/login"
                                className="px-4 py-2 text-center rounded-md border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-colors"
                            >
                                Log In
                            </Link>
                            <Link
                                href="/register"
                                className="px-4 py-2 text-center rounded-md bg-orange-500 text-white hover:bg-orange-600 transition-colors"
                            >
                                Register
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
