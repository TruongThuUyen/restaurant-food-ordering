'use client';
import { useState } from 'react';
import Countdown from 'react-countdown';

// Countdown time before order closes
const getNextClosingTime = () => {
  const now = new Date();
  const closingTime = new Date();
  closingTime.setHours(21, 0, 0, 0);

  if (now.getTime() >= closingTime.getTime()) {
    closingTime.setDate(closingTime.getDate() + 1);
  }
  return closingTime;
};

const CountDown = () => {
  const [target, setTarget] = useState(getNextClosingTime());

  return (
    <Countdown
      date={target}
      onComplete={() => setTarget(getNextClosingTime())}
      className='text-yellow-300 font-bold text-5xl '
    />
  );
};

export default CountDown;
