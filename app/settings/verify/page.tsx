"use client";
import React, { useState } from "react";
import { useAuth } from "@/app/components/authentication/AuthContext";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import PersonalDetailsModal from "./personal_details_modal/PersonalDetailsModal";
import KYCVerificationModal from "./kyc_modal/KYCVerificationModal";
import EmailVerificationModal from "./email_modal/EmailVerificationModal";
import { Suspense } from "react";

const VerifyPage: React.FC = () => {
  const { user } = useAuth();
  const [isPersonalDetailsModalOpen, setIsPersonalDetailsModalOpen] =
    useState(false);
  const [isKYCModalOpen, setIsKYCModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  const verificationSteps = [
    {
      name: "Email Verification",
      description: "Verify your email address to secure your account",
      completed: user?.emailVerified,
    },
    {
      name: "Personal Details",
      description: "Provide your personal information for account security",
      completed: user?.detailsFilled,
    },
    {
      name: "KYC Verification",
      description:
        "Complete the Know Your Customer process for legal compliance",
      completed: user?.kycFilled,
    },
  ];

  const handleCompleteClick = (stepName: string) => {
    if (stepName === "Email Verification") {
      setIsEmailModalOpen(true);
    } else if (stepName === "Personal Details") {
      setIsPersonalDetailsModalOpen(true);
    } else if (stepName === "KYC Verification") {
      setIsKYCModalOpen(true);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold">Verify Account</h2>
      <div className="flex flex-col gap-6 rounded-lg">
        {verificationSteps.map((step, index) => {
          const isDisabled =
            false && index > 0 && !verificationSteps[index - 1].completed;
          return (
            <div
              key={index}
              className="flex items-center space-x-3 py-4 px-4 border border-gray-700 rounded-lg"
            >
              {step.completed ? (
                <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0" />
              ) : (
                <XCircleIcon className="w-6 h-6 text-red-500 flex-shrink-0" />
              )}
              <div className="flex-grow flex flex-col xs:flex-row xs:items-center xs:justify-between">
                <div className="flex flex-col xs:mb-0">
                  <span className="text-lg font-medium">{step.name}</span>
                  <p className="text-sm text-gray-400">{step.description}</p>
                </div>
                {(step.name === "Personal Details" || !step.completed) && (
                  <button
                    className={`px-4 py-2 mt-4 xs:mt-0 rounded-md text-white self-start ${
                      isDisabled
                        ? "bg-gray-500 cursor-not-allowed"
                        : step.completed
                        ? "bg-gray-500 hover:bg-gray-600"
                        : "bg-primary hover:bg-secondary"
                    }`}
                    disabled={isDisabled}
                    onClick={() => handleCompleteClick(step.name)}
                  >
                    {step.completed ? "Update" : "Complete"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <Suspense fallback={<div className=""></div>}>
        <EmailVerificationModal
          isOpen={isEmailModalOpen}
          onClose={() => setIsEmailModalOpen(false)}
        />
      </Suspense>
      <PersonalDetailsModal
        key={isPersonalDetailsModalOpen ? "open" : "closed"} //so that if user goes off the page, data not saved
        isOpen={isPersonalDetailsModalOpen}
        onClose={() => setIsPersonalDetailsModalOpen(false)}
        userData={user} // Pass user data as a prop so that on initial render it has right data, instead of using useeffect (right data on second render)
      />
      <KYCVerificationModal
        isOpen={isKYCModalOpen}
        onClose={() => setIsKYCModalOpen(false)}
      />
    </div>
  );
};

export default VerifyPage;
