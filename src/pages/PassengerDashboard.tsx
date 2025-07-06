import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getRides, getDrivers } from '../utils/localStorage';
import type { Ride } from '../types/models';
import RideBookingForm from '../components/RideBookingForm';
import RideHistoryList from '../components/RideHistoryList';
import { Circle, CheckCircle, DirectionsRun, DoneAll, Logout } from '@mui/icons-material';

const PassengerDashboard = () => {
  const [currentUser, setCurrentUser] = useState<{ id: string; gender: 'male' | 'female' } | null>(null);
  const [currentRide, setCurrentRide] = useState<Ride | null>(null);
  const [rides, setRides] = useState<Ride[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    setCurrentUser(user);
    const allRides = getRides();
    const activeRide = allRides.find(
      (r) => r.passengerId === user.id && r.status !== 'Completed'
    );
    setCurrentRide(activeRide || null);
    setRides(allRides.filter((r) => r.passengerId === user.id));
  }, []);

  const handleRideCreated = () => {
    const allRides = getRides();
    const activeRide = allRides.find(
      (r) => r.passengerId === currentUser?.id && r.status !== 'Completed'
    );
    setCurrentRide(activeRide || null);
    setRides(allRides.filter((r) => r.passengerId === currentUser?.id));
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  const getStatusIcon = (status: Ride['status']) => {
    switch (status) {
      case 'Requested':
        return <Circle className="text-yellow-500" />;
      case 'Accepted':
        return <CheckCircle className="text-green-500" />;
      case 'In Progress':
        return <DirectionsRun className="text-blue-500" />;
      case 'Completed':
        return <DoneAll className="text-gray-500" />;
      default:
        return null;
    }
  };

  if (!currentUser) return <div className="text-center text-gray-600">Loading...</div>;

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
            <h1 className="text-2xl md:text-3xl font-bold text-white">Passenger Dashboard</h1>
            <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2"></div>
          </motion.div>
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 text-white font-medium rounded-lg btn-hover focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            <Logout className="mr-2" /> Logout
          </button>
        </div>
        {!currentRide ? (
          <RideBookingForm passenger={currentUser} onRideCreated={handleRideCreated} />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md mx-auto p-6 card-gradient rounded-2xl shadow-2xl"
          >
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Current Ride</h3>
            <div className="space-y-3">
              <p className="text-gray-700"><strong>Pickup:</strong> {currentRide.pickup}</p>
              <p className="text-gray-700"><strong>Drop-off:</strong> {currentRide.drop}</p>
              <p className="text-gray-700"><strong>Ride Type:</strong> {currentRide.rideType}</p>
              {currentRide.preferredDriverGender && (
                <p className="text-gray-700"><strong>Preferred Driver Gender:</strong> {currentRide.preferredDriverGender}</p>
              )}
              <p className="flex items-center text-gray-700">
                <strong>Status:</strong> <span className="ml-2 flex items-center">{getStatusIcon(currentRide.status)} {currentRide.status}</span>
              </p>
              {currentRide.driverId && (
                <p className="text-gray-700"><strong>Driver:</strong> {getDrivers().find((d) => d.id === currentRide.driverId)?.name}</p>
              )}
            </div>
          </motion.div>
        )}
        <div className="mt-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4">Ride History</h3>
            <RideHistoryList rides={rides.filter((r) => r.status === 'Completed')} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default PassengerDashboard;
