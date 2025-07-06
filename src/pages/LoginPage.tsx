import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DirectionsCar, Person, Email, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { login } from '../utils/auth';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'passenger' | 'driver'>('passenger');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = login(email, password, userType);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify({ ...user, userType }));
      navigate(userType === 'passenger' ? '/passenger/dashboard' : '/driver/dashboard');
    } else {
      setError('Invalid credentials');
    }
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
    transition: { duration: 0.8, ease: "easeOut" as const } 
  }
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
        className="md:hidden flex justify-center pt-10"
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
                <DirectionsCar className="text-6xl mb-4 car-icon" />
              </motion.div>
              <motion.h1
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-3xl md:text-4xl font-bold mb-4"
              >
                Welcome back!
              </motion.h1>
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-base md:text-lg opacity-90 mb-8"
              >
                Sign in to access your account
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

          {/* Right Panel - Login Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 p-6 md:p-12 flex flex-col justify-center"
          >
            <div className="max-w-md mx-auto w-full">
              <motion.div variants={itemVariants} className="text-center mb-6 md:mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Sign In</h2>
                <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto"></div>
              </motion.div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg mb-4 text-center"
                >
                  {error}
                </motion.div>
              )}

              <div className="space-y-4 md:space-y-6">
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    User Type
                  </label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username or Email
                  </label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
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

                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <label className="flex items-center mb-2 sm:mb-0">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="mr-2 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-600">Remember me</span>
                  </label>
                  <a href="#" className="text-sm text-purple-600 hover:text-purple-800">
                    Forgot password?
                  </a>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <button
                    onClick={handleLogin}
                    className="w-full py-3 px-4 rounded-lg text-white font-medium btn-hover focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  >
                    Sign In
                  </button>
                </motion.div>

                <motion.div variants={itemVariants} className="text-center">
                  <p className="text-sm text-gray-600">
                    New here?{' '}
                    <span
                      onClick={() => navigate('/register')}
                      className="text-purple-600 hover:text-purple-800 font-medium cursor-pointer"
                    >
                      Create an Account
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

export default LoginPage;
