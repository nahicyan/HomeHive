import React, { useContext } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserContext } from "../../utils/UserContext"; // Import user context

// Function to assign status colors
function getStatusClasses(status) {
  switch (status) {
    case "Available":
      return { circle: "bg-green-500", text: "text-green-500" };
    case "Pending":
      return { circle: "bg-yellow-500", text: "text-yellow-500" };
    case "Not Available":
    case "Sold":
      return { circle: "bg-red-500", text: "text-red-500" };
    case "Testing":
      return { circle: "bg-blue-500", text: "text-blue-500" };
    default:
      return { circle: "bg-gray-400", text: "text-gray-400" };
  }
}

export default function PropertyHeaderRight({ propertyData }) {
  const { currentUser } = useContext(UserContext); // Check if user is logged in
  const { status, disPrice, askingPrice, acre } = propertyData || {};
  const { circle, text } = getStatusClasses(status);

  return (
    <div className="w-full flex flex-col items-start text-left lg:items-end lg:text-right">
      <Card className="border-0 bg-transparent shadow-none">
        <CardHeader className="px-4 py-1">
          {/* === Status, Discount Price & Login Button (Same Line) === */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Status Indicator */}
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full animate-pulse-slow ${circle}`}
              />
              <CardDescription className={`text-lg capitalize ${text}`}>
                {status || "Unknown Status"}
              </CardDescription>

              {/* If logged in and there is a discount, show crossed-out askingPrice here */}
              {currentUser && disPrice && (
                <span className="text-gray-500 line-through text-xl">
                  ${askingPrice?.toLocaleString()}
                </span>
              )}
            </div>

            {/* Discount Price & Login Button (Only show if NOT logged in) */}
            {!currentUser && disPrice && (
              <div className="relative flex items-center  mx-2">
                {/* Ghost Button positioned directly on top of the blurred price */}
                <button
                  variant="ghost"
                  className="
        absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        text-base z-10 bg-transparent text-gray-1000 font-semibold
        hover:px-2 hover:py-1 rounded-md 
        hover:bg-gray-200 transition-colors
        cursor-pointer 
        whitespace-nowrap tracking-tight
      "
                  onClick={() => {
                    // Handle login modal or redirect
                  }}
                >
                  Login For Discount
                </button>

                {/* Blurred Discount Price (behind the button) */}
                <span className="filter blur-[2px] text-3xl text-gray-400 font-thin">
                  ${disPrice.toLocaleString()}
                </span>
              </div>
            )}
          </div>

          {/* === Main Price & Acres (With Strike-Through Logic) === */}
          <CardTitle className="text-2xl text-gray-800 font-bold">
            {/* If user is logged in, show askingPrice as crossed-out & replace it with disPrice */}
            {currentUser && disPrice ? (
              <>
                <span className="ml-2 text-2xl font-semibold text-gray-800">
                  ${disPrice?.toLocaleString()}
                </span>
              </>
            ) : (
              <>${askingPrice?.toLocaleString()}</>
            )}
            <span className="ml-2 text-2x1 font-normal text-gray-700  ml-6">
              {acre} Acres
            </span>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* === Action Buttons === */}
      <div className="flex items-center gap-3 px-4 py-2">
        <Button
          className="
      bg-[#324c48]
      text-white
      w-32
      py-2
      text-base
      font-semibold
      uppercase
      rounded-full
      shadow-md
      hover:shadow-lg
      transition-shadow
    "
        >
          Call
        </Button>

        <Button
          className="
      bg-[#324c48]
      text-white
      w-32
      py-2
      text-base
      font-semibold
      uppercase
      rounded-full
      shadow-md
      hover:shadow-lg
      transition-shadow
    "
        >
          Message
        </Button>
      </div>
    </div>
  );
}
