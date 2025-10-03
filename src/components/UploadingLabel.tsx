// components/UploadingLabel.tsx
import React, { useEffect, useState } from "react";
import clsx from "clsx";

type Props = {
  uploading: boolean;
  uploaded: boolean;
  progress?: number; // 0–100
  defaultText: string;
  uploadingText?: string;
  uploadedText?: string;
};

export const UploadingLabel: React.FC<Props> = ({
  uploading,
  uploaded,
  progress = 0,
  defaultText,
  uploadingText = "Uploading",
  uploadedText = "Uploaded",
}) => {
  // Dots fallback animation (if progress not provided)
  const [dots, setDots] = useState("");

  useEffect(() => {
    if (!uploading) {
      setDots("");
      return;
    }
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);
    return () => clearInterval(interval);
  }, [uploading]);

  // class for shimmer or styling
  const baseClasses = "block mb-2 text-sm font-medium";
  const shimmer = uploading ? "animate-pulse" : "";
  const colorClass = uploading
    ? "text-green-400"
    : uploaded
    ? "text-green-600"
    : "text-gray-400";

  let labelText: string;
  if (uploading) {
    // If progress > 0, show it. Otherwise fallback to dots.
    if (progress > 0) {
      labelText = `${uploadingText} ${progress.toFixed(0)}%`;
    } else {
      labelText = `${uploadingText}${dots}`;
    }
  } else if (uploaded) {
    labelText = `${uploadedText} (100%)`;
  } else {
    labelText = defaultText;
  }

  return (
    <label className={clsx(baseClasses, colorClass, shimmer)}>
      {labelText}
    </label>
  );
};

export default UploadingLabel;
