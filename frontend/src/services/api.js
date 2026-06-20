const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function getVehicles() {
  const response = await fetch(`${BASE_URL}/vehicles`);
  if (!response.ok) throw new Error('Failed to fetch vehicles');
  return response.json();
}

export async function deleteVehicle(vehicleId) {
  const response = await fetch(`${BASE_URL}/vehicles/${vehicleId}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error(`Failed to delete vehicle ${vehicleId}`);
  return response.json();
}
