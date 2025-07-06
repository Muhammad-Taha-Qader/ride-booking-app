import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getRides, getDrivers } from '../utils/localStorage';
import type { Ride } from '../types/models';
import RideBookingForm from '../components/RideBookingForm';
import RideHistoryList from '../components/RideHistoryList';
import Button from '../components/Button';
import { Circle, CheckCircle, DirectionsRun, DoneAll, Logout } from '@mui/icons-material';

const PassengerDashboard = () => {
  const [currentUser, setCurrentUser] = useState<{ id: string; gender: 'male' | 'female' } | null>(null);
  const [currentRide, setCurrentRide] = useState<Ride | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  if (!currentUser) return <div>Loading...</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4 max-w-4xl mx-auto"
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">Passenger Dashboard</h1>
        <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-600">
          <Logout className="mr-2" /> Logout
        </Button>
      </div>
      {!currentRide ? (
        <RideBookingForm passenger={currentUser} onRideCreated={handleRideCreated} />
      ) : (
        <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-feminine mx-auto">
          <h3 className="text-xl font-bold mb-4">Current Ride</h3>
          <div className="space-y-2">
            <p><strong>Pickup:</strong> {currentRide.pickup}</p>
            <p><strong>Drop-off:</strong> {currentRide.drop}</p>
            <p><strong>Ride Type:</strong> {currentRide.rideType}</p>
            {currentRide.preferredDriverGender && (
              <p><strong>Preferred Driver Gender:</strong> {currentRide.preferredDriverGender}</p>
            )}
            <p className="flex items-center">
              <strong>Status:</strong> <span className="ml-2 flex items-center">{getStatusIcon(currentRide.status)} {currentRide.status}</span>
            </p>
            {currentRide.driverId && (
              <p><strong>Driver:</strong> {getDrivers().find((d) => d.id === currentRide.driverId)?.name}</p>
            )}
          </div>
        </div>
      )}
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Ride History</h3>
        <RideHistoryList rides={rides.filter((r) => r.status === 'Completed')} />
      </div>
    </motion.div>
  );
};

export default PassengerDashboard;
