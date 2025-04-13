// components/VoiceSearchModal.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";

interface VoiceSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResult: (transcript: string) => void;
}

const VoiceSearchModal: React.FC<VoiceSearchModalProps> = ({ isOpen, onClose, onResult }) => {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if (!isOpen || typeof window === "undefined") return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn("Speech Recognition API not supported in this browser.");
      return;
    }

    const recognition: SpeechRecognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
      setIsListening(false);
      onClose();
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
      onClose();
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();

    return () => {
      recognition.stop();
    };
  }, [isOpen, onClose, onResult]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white p-6 rounded-xl text-center shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {isListening ? "Listening..." : "Initializing..."}
        </h2>
        <p className="text-gray-600">Speak clearly into your microphone.</p>
        <button
          onClick={() => {
            recognitionRef.current?.stop();
            onClose();
          }}
          className="mt-6 px-4 py-2 bg-red-500 text-white rounded-md"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default VoiceSearchModal;
