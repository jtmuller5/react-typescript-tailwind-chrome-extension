import { useEffect } from "react";

function SidePanel() {
  useEffect(() => {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.type === "UPDATE_FROM_OPTIONS") {
        // Handle the message
        console.log("Received message in SidePanel:", message.payload);
        sendResponse({ status: "Received by SidePanel" });
      }
    });
  }, []);

  return <div className="bg-blue-400">Side Panel</div>;
}

export default SidePanel;
