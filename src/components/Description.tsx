import React from "react";
import { Roboto } from "next/font/google";

const roboto = Roboto({ weight: "700", subsets: ["latin"] });

const Description = React.memo(({ viewCount, description }: { viewCount: number; description: string }) => {
  return (
    <div className="mt-3 text-white">
      <h1 className={roboto.className}>{viewCount} views</h1>
      <p className="mt-2">{description}</p>
    </div>
  );
});

export default Description;
