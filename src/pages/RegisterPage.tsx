import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PersonAdd, Person, Email, Lock, Visibility, VisibilityOff, DirectionsCar, DirectionsBike, DirectionsCarFilled, PedalBike } from '@mui/icons-material';
import { register } from '../utils/auth';

const RegisterPage = () => {
  const [userType, setUserType] = useState<'passenger' | 'driver'>('passenger');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [gender, setGender] = useState<'male' | 'female'>('female');
  const [vehicleType, setVehicleType] = useState<'Bike' | 'Car' | 'Rickshaw'>('Bike');
  const navigate = useNavigate();

  const handleRegister = () => {
    const user = {
      name,
      email,
      password,
      gender,
      ...(userType === 'driver' ? { vehicleType, availability: true } : {}),
    };
    const newUser = register(user, userType);
    localStorage.setItem('currentUser', JSON.stringify({ ...newUser, userType }));
    navigate(userType === 'passenger' ? '/passenger/dashboard' : '/driver/dashboard');
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const leftPanelVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: 'easeOut' as const },
    },
  };

  return (
    <div className="min-h-screen login-gradient relative overflow-hidden">
      {/* Animated background elements */}
      <div className="wave-pattern"></div>
      <div className="floating-element"></div>
      <div className="floating-element floating-element-2"></div>
      <div className="floating-element floating-element-3"></div>
      <div className="floating-element floating-element-4"></div>

      {/* Decorative plus signs */}
      <div className="hidden md:block absolute top-20 left-20 text-white text-2xl opacity-30">+</div>
      <div className="hidden md:block absolute top-40 right-32 text-white text-xl opacity-20">+</div>
      <div className="hidden md:block absolute bottom-32 left-16 text-white text-lg opacity-25">+</div>

      {/* Decorative dots */}
      <div className="hidden md:flex absolute top-32 right-20 flex-col space-y-2">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="w-2 h-2 bg-white rounded-full opacity-20"></div>
        ))}
      </div>

      {/* Car animation for mobile view */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="md:hidden flex justify-center pt-6"
      >
        <DirectionsCar className="text-5xl text-white car-icon" />
      </motion.div>

      <div className="flex items-center justify-center min-h-screen p-4 md:p-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-4xl flex flex-col md:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Left Panel (Hidden on Mobile) */}
          <motion.div
            variants={leftPanelVariants}
            initial="hidden"
            animate="visible"
            className="hidden md:flex md:flex-1 login-gradient p-8 md:p-12 flex-col justify-center items-center text-white relative"
          >
            <div className="text-center z-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-8"
              >
                <PersonAdd className="text-6xl mb-4 car-icon" />
              </motion.div>
              <motion.h1
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-3xl md:text-4xl font-bold mb-4"
              >
                Join Us!
              </motion.h1>
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-base md:text-lg opacity-90 mb-8"
              >
                Create an account to start your journey
              </motion.p>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="w-20 h-1 bg-white rounded-full mx-auto opacity-50"
              ></motion.div>
            </div>
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-20 -left-20 w-40 h-40 border-4 border-white opacity-10 rounded-full"></div>
              <div className="absolute -bottom-16 -right-16 w-32 h-32 border-2 border-white opacity-10 rounded-full"></div>
            </div>
          </motion.div>

          {/* Right Panel - Register Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 p-6 md:p-12 flex flex-col justify-center"
          >
            <div className="max-w-md mx-auto w-full">
              <motion.div variants={itemVariants} className="text-center mb-6 md:mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Sign Up</h2>
                <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto"></div>
              </motion.div>

              <div className="space-y-4 md:space-y-6">
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">User Type</label>
                  <div className="relative">
                    <Person className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select
                      value={userType}
                      onChange={(e) => setUserType(e.target.value as 'passenger' | 'driver')}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg input-focus bg-white"
                    >
                      <option value="passenger">Passenger</option>
                      <option value="driver">Driver</option>
                    </select>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <div className="relative">
                    <Person className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg input-focus"
                      placeholder="Enter your name"
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <div className="relative">
                    <Email className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg input-focus"
                      placeholder="Enter your email"
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg input-focus"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </button>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <div className="relative">
                    <Person className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value as 'male' | 'female')}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg input-focus focus:ring-pink-300"
                    >
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                    </select>
                  </div>
                </motion.div>

                {userType === 'driver' && (
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Type</label>
                    <div className="relative">
                      <DirectionsCarFilled className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <select
                        value={vehicleType}
                        onChange={(e) => setVehicleType(e.target.value as 'Bike' | 'Car' | 'Rickshaw')}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg input-focus bg-white"
                      >
                        <option value="Bike">Bike <DirectionsBike className="inline" /></option>
                        <option value="Car">Car <DirectionsCar className="inline" /></option>
                        <option value="Rickshaw">Rickshaw <PedalBike className="inline" /></option>
                      </select>
                    </div>
                  </motion.div>
                )}

                <motion.div variants={itemVariants}>
                  <button
                    onClick={handleRegister}
                    className="w-full py-3 px-4 rounded-lg text-white font-medium btn-hover focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  >
                    Sign Up
                  </button>
                </motion.div>

                <motion.div variants={itemVariants} className="text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{' '}
                    <span
                      onClick={() => navigate('/login')}
                      className="text-purple-600 hover:text-purple-800 font-medium cursor-pointer"
                    >
                      Sign In
                    </span>
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;
