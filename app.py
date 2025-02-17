from flask import Flask, request, jsonify
from model import recommend_song
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

df_music = pd.read_csv("dataset/spotify_music.csv")
df_music["track_genre"] = df_music["track_genre"].str.lower().str.strip()

@app.route('/recommend', methods=['GET'])
def recommend():
    song_name = request.args.get('song', '')
    if not song_name:
        return jsonify({"error": "Please provide a song name"}), 400

    result = recommend_song(song_name)
    return jsonify(result)

@app.route('/genre_songs', methods=['GET'])
def get_genre_songs():
    genre = request.args.get('genre', '').lower()
    if not genre:
        return jsonify({"error": "Please provide a genre"}), 400
    
    filtered_songs = df_music[df_music["track_genre"].str.lower() == genre][['track_name', 'artists']].dropna()

    filtered_songs = filtered_songs.drop_duplicates(subset=['track_name'])

    # print("filtered_songs after removing duplicates: ", filtered_songs)

    if not filtered_songs.empty:
        return jsonify({"songs": filtered_songs.to_dict(orient="records")})
    else:
        return jsonify({"songs": []})


if __name__ == '__main__':
    app.run(debug=True)
