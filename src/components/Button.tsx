import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const Button = ({ children, onClick, type = 'button', className = '' }: ButtonProps) => {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 bg-primary text-secondary rounded-2xl shadow-feminine hover:bg-opacity-90 transition-colors ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
};

export default Button;
