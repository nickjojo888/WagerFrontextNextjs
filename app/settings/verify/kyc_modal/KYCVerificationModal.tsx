import React, { useState, useCallback } from "react";
import KYCSelectForm from "./KYCSelectForm";
import KYCUploadForm from "./KYCUploadForm";

interface KYCVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const KYCVerificationModal: React.FC<KYCVerificationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [currentPage, setCurrentPage] = useState<"select" | "upload">("select");
  const [formData, setFormData] = useState({
    country: "",
    documentType: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleNextPage = () => {
    setCurrentPage("upload");
  };

  const handleBack = () => {
    setCurrentPage("select");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle file upload and submission logic here
    console.log("Submitting KYC verification:", formData);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    onClose();
  };

  const handleOutsideClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-40"
      onClick={handleOutsideClick}
    >
      <div className="w-4/5 max-h-[90vh] sm:w-1/2 xl:w-1/3 overflow-y-auto py-16 flex flex-col gap-4 px-6 sm:px-14 bg-gray-900 rounded-2xl relative text-white">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 text-xl hover:text-gray-200"
        >
          &times;
        </button>
        {currentPage === "select" ? (
          <KYCSelectForm
            formData={formData}
            handleChange={handleChange}
            onNext={handleNextPage}
          />
        ) : (
          <KYCUploadForm onSubmit={handleSubmit} onBack={handleBack} />
        )}
      </div>
    </div>
  );
};

export default KYCVerificationModal;
