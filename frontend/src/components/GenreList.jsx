import { useState } from "react";
import styles from "./GenreList.module.css";
import GenreCard from "./GenreCard";

const GenreList = () => {
    const [songs, setSongs] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(null);

    const genres = [
        "Pop", "Rock", "Hip-Hop", "Jazz", "Classical",
        "Electronic", "Country", "Metal", "Reggae"
    ];

    const fetchSongs = async (genre) => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/genre_songs?genre=${genre}`);
            const data = await response.json();
            if (data.songs) {
                setSongs(data.songs);
                setSelectedGenre(genre);
            } else {
                setSongs([]);
                setSelectedGenre(null);
            }
        } catch (error) {
            console.error("Error fetching songs:", error);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.genreCards}>
                {genres.map((genre) => (
                    <GenreCard key={genre} name={genre} onClick={() => fetchSongs(genre)} />
                ))}
            </div>
            
            {selectedGenre && (
                <div className={styles.songList}>
                    <h2>Songs in {selectedGenre}</h2>
                    <ul className={styles.songs}>
                        {songs.length > 0 ? (
                            songs.map((song, index) => (
                                <li key={index}>{song.track_name} - {song.artists}</li>
                            ))
                        ) : (
                            <p>No songs available for this genre.</p>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default GenreList;
