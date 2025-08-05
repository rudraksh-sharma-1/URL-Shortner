import { useState } from "react";
import axios from "axios";

const ShortenerForm = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post("https://url-shortner-xclh.onrender.com/shorten", { originalUrl });
      setShortUrl(res.data.shortUrl);
    } catch (err) {
      setError("Failed to shorten URL.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-2xl border-1 shadow-xl">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">URL Shortener</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="url"
          placeholder="Enter long URL..."
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          required
          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Shortening..." : "Shorten URL"}
        </button>
      </form>

      {shortUrl && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">Shortened URL:</p>
          <a href={shortUrl} target="_blank" className="text-blue-600 font-semibold underline">
            {shortUrl}
          </a>
        </div>
      )}

      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
    </div>
  );
};

export default ShortenerForm;
