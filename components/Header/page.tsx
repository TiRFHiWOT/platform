import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Switch } from "@headlessui/react";

export default function EnhancedNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Scroll effect for background change
  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scroll ? "bg-gray-100 text-gray-800" : "bg-transparent text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            className="flex-shrink-0"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link
              href="/"
              className={`flex items-center transition duration-300 ease-in-out transform hover:scale-105 hover:text-blue-600 ${
                scroll ? "text-gray-800" : "text-gray-100"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-yellow-500 hover:text-blue-600 transition duration-300 rotate-45"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2v20m10-10H2" />
                <path d="M5 12l7-7m0 14l7-7" />
              </svg>

              <span className=" text-xl font-extrabold tracking-wide transition duration-300">
                Cha.
                <span className="transition duration-300 ">Cha.</span>
                <span className="transition duration-300 ">Ta</span>
              </span>
            </Link>
          </motion.div>

          {/* Theme Toggle */}
          <div className="hidden absolute top-[50%] translate-y-[-50%] right-3 md:flex items-center rotate-90">
            <Switch
              checked={isDarkMode}
              onChange={setIsDarkMode}
              className={`${
                isDarkMode ? "bg-gray-200" : "bg-gray-800"
              } relative inline-flex items-center h-6 rounded-full w-11`}
            >
              <span
                className={`${
                  isDarkMode
                    ? "translate-x-6 bg-gray-800"
                    : "translate-x-1 bg-gray-200"
                } inline-block w-4 h-4 transform rounded-full transition-transform`}
              />
            </Switch>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/events">
              <div className=" hover:text-yellow-400 transition duration-200 text-lg font-medium">
                Events
              </div>
            </Link>
            <Link href="/marketplace">
              <div className=" hover:text-yellow-400 transition duration-200 text-lg font-medium">
                Marketplace
              </div>
            </Link>
            <Link href="/contact">
              <div className=" hover:text-yellow-400 transition duration-200 text-lg font-medium">
                Contact
              </div>
            </Link>

            {/* Call to Action Button */}
            <Link href="/signup">
              <div className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-md text-lg font-bold hover:bg-yellow-300 transition-all duration-200">
                Join Now
              </div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              {isOpen ? (
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
                    strokeWidth="2"
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
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-gray-800"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/events">
              <div
                className="block text-white hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                Events
              </div>
            </Link>
            <Link href="/marketplace">
              <div
                className="block text-white hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                Marketplace
              </div>
            </Link>
            <Link href="/contact">
              <div
                className="block text-white hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </div>
            </Link>
            {/* Call to Action Button */}
            <Link href="/signup">
              <div
                className="block bg-yellow-400 text-gray-900 hover:bg-yellow-300 px-3 py-2 rounded-md text-base font-bold"
                onClick={() => setIsOpen(false)}
              >
                Join Now
              </div>
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
