import React from "react";

const LoadingScreen: React.FC = () => {
  const videoHtml = `
    <video autoplay loop muted class="w-1/12 h-auto">
      <source src="/videos/WagerAnimation.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <script>
      document.currentScript.parentElement.querySelector('video').playbackRate = 2.0;
    </script>
  `;

  return (
    <div
      dangerouslySetInnerHTML={{ __html: videoHtml }}
      suppressHydrationWarning
      className="w-full h-full flex flex-col items-center justify-center bg-black"
    ></div>
  );
};

export default LoadingScreen;
