import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VideoList = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/videos');
        setVideos(res.data);
      } catch (err) {
        console.error('Error fetching videos:', err);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Uploaded Videos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video) => (
          <div key={video._id} className="border p-2 rounded shadow">
            <video controls className="w-full">
              <source src={video.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <h3 className="text-lg mt-2 font-semibold">{video.title}</h3>
            <p className="text-sm">{video.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoList;
