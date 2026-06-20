'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import VehicleMarker from './VehicleMarker';
import 'leaflet/dist/leaflet.css';

const BOGOTA_CENTER = [4.6782, -74.0779];

export default function VehicleMap({ vehicles }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const L = require('leaflet');
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });
    }
  }, []);

  const validVehicles = vehicles.filter(
    (v) => v.last_lat != null && v.last_lng != null
  );

  return (
    <MapContainer
      center={BOGOTA_CENTER}
      zoom={12}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {validVehicles.map((vehicle) => (
        <VehicleMarker key={vehicle.vehicle_id} vehicle={vehicle} />
      ))}
    </MapContainer>
  );
}
