import React from 'react';
import Link from 'next/link';
import { Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 p-4 text-center mt-10">
      <Typography variant="body2" color="textSecondary">
        &copy; 2023 Fitness Tracker. All rights reserved.
      </Typography>
      <div className="flex justify-center mt-2">
        <Link href="/privacy-policy">
          <Typography variant="body2" color="primary" className="mr-4 hover:underline">
            Privacy Policy
          </Typography>
        </Link>
        <Link href="/terms-of-service">
          <Typography variant="body2" color="primary" className="hover:underline">
            Terms of Service
          </Typography>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;