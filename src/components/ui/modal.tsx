"use client";

import { extractResourceAndAction } from "@/lib/utils";
import { capitalize } from "lodash";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface ModalProps {
  children: React.ReactNode;
  open: boolean;
}

const Modal: React.FC<ModalProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [modalTitle, setModalTitle] = useState<string | null>(null);

  useEffect(() => {
    // Split the pathname into segments
    const { resource, action } = extractResourceAndAction(pathname);

    // Set the modal title in the format "action resource"
    if (resource && action) {
      setModalTitle(` ${capitalize(action)} ${capitalize(resource)}`);
    } else {
      setModalTitle(null); // Fallback title if the URL structure is unexpected
    }
  }, [pathname]);

  const handleClose = () => {
    router.back();
  };

  if (!open) {
    return null;
  }

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-30"
        onClick={handleClose}
      ></div>

      {/* Modal container */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg transform ease-in duration-300 max-w-3xl w-full md:max-w-2xl lg:max-w-4xl">
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-black">{modalTitle}</h2>
              <button
                className="text-gray-400 hover:text-gray-800 cursor-pointer"
                onClick={handleClose}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal content goes here */}
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
