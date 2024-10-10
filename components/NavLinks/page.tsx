import Link from "next/link";
import React from "react";
import Logo from "../Logo/page";
import Toggle from "../ToggleButton/page";
import { FiUserPlus } from "react-icons/fi";

const NavLinks = ({ scroll, isOpen, setIsOpen }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
      <div className="flex justify-between items-center h-16">
        <Logo scroll={scroll} />

        <div className={`space-x-4 ${scroll ? "text-white flex" : "hidden"}`}>
          <Link href="/events">
            <div className="hover:bg-yellow-500 hover:text-gray-900 border border-transparent hover:border-gray-700 px-4 h-full transition duration-200 text-sm tracking-wider">
              Find Events
            </div>
          </Link>
          <Link href="/createEvent">
            <div className="hover:bg-yellow-500 hover:text-gray-900 border border-transparent hover:border-gray-700 px-4 h-full transition duration-200 text-sm tracking-wider">
              Create Events
            </div>
          </Link>
          <Link href="/inviteMembers">
            <div className="hover:bg-yellow-500 hover:text-gray-900 border border-transparent hover:border-gray-700 px-4 h-full transition duration-200 text-sm tracking-wider">
              Invite Members
            </div>
          </Link>
          <Link href="/contact">
            <div className="hover:bg-yellow-500 hover:text-gray-900 border border-transparent hover:border-gray-700 px-4 h-full transition duration-200 text-sm tracking-wider">
              Contact
            </div>
          </Link>
        </div>
        <Link href="/signup" className={`${!scroll && "hidden"}`}>
          <div
            className={` flex items-center bg-blue-700 text-gray-200 shadow-2xl hover:bg-blue-600 px-3 mx-6 w-fit py-2 rounded-lg text-base font-bold transition duration-500`}
            onClick={() => setIsOpen(false)}
          >
            <FiUserPlus className="mr-2 text-gray-300" size={20} />
            Join Now
          </div>
        </Link>

        <div
          className={`z-50 absolute top-[50%] translate-y-[-50%] right-10 ${
            scroll ? "hidden" : "flex"
          }`}
        >
          <Toggle isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>
    </div>
  );
};

export default NavLinks;
