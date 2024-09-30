import React from "react";
import { FaSpinner } from "react-icons/fa";

interface AddressInfoFormProps {
  formData: {
    address: string;
    postalCode: string;
    city: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onBack: () => void;
  isLoading: boolean;
  errorMessage: string | null;
}

const AddressInfoForm: React.FC<AddressInfoFormProps> = ({
  formData,
  handleChange,
  onSubmit,
  onBack,
  isLoading,
  errorMessage,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <>
      <button
        onClick={onBack}
        className="absolute top-2 left-2 text-gray-400 text-xl hover:text-gray-200"
        aria-label="Go back"
      >
        &larr;
      </button>
      <h2 className="text-2xl font-bold text-center mb-4">
        Address Information
      </h2>
      <p className="text-center mb-4">Fill in your address details</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="address" className="block mb-2">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 rounded"
            placeholder="1 Infinity Lane"
          />
        </div>
        <div>
          <label htmlFor="postalCode" className="block mb-2">
            Postal Code
          </label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 rounded"
          />
        </div>
        <div>
          <label htmlFor="city" className="block mb-2">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 rounded"
          />
        </div>
        {errorMessage && (
          <div className="text-red-400 text-center">{errorMessage}</div>
        )}
        <div className="mt-4">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-primary hover:bg-secondary rounded transition duration-300 flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? <FaSpinner className="animate-spin mr-2" /> : null}
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default AddressInfoForm;
