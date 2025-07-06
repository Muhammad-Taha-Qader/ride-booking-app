import type { Passenger, Driver, Ride } from '../types/models';

const STORAGE_KEYS = {
  passengers: 'ride_booking_passengers',
  drivers: 'ride_booking_drivers',
  rides: 'ride_booking_rides',
};

export const initializeStorage = (): void => {
  if (!localStorage.getItem(STORAGE_KEYS.passengers)) {
    const passengers: Passenger[] = [
      { id: crypto.randomUUID(), name: 'Mariam Javed', gender: 'female', email: 'mariam.j@demo.com', password: '112233' },
      { id: crypto.randomUUID(), name: 'Tariq Mehmood', gender: 'male', email: 'tariq.m@demo.com', password: '112233' },
      { id: crypto.randomUUID(), name: 'Nimra Sheikh', gender: 'female', email: 'nimra.s@demo.com', password: '112233' },
      { id: crypto.randomUUID(), name: 'Kashif Rehman', gender: 'male', email: 'kashif.r@demo.com', password: '112233' },
      { id: crypto.randomUUID(), name: 'Zoya Siddiqui', gender: 'female', email: 'zoya.s@demo.com', password: '112233' },
    ];
    localStorage.setItem(STORAGE_KEYS.passengers, JSON.stringify(passengers));
  }

  if (!localStorage.getItem(STORAGE_KEYS.drivers)) {
    const drivers: Driver[] = [
      { id: crypto.randomUUID(), name: 'Hina Rafique', gender: 'female', vehicleType: 'Bike', availability: true, email: 'hina.r@demo.com', password: '112233' },
      { id: crypto.randomUUID(), name: 'Noman Ali', gender: 'male', vehicleType: 'Car', availability: true, email: 'noman.a@demo.com', password: '112233' },
      { id: crypto.randomUUID(), name: 'Sania Irfan', gender: 'female', vehicleType: 'Rickshaw', availability: false, email: 'sania.i@demo.com', password: '112233' },
      { id: crypto.randomUUID(), name: 'Rehan Shah', gender: 'male', vehicleType: 'Bike', availability: true, email: 'rehan.s@demo.com', password: '112233' },
      { id: crypto.randomUUID(), name: 'Amber Liaqat', gender: 'female', vehicleType: 'Car', availability: true, email: 'amber.l@demo.com', password: '112233' },
    ];
    localStorage.setItem(STORAGE_KEYS.drivers, JSON.stringify(drivers));
  }

  if (!localStorage.getItem(STORAGE_KEYS.rides)) {
    const passengers = JSON.parse(localStorage.getItem(STORAGE_KEYS.passengers) || '[]') as Passenger[];
    const drivers = JSON.parse(localStorage.getItem(STORAGE_KEYS.drivers) || '[]') as Driver[];
    const rides: Ride[] = [
      {
        id: crypto.randomUUID(),
        passengerId: passengers[0].id,
        driverId: drivers[0].id,
        pickup: 'Blue Area',
        drop: 'Benazir Bhutto Airport',
        rideType: 'Bike',
        preferredDriverGender: 'female',
        status: 'Completed',
      },
      {
        id: crypto.randomUUID(),
        passengerId: passengers[1].id,
        driverId: drivers[1].id,
        pickup: 'F-10 Markaz',
        drop: 'Giga Mall',
        rideType: 'Car',
        status: 'Completed',
      },
      {
        id: crypto.randomUUID(),
        passengerId: passengers[2].id,
        pickup: 'Bahria Town',
        drop: 'PWD Colony',
        rideType: 'Bike',
        preferredDriverGender: 'female',
        status: 'Requested',
      },
      {
        id: crypto.randomUUID(),
        passengerId: passengers[3].id,
        driverId: drivers[3].id,
        pickup: 'I-8 Sector',
        drop: 'H-9 Park',
        rideType: 'Rickshaw',
        status: 'In Progress',
      },
      {
        id: crypto.randomUUID(),
        passengerId: passengers[4].id,
        driverId: drivers[4].id,
        pickup: 'Gulshan-e-Iqbal',
        drop: 'Clifton',
        rideType: 'Car',
        status: 'Accepted',
      },
    ];
    localStorage.setItem(STORAGE_KEYS.rides, JSON.stringify(rides));
  }
};

export const getPassengers = (): Passenger[] => {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.passengers) || '[]');
};

export const getDrivers = (): Driver[] => {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.drivers) || '[]');
};

export const getRides = (): Ride[] => {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.rides) || '[]');
};

export const savePassenger = (passenger: Passenger): void => {
  const passengers = getPassengers();
  passengers.push(passenger);
  localStorage.setItem(STORAGE_KEYS.passengers, JSON.stringify(passengers));
};

export const saveDriver = (driver: Driver): void => {
  const drivers = getDrivers();
  drivers.push(driver);
  localStorage.setItem(STORAGE_KEYS.drivers, JSON.stringify(drivers));
};

export const saveRide = (ride: Ride): void => {
  const rides = getRides();
  rides.push(ride);
  localStorage.setItem(STORAGE_KEYS.rides, JSON.stringify(rides));
};
