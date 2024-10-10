import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const Logo = ({ scroll }) => {
  return (
    <motion.div
      className="flex-shrink-0 "
      initial={{ scale: 1, opacity: 1, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Link href="/" passHref>
        {scroll ? (
          <Image
            alt="logo"
            className=""
            src="/25.png"
            width={200}
            height={200}
          />
        ) : (
          <Image
            alt="logo"
            className=""
            src="/24.png"
            width={200}
            height={200}
          />
        )}
      </Link>
    </motion.div>
  );
};

export default Logo;
