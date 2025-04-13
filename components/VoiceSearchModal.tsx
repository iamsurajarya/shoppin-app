// // components/VoiceSearchModal.tsx
// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import { Button } from "./ui/button";

// interface VoiceSearchModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onResult: (transcript: string) => void;
// }

// const VoiceSearchModal: React.FC<VoiceSearchModalProps> = ({ isOpen, onClose, onResult }) => {
//   const [isListening, setIsListening] = useState(false);
//   const recognitionRef = useRef<SpeechRecognition | null>(null);

//   useEffect(() => {
//     if (!isOpen || typeof window === "undefined") return;

//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;

//     if (!SpeechRecognition) {
//       console.warn("Speech Recognition API not supported in this browser.");
//       return;
//     }

//     const recognition: SpeechRecognition = new SpeechRecognition();
//     recognition.lang = "en-US";
//     recognition.interimResults = false;
//     recognition.maxAlternatives = 1;

//     recognition.onstart = () => {
//       setIsListening(true);
//     };

//     recognition.onresult = (event: SpeechRecognitionEvent) => {
//       const transcript = event.results[0][0].transcript;
//       onResult(transcript);
//       setIsListening(false);
//       onClose();
//     };

//     recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
//       console.error("Speech recognition error:", event.error);
//       setIsListening(false);
//       onClose();
//     };

//     recognition.onend = () => {
//       setIsListening(false);
//     };

//     recognitionRef.current = recognition;
//     recognition.start();

//     return () => {
//       recognition.stop();
//     };
//   }, [isOpen, onClose, onResult]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
//       <div className="bg-white h-screen p-6 rounded-xl text-center shadow-lg w-full max-w-md">
//         <h2 className="text-xl font-semibold mb-4">
//           {isListening ? "Listening..." : "Initializing..."}
//         </h2>
//         <p className="text-gray-600">Speak clearly into your microphone.</p>
//         <Button
//           onClick={() => {
//             recognitionRef.current?.stop();
//             onClose();
//           }}
//           className="mt-6 px-4 py-2 bg-red-500 text-white rounded-md"
//         >
//           Cancel
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default VoiceSearchModal;

// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import { Button } from "./ui/button";
// import { Mic } from "lucide-react"; // Optional: install `lucide-react` for icons

// interface VoiceSearchModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onResult: (transcript: string) => void;
// }

// type Phase = "prompt" | "listening" | "retry";

// const VoiceSearchModal: React.FC<VoiceSearchModalProps> = ({ isOpen, onClose, onResult }) => {
//   const [phase, setPhase] = useState<Phase>("prompt");
//   const recognitionRef = useRef<SpeechRecognition | null>(null);
//   const fallbackTimeout = useRef<NodeJS.Timeout | null>(null);
//   const promptTimeout = useRef<NodeJS.Timeout | null>(null);

//   useEffect(() => {
//     if (!isOpen || typeof window === "undefined") return;

//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;

//     if (!SpeechRecognition) {
//       console.warn("Speech Recognition API not supported in this browser.");
//       return;
//     }

//     const recognition: SpeechRecognition = new SpeechRecognition();
//     recognition.lang = "en-US";
//     recognition.interimResults = false;
//     recognition.maxAlternatives = 1;

//     recognition.onstart = () => {
//       setPhase("listening");
//     };

//     recognition.onresult = (event: SpeechRecognitionEvent) => {
//       const transcript = event.results[0][0].transcript;
//       onResult(transcript);
//       cleanup();
//     };

//     recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
//       console.error("Speech recognition error:", event.error);
//       setPhase("retry");
//     };

//     recognition.onend = () => {
//       if (phase !== "retry") {
//         setPhase("retry");
//       }
//     };

//     // Start with "prompt" phase
//     setPhase("prompt");

//     promptTimeout.current = setTimeout(() => {
//       recognition.start();
//     }, 2000); // Show "Speak Now" for 2 seconds

//     fallbackTimeout.current = setTimeout(() => {
//       recognition.stop();
//       setPhase("retry");
//     }, 7000); // If no input after 7s, show retry

//     recognitionRef.current = recognition;

//     return () => {
//       cleanup();
//     };
//   }, [isOpen, onClose, onResult]);

//   const cleanup = () => {
//     recognitionRef.current?.stop();
//     if (fallbackTimeout.current) clearTimeout(fallbackTimeout.current);
//     if (promptTimeout.current) clearTimeout(promptTimeout.current);
//     onClose();
//   };

//   const handleRetry = () => {
//     setPhase("prompt");

//     // Restart recognition flow
//     if (recognitionRef.current) {
//       promptTimeout.current = setTimeout(() => {
//         recognitionRef.current?.start();
//       }, 2000);

//       fallbackTimeout.current = setTimeout(() => {
//         recognitionRef.current?.stop();
//         setPhase("retry");
//       }, 7000);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
//       <div className="bg-white h-screen p-6 rounded-xl text-center shadow-lg w-full max-w-md flex flex-col items-center justify-center">
//         {phase === "prompt" && (
//           <>
//             <div className="animate-pulse rounded-full w-16 h-16 bg-red-500 mb-4"></div>
//             <h2 className="text-xl font-semibold mb-4">Speak Now</h2>
//           </>
//         )}

//         {phase === "listening" && (
//           <>
//             <div className="animate-pulse rounded-full w-16 h-16 bg-green-500 mb-4"></div>
//             <h2 className="text-xl font-semibold mb-4">Listening...</h2>
//           </>
//         )}

//         {phase === "retry" && (
//           <>
//             <Mic className="w-12 h-12 text-gray-600 mb-4" />
//             <h2 className="text-xl font-semibold mb-4">Tap to Speak</h2>
//             <Button
//               onClick={handleRetry}
//               className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
//             >
//               Retry
//             </Button>
//           </>
//         )}

//         <Button
//           onClick={cleanup}
//           className="absolute top-6 right-6 px-3 py-1 bg-red-500 text-white rounded-md"
//         >
//           Cancel
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default VoiceSearchModal;

"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Mic } from "lucide-react";

interface VoiceSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResult: (transcript: string) => void;
}

type Phase = "prompt" | "listening" | "retry";

const VoiceSearchModal: React.FC<VoiceSearchModalProps> = ({ isOpen, onClose, onResult }) => {
  const [phase, setPhase] = useState<Phase>("prompt");
  const phaseRef = useRef<Phase>("prompt"); // ref to track latest phase
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const fallbackTimeout = useRef<NodeJS.Timeout | null>(null);
  const promptTimeout = useRef<NodeJS.Timeout | null>(null);

  // Keep ref in sync with state
  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

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

    recognition.onstart = () => setPhase("listening");

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
      cleanup();
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Speech recognition error:", event.error);
      setPhase("retry");
    };

    recognition.onend = () => {
      if (phaseRef.current !== "retry") {
        setPhase("retry");
      }
    };

    const cleanup = () => {
      recognitionRef.current?.stop();
      if (fallbackTimeout.current) clearTimeout(fallbackTimeout.current);
      if (promptTimeout.current) clearTimeout(promptTimeout.current);
      onClose();
    };

    // Start flow
    setPhase("prompt");

    promptTimeout.current = setTimeout(() => {
      recognition.start();
    }, 2000);

    fallbackTimeout.current = setTimeout(() => {
      recognition.stop();
      setPhase("retry");
    }, 7000);

    recognitionRef.current = recognition;

    return cleanup;
  }, [isOpen, onClose, onResult]);

  const handleRetry = () => {
    setPhase("prompt");

    if (recognitionRef.current) {
      promptTimeout.current = setTimeout(() => {
        recognitionRef.current?.start();
      }, 2000);

      fallbackTimeout.current = setTimeout(() => {
        recognitionRef.current?.stop();
        setPhase("retry");
      }, 7000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white h-screen p-6 rounded-xl text-center shadow-lg w-full max-w-md flex flex-col items-center justify-center">
        {phase === "prompt" && (
          <>
            <div className="animate-pulse rounded-full w-16 h-16 bg-red-500 mb-4" />
            <h2 className="text-xl font-semibold mb-4">Speak Now</h2>
          </>
        )}

        {phase === "listening" && (
          <>
            <div className="animate-pulse rounded-full w-16 h-16 bg-green-500 mb-4" />
            <h2 className="text-xl font-semibold mb-4">Listening...</h2>
          </>
        )}

        {phase === "retry" && (
          <>
            <Mic className="w-12 h-12 text-gray-600 mb-4" />
            <h2 className="text-xl font-semibold mb-4">Tap to Speak</h2>
            <Button
              onClick={handleRetry}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Retry
            </Button>
          </>
        )}

        <Button
          onClick={onClose}
          className="absolute top-6 right-6 px-3 py-1 bg-red-500 text-white rounded-md"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default VoiceSearchModal;
