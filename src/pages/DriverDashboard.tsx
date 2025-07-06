import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getRides, getPassengers } from '../utils/localStorage';
import { assignDriver, updateRideStatus } from '../utils/ride';
import type { Ride, Driver } from '../types/models';
import Button from '../components/Button';
import { CheckCircle, Cancel, DirectionsRun, DoneAll, Logout } from '@mui/icons-material';

const DriverDashboard = () => {
  const [currentUser, setCurrentUser] = useState<Driver | null>(null);
  const [availableRides, setAvailableRides] = useState<Ride[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}') as Driver;
    setCurrentUser(user);
    const rides = getRides().filter(
      (ride) =>
        ride.status === 'Requested' &&
        ride.rideType === user.vehicleType &&
        (!ride.preferredDriverGender || ride.preferredDriverGender === user.gender)
    );
    setAvailableRides(rides);
  }, []);

  const handleAcceptRide = (rideId: string) => {
    if (currentUser) {
      assignDriver(rideId, currentUser.id);
      setAvailableRides((rides) => rides.filter((r) => r.id !== rideId));
    }
  };

  const handleRejectRide = (rideId: string) => {
    setAvailableRides((rides) => rides.filter((r) => r.id !== rideId));
  };

  const handleStatusUpdate = (rideId: string, status: Ride['status']) => {
    updateRideStatus(rideId, status);
    setAvailableRides((rides) => rides.filter((r) => r.id !== rideId));
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  if (!currentUser) return <div>Loading...</div>;

  const activeRide = getRides().find(
    (r) => r.driverId === currentUser.id && r.status !== 'Completed'
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4 max-w-4xl mx-auto"
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">Driver Dashboard</h1>
        <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-600">
          <Logout className="mr-2" /> Logout
        </Button>
      </div>
      {activeRide ? (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md p-6 bg-white rounded-2xl shadow-feminine mx-auto"
        >
          <h3 className="text-xl font-bold mb-4">Current Ride</h3>
          <div className="space-y-2">
            <p><strong>Passenger:</strong> {getPassengers().find((p) => p.id === activeRide.passengerId)?.name}</p>
            <p><strong>Pickup:</strong> {activeRide.pickup}</p>
            <p><strong>Drop-off:</strong> {activeRide.drop}</p>
            <p><strong>Ride Type:</strong> {activeRide.rideType}</p>
            <p><strong>Status:</strong> {activeRide.status}</p>
            {activeRide.status === 'Accepted' && (
              <Button onClick={() => handleStatusUpdate(activeRide.id, 'In Progress')}>
                <DirectionsRun className="mr-2" /> Start Ride
              </Button>
            )}
            {activeRide.status === 'In Progress' && (
              <Button onClick={() => handleStatusUpdate(activeRide.id, 'Completed')}>
                <DoneAll className="mr-2" /> Complete Ride
              </Button>
            )}
          </div>
        </motion.div>
      ) : (
        <div>
          <h3 className="text-xl font-bold mb-4">Available Rides</h3>
          {availableRides.length === 0 ? (
            <p>No available rides.</p>
          ) : (
            <div className="space-y-4">
              {availableRides.map((ride) => (
                <motion.div
                  key={ride.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * availableRides.indexOf(ride) }}
                  className="p-4 bg-white rounded-2xl shadow-feminine"
                >
                  <p><strong>Passenger:</strong> {getPassengers().find((p) => p.id === ride.passengerId)?.name}</p>
                  <p><strong>Pickup:</strong> {ride.pickup}</p>
                  <p><strong>Drop-off:</strong> {ride.drop}</p>
                  <p><strong>Ride Type:</strong> {ride.rideType}</p>
                  {ride.preferredDriverGender && (
                    <p><strong>Preferred Driver Gender:</strong> {ride.preferredDriverGender}</p>
                  )}
                  <div className="flex space-x-2 mt-2">
                    <Button onClick={() => handleAcceptRide(ride.id)}>
                      <CheckCircle className="mr-2" /> Accept
                    </Button>
                    <Button onClick={() => handleRejectRide(ride.id)} className="bg-gray-500 hover:bg-gray-600">
                      <Cancel className="mr-2" /> Reject
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default DriverDashboard;
