import React, { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { Link } from "react-router-dom";
import { stateList } from "./StateList.jsx";
import imageContent from "./music-cloud.png";
import Snowfall from 'react-snowfall'
import * as klouds from "klouds";
import { makeItRain } from './rain.js'




const MainPage = () => {
  const [currentPlaylist, setCurrentPlaylist] = useState("");
  const [currentStateAbr, setCurrentStateAbr] = useState("");
  const [currentCity, setCurrentCity] = useState("");
  const [currentLocation, setCurrentLocation] = useState();
  const [accessToken, setAccessToken] = useState("");
  const [currentWeather, setCurrentWeather] = useState("");
  const [cloudSpeed, setCloudSpeed] = useState(0)
  const { token, fetchWithToken } = useToken();
  const [cloud1Color, setCloud1Color] = useState("#cdcece")
  const [cloud2Color, setCloud2Color] = useState("#ffffff")
  const [cloudBgColor, setCloudBgColor] = useState("#aee9f7")


  function RandomNum(num) {
    if (num > 10) {
      num = 10;
    }
    var maxNumber = num;
    var randomNumber = Math.floor(Math.random() * maxNumber + 1);
    return randomNumber;
  }

  const handleCity = (e) => {
    const city = e.target.value;
    setCurrentCity(city);
  };

  const handleState = (e) => {
    const state = e.target.value;
    setCurrentStateAbr(state);
  };

  const handleInputLocation = async (e) => {
    e.preventDefault();
    const weatherUrl = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/open_weather_api/${currentCity}/${currentStateAbr}/`;
    const response = await fetch(weatherUrl);
    if (response.ok) {
      const data = await response.json();
      const location = {
        city: currentCity.toUpperCase(),
        principalSubdivisionCode: currentStateAbr,
      };
      const weatherResult = data["weather"][0]["main"]
      if (weatherResult === "Clear"){
        setCurrentWeather("Sunny");
        setCloudSpeed(1)
        setCloud1Color('#cdcece')
        setCloud2Color('#ffffff')
      } else if (weatherResult === "Clouds"){
        setCurrentWeather("Cloudy");
        setCloudSpeed(3)
        setCloud1Color('#474849')
        setCloud2Color('#838383')
      } else if (weatherResult === "Thunderstorm"){
        setCurrentWeather("Stormy");
      } else if (weatherResult === "Drizzle" || weatherResult === "Rain"){
        setCurrentWeather("Rainy");
        setCloudSpeed(5)
        setCloud1Color('#474849')
        setCloud2Color('#838383')
      } else if (weatherResult === "Snow"){
        setCurrentWeather("Snowy");
        setCloudSpeed(-1)
        setCloud1Color('#cdcece')
        setCloud2Color('#ffffff')
      } else {
        setCurrentWeather("");
      }
      setCurrentLocation(location);
    }
  };

  const handleCurrentLocation = async () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    async function success(pos) {
      const crd = pos.coords;

      const locationUrl = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/open_weather_api/${crd.longitude}_${crd.latitude}/`;
      const response = await fetch(locationUrl);
      if (response.ok) {
        const data = await response.json();
        const weatherResult = data["weather"][0]["main"]
        if (weatherResult === "Clear"){
          setCurrentWeather("Sunny");
          setCloudSpeed(1)
          setCloud1Color('#cdcece')
          setCloud2Color('#ffffff')
        } else if (weatherResult === "Clouds"){
          setCurrentWeather("Cloudy");
          setCloudSpeed(3)
          setCloud1Color('#474849')
          setCloud2Color('#838383')
        } else if (weatherResult === "Thunderstorm"){
          setCurrentWeather("Stormy");
        } else if (weatherResult === "Drizzle" || weatherResult === "Rain"){
          setCurrentWeather("Rainy");
          setCloudSpeed(5)
          setCloud1Color('#474849')
          setCloud2Color('#838383')
        } else if (weatherResult === "Snow"){
          setCurrentWeather("Snowy");
          setCloudSpeed(-1)
          setCloud1Color('#cdcece')
          setCloud2Color('#ffffff')
        } else {
          setCurrentWeather("");
        }
      }

      const currentLocationUrl = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/location/${crd.longitude}_${crd.latitude}/`;
      const currentLocationresponse = await fetch(currentLocationUrl);
      if (currentLocationresponse.ok) {
        const currentLocationData = await currentLocationresponse.json();
        const cityUpper = currentLocationData["city"].toUpperCase();
        const stateSlice =
          currentLocationData["principalSubdivisionCode"].slice(3);
        const data = {
          city: cityUpper,
          principalSubdivisionCode: stateSlice,
        };

        setCurrentLocation(data);
      }
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  useEffect(() => {
    const getSpotifyToken = async () => {
      const spotifyUrl = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/spotifyToken/`;
      const response = await fetch(spotifyUrl);
      if (response.ok) {
        const data = await response.json();
        setAccessToken(data.access_token);
      }
    };
    getSpotifyToken();
  }, []);

  useEffect((e) => {
    //  klouds.create({
    //     selector: '#my-canvas1',
    //     layerCount: 5,
    //     speed: cloudSpeed,
    //     cloudColor1: '#cdcece',
    //     cloudColor2: '#ffffff',
    //     bgColor: '#aee9f7'
    // })


    klouds.create({
        selector: '#my-canvas1',
        layerCount: 5,
        speed: cloudSpeed,
        cloudColor1: cloud1Color,
        cloudColor2: cloud2Color,
        bgColor: cloudBgColor
    })
    klouds.create({
        selector: '#my-canvas2',
        layerCount: 5,
        speed: cloudSpeed,
        cloudColor1: cloud1Color,
        cloudColor2: cloud2Color,
        bgColor: cloudBgColor
    })
  }, [cloudSpeed]);

  useEffect(() => {
    if (currentWeather !== "") {
      const getSpotifyPlaylists = async () => {
        try {
          const spotifySearchUrl = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/spotifySearch/${accessToken}/${currentWeather}/`;
          const response = await fetch(spotifySearchUrl);
          if (response.ok) {
            const data = await response.json();
            const randomNumber = RandomNum(data.playlists.total);
            const playlistUrl =
              data.playlists.items[randomNumber - 1]["external_urls"][
                "spotify"
              ];
            setCurrentPlaylist(playlistUrl);
          }
        } catch (err) {
          return;
        }
      };
      getSpotifyPlaylists();
    }
  }, [currentWeather, accessToken]);

  useEffect(() => {
    (async () => {
      try {
        const weather = currentWeather;
        const historyUrl = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/history/`;
        const historyData = {
          date: new Date().toLocaleDateString(),
          weather: weather,
          playlist: currentPlaylist,
        };
        const historyHeaders = {
          "Content-Type": "application/json",
        };
        const historyOptions = {
          body: JSON.stringify(historyData),
        };

        if (token) {
          const response = await fetchWithToken(
            historyUrl,
            "POST",
            historyHeaders,
            historyOptions
          );
          if (response.ok) {
          }
        }
      } catch (err) {
        return;
      }
    })();
  }, [currentPlaylist, currentWeather,fetchWithToken, token]);

  makeItRain();



  // Weather Selector

  const weatherSelector = (e) => {
    e.preventDefault()
    let weather = e.target.value
    setCurrentWeather(weather)
    if (weather === "Sunny"){
          setCloudSpeed(1)
          setCloud1Color('#cdcece')
          setCloud2Color('#ffffff')
        } else if (weather === "Cloudy"){
          setCloudSpeed(3)
          setCloud1Color('#474849')
          setCloud2Color('#838383')
        } else if (weather === "Rainy"){
          setCloudSpeed(5)
          setCloud1Color('#474849')
          setCloud2Color('#838383')
        } else if (weather === "Snowy"){
          setCloudSpeed(-1)
          setCloud1Color('#cdcece')
          setCloud2Color('#ffffff')
        }
  }

  const cloudSpeedInput = (e) => {
    e.preventDefault()
    setCloudSpeed(e.target.value)
    console.log(e.target.value)
  }


  return (
    <>
      <canvas id="my-canvas1"></canvas>
      <canvas id="my-canvas2"></canvas>

      <div id="bottom-background"></div>

      <div className="input-group mb-3 d-flex justify-content-end">
        <select
        onChange={weatherSelector}
        className="form-control border border-dark"
        id="inputGroupSelect01"
        style={{
                  backgroundColor: "rgba(252, 252, 252, 0)",
                  width: "5vw",
                  position: "fixed"
                }}
        >
          <option defaultValue>Weather</option>
          <option value="Sunny">Sun</option>
          <option value="Rainy">Rain</option>
          <option value="Snowy">Snow</option>
          <option value="Cloudy">Cloudy</option>
        </select>
      </div>

      <input
              onChange={cloudSpeedInput}
              type="range"
              className="form-range"
              min="-20"
              max="20"
              id="customRange2"
              ></input>

      {currentWeather === "Sunny" && (
        <div id="sun">
          <div id="rings">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}

      {currentWeather === "Rainy" && (
        <div id="rain-container">
          <div className="rain front-row"></div>
          <div className="rain back-row"></div>
        </div>
      )}

      {currentWeather === "Snowy" && (
        <Snowfall />
      )}

      <div
        id="player-card"
        className="card mb-3 px-4 py-5 my-5 text-center shadow"
        style={{
          width: "50vw",
          margin: "0 0 0 25vw",
          backgroundColor: "rgba(252, 252, 252, 0.4)",
        }}
      >


        <h1 className="display-5 fw-bold">
          <Link className="navbar-brand" href="#">
            <img
              src={imageContent}
              width="80"
              height="80"
              className="d-inline-block align-top"
              alt="tunecast"
            />
          </Link>
          tunecast
        </h1>
        <div className="col-lg-6 mx-auto" style={{ width: "90%" }}>
          <p className="lead mb-4">Weather-Based Playlist Generator!</p>
          <div>
            {currentLocation && (
              <p>
                Current Location: {currentLocation.city},{" "}
                {currentLocation.principalSubdivisionCode}
              </p>
            )}

            <button
                onClick={handleCurrentLocation}
                className="btn btn-outline-dark"
              >
                Use Current Location
            </button>
            <div>-OR-</div>

            <div className="input-group mb-3 ">
              <input
                onChange={handleCity}
                type="text"
                id="CityInput"
                placeholder="Enter Your City"
                className="form-control border border-dark"
                aria-label="Text input with dropdown button"
                style={{
                  backgroundColor: "rgba(252, 252, 252, 0)",
                  color: "black",
                  minWidth: "1vw"
                }}
              />
              <select
                onChange={handleState}
                className="form-control border border-dark"
                id="inputGroupSelect03"
                style={{
                  backgroundColor: "rgba(252, 252, 252, 0)",
                  maxWidth: "11vw"
                }}
              >
                <option value="">Select Your State</option>
                {stateList.map((state) => {
                  return (
                    <option value={state} key={state}>
                      {state}
                    </option>
                  );
                })}
              </select>
              <button
                onClick={handleInputLocation}
                className="btn btn-outline-dark"
                type="button"
              >
                Submit
              </button>
            </div>

            {currentPlaylist !== "" && (
              <iframe
                title="Spotify Embedded Player"
                style={{ borderRadius: "12px" }}
                src={`${currentPlaylist.slice(
                  0,
                  25
                )}embed/${currentPlaylist.slice(
                  25
                )}?utm_source=generator&theme=0`}
                width="100%"
                height="352"
                frameBorder="0"
                allowFullScreen=""
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              ></iframe>
            )}
          </div>
        </div>
      </div>

    </>
  );
};

export default MainPage;
