from fastapi import APIRouter, Depends
from fastapi.responses import RedirectResponse
import os
from spotipy.oauth2 import SpotifyOAuth
from queries.spotify import SpotifyRepo

router = APIRouter()

# @router('/spotifyLogin/')
# def login():
#   sp_oauth = create_spotify_oauth()
#   auth_url = sp_oauth.get_authorize_url()
#   return RedirectResponse(auth_url)

# @router('/redirect/')
# def redirect():
#   return "redirect"

@router.post('/api/spotifyToken/{code}')
def getToken(
  code: str,
  repo: SpotifyRepo = Depends()
):
  return repo.get_token(code)

# def create_spotify_oauth():
#   return SpotifyOAuth(
#           client_id=os.environ['SPOTIPY_CLIENT_ID'],
#           client_secret=os.environ['SPOTIPY_CLIENT_SECRET'],
#           redirect_uri=router.url_path_for('redirect'),
#           scope="playlist-modify-private")
