function Options() {
  const sendMessage = () => {
    chrome.runtime.sendMessage(
      { type: "UPDATE_FROM_OPTIONS", payload: "Hello SidePanel" },
      (response) => {
        console.log("Response from SidePanel:", response);
      }
    );
  };

  return (
    <div className="App">
      Options
      <button onClick={sendMessage}>Send Message to SidePanel</button>
    </div>
  );
}

export default Options;
