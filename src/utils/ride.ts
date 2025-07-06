import type{ Ride } from '../types/models';
import { getRides, saveRide } from './localStorage';

export const createRide = (ride: Omit<Ride, 'id' | 'status'>): Ride => {
  const newRide: Ride = {
    ...ride,
    id: crypto.randomUUID(),
    status: 'Requested',
  };
  saveRide(newRide);
  return newRide;
};

export const updateRideStatus = (rideId: string, status: Ride['status']): Ride | null => {
  const rides = getRides();
  const rideIndex = rides.findIndex((r) => r.id === rideId);
  if (rideIndex === -1) return null;
  rides[rideIndex] = { ...rides[rideIndex], status };
  localStorage.setItem('ride_booking_rides', JSON.stringify(rides));
  return rides[rideIndex];
};

export const assignDriver = (rideId: string, driverId: string): Ride | null => {
  const rides = getRides();
  const rideIndex = rides.findIndex((r) => r.id === rideId);
  if (rideIndex === -1) return null;
  rides[rideIndex] = { ...rides[rideIndex], driverId, status: 'Accepted' };
  localStorage.setItem('ride_booking_rides', JSON.stringify(rides));
  return rides[rideIndex];
};
