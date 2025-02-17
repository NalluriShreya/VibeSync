#! D:\Music_Recommendation_System\myenv\Scripts\python.exe

import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import StandardScaler
import numpy as np

df_music = pd.read_csv("dataset/spotify_music.csv")

features = ['danceability', 'energy', 'key', 'loudness', 'mode', 'speechiness',
            'acousticness', 'instrumentalness', 'liveness', 'valence', 'tempo']

df_music_selected = df_music[['track_name', 'artists'] + features].dropna()

# print(df_music_selected.shape)
print(df_music_selected.drop_duplicates(inplace=True))
# print(df_music_selected.shape)

scaler_music = StandardScaler()
df_music_selected[features] = scaler_music.fit_transform(df_music_selected[features])



def recommend_song(song_name, num_songs=5):
    song_row = df_music_selected[df_music_selected['track_name'].str.lower() == song_name.lower()]
    
    if song_row.empty:
        return {"error": "Song not found in dataset"}

    song_features = song_row[features].values
    all_features = df_music_selected[features].values

    similarities = cosine_similarity(song_features, all_features)[0]

    top_indices = np.argsort(similarities)[::-1][1:num_songs + 1]

    recommendations = df_music_selected.iloc[top_indices][['track_name', 'artists']].to_dict(orient='records')
    return {"recommendations": recommendations}

