import { X } from "lucide-react";
import React, { useEffect, type ReactNode } from "react";

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

const DescriptionModal: React.FC<ModalProps> = ({ onClose, children }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed inset-0 backdrop-blur-lg bg-black/10 flex items-center justify-center  mx-auto px-4 py-2 z-10">
      <div className="container mx-auto max-h-[90%] flex flex-col items-center justify-center">
        <button
          onClick={onClose}
          className="place-self-end mt-5 mb-2 cursor-pointer"
        >
          <div className="bg-gray-200 rounded-lg p-1">
            <X size={22} className="text-gray-700"/>
          </div>
        </button>
        <h1 className="text-xl text-title-darkblue text-shadow-lg font-semibold pb-3 place-self-start">
          Full Description
        </h1>

         {/* <div className="mb-3 place-self-start bg-gray-200 rounded-lg px-2 py-1">
             <h1 className=" text-xl text-title-darkblue text-shadow-lg font-semibold ">
          Full Description
        </h1>
        </div> */}

        <div
          className="w-full h-full mx-4 bg-gray-100 shadow-lg rounded-xl border
         border-white overflow-y-scroll md:overflow-auto"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default DescriptionModal;
