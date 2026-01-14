import React, { useState } from "react";
import Header from "../Header";
import LeftHeader from "../LeftHeader";
import { useSelector } from "react-redux";
import { rootState } from "../../../store";

type Props = {
  children: React.ReactNode;
};

const HEADER_HEIGHT = 64;
const SIDEBAR_EXPANDED = 240;
const SIDEBAR_COLLAPSED = 72;

const AppLayout: React.FC<Props> = ({ children }) => {
  const densityClicked = useSelector(
    (state: rootState) => state.headerDensity.headerDensityClicked
  );

  const [searchText, setSearchText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchText.trim()) return;
    console.log("Searching:", searchText);
  };

  const sidebarWidth = densityClicked
    ? SIDEBAR_COLLAPSED
    : SIDEBAR_EXPANDED;

  return (
    <div className="bg-[#181818] min-h-screen">
      {/* FIXED HEADER */}
      <Header
        searchText={searchText}
        setSearchText={setSearchText}
        handleSubmit={handleSubmit}
      />

      {/* FIXED SIDEBAR */}
      <LeftHeader
        densityClicked={densityClicked}
        searchText={searchText}
        setSearchText={setSearchText}
        handleSubmit={handleSubmit}
      />

      {/* MAIN CONTENT */}
      <main
        style={{
          marginLeft: sidebarWidth,
          marginTop: "10px",
          transition: "margin-left 0.25s ease",
        }}
        className="min-h-[calc(100vh-64px)] overflow-x-hidden"
      >
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
