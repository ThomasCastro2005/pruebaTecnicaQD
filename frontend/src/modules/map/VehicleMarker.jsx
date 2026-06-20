'use client';

import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import StatusBadge from '../vehicles/StatusBadge';

const statusColors = {
  'En movimiento': '#16a34a',
  'Detenido': '#ca8a04',
  'Sin señal': '#dc2626',
};

function createIcon(status) {
  const color = statusColors[status] || '#dc2626';
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="36" viewBox="0 0 28 36">
      <path d="M14 0C6.27 0 0 6.27 0 14c0 9.625 14 22 14 22S28 23.625 28 14C28 6.27 21.73 0 14 0z" fill="${color}"/>
      <circle cx="14" cy="14" r="6" fill="white"/>
    </svg>
  `;
  return L.divIcon({
    html: svg,
    className: '',
    iconSize: [28, 36],
    iconAnchor: [14, 36],
    popupAnchor: [0, -36],
  });
}

export default function VehicleMarker({ vehicle }) {
  const icon = createIcon(vehicle.status);

  return (
    <Marker position={[vehicle.last_lat, vehicle.last_lng]} icon={icon}>
      <Popup>
        <div style={{ minWidth: 140 }}>
          <strong style={{ fontSize: 14 }}>{vehicle.vehicle_id}</strong>
          <div style={{ marginTop: 6 }}>
            <StatusBadge status={vehicle.status} />
          </div>
          <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>
            {vehicle.last_lat?.toFixed(5)}, {vehicle.last_lng?.toFixed(5)}
          </div>
        </div>
      </Popup>
    </Marker>
  );
}
