import React from "react";
import SettingsLink from "./SettingsLink";

const menuItems = [
  { label: "Account", path: "/settings/account" },
  { label: "Details", path: "/settings/details" },
  { label: "Verify", path: "/settings/verify" },
  { label: "Security", path: "/settings/security" },
  { label: "Preferences", path: "/settings/preferences" },
];

const SettingsLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold mt-8 mb-6">Settings</h1>
      <div className="mb-4 overflow-x-auto">
        <div className="inline-flex gap-2 bg-gray-800 p-2 rounded-lg whitespace-nowrap">
          {menuItems.map((item) => (
            <SettingsLink key={item.path} {...item} />
          ))}
        </div>
      </div>
      <div className="border border-gray-600 p-5 rounded-md shadow-md">
        {children}
      </div>
    </div>
  );
};

export default SettingsLayout;
