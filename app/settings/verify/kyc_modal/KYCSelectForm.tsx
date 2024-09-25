import React from "react";

interface KYCSelectFormProps {
  formData: {
    country: string;
    documentType: string;
  };
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onNext: () => void;
}

const KYCSelectForm: React.FC<KYCSelectFormProps> = ({
  formData,
  handleChange,
  onNext,
}) => {
  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-4">
        Identity Verification
      </h2>
      <p className="text-center mb-4">Select your document details</p>
      <form className="flex flex-col gap-4">
        <div>
          <label
            htmlFor="country"
            className="block mb-2 text-sm font-medium text-gray-300"
          >
            Select issuing country
          </label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-gray-800 text-white border-gray-700 focus:border-gray-600 focus:outline-none"
          >
            <option value="">Select a country</option>
            <option value="Andorra">Andorra</option>
            {/* Add more countries as needed */}
          </select>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-300">
            Select document type
          </label>
          <div className="space-y-2">
            {[
              "Driver's License",
              "ID Card",
              "Passport",
              "Residence Permit",
            ].map((type) => (
              <label key={type} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="documentType"
                  value={type}
                  checked={formData.documentType === type}
                  onChange={handleChange}
                  className="form-radio text-primary focus:ring-primary"
                />
                <span className="text-sm text-gray-300">{type}</span>
              </label>
            ))}
          </div>
        </div>
        <button
          onClick={onNext}
          type="button"
          className="w-full bg-primary text-white p-2 rounded hover:bg-secondary transition duration-300 mt-4"
        >
          Next
        </button>
      </form>
    </>
  );
};

export default KYCSelectForm;
