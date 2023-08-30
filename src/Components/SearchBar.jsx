import React, { useState, useEffect } from "react";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";

const fetchVideos = async (searchQuery) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${searchQuery}&maxResults=8&key=${URL}`
    );
    const data = await response.json();
        return data.items;
      } catch (error) {
        console.error(`Error fetching initial search results:`, error);
    return [];
    }
};


const SearchBar = ({ URL }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [videos, setVideos] = useState([]);


  useEffect(() => {
    const fetchInitialVids = async () => {
      const data = await fetchVideos(searchQuery);
     setVideos(data);   
    };

    fetchInitialVids();
  }, [searchQuery]);

  const handleSearch =  async (e) => {
    e.preventDefault();
  const data = await fetchVideos(searchQuery);
  setVideos(data);
  
  };

  const onVideoClick = (videoId) => {
    const video = videos.find((video) => video.id.videoId === videoId);
    if (video) {
      alert(`Clicked on video: ${video.snippet.title}`);
    }
  };


  return (
    <div> 
    <form className="d-flex" style={{paddingTop:"30px"}}>

      <input 
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search"
        id="searchInput"
        className="form-control me-2"

      />
       <button type="submit"className="btn btn-primary">
        Search
      </button>

    </form>

      <div className="video-list">
        {videos.map((video) => (
          <Link to={`/video/${video.id.videoId}`} key={video.id.videoId}>
            <VideoCard key={video.id.videoId} onVideoClick={onVideoClick} />
          </Link>
        ))}
      </div>

    </div>
  );
};

export default SearchBar;
