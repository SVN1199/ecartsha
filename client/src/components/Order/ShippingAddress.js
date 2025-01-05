import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

const ShippingAddress = ({ position, setPosition, city, setCity, isSearched, setIsSearched }) => {

  const [loading, setLoading] = useState(false);

  const markerIcon = new L.Icon({
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  const fetchCoordinatesByCity = async (city) => {
    try {
      setLoading(true);
      const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
        params: { q: city, format: "json" },
      });
      setLoading(false);
      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        setPosition([parseFloat(lat), parseFloat(lon)]);
      } else {
        alert("City not found");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching coordinates:", error);
    }
  };

  const UpdateMapView = ({ coords }) => {
    const map = useMap();
    map.setView(coords, 13);
    return null;
  };

  const onChangeCity = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchCoordinatesByCity(city);
    }
    setIsSearched(true)
  };

  return (
    <div className="shipping-address-container">
      <div className="productInputBorder p-2 rounded">
        <div className="text-xs font-semibold mb-1 text-gray-700">Search and Navigate</div>
        <div className="w-full productInputBorder flex flex-row justify-between rounded mb-2" style={{ borderWidth: "2px" }}>
          <input
            type="text"
            placeholder="Enter pincode"
            value={city}
            onChange={onChangeCity}
            className="outline-none w-full p-2 text-sm"
          />
          <button type="button" onClick={handleSearch} className="w-1/5 bg-gray-600 text-white p-2">
            Search
          </button>
        </div>
        {!isSearched &&<div className="text-red-600 text-sm mb-1">* Search Your City is must</div>}
        <div className="map-container">
          <MapContainer center={position} zoom={13} style={{ height: "200px", width: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position} icon={markerIcon}></Marker>
            <UpdateMapView coords={position} />
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default ShippingAddress;
