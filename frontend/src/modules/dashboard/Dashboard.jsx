'use client';

import dynamic from 'next/dynamic';
import { useVehicles } from '../../hooks/useVehicles';
import { deleteVehicle } from '../../services/api';
import VehicleTable from '../vehicles/VehicleTable';
import LastUpdated from './LastUpdated';

const VehicleMap = dynamic(() => import('../map/VehicleMap'), { ssr: false });

export default function Dashboard() {
  const { vehicles, lastUpdated, error, refetch } = useVehicles();

  async function handleDelete(vehicleId) {
    try {
      await deleteVehicle(vehicleId);
      refetch();
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Fleet Tracker</h1>
        <p>GPS Telemetry Monitoring System — Bogotá</p>
      </div>

      {error && (
        <div style={{ background: '#fee2e2', color: '#991b1b', padding: '12px 16px', borderRadius: 6, marginBottom: 20, fontSize: 14 }}>
          Could not connect to backend. Make sure it is running on port 3001.
        </div>
      )}

      <div className="dashboard-grid">
        <div className="panel">
          <h2>Vehicles ({vehicles.length})</h2>
          <VehicleTable vehicles={vehicles} onDelete={handleDelete} />
          <LastUpdated lastUpdated={lastUpdated} />
        </div>

        <div className="panel">
          <h2>Live Map</h2>
          <div className="map-container">
            <VehicleMap vehicles={vehicles} />
          </div>
        </div>
      </div>
    </div>
  );
}
