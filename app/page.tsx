import Image from "next/image";
import Carousel from "./components/Carousel";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Carousel />
      // ... existing content ...
    </main>
  );
}
