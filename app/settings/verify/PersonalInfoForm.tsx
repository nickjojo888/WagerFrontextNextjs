import React from "react";

interface PersonalInfoFormProps {
  formData: {
    country: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    occupation: string;
  };
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onNext: (e: React.FormEvent) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  formData,
  handleChange,
  onNext,
}) => {
  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-4">
        Personal Information
      </h2>
      <p className="text-center mb-4">Fill in your personal details</p>
      <form onSubmit={onNext} className="flex flex-col gap-4">
        <div>
          <label htmlFor="country" className="block mb-2">
            Country
          </label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 rounded"
          >
            <option value="">Select Country</option>
            {/* Add country options here */}
          </select>
        </div>
        <div>
          <label htmlFor="firstName" className="block mb-2">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 rounded"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block mb-2">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 rounded"
          />
        </div>
        <div>
          <label htmlFor="dateOfBirth" className="block mb-2">
            Date of Birth
          </label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 rounded"
          />
        </div>
        <div>
          <label htmlFor="occupation" className="block mb-2">
            Occupation
          </label>
          <input
            type="text"
            id="occupation"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-primary hover:bg-secondary rounded transition duration-300 flex items-center justify-center"
        >
          Next
        </button>
      </form>
    </>
  );
};

export default PersonalInfoForm;
