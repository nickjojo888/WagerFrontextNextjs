import Link from "next/link";
import React, { useState } from "react";
import clsx from "clsx";
import Tooltip from "./Tooltip";

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
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <li
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <Link
        href={href}
        className={clsx("flex items-center gap-x-3", {
          "pointer-events-none text-gray-500 cursor-not-allowed": disabled, // no pointer events and text grey
          "text-white hover:text-yellow-500": !disabled, // normal styling
          "justify-center": !isExpanded, // Center icon if sidebar is collapsed
        })}
        aria-disabled={disabled} // Accessibility: indicate the link is disabled
        tabIndex={disabled ? -1 : undefined} // Prevent focus if disabled
      >
        <div>
          {icon}
          {!isExpanded && !disabled && showTooltip && <Tooltip text={text} />}
        </div>
        {isExpanded && <span>{text}</span>}
      </Link>
    </li>
  );
};

export default SidebarLink;
