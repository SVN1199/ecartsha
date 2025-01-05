import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

const LocationPicker = () => {
  const [position, setPosition] = useState([19.076, 72.8777]); 
  const [city, setCity] = useState("");

  const markerIcon = new L.Icon({
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  const fetchCoordinates = async (cityName) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search`,
        {
          params: { q: cityName, format: "json" },
        }
      );

      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        setPosition([parseFloat(lat), parseFloat(lon)]);
      } else {
        alert("City not found");
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

  const UpdateMapView = ({ coords }) => {
    const map = useMap();
    map.setView(coords, 13);
    return null;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchCoordinates(city);
    }
  };


  const handleCopy = () => {
    const textToCopy = `${city},${position[0]},${position[1]}`;
    navigator.clipboard.writeText(textToCopy).then(
      () => {
        alert("Location copied to clipboard!");
      },
      (error) => {
        console.error("Error copying to clipboard:", error);
      }
    );
  };

  return (
    <div>
      <div className="text-md font-bold my-2">Get Location Info</div>
      <div className="productInputBorder p-2 rounded">
        <div className="text-xs font-semibold mb-1 text-gray-700">Search and Navigate</div>
        <div className="w-full productInputBorder flex flex-row justify-between rounded mb-3" style={{ borderWidth: '2px' }}>
          <input
            type="text"
            placeholder="Enter city (e.g., Chennai)"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="outline-none w-full p-2 text-sm"
          />
          <button type="button" onClick={handleSearch} className="w-1/5 bg-gray-600 text-white p-1">
            Search
          </button>
        </div>

        <div style={{border : '2px solid gray'}} className="w-full h-8 bg-orange-200 text-sm flex flex-row justify-between items-center gap-2 mb-2">
          <div className="w-4/5 mx-2 capitalize text-sm">{`${city} - ${position}`}</div>
          <div className="w-1/5 text-center bg-white p-1 h-full cursor-pointer" onClick={handleCopy}>Copy</div>
        </div>

        <MapContainer center={position} zoom={13} style={{ height: "150px", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position} icon={markerIcon}></Marker>
          <UpdateMapView coords={position} />
        </MapContainer>
      </div>
    </div>
  );
};

export default LocationPicker;
