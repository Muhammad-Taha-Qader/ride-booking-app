import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getRides, getPassengers } from '../utils/localStorage';
import { assignDriver, updateRideStatus } from '../utils/ride';
import type { Ride, Driver } from '../types/models';
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

  if (!currentUser) return <div className="text-center text-gray-600">Loading...</div>;

  const activeRide = getRides().find(
    (r) => r.driverId === currentUser.id && r.status !== 'Completed'
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen login-gradient p-4 md:p-8"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl md:text-3xl font-bold text-white">Driver Dashboard</h1>
            <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2"></div>
          </motion.div>
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 text-white font-medium rounded-lg btn-hover focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            <Logout className="mr-2" /> Logout
          </button>
        </div>
        {activeRide ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md mx-auto p-6 card-gradient rounded-2xl shadow-2xl"
          >
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Current Ride</h3>
            <div className="space-y-3 text-gray-700">
              <p><strong>Passenger:</strong> {getPassengers().find((p) => p.id === activeRide.passengerId)?.name}</p>
              <p><strong>Pickup:</strong> {activeRide.pickup}</p>
              <p><strong>Drop-off:</strong> {activeRide.drop}</p>
              <p><strong>Ride Type:</strong> {activeRide.rideType}</p>
              {activeRide.preferredDriverGender && (
                <p><strong>Preferred Driver Gender:</strong> {activeRide.preferredDriverGender}</p>
              )}
              <p><strong>Status:</strong> {activeRide.status}</p>
              {activeRide.status === 'Accepted' && (
                <button
                  onClick={() => handleStatusUpdate(activeRide.id, 'In Progress')}
                  className="w-full py-3 px-4 rounded-lg text-white font-medium btn-hover focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 mt-2"
                >
                  <DirectionsRun className="mr-2" /> Start Ride
                </button>
              )}
              {activeRide.status === 'In Progress' && (
                <button
                  onClick={() => handleStatusUpdate(activeRide.id, 'Completed')}
                  className="w-full py-3 px-4 rounded-lg text-white font-medium btn-hover focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 mt-2"
                >
                  <DoneAll className="mr-2" /> Complete Ride
                </button>
              )}
            </div>
          </motion.div>
        ) : (
          <div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4">Available Rides</h3>
            </motion.div>
            {availableRides.length === 0 ? (
              <p className="text-gray-600 text-center">No available rides.</p>
            ) : (
              <div className="space-y-4">
                {availableRides.map((ride) => (
                  <motion.div
                    key={ride.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * availableRides.indexOf(ride) }}
                    className="p-4 card-gradient rounded-2xl shadow-2xl"
                  >
                    <div className="space-y-2 text-gray-700">
                      <p><strong>Passenger:</strong> {getPassengers().find((p) => p.id === ride.passengerId)?.name}</p>
                      <p><strong>Pickup:</strong> {ride.pickup}</p>
                      <p><strong>Drop-off:</strong> {ride.drop}</p>
                      <p><strong>Ride Type:</strong> {ride.rideType}</p>
                      {ride.preferredDriverGender && (
                        <p><strong>Preferred Driver Gender:</strong> {ride.preferredDriverGender}</p>
                      )}
                      <div className="flex space-x-2 mt-2">
                        <button
                          onClick={() => handleAcceptRide(ride.id)}
                          className="flex-1 py-3 px-4 rounded-lg text-white font-medium btn-hover focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                        >
                          <CheckCircle className="mr-2" /> Accept
                        </button>
                        <button
                          onClick={() => handleRejectRide(ride.id)}
                          className="flex-1 py-3 px-4 rounded-lg text-white font-medium bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                        >
                          <Cancel className="mr-2" /> Reject
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default DriverDashboard;
