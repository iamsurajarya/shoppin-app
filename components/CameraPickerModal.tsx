// "use client";
// import { motion, AnimatePresence } from "framer-motion";
// import { useEffect } from "react";

// const backdropVariants = {
//   hidden: { opacity: 0 },
//   visible: { opacity: 1 },
//   exit: { opacity: 0 },
// };

// const sheetVariants = {
//   hidden: { y: "100%" },
//   visible: { y: 0 },
//   exit: { y: "100%" },
// };

// interface CameraPickerModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onPick: (type: "camera" | "gallery") => void;
// }

// const CameraPickerModal = ({ isOpen, onClose, onPick }: CameraPickerModalProps) => {
//   // Close on ESC
//   useEffect(() => {
//     const handleEsc = (e: KeyboardEvent) => {
//       if (e.key === "Escape") onClose();
//     };
//     window.addEventListener("keydown", handleEsc);
//     return () => window.removeEventListener("keydown", handleEsc);
//   }, [onClose]);

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           {/* Backdrop */}
//           <motion.div
//             className="fixed inset-0 bg-black/40 z-40"
//             variants={backdropVariants}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//             onClick={onClose}
//           />

//           {/* Bottom Sheet */}
//           <motion.div
//             className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl p-4 space-y-4"
//             variants={sheetVariants}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//             transition={{ type: "spring", stiffness: 300, damping: 30 }}
//           >
//             {/* Optional drag handle */}
//             <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-2" />

//             <button
//               className="w-full text-lg font-medium py-3 border rounded-lg"
//               onClick={() => onPick("camera")}
//             >
//               Take a Photo
//             </button>
//             <button
//               className="w-full text-lg font-medium py-3 border rounded-lg"
//               onClick={() => onPick("gallery")}
//             >
//               Choose from Gallery
//             </button>
//             <button className="w-full text-red-500 font-medium py-3" onClick={onClose}>
//               Cancel
//             </button>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// };

// export default CameraPickerModal;

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

interface CameraPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPick: (type: "camera" | "gallery") => void;
}
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const sheetVariants = {
  hidden: { y: "100%" },
  visible: { y: 0 },
  exit: { y: "100%" },
};

const CameraPickerModal = ({ isOpen, onClose }: CameraPickerModalProps) => {
  const router = useRouter();

  const handleRedirect = (source: "camera" | "gallery") => {
    onClose();
    router.push(`/camera?source=${source}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          <motion.div
            className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl p-4 space-y-4"
            variants={sheetVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-2" />

            <button
              className="w-full text-lg font-medium py-3 border rounded-lg"
              onClick={() => handleRedirect("camera")}
            >
              Take a Photo
            </button>
            <button
              className="w-full text-lg font-medium py-3 border rounded-lg"
              onClick={() => handleRedirect("gallery")}
            >
              Choose from Gallery
            </button>
            <button className="w-full text-red-500 font-medium py-3" onClick={onClose}>
              Cancel
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CameraPickerModal;
