import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShieldAlert, History, Settings } from "lucide-react";

function App() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [activePage, setActivePage] = useState("home");

  const checkScam = async () => {
    if (!url) return;

    // Placeholder API simulation
    let response = {
      isScam: url.includes("free") || url.includes("gift"),
      reasons: ["Suspicious keyword detected in URL"],
    };

    setResult(response);
    setHistory([{ url, ...response }, ...history]);
    setUrl("");
  };

  const renderHome = () => (
    <div className="flex flex-col items-center mt-10 p-4">
      <motion.h1
        className="text-3xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        🛡 Jan Suraksha
      </motion.h1>

      <div className="w-full max-w-md flex gap-2">
        <input
          type="text"
          placeholder="Enter URL or UPI ID..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-grow px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={checkScam}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Check
        </button>
      </div>

      {result && (
        <motion.div
          className={`mt-6 w-full max-w-md p-4 rounded-lg shadow ${
            result.isScam ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {result.isScam ? (
            <>
              <p className="font-semibold">⚠ Unsafe link detected!</p>
              <ul className="list-disc ml-5">
                {result.reasons.map((reason, i) => (
                  <li key={i}>{reason}</li>
                ))}
              </ul>
            </>
          ) : (
            <p className="font-semibold">✅ This link looks safe.</p>
          )}
        </motion.div>
      )}
    </div>
  );

  const renderHistory = () => (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">History</h2>
      {history.length === 0 ? (
        <p>No history yet.</p>
      ) : (
        <ul className="space-y-2">
          {history.map((item, i) => (
            <li
              key={i}
              className={`p-3 rounded-lg shadow ${
                item.isScam ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"
              }`}
            >
              <p className="font-medium">{item.url}</p>
              <p className="text-sm">
                {item.isScam ? "Scam detected" : "Safe"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  const renderSettings = () => (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Settings</h2>
      <p className="text-gray-600">Choose apps for scam notifications (Coming soon 🚧)</p>
    </div>
  );

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow overflow-y-auto">
        {activePage === "home" && renderHome()}
        {activePage === "history" && renderHistory()}
        {activePage === "settings" && renderSettings()}
      </div>

      <nav className="flex justify-around bg-white border-t py-2">
        <button
          onClick={() => setActivePage("home")}
          className={`flex flex-col items-center ${
            activePage === "home" ? "text-blue-600" : "text-gray-500"
          }`}
        >
          <ShieldAlert />
          <span className="text-xs">Home</span>
        </button>
        <button
          onClick={() => setActivePage("history")}
          className={`flex flex-col items-center ${
            activePage === "history" ? "text-blue-600" : "text-gray-500"
          }`}
        >
          <History />
          <span className="text-xs">History</span>
        </button>
        <button
          onClick={() => setActivePage("settings")}
          className={`flex flex-col items-center ${
            activePage === "settings" ? "text-blue-600" : "text-gray-500"
          }`}
        >
          <Settings />
          <span className="text-xs">Settings</span>
        </button>
      </nav>
    </div>
  );
}

export default App;
