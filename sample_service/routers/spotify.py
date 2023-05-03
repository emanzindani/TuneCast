from fastapi import APIRouter, Depends
from queries.spotify import SpotifyRepo

router = APIRouter()


@router.get("/api/spotifyToken/")
def getToken(repo: SpotifyRepo = Depends()):
    return repo.get_token()


@router.get("/api/spotifySearch/{token}/{weather}/")
def get_playlist(token: str, weather: str, repo: SpotifyRepo = Depends()):
    return repo.get_playlist(token, weather)
