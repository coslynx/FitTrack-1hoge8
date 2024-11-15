// src/components/Button.tsx
import React from 'react';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';

interface ButtonProps {
  label: string;
  onClick: () => void;
  type?: 'submit' | 'button';
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, type, disabled, className }) => {
  const router = useRouter();

  return (
    <Button
      variant="contained"
      className={`${className} hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {label}
    </Button>
  );
};

export default Button;