import { useRouter, usePathname } from "next/navigation";

export const useOpenAuthModal = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (mode: "login" | "register") => {
    router.push(`${pathname}/?auth=${mode}`);
  };
};
