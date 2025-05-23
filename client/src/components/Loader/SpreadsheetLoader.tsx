import { useState, useEffect } from "react";

export default function SpreadsheetLoader({ isLoading = true }) {
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    if (!isLoading) return;

    const timer = setTimeout(() => {
      setShouldRender(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [isLoading]);

  if (!isLoading && !shouldRender) {
    return null;
  }

  return (
    <div className="w-[600px] h-[600px] flex items-center justify-center bg-[#171923]">
      <div className="relative flex items-center justify-center">
        {/* Outer circle with slow pulse */}
        <div
          className="absolute w-52 h-52 rounded-full bg-[#44337A]/30 animate-pulse"
          style={{ animationDuration: "3s" }}
        ></div>

        {/* Middle circle with medium pulse */}
        <div
          className="absolute w-48 h-48 rounded-full bg-[#553C9A]/40 animate-pulse"
          style={{ animationDuration: "2.5s" }}
        ></div>

        {/* Inner circle with faster pulse */}
        <div
          className="absolute w-32 h-32 rounded-full bg-[#6B46C1]/50 animate-pulse"
          style={{ animationDuration: "2s" }}
        ></div>

        {/* Content container */}
        <div className="z-10 text-center space-y-3">
          <h2 className="text-3xl font-extrabold text-white tracking-wide font-sans">
            Connecting...
          </h2>
          <p className="text-[#E9D8FD] text-base font-medium font-sans leading-relaxed">
            Hang on tight! We are connecting to your Google Sheet.
          </p>
        </div>
      </div>
    </div>
  );
}
