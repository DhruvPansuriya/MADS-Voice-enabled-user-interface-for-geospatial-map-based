import { useState, useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import "./App.css";
import MarkerClusterGroup from "react-leaflet-cluster";

// eslint-disable-next-line react/prop-types
function FlyToView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (zoom !== 3) { // To ensure the animation happens only when zoom level changes
      map.flyTo(center, zoom, { duration: 2 }); // duration in seconds
    }
  }, [center, zoom, map]);
  return null;
}

function App() {
  const [zoom, setZoom] = useState(3);
  const [center, setCenter] = useState([21.1702, 72.8311]);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [markers, setMarkers] = useState([
    {
      geocode: [21.1702, 72.8311],
      popUp: "Surat, Gujarat"
    },
    {
      geocode: [20.1702, 72.8311],
      popUp: "Another Location"
    }
  ]);

  const handleButtonClick = () => {
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
    if (!isNaN(lat) && !isNaN(lng)) {
      setCenter([lat, lng]);
      setZoom(12);
      setMarkers([{ geocode: [lat, lng], popUp: `Latitude: ${lat}, Longitude: ${lng}` }]);
    }
  };

  return (
    <div className="relative h-screen">
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={true} style={{ height: "90vh" }}>
        <FlyToView center={center} zoom={zoom} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          opacity={1} // Adjust the opacity as needed
        />
        <MarkerClusterGroup>
          {markers.map((marker, index) => (
            <Marker key={index} position={marker.geocode}>
              <Popup><h2>{marker.popUp}</h2></Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded shadow-md flex flex-row space-x-2">
        <input
          type="text"
          placeholder="Latitude"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Longitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          className="p-2 border rounded"
        />
        <button
          onClick={handleButtonClick}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
        >
          Go
        </button>
      </div>
    </div>
  );
}

export default App;
