import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix the default icon issue with Leaflet in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapComponent = ({ location }) => {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    if (location) {
      fetchHospitals();
    }
  }, [location]);

  const fetchHospitals = async () => {
    const overpassUrl = 'https://overpass-api.de/api/interpreter';
    const query = `
      [out:json];
      (
        node["amenity"="hospital"](around:5000,${location.latitude},${location.longitude});
        way["amenity"="hospital"](around:5000,${location.latitude},${location.longitude});
        relation["amenity"="hospital"](around:5000,${location.latitude},${location.longitude});
      );
      out center;
    `;

    try {
      const response = await fetch(overpassUrl, {
        method: 'POST',
        body: query,
      });
      const data = await response.json();
      setHospitals(data.elements);
    } catch (error) {
      console.error('Error fetching hospitals:', error);
    }
  };

  return (
    <MapContainer
      center={[location.latitude, location.longitude]}
      zoom={13}
      style={{ height: '500px', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />

      {/* User's Location Marker */}
      <Marker position={[location.latitude, location.longitude]}>
        <Popup>You are here</Popup>
      </Marker>

      {/* Nearby Hospitals Markers */}
      {hospitals.map((hospital) => (
        <Marker
          key={hospital.id}
          position={[
            hospital.lat || hospital.center.lat,
            hospital.lon || hospital.center.lon,
          ]}
        >
          <Popup>{hospital.tags.name || 'Unnamed Hospital'}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
