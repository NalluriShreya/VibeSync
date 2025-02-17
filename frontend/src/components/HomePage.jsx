"use client";
import { useState } from "react";
import styles from "./HomePage.module.css";
import GenreList from "./GenreList";

const HomePage = () => {
  const [song, setSong] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  const fetchRecommendations = async () => {
    if (!song) return;

    try {
      const response = await fetch(`http://127.0.0.1:5000/recommend?song=${encodeURIComponent(song)}`);
      const data = await response.json();
      if (data.error) {
        alert(data.error);
      } else {
        setRecommendations(data.recommendations);
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  return (
    <div className={styles.mainContainer}>
        <div className={styles.container}>
            <h1>Discover New Music</h1>
            <p className={styles.desc}>Recommendations based on your favoutite songs</p>
            <input 
                type="text" 
                placeholder="Enter a song name..." 
                value={song} 
                onChange={(e) => setSong(e.target.value)} 
                className={styles.input}
            />
            <button onClick={fetchRecommendations} className={styles.recButton}>Get Recommendations</button>

            {recommendations.length > 0 && (
                <ul className={styles.recommendations}>
                {recommendations.map((rec, index) => (
                    <li key={index}><span className={styles.trackName}>{rec.track_name}</span> - <span>{rec.artists}</span></li>
                ))}
                </ul>
            )}
        </div>
        <div className={styles.genreContainer}>
            <h2>Prefered Genres</h2>
            <GenreList/>
        </div>
    </div>    
  );
}

export default HomePage;