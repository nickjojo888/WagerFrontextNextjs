import React from "react";
import Link from "next/link";
import ReceiptIcon from "@/public/svgs/receipt-outline.svg";
import StarIcon from "@/public/svgs/star-outline.svg";
import ChatboxIcon from "@/public/svgs/chatbox-outline.svg";
import PersonIcon from "@/public/svgs/person-outline.svg";

const UserMenu: React.FC = () => {
  return (
    <div className="flex space-x-2">
      <Link
        href="/transactions"
        className="hidden lg:block bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full transition duration-300"
      >
        <ReceiptIcon width={24} height={24} />
      </Link>
      <Link
        href="/favorites"
        className="hidden lg:block bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full transition duration-300"
      >
        <StarIcon width={24} height={24} />
      </Link>
      <Link
        href="/messages"
        className="hidden lg:block bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full transition duration-300"
      >
        <ChatboxIcon width={24} height={24} />
      </Link>
      <Link
        href="/profile"
        className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full transition duration-300"
      >
        <PersonIcon width={24} height={24} />
      </Link>
    </div>
  );
};

export default UserMenu;
