import React from "react";

interface SidebarGroupProps {
  children: React.ReactNode;
}

const SidebarGroup: React.FC<SidebarGroupProps> = ({ children }) => {
  return (
    <div className="flex flex-col gap-y-4 bg-gray-700 p-4 rounded-lg">
      {children}
    </div>
  );
};

export default SidebarGroup;
