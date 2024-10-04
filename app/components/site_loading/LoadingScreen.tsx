import React from "react";

const LoadingScreen: React.FC = () => {
  const videoHtml = `
    <video autoplay loop muted class="w-32 h-32">
      <source src="/videos/WagerAnimation.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  `;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-black">
      <div
        dangerouslySetInnerHTML={{ __html: videoHtml }}
        suppressHydrationWarning
      />
    </div>
  );
};

export default LoadingScreen;
