import Link from "next/link";
import React from "react";

type SidebarLinkProps = {
  href: string;
  icon: React.ReactNode;
  text: string;
};

const SidebarLink: React.FC<SidebarLinkProps> = ({ href, icon, text }) => {
  return (
    <li>
      <Link
        href={href}
        className="flex items-center text-white hover:text-yellow-500"
      >
        <div className="mr-3 hover:text-yellow-500">{icon}</div>
        {text}
      </Link>
    </li>
  );
};

export default SidebarLink;
