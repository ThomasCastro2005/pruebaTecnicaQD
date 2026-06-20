'use client';

import StatusBadge from './StatusBadge';

function formatLastSeen(lastSeen) {
  if (!lastSeen) return '—';
  return new Date(lastSeen).toLocaleTimeString();
}

export default function VehicleTable({ vehicles, onDelete }) {
  if (vehicles.length === 0) {
    return <div className="empty-state">No vehicles detected yet. Start the simulator.</div>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Vehicle ID</th>
          <th>Status</th>
          <th>Last Seen</th>
          <th>Coordinates</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {vehicles.map((vehicle) => (
          <tr key={vehicle.vehicle_id}>
            <td><strong>{vehicle.vehicle_id}</strong></td>
            <td><StatusBadge status={vehicle.status} /></td>
            <td>{formatLastSeen(vehicle.last_seen)}</td>
            <td style={{ fontSize: 12, color: '#888' }}>
              {vehicle.last_lat?.toFixed(4)}, {vehicle.last_lng?.toFixed(4)}
            </td>
            <td>
              <button className="delete-btn" onClick={() => onDelete(vehicle.vehicle_id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
