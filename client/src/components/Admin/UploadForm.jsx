import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function UploadForm() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // ✅ Route protection based on isAdmin token claim
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    try {
      const { isAdmin } = JSON.parse(atob(token.split('.')[1]));
      if (!isAdmin) {
        navigate('/');
      }
    } catch (err) {
      console.error("Invalid token", err);
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!videoFile || !thumbnailFile) {
      setError('Both video and thumbnail are required.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('video', videoFile);
    formData.append('thumbnail', thumbnailFile);

    try {
      const token = localStorage.getItem('token');

      const res = await axios.post('http://localhost:5000/api/videos/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess('Upload successful!');
      setTitle('');
      setCategory('');
      setVideoFile(null);
      setThumbnailFile(null);
    } catch (err) {
      console.error(err);
      setError('Upload failed. Please try again.');
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Admin Upload</h2>

      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      {success && <p className="text-green-600 mb-4 text-center">{success}</p>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Title</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Category</label>
          <input
            type="text"
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Video File</label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideoFile(e.target.files[0])}
            required
            className="w-full"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-semibold">Thumbnail Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setThumbnailFile(e.target.files[0])}
            required
            className="w-full"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded"
        >
          Upload
        </button>
      </form>
    </div>
  );
}

export default UploadForm;
