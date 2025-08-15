"use client";
import Image from "next/image";
import { useState } from "react";
import BurgerButton from "./BurgerButton";
import { CirclePlus } from "lucide-react";
import MobileNavlinks from "./MobileNavlinks";
import Link from "next/link";
import DesktopNavlinks from "./DesktopNavlinks";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <div
      className={`text-white m-auto max-w-[1300px] ${
        pathname == "/login" ? "hidden" : ""
      } ${pathname == "/signup" ? "hidden" : ""}`}
    >
      {/* <div className="hidden md:flex items-center justify-center">
        <Image src={"/tech-logo.png"} height={100} width={100} />
      </div> */}
      <div className="flex py-2 px-6 items-center justify-between border-b border-white/90 md:mx-10 md:py-4 md:px-0">
        <BurgerButton open={open} setOpen={setOpen} />
        <DesktopNavlinks />

        <MobileNavlinks open={open} setOpen={setOpen} />
        <Link href={"/"}>
          <Image src={"/tech-logo.png"} height={50} width={100} />
        </Link>
        <Link href={"/posts/new"} className="flex gap-2">
          <CirclePlus
            strokeWidth={1}
            className="transition-transform duration-500 hover:rotate-[360deg] cursor-pointer"
          />
          <p className="hidden md:block">Add Post</p>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
