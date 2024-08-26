import Image from "next/image";
import newWagerLogo from "@/public/logos/new_wager_logo.png";

export default function Header() {
  return (
    <header className="flex justify-between items-center bg-gray-900 py-4 text-white">
      {/* width and height must be specified so image can fill it */}
      <div className="relative w-36 h-full">
        <Image
          src={newWagerLogo}
          alt="Wager Logo"
          priority
          width={120}
          height={40}
        />
      </div>
      <div className="flex space-x-2">
        <button className="bg-gray-800 px-4 py-2 rounded">Login</button>
        <button className="bg-primary px-4 py-2 rounded">Register</button>
      </div>
    </header>
  );
}
