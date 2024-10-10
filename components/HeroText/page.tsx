import { motion } from "framer-motion";
import Link from "next/link";

const HeroText = () => {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 ps-28 pe-5"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-3xl sm:text-4xl lg:text-5xl mx-auto font-bold mb-4"
          style={{ lineHeight: "50px" }}
        >
          The simple platform—Where you find events & friendships
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="sm:text-md lg:text-lg mb-6 max-w-2xl mx-auto text-gray-700"
        >
          Stay connected with your community and explore unique products from
          local vendors.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-6 w-fit"
        >
          <Link href="/events">
            <div className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-md shadow-lg transition transform hover:scale-105">
              Explore Events
            </div>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroText;
