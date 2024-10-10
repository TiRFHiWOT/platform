import { motion } from "framer-motion";
import Link from "next/link";
import { FiCalendar, FiShoppingCart, FiMail, FiUserPlus } from "react-icons/fi";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const SideBar = ({ setIsOpen, scroll }) => {
  return (
    <motion.div
      initial={{ width: 0 }}
      animate={ !scroll? { width: "300px" }: {width: 0}}
      exit={{ width: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 right-0 h-[100vh] bg-teal-600 bg-opacity-50 backdrop-blur shadow-lg z-40 overflow-hidden"
    >
      <div className="w-full h-16 bg-black bg-opacity-50 flex items-center">
        <h1 className="text-xl font-semibold tracking-wider pl-6">
          Local Events...
        </h1>
      </div>
      <div className="flex flex-col py-5">
        <Link href="/events">
          <div
            className="flex items-center text-white hover:bg-gray-900 hover:bg-opacity-50 px-8 py-2.5 transition duration-200"
            onClick={() => setIsOpen(false)}
          >
            <FiCalendar className="mr-4" />
            Find Events
          </div>
        </Link>
        <Link href="/createEvent">
          <div
            className="flex items-center text-white hover:bg-gray-900 hover:bg-opacity-50 px-8 py-2.5 transition duration-200"
            onClick={() => setIsOpen(false)}
          >
            <FiShoppingCart className="mr-4" />
            Create Events
          </div>
        </Link>
        <Link href="/inviteMembers">
          <div
            className="flex items-center  text-white hover:bg-gray-900 hover:bg-opacity-50 px-8 py-2.5 transition duration-200"
            onClick={() => setIsOpen(false)}
          >
            <FiShoppingCart className="mr-4" />
            Invite Members
          </div>
        </Link>
        <Link href="/contact">
          <div
            className="flex items-center text-white hover:bg-gray-900 hover:bg-opacity-50 px-8 py-2.5 transition duration-200"
            onClick={() => setIsOpen(false)}
          >
            <FiMail className="mr-4" />
            Contact
          </div>
        </Link>
        <Link href="/signup">
          <div
            className="flex items-center bg-red-700 text-gray-200 shadow-2xl hover:bg-yellow-600 px-3 mx-6 w-fit py-2.5 rounded-lg text-base font-bold transition duration-200"
            onClick={() => setIsOpen(false)}
          >
            <FiUserPlus className="mr-2" />
            Join Now
          </div>
        </Link>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mt-6 px-6 py-4 flex items-center justify-center space-x-4 bg-black bg-opacity-50"
        >
          <Link
            href="https://facebook.com"
            target="_blank"
            aria-label="Facebook"
          >
            <FaFacebook
              className="text-blue-600 hover:text-blue-700 transition-transform transform hover:scale-110"
              size={30}
            />
          </Link>
          <Link href="https://twitter.com" target="_blank" aria-label="Twitter">
            <FaTwitter
              className="text-blue-400 hover:text-blue-500 transition-transform transform hover:scale-110"
              size={30}
            />
          </Link>
          <Link
            href="https://instagram.com"
            target="_blank"
            aria-label="Instagram"
          >
            <FaInstagram
              className="text-pink-600 hover:text-pink-700 transition-transform transform hover:scale-110"
              size={30}
            />
          </Link>
          <Link
            href="https://linkedin.com"
            target="_blank"
            aria-label="LinkedIn"
          >
            <FaLinkedin
              className="text-blue-800 hover:text-blue-900 transition-transform transform hover:scale-110"
              size={30}
            />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SideBar;
