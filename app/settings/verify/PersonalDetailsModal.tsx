import React, { useState, useCallback } from "react";
import AddressInfoForm from "./AddressInfoForm";
import PersonalInfoForm from "./PersonalInfoForm";

interface PersonalDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PersonalDetailsModal: React.FC<PersonalDetailsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [currentPage, setCurrentPage] = useState<"personal" | "address">(
    "personal"
  );
  const [personalInfo, setPersonalInfo] = useState({
    country: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    occupation: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handlePersonalInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPersonalInfo((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleNextPage = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage("address");
  };

  const handleSubmit = async (addressInfo: any) => {
    setIsLoading(true);
    try {
      // Combine data from both forms
      const completeFormData = { ...personalInfo, ...addressInfo };
      console.log("Submitting complete form data:", completeFormData);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
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
        {currentPage === "personal" ? (
          <PersonalInfoForm
            formData={personalInfo}
            handleChange={handlePersonalInfoChange}
            onNext={handleNextPage}
          />
        ) : (
          <AddressInfoForm
            onSubmit={handleSubmit}
            onBack={() => setCurrentPage("personal")}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
};

export default PersonalDetailsModal;
