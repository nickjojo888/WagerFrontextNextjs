"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import newWagerLogo from "@/public/logos/new_wager_logo.png";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "";

const IPRestrictionModal: React.FC = () => {
  const [isRestricted, setIsRestricted] = useState(false);
  const [country, setCountry] = useState("");

  useEffect(() => {
    const checkIPRestriction = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/ip/status`);
        if (response.data.restricted) {
          setIsRestricted(true);
          setCountry(response.data.country || "your country");
        }
      } catch (error) {
        console.error("Error checking IP restriction:", error);
      }
    };

    checkIPRestriction();
  }, []);

  if (!isRestricted) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-40">
      <div className="w-4/5 max-h-[90vh] sm:w-1/2 xl:w-1/3 overflow-y-auto py-16 flex flex-col gap-4 px-6 sm:px-14 bg-gray-900 rounded-2xl relative text-white">
        <div className="flex justify-center mb-4 ">
          <Image
            src={newWagerLogo}
            alt="Wager Logo"
            priority
            width={232}
            height={59}
            className="h-12 w-auto"
          />
        </div>
        <h2 className="text-2xl font-bold text-center mb-4">
          Access Restricted
        </h2>
        <p className="text-center mb-4">
          We&apos;re sorry, but our service is not available in {country}.
        </p>
        <p className="text-center text-sm text-gray-400">
          Due to licensing restrictions, we cannot accept players from your
          region. If you&apos;re using a VPN, please disable it and try again.
        </p>
        <div className="flex justify-center mt-6 space-x-4">
          {/* Social media icons */}
        </div>
      </div>
    </div>
  );
};

export default IPRestrictionModal;
