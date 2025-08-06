import React, { useEffect, useState } from "react";

export default function UploadingDots() {
  const [dotCount, setDotCount] = useState<number>(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prev) => (prev === 3 ? 1 : prev + 1));
    }, 500); // Change dot every 0.5s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center">
      <p className="mr-2">Uploading</p>
      <span className="text-lg font-bold transition-all duration-300">
        {".".repeat(dotCount)}
      </span>
    </div>
  );
}
