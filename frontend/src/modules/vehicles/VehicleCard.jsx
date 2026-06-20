'use client';

import StatusBadge from './StatusBadge';

function formatLastSeen(lastSeen) {
  if (!lastSeen) return 'Never';
  return new Date(lastSeen).toLocaleTimeString();
}

export default function VehicleCard({ vehicle, onDelete }) {
  return (
    <div style={{ border: '1px solid #e5e5e5', borderRadius: 8, padding: 16, background: 'white' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <strong style={{ fontSize: 15 }}>{vehicle.vehicle_id}</strong>
        <button className="delete-btn" onClick={() => onDelete(vehicle.vehicle_id)}>
          Delete
        </button>
      </div>
      <StatusBadge status={vehicle.status} />
      <div style={{ marginTop: 10, fontSize: 13, color: '#666' }}>
        <div>Lat: {vehicle.last_lat}</div>
        <div>Lng: {vehicle.last_lng}</div>
        <div>Last seen: {formatLastSeen(vehicle.last_seen)}</div>
      </div>
    </div>
  );
}
