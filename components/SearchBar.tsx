"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import lenseLight from "@/public/assets/icons/lightIcons/searchLenseLight.svg";
import { Button } from "./ui/button";
import crossLight from "@/public/assets/icons/lightIcons/crossLight.svg";
import micLight from "@/public/assets/icons/lightIcons/micLight.svg";
import camLight from "@/public/assets/icons/lightIcons/cameraLight.svg";

// const SearchBar = () => {
//   const [searchValue, setSearchValue] = useState("");

//   return (
//     <div className="w-full max-w-[584px] flex items-center border border-gray-300 rounded-full px-4 py-2 h-12 shadow-md">
//       <Image className="mr-5" src={lenseLight} alt="search-lense" width={24} height={24} />
//       <div className="flex justify-between flex-1">
//         <input
//           type="text"
//           className="w-full focus:outline-none"
//           value={searchValue}
//           onChange={(e) => setSearchValue(e.target.value)}
//         />
//         {searchValue && (
//           <Button
//             onClick={() => setSearchValue("")}
//             className="p-0 m-0 bg-transparent hover:bg-transparent shadow-none pr-2 border-r rounded-none h-6 border-[#dadce0]"
//           >
//             <Image src={crossLight} width={24} height={24} alt="cross-search" />
//           </Button>
//         )}
//       </div>

//       <div className="flex gap-3 ml-2">
//         <Image src={micLight} alt="mic" height={24} width={24} />
//         <Image src={camLight} alt="mic" height={24} width={24} />
//       </div>
//     </div>
//   );
// };

// export default SearchBar;

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Dummy recent search list
  const recentSearches = ["React", "Next.js", "Tailwind CSS", "Lucide Icons"];

  // Click outside logic
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full max-w-[584px]">
      <div
        className={`flex items-center border border-gray-300 px-4 py-2 h-12 shadow-md bg-white transition-all duration-100 ${
          showPopup ? "rounded-t-[24px] border-b-0" : "rounded-full"
        }`}
      >
        <Image className="mr-5" src={lenseLight} alt="search-lense" width={24} height={24} />

        <div className="flex justify-between flex-1">
          <input
            type="text"
            className="w-full focus:outline-none"
            value={searchValue}
            onFocus={() => setShowPopup(true)}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search..."
          />
          {searchValue && (
            <Button
              onClick={() => setSearchValue("")}
              className="p-0 m-0 bg-transparent hover:bg-transparent shadow-none pr-2 border-r rounded-none h-6 border-[#dadce0]"
            >
              <Image src={crossLight} width={24} height={24} alt="cross-search" />
            </Button>
          )}
        </div>

        <div className="flex gap-3 ml-2">
          <Image src={micLight} alt="mic" height={24} width={24} />
          <Image src={camLight} alt="cam" height={24} width={24} />
        </div>
      </div>

      {/* Popup below the input */}
      {showPopup && (
        <div className="absolute left-0 top-full w-full bg-white border border-gray-300 shadow-lg z-50">
          {recentSearches.length > 0 ? (
            recentSearches.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setSearchValue(item)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
              >
                {item}
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-sm text-gray-500">No recent searches</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
