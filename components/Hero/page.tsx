import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center bg-gray-900 text-white">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/hero-background.jpg"
          alt="Hero Background"
          layout="fill"
          objectFit="cover"
          className="w-full h-full opacity-60"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-transparent to-gray-900 opacity-70"></div>

      {/* Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8"
      >
        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4"
        >
          Discover Local Events & Products
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-lg sm:text-xl lg:text-2xl mb-6 max-w-2xl mx-auto"
        >
          Stay connected with your community and explore unique products from
          local vendors.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-6 w-fit mx-auto"
        >
          <Link href="/events">
            <div className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-md shadow-lg transition transform hover:scale-105">
              Explore Events
            </div>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
