import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import googleLogo from "@/public/assets/images/googleBig.svg";
import SearchBar from "./SearchBar";

const GoogleHomePage = () => {
  return (
    <div className="flex flex-col min-h-screen items-center bg-white">
      {/* Google Logo */}

      <div className="h-[228px] w-full flex items-end justify-center">
        <Image
          src={googleLogo}
          alt="Google Logo"
          className="w-[272px] h-auto mb-5"
          width={400}
          height={150}
        />
      </div>

      <SearchBar />

      {/* Buttons */}
      <div className="mt-8 flex gap-4">
        <button className="bg-gray-100 px-4 py-2 text-sm rounded hover:shadow">
          Google Search
        </button>
        <Button className="bg-gray-100 px-4 py-2 text-sm rounded hover:shadow">
          I&apos;mFeeling Lucky
        </Button>
      </div>
    </div>
  );
};

export default GoogleHomePage;
