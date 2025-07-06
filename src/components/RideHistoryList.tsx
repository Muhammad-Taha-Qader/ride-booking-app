import { motion } from 'framer-motion';
import type { Ride } from '../types/models';
import { getDrivers } from '../utils/localStorage';
import { TwoWheeler, DirectionsCar, PedalBike, DoneAll } from '@mui/icons-material';

interface RideHistoryListProps {
  rides: Ride[];
}

const RideHistoryList = ({ rides }: RideHistoryListProps) => {
  const getRideIcon = (rideType: Ride['rideType']) => {
    switch (rideType) {
      case 'Bike':
        return <TwoWheeler className="text-purple-600" />;
      case 'Car':
        return <DirectionsCar className="text-purple-600" />;
      case 'Rickshaw':
        return <PedalBike className="text-purple-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {rides.length === 0 ? (
        <p className="text-gray-600 text-center">No completed rides.</p>
      ) : (
        rides.map((ride, index) => (
          <motion.div
            key={ride.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            className="p-4 card-gradient rounded-2xl shadow-2xl"
          >
            <div className="flex items-center space-x-3">
              {getRideIcon(ride.rideType)}
              <div className="space-y-2 text-gray-700">
                <p><strong>Pickup:</strong> {ride.pickup}</p>
                <p><strong>Drop-off:</strong> {ride.drop}</p>
                <p><strong>Ride Type:</strong> {ride.rideType}</p>
                {ride.driverId && (
                  <p><strong>Driver:</strong> {getDrivers().find((d) => d.id === ride.driverId)?.name}</p>
                )}
                {ride.preferredDriverGender && (
                  <p><strong>Preferred Driver Gender:</strong> {ride.preferredDriverGender}</p>
                )}
                <p className="flex items-center">
                  <strong>Status:</strong> <DoneAll className="ml-2 text-gray-500" /> {ride.status}
                </p>
              </div>
            </div>
          </motion.div>
        ))
      )}
    </div>
  );
};

export default RideHistoryList;
