import { useState } from "react";
import axios from "axios";

const StatsViewer = () => {
  const [code, setCode] = useState("");
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  const getStats = async () => {
    setError("");
    try {
      const res = await axios.get(`https://url-shortner-xclh.onrender.com/stats/${code}`);
      setStats(res.data);
    } catch (err) {
      setError("No stats found for this code.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl border-1 shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-center text-gray-700">Get URL Stats</h2>
      <div className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Enter short code..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg"
        />
        <button
          onClick={getStats}
          className="bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
        >
          Get Stats
        </button>
      </div>

      {stats && (
        <div className="mt-6 text-sm text-gray-800">
          <p><strong>Original URL:</strong> {stats.originalUrl}</p>
          <p><strong>Clicks:</strong> {stats.clickCount}</p>
          <p><strong>Created:</strong> {new Date(stats.createdAt).toLocaleString()}</p>
        </div>
      )}

      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
    </div>
  );
};

export default StatsViewer;
