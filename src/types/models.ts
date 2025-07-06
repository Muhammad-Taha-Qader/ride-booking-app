export interface Passenger {
  id: string;
  name: string;
  gender: 'male' | 'female';
  email: string;
  password: string;
}

export interface Driver {
  id: string;
  name: string;
  gender: 'male' | 'female';
  vehicleType: 'Bike' | 'Car' | 'Rickshaw';
  availability: boolean;
  email: string;
  password: string;
}

export interface Ride {
  id: string;
  passengerId: string;
  driverId?: string;
  pickup: string;
  drop: string;
  rideType: 'Bike' | 'Car' | 'Rickshaw';
  preferredDriverGender?: 'male' | 'female';
  status: 'Requested' | 'Accepted' | 'In Progress' | 'Completed';
}
