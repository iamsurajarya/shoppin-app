import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";

const GoogleHomePage = () => {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-white">
      {/* Google Logo */}
      <Image
        src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
        alt="Google Logo"
        className="w-[272px] h-auto mb-8"
        width={400}
        height={150}
      />

      {/* Search Box */}
      <div className="w-full max-w-xl flex items-center border border-gray-300 rounded-full px-5 py-2 shadow hover:shadow-md transition">
        <svg
          className="w-5 h-5 text-gray-500 mr-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1111.65 6a7.5 7.5 0 015.5 10.65z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search Google or type a URL"
          className="w-full focus:outline-none"
        />
      </div>

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
