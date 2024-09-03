import React from "react";
import { useRouter } from "next/navigation";
import ReceiptIcon from "@/public/svgs/receipt-outline.svg";
import StarIcon from "@/public/svgs/star-outline.svg";
import ChatboxIcon from "@/public/svgs/chatbox-outline.svg";
import PersonIcon from "@/public/svgs/person-outline.svg";

const UserMenu: React.FC = () => {
  const router = useRouter();

  return (
    <div className="flex space-x-2">
      <button
        className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full transition duration-300"
        onClick={() => router.push("/transactions")}
      >
        <ReceiptIcon width={24} height={24} />
      </button>
      <button
        className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full transition duration-300"
        onClick={() => router.push("/favorites")}
      >
        <StarIcon width={24} height={24} />
      </button>
      <button
        className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full transition duration-300"
        onClick={() => router.push("/messages")}
      >
        <ChatboxIcon width={24} height={24} />
      </button>
      <button
        className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full transition duration-300"
        onClick={() => router.push("/profile")}
      >
        <PersonIcon width={24} height={24} />
      </button>
    </div>
  );
};

export default UserMenu;
