import { useState } from 'react';
import { motion } from 'framer-motion';
import { LocationOn, TwoWheeler, DirectionsCar, PedalBike } from '@mui/icons-material';
import { createRide } from '../utils/ride';
import Button from './Button';

interface RideBookingFormProps {
  passenger: { id: string; gender: 'male' | 'female' };
  onRideCreated: () => void;
}

const RideBookingForm = ({ passenger, onRideCreated }: RideBookingFormProps) => {
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [rideType, setRideType] = useState<'Bike' | 'Car' | 'Rickshaw'>('Bike');
  const [preferredDriverGender, setPreferredDriverGender] = useState<'male' | 'female'>('male');

  const handleSubmit = () => {
    const ride = {
      passengerId: passenger.id,
      pickup,
      drop,
      rideType,
      ...(passenger.gender === 'female' && rideType === 'Bike' ? { preferredDriverGender } : {}),
    };
    createRide(ride);
    onRideCreated();
    setPickup('');
    setDrop('');
    setRideType('Bike');
    setPreferredDriverGender('male');
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md p-6 bg-white rounded-2xl shadow-feminine"
    >
      <h3 className="text-xl font-bold mb-4 flex items-center">
        <LocationOn className="mr-2 text-primary" /> Book a Ride
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Pickup Location</label>
          <input
            type="text"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="e.g., Mall Road"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Drop-off Location</label>
          <input
            type="text"
            value={drop}
            onChange={(e) => setDrop(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="e.g., Airport"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Ride Type</label>
          <select
            value={rideType}
            onChange={(e) => setRideType(e.target.value as 'Bike' | 'Car' | 'Rickshaw')}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="Bike">Bike <TwoWheeler className="inline" /></option>
            <option value="Car">Car <DirectionsCar className="inline" /></option>
            <option value="Rickshaw">Rickshaw <PedalBike className="inline" /></option>
          </select>
        </div>
        {passenger.gender === 'female' && rideType === 'Bike' && (
          <div>
            <label className="block text-sm font-medium">Preferred Driver Gender</label>
            <select
              value={preferredDriverGender}
              onChange={(e) => setPreferredDriverGender(e.target.value as 'male' | 'female')}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        )}
        <Button onClick={handleSubmit} disabled={!pickup || !drop}>
          Request Ride
        </Button>
      </div>
    </motion.div>
  );
};

export default RideBookingForm;
