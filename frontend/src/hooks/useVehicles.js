'use client';

import { useState, useEffect, useCallback } from 'react';
import { getVehicles } from '../services/api';

export function useVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [error, setError] = useState(null);

  const fetchVehicles = useCallback(async () => {
    try {
      const data = await getVehicles();
      setVehicles(data);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  useEffect(() => {
    fetchVehicles();
    const interval = setInterval(fetchVehicles, 5000);
    return () => clearInterval(interval);
  }, [fetchVehicles]);

  return { vehicles, lastUpdated, error, refetch: fetchVehicles };
}
