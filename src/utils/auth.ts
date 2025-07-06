import type { Passenger, Driver } from '../types/models';
import { getPassengers, getDrivers, savePassenger, saveDriver } from './localStorage';

export const login = (
  email: string,
  password: string,
  userType: 'passenger' | 'driver'
): Passenger | Driver | null => {
  const users = userType === 'passenger' ? getPassengers() : getDrivers();
  return users.find((user) => user.email === email && user.password === password) || null;
};

export const register = (
  user: Omit<Passenger | Driver, 'id'>,
  userType: 'passenger' | 'driver'
): Passenger | Driver => {
  const newUser = { ...user, id: crypto.randomUUID() };
  if (userType === 'passenger') {
    savePassenger(newUser as Passenger);
  } else {
    saveDriver(newUser as Driver);
  }
  return newUser;
};