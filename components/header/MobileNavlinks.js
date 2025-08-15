import { motion } from "framer-motion";

import { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

const MobileNavlinks = ({ open, setOpen }) => {
  const [shopOpen, setShopOpen] = useState(false);

  const closeHandler = () => {
    setOpen(false);
    setShopOpen(false);
  };

  return (
    <>
      <motion.div
        className={
          open
            ? "bg-black top-0 left-0 h-[100vh] w-full absolute opacity-30 z-40"
            : "hidden"
        }
        onClick={closeHandler}
        initial={false}
        animate={open ? { opacity: 0.5 } : { opacity: 0 }}
        transition={{
          type: "tween",
        }}
      ></motion.div>
      <motion.div
        initial={{ left: "-100%" }}
        animate={open ? { left: 0 } : { left: "-100%" }}
        className="flex flex-col absolute  top-0 md:hidden gradient h-[100vh] text-white w-[300px] z-50"
      >
        <div className=" mt-8 flex flex-col">
          <div onClick={closeHandler} className="fill-white ml-auto pr-4 pb-6">
            <X />
          </div>

          <div className={`px-4`}>
            <Link href={"/"} className="text-white">
              <p
                onClick={closeHandler}
                className="py-4 border-b border-white/25"
              >
                HOME
              </p>
            </Link>

            <Link href={"/contact"} className="text-white">
              <p
                onClick={closeHandler}
                className="py-4 border-b border-white/25"
              >
                NEW POST +
              </p>
            </Link>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default MobileNavlinks;
