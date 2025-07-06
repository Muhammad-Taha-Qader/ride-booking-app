import { useState } from 'react';
import { motion } from 'framer-motion';
import { LocationOn, TwoWheeler, DirectionsCar, PedalBike, Person } from '@mui/icons-material';
import { createRide } from '../utils/ride';

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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto p-6 card-gradient rounded-2xl shadow-2xl"
      variants={itemVariants}
    >
      <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 flex items-center">
        <LocationOn className="mr-2 text-purple-600" /> Book a Ride
      </h3>
      <div className="space-y-4">
        <motion.div variants={itemVariants}>
          <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Location</label>
          <div className="relative">
            <LocationOn className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg input-focus"
              placeholder="e.g., Mall Road"
            />
          </div>
        </motion.div>
        <motion.div variants={itemVariants}>
          <label className="block text-sm font-medium text-gray-700 mb-2">Drop-off Location</label>
          <div className="relative">
            <LocationOn className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={drop}
              onChange={(e) => setDrop(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg input-focus"
              placeholder="e.g., Airport"
            />
          </div>
        </motion.div>
        <motion.div variants={itemVariants}>
          <label className="block text-sm font-medium text-gray-700 mb-2">Ride Type</label>
          <div className="relative">
            <DirectionsCar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={rideType}
              onChange={(e) => setRideType(e.target.value as 'Bike' | 'Car' | 'Rickshaw')}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg input-focus bg-white"
            >
              <option value="Bike">Bike <TwoWheeler className="inline" /></option>
              <option value="Car">Car <DirectionsCar className="inline" /></option>
              <option value="Rickshaw">Rickshaw <PedalBike className="inline" /></option>
            </select>
          </div>
        </motion.div>
        {passenger.gender === 'female' && rideType === 'Bike' && (
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Driver Gender</label>
            <div className="relative">
              <Person className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={preferredDriverGender}
                onChange={(e) => setPreferredDriverGender(e.target.value as 'male' | 'female')}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg input-focus focus:ring-pink-300 bg-white"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </motion.div>
        )}
        <motion.div variants={itemVariants}>
          <button
            onClick={handleSubmit}
            disabled={!pickup || !drop}
            className="w-full py-3 px-4 rounded-lg text-white font-medium btn-hover disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Request Ride
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RideBookingForm;
