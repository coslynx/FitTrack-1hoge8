// src/components/Card.tsx

import React from 'react';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, children, className }) => {
  return (
    <div className={`rounded-lg shadow-md p-4 ${className}`}>
      {title && (
        <div className="font-bold text-xl mb-4">{title}</div>
      )}
      <div>{children}</div>
    </div>
  );
};

export default Card;