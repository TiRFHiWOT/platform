import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import SideBar from "../SideBar/page";
import NavLinks from "../NavLinks/page";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scroll, setScroll] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHomePage = router.pathname === "/";

  return (
    <nav
      className={`${
        isHomePage ? "fixed top-0" : ""
      } right-0 w-full z-50 transition-all duration-300 text-white ${
        isHomePage && !scroll && "bg-transparent"
      } ${isHomePage && scroll && "bg-gray-900 bg-opacity-70 backdrop-blur"} ${
        !isHomePage && "bg-white border-b border-gray-200"
      }`}
    >
      <NavLinks scroll={scroll} isOpen={isOpen} setIsOpen={setIsOpen} />
      {isOpen && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          transition={{ duration: 0.3 }}
          className="bg-gray-800"
        >
          {isOpen && (
            <>
              <div
                className="fixed inset-0 bg-black opacity-30 z-40"
                onClick={() => setIsOpen(false)}
              />
              <SideBar setIsOpen={setIsOpen} scroll={scroll} />
            </>
          )}
        </motion.div>
      )}
    </nav>
  );
}
