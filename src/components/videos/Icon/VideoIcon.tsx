// src/components/videos/BrokenVideoIcon.tsx
import React from "react";
import BrokenImageIcon from "@mui/icons-material/BrokenImage";
import styles from "../styles/VideoIcon.module.css";

interface BrokenVideoIconProps {
  message?: string;
  width?: number;
  height?: number;
}

const BrokenVideoIcon: React.FC<BrokenVideoIconProps> = ({
  message = "Video unavailable",
  width = 150,
  height = 150,
}) => {
  return (
    <div
      className={styles.main}
      style={{
        width,
        height,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#232323",
        borderRadius: "12px",
        border: "1px solid #444",
        margin: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      }}
    >
      <BrokenImageIcon style={{ fontSize: 48, color: "#888" }} />
      <div
        style={{
          color: "#bbb",
          fontSize: "1rem",
          marginTop: "8px",
          textAlign: "center",
          fontWeight: 500,
        }}
      >
        {message}
      </div>
    </div>
  );
};

export default BrokenVideoIcon;
