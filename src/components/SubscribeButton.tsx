import React from "react";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";

const SubscribeButton = React.memo(
  ({ subscribed, toggleSubscribe }: { subscribed: boolean; toggleSubscribe: () => void }) => {
    return (
      <div>
        <button
          className={`py-2 px-4 mr-2 shadow-md no-underline rounded-full text-white font-sans font-semibold text-sm border-red 
          ${subscribed ? "bg-gray-700" : "bg-red-600 hover:bg-red-700"}`}
          onClick={toggleSubscribe}
        >
          {subscribed ? "Subscribed" : "Subscribe"}
        </button>
        {subscribed && (
          <NotificationsOutlinedIcon fontSize="medium" sx={{ color: "lightgrey" }} />
        )}
      </div>
    );
  }
);

export default SubscribeButton;
