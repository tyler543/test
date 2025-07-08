import React from 'react';
import LandingDisplay from '../components/LandingDisplay';

const LandingPage: React.FC = () => {
  const handleClick = () => {
    window.location.href = '/login';
  };

  return <LandingDisplay onClick={handleClick} />;
};

export default LandingPage;
