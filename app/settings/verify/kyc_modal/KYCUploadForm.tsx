import React from "react";

interface KYCUploadFormProps {
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

const KYCUploadForm: React.FC<KYCUploadFormProps> = ({ onSubmit, onBack }) => {
  return (
    <>
      <button
        onClick={onBack}
        className="absolute top-2 left-2 text-gray-400 text-xl hover:text-gray-200"
        aria-label="Go back"
      >
        &larr;
      </button>
      <h2 className="text-2xl font-bold text-center mb-4">Upload Document</h2>
      <p className="text-center mb-4">Provide a clear image of your ID</p>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-2 text-white">
            Document Requirements
          </h3>
          <p className="text-sm text-gray-400 mb-2">
            Make sure that your document:
          </p>
          <ul className="list-disc list-inside text-sm text-gray-400 mb-4">
            <li>is clear and easy to read</li>
            <li>is unedited</li>
            <li>the whole document must appear in the photo</li>
            <li>there is no reflective glare</li>
          </ul>
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center">
            <div className="mb-2 text-white">Front side of your ID</div>
            <p className="text-sm text-gray-400 mb-4">
              File size must be less than 10 MB in jpeg, png or pdf format.
            </p>
            <button
              type="button"
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-white transition duration-300"
            >
              Choose file
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white p-2 rounded hover:bg-secondary transition duration-300 mt-4"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default KYCUploadForm;
