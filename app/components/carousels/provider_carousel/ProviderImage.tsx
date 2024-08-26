import React from "react";
import { Provider } from "./types";

interface ProviderImageProps {
  provider: Provider;
}

const ProviderImage: React.FC<ProviderImageProps> = ({ provider }) => (
  <div className="flex-shrink-0 snap-start">
    <img src={provider.imageUrl} alt={provider.name} className="h-14 w-auto" />
  </div>
);

export default ProviderImage;
