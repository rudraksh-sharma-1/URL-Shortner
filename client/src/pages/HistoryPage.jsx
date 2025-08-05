import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const HistoryPage = () => {
  const { token } = useAuth();
  const [urls, setUrls] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const limit = 5;

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/user/urls?page=${page}&limit=${limit}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUrls(res.data.urls);
        setTotalPages(res.data.totalPages);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching history:", err);
        setLoading(false);
      }
    };

    fetchUrls();
  }, [page, token]);

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">Your URL History</h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : urls.length === 0 ? (
        <p className="text-center text-gray-500">No shortened URLs found.</p>
      ) : (
        <>
          <div className="space-y-4">
            {urls.map((url) => (
              <div
                key={url._id}
                className="border border-gray-200 rounded-md p-4 shadow-sm bg-white"
              >
                <p><strong>Original:</strong> <a href={url.originalUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline">{url.originalUrl}</a></p>
                <p><strong>Short:</strong> <a href={`https://url-shortner-xclh.onrender.com/${url.shortCode}`} target="_blank" rel="noreferrer" className="text-green-600 underline">{`http://localhost:5000/${url.shortCode}`}</a></p>
                <p><strong>Clicks:</strong> {url.clickCount}</p>
                <p><strong>Created:</strong> {new Date(url.createdAt).toLocaleString()}</p>
              </div>
            ))}
          </div>

          {/* Pagination Buttons */}
          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={handlePrev}
              disabled={page === 1}
              className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="font-medium self-center">Page {page} of {totalPages}</span>
            <button
              onClick={handleNext}
              disabled={page === totalPages}
              className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default HistoryPage;
