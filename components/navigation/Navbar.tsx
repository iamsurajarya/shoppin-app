"use client";

// import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import jarLight from "@/public/assets/icons/lightIcons/jarLight.svg";
import diceLight from "@/public/assets/icons/lightIcons/diceLight.svg";
import { Button } from "../ui/button";
import { useState } from "react";
import { Capacitor } from "@capacitor/core";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import gLogo from "@/public/assets/gLogo.svg";
import geminiLogo from "@/public/assets/geminiIcon.svg";

const Navbar = () => {
  // const {
  //   // setTheme,
  //   themes,
  // } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  console.log(setIsLoggedIn);

  const platform = Capacitor.getPlatform();

  return (
    <section
      className={`w-screen flex p-1.5 items-center px-[22px] justify-between ${
        ["android", "ios"].includes(platform) && "mt-20"
      } `}
    >
      {["android", "ios"].includes(platform) ? (
        <div className="hover:bg-[rgba(68,71,70,0.08)]  rounded-full p-2  hover:shadow-sm h-10 w-10">
          <Image src={jarLight} alt="labIcon" height={24} width={24} />
        </div>
      ) : (
        <div className="flex gap-2.5">
          <Link href="#" className="hover:underline">
            About
          </Link>
          <Link href="#" className="hover:underline">
            Store
          </Link>
        </div>
      )}

      {(platform == "ios" || platform == "android") && (
        <Tabs defaultValue="google" className="min-w-max">
          <TabsList className="py-1 px-2 h-11 gap-2">
            <TabsTrigger value="google" className="py-2 px-4">
              <Image src={gLogo} alt="gLogo" /> Google
            </TabsTrigger>
            <TabsTrigger value="gemini" className="!w-2 p-0">
              <Image width={20} height={20} src={geminiLogo} alt="gemini-logo" />
            </TabsTrigger>
          </TabsList>
        </Tabs>
      )}

      <div className="flex items-center gap-2">
        {!["android", "ios"].includes(platform) && (
          <div className="flex gap-2.5">
            <Link href="#" className="hover:underline">
              Gmail
            </Link>
            <Link href="#" className="hover:underline">
              Image
            </Link>
          </div>
        )}

        {!["android", "ios"].includes(platform) && (
          <div className="flex gap-2">
            {isLoggedIn && (
              <div className="hover:bg-[rgba(68,71,70,0.08)]  rounded-full p-2  hover:shadow-sm h-10 w-10">
                <Image src={jarLight} alt="labIcon" height={24} width={24} />
              </div>
            )}
            <div className="hover:bg-[rgba(68,71,70,0.08)]  rounded-full p-2 hover:shadow-sm h-10 w-10">
              <Image src={diceLight} alt="diceIcon" height={24} width={24} />
            </div>
          </div>
        )}

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
