import Link from "next/link";
import React from "react";
import clsx from "clsx";

type SidebarLinkProps = {
  href: string;
  icon: React.ReactNode;
  text: string;
  disabled?: boolean; // Optional disabled prop
  isExpanded: boolean; // New prop to indicate whether the sidebar is expanded or collapsed
};

const SidebarLink: React.FC<SidebarLinkProps> = ({
  href,
  icon,
  text,
  disabled = false,
  isExpanded,
}) => {
  return (
    <li>
      <Link
        href={href}
        className={clsx("flex items-center text-white gap-x-3", {
          "pointer-events-none text-gray-500 cursor-not-allowed": disabled, // no pointer events and text grey
          "text-white hover:text-yellow-500": !disabled, // normal styling
          "justify-center": !isExpanded, // Center icon if sidebar is collapsed
        })}
        aria-disabled={disabled} // Accessibility: indicate the link is disabled
        tabIndex={disabled ? -1 : undefined} // Prevent focus if disabled
      >
        <div>{icon}</div>
        {isExpanded && <span>{text}</span>}
      </Link>
    </li>
  );
};

export default SidebarLink;
