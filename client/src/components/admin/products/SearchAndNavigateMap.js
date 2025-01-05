import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

const SearchAndNavigateMap = ({ productInventoryError, setProductForm }) => {
  const [position, setPosition] = useState([19.076, 72.8777]);
  const [city, setCity] = useState("");
  const [openSearchShow, setOpenSearchShow] = useState(false)


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


  const onChangeCity = (e) => {
    if(city.trim() !== ''){
      setOpenSearchShow(false)
    }
    setCity(e.target.value)
  }

  const handleSearch = (e) => {
    e.preventDefault();
    const joins = `${city},${position[0]},${position[1]}`
    setOpenSearchShow(true)
    if (city.trim()) {
      fetchCoordinates(city);
    }
    setProductForm((prev) => ({
      ...prev,
      shippingFrom : joins
    }))
  };

  return (
    <div>
      <div className="text-md font-bold my-2">Shipping From</div>
      <div className="productInputBorder p-2 rounded">
        <div className="text-xs font-semibold mb-1 text-gray-700">Search and Navigate</div>
        <div className="w-full productInputBorder flex flex-row justify-between rounded mb-2" style={{ borderWidth: '2px' }}>
          <input
            type="text"
            placeholder="Enter city (e.g., Chennai)"
            value={city}
            onChange={onChangeCity}
            className="outline-none w-full p-2 text-sm"
          />
          <button type="button" onClick={handleSearch} className="w-1/5 bg-gray-600 text-white p-2">
            Search
          </button>
        </div>

        {
          openSearchShow &&
          <div style={{ border: '2px solid gray' }} className="w-full h-8 text-sm flex flex-row justify-between items-center gap-2 mb-1">
            <div className="w-4/5 mx-2 capitalize text-xs">{`${city} - Lat : ${position[0]}, Long : ${position[1]}`}</div>
          </div>
        }

        <MapContainer center={position} zoom={13} style={{ height: "300px", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position} icon={markerIcon}></Marker>
          <UpdateMapView coords={position} />
        </MapContainer>
      </div>
      {productInventoryError &&
        <div className="w-52 text-xs text-left my-1 text-red-600">{productInventoryError}</div>
      }
    </div>
  );
};

export default SearchAndNavigateMap;
