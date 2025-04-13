"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import lenseLight from "@/public/assets/icons/lightIcons/searchLenseLight.svg";
import { Button } from "./ui/button";
import crossLight from "@/public/assets/icons/lightIcons/crossLight.svg";
import micLight from "@/public/assets/icons/lightIcons/micLight.svg";
import camLight from "@/public/assets/icons/lightIcons/cameraLight.svg";
import { motion, AnimatePresence } from "framer-motion";
import leftArrowLight from "@/public/assets/icons/lightIcons/leftArrowLight.svg";
import VoiceSearchModal from "./VoiceSearchModal";
import { openCameraOrGallery } from "@/utils";
import CameraPickerModal from "./CameraPickerModal";
import CameraInterface from "./CameraInterface";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Camera picker
  const [showPicker, setShowPicker] = useState(false);
  const [imageBase64, setImageBase64] = useState<string | null>(null);

  const handlePhoto = (photoUrl: string) => {
    // Handle the captured or selected photo
    console.log("Received photo:", photoUrl);
  };

  const handlePick = async (type: "camera" | "gallery") => {
    setShowPicker(false);
    const base64 = await openCameraOrGallery(type);
    setImageBase64(base64 ?? null); // This line fixes the error
  };

  const [showModal, setShowModal] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    // Lock scroll when overlay is open
    document.body.style.overflow = showOverlay ? "hidden" : "auto";
  }, [showOverlay]);

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
            // onFocus={() => setShowPopup(true)}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search..."
            onClick={() => setShowOverlay(true)}
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

      {/* Overlay */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-white z-50 px-2 md:px-4 py-6"
          >
            {/* Animated Search Bar */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="max-w-xl mx-auto mt-12"
            >
              <div>
                <div
                  className={`flex items-center border border-gray-300 px-4 py-2 h-12 shadow-md bg-white transition-all duration-100 rounded-full`}
                >
                  <Image
                    className="mr-5"
                    src={leftArrowLight}
                    alt="search-lense"
                    width={20}
                    height={20}
                    onClick={() => setShowOverlay(false)}
                  />

                  <div className="flex justify-between flex-1">
                    <input
                      type="text"
                      className="w-full focus:outline-none"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      placeholder="Search or Type URL"
                      onClick={() => setShowOverlay(true)}
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
                    <div>
                      <Image
                        onClick={() => setShowModal(true)}
                        src={micLight}
                        alt="mic"
                        height={24}
                        width={24}
                      />
                    </div>
                    {/* <Image
                      onClick={() => setShowPicker(true)}
                      src={camLight}
                      alt="cam"
                      height={24}
                      width={24}
                    /> */}

                    <CameraInterface onPhotoTaken={handlePhoto} />

                    {imageBase64 && (
                      <Image
                        src={`data:image/jpeg;base64,${imageBase64}`}
                        alt="Preview"
                        className="mt-4 rounded-md"
                      />
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Example Suggestions or History */}
            <div className="max-w-xl mx-auto mt-6 space-y-2 text-gray-500 px-4">
              <p className="text-sm">Recent Searches:</p>
              <div className="space-y-1">
                <p className="hover:text-black cursor-pointer">React animations</p>
                <p className="hover:text-black cursor-pointer">Tailwind UI ideas</p>
                <p className="hover:text-black cursor-pointer">Framer Motion effects</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <VoiceSearchModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onResult={(text) => setSearchValue(text)}
      />

      <CameraPickerModal
        isOpen={showPicker}
        onClose={() => setShowPicker(false)}
        onPick={handlePick}
      />
    </div>
  );
};

export default SearchBar;
