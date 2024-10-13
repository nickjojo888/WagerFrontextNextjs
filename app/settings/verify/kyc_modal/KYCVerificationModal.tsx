import React, { useEffect, useRef, useState, useCallback } from "react";
import { useAuth } from "@/app/components/authentication/AuthContext";
import SumsubWebSdk from "@sumsub/websdk-react";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "";

interface KYCVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const KYCVerificationModal: React.FC<KYCVerificationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { user } = useAuth();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const sumsubWebSdkRef = useRef<any>(null);

  useEffect(() => {
    if (isOpen && user) {
      fetchAccessToken();
    }
  }, [isOpen, user]);

  const fetchAccessToken = async () => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/users/${user?._id}/sumsub-token/basic-kyc-level`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Add any necessary authentication headers
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch access token");
      }

      const data = await response.json();
      setAccessToken(data.token);
    } catch (error) {
      console.error("Error fetching access token:", error);
      setError(
        "Failed to initialize KYC verification. Please try again later."
      );
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

  const handleMessage = (type: string, payload: any) => {
    console.log("WebSDK message", type, payload);
  };

  const handleError = (error: Error) => {
    console.error("WebSDK error", error);
    setError(
      `An error occurred during KYC verification. Please try again later: ${JSON.stringify(
        error,
        Object.getOwnPropertyNames(error)
      )}`
    );
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-40"
      onClick={handleOutsideClick}
    >
      <div className="w-5/6 max-h-[90vh] sm:w-2/3 xl:w-2/5 bg-gray-900 rounded-2xl relative text-white flex flex-col">
        {/* Fixed header with centered title */}
        <div className="p-4 border-b border-gray-700 relative">
          <button
            onClick={onClose}
            className="absolute right-4 text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
          <h2 className="text-xl font-semibold text-center">
            Personal Verification
          </h2>
        </div>

        {/* Scrollable content */}
        <div className="flex-grow overflow-y-scroll">
          {error ? (
            <div className="p-4 text-red-500">{error}</div>
          ) : accessToken ? (
            <SumsubWebSdk
              ref={sumsubWebSdkRef}
              accessToken={accessToken}
              expirationHandler={() => fetchAccessToken()}
              config={{
                lang: "en",
                email: user?.email || undefined,
                i18n: {
                  document: {
                    subTitles: {
                      IDENTITY: "Upload a document that proves your identity",
                    },
                  },
                },
                onMessage: handleMessage,
                onError: handleError,
              }}
              options={{ addViewportTag: false, adaptIframeHeight: true }}
              onMessage={handleMessage}
              onError={handleError}
            />
          ) : (
            <div className="p-4">Loading KYC verification...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KYCVerificationModal;
