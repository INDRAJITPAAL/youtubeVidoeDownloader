import { useState } from "react";
import axios from "axios";

export default function App() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const handleDownload = async () => {
    try {
      setError("");
      const response = await axios.get("http://localhost:4000/download", {
        params: { url },
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: "video/mp4" });
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", "video.mp4");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      setError("Download failed. Check the URL and try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">YouTube Video Downloader</h1>

      <input
        type="text"
        placeholder="Enter YouTube URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full border-red-500 max-w-lg px-4 py-2 mb-4 text-white rounded shadow"
      />

      <button
        onClick={handleDownload}
        className="bg-blue-600 hover:bg-blue-700 transition-colors px-6 py-2 rounded font-semibold"
      >
        Download
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}

