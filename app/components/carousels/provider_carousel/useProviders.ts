import { useState, useEffect } from "react";
import { Provider } from "./types";
const providers: Provider[] = [
  {
    id: 1,
    name: "BTG",
    imageUrl: "/images/providers/btg.svg",
  },
  {
    id: 2,
    name: "Bullshark",
    imageUrl: "/images/providers/bullshark.svg",
  },
  {
    id: 3,
    name: "Evolution",
    imageUrl: "/images/providers/evolution.svg",
  },
  {
    id: 4,
    name: "Fantasma",
    imageUrl: "/images/providers/fantasma.svg",
  },
  {
    id: 5,
    name: "Four Leaf Gaming",
    imageUrl: "/images/providers/fourleafgaming.svg",
  },
  {
    id: 6,
    name: "Golden Hero",
    imageUrl: "/images/providers/goldenhero.svg",
  },
  {
    id: 7,
    name: "Hacksaw Gaming",
    imageUrl: "/images/providers/hacksawgaming.svg",
  },
  {
    id: 8,
    name: "NetEnt",
    imageUrl: "/images/providers/netent.svg",
  },
  {
    id: 9,
    name: "Nolimit City",
    imageUrl: "/images/providers/nolimit.svg",
  },
  {
    id: 10,
    name: "Popiplay",
    imageUrl: "/images/providers/popiplay.svg",
  },
  {
    id: 11,
    name: "Pragmatic Play",
    imageUrl: "/images/providers/pragmaticplay.svg",
  },
  {
    id: 12,
    name: "Pragmatic Play Live",
    imageUrl: "/images/providers/pragmaticlive.svg",
  },
  {
    id: 13,
    name: "Print Studios",
    imageUrl: "/images/providers/printstudios.svg",
  },
  {
    id: 14,
    name: "Push Gaming",
    imageUrl: "/images/providers/pushgaming.svg",
  },
  {
    id: 15,
    name: "Relax Gaming",
    imageUrl: "/images/providers/relagaming.svg",
  },
  {
    id: 16,
    name: "Shuffle",
    imageUrl: "/images/providers/shuffle.svg",
  },
  {
    id: 17,
    name: "Slotmill",
    imageUrl: "/images/providers/slotmill.svg",
  },
  {
    id: 18,
    name: "Spinomenal",
    imageUrl: "/images/providers/spinomenal.svg",
  },
  {
    id: 19,
    name: "Truelab",
    imageUrl: "/images/providers/truelab.svg",
  },
  {
    id: 20,
    name: "Wazdan",
    imageUrl: "/images/providers/wazdan.svg",
  },
  {
    id: 21,
    name: "Winfast",
    imageUrl: "/images/providers/winfast.svg",
  },
];
export const useProviders = () => {
  const [selectedProviders, setSelectedProviders] = useState<Provider[]>([]);

  useEffect(() => {
    setSelectedProviders(providers);
  }, []);

  return selectedProviders;
};
