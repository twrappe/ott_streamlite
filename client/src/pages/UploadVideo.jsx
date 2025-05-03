// client/src/pages/UploadVideo.jsx
import React, { useState } from "react";
import axios from "axios";

const UploadVideo = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleVideoUpload = async (e) => {
    e.preventDefault();

    if (!videoFile) return setMessage("Please select a video to upload.");

    try {
      // Step 1: Upload video file to Cloudinary (via backend)
      const formData = new FormData();
      formData.append("video", videoFile);

      const uploadRes = await axios.post(
        "http://localhost:5000/api/videos/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const videoUrl = uploadRes.data.videoUrl;

      // Step 2: Send metadata to backend
      const metadataRes = await axios.post(
        "http://localhost:5000/api/videos",
        { title, description, videoUrl },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setMessage("Upload successful!");
      setTitle("");
      setDescription("");
      setVideoFile(null);
    } catch (err) {
      console.error(err);
      setMessage("Upload failed.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Upload New Video</h2>
      <form onSubmit={handleVideoUpload}>
        <input
          type="text"
          placeholder="Title"
          className="block w-full mb-2 p-2 border"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          className="block w-full mb-2 p-2 border"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="file"
          accept="video/*"
          className="block mb-4"
          onChange={(e) => setVideoFile(e.target.files[0])}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Upload
        </button>
        {message && <p className="mt-4 text-sm">{message}</p>}
      </form>
    </div>
  );
};

export default UploadVideo;
