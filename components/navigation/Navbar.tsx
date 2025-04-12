"use client";

// import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import jarLight from "@/public/assets/icons/lightIcons/jarLight.svg";
import diceLight from "@/public/assets/icons/lightIcons/diceLight.svg";
import { Button } from "../ui/button";
import { useState } from "react";
import { Capacitor } from "@capacitor/core";

const Navbar = () => {
  // const {
  //   // setTheme,
  //   themes,
  // } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const platform = Capacitor.getPlatform();
  console.log(platform, "srj platform");

  return (
    <section className="w-screen flex p-1.5 items-center px-[22px] gap-20">
      <div className="flex gap-2.5">
        <Link href="#" className="hover:underline">
          About
        </Link>
        <Link href="#" className="hover:underline">
          Store
        </Link>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <div className="flex gap-2.5">
          <Link href="#" className="hover:underline">
            Gmail
          </Link>
          <Link href="#" className="hover:underline">
            Image
          </Link>
        </div>

        <div className="flex gap-2">
          {isLoggedIn && (
            <div className="hover:bg-[rgba(68,71,70,0.08)]  rounded-full p-2 hover:shadow-sm h-10 w-10">
              <Image src={jarLight} alt="labIcon" height={24} width={24} />
            </div>
          )}
          <div className="hover:bg-[rgba(68,71,70,0.08)]  rounded-full p-2 hover:shadow-sm h-10 w-10">
            <Image src={diceLight} alt="diceIcon" height={24} width={24} />
          </div>
        </div>

        {isLoggedIn ? (
          <div>Suraj</div>
        ) : (
          <Button
            variant="secondary"
            className="bg-[#0b57d0] text-white rounded-[100px] hover:bg-[rgba(11,87,208,0.8)] hover:shadow-sm"
          >
            Sign In
          </Button>
        )}
      </div>
    </section>
  );
};

export default Navbar;
