'use client';
import Countdown from 'react-countdown';

type ScheduleState = {
  isOpen: boolean;
  nextTime: Date;
};

type CountDownProps = {
  target: ScheduleState;
  setTarget: React.Dispatch<React.SetStateAction<ScheduleState>>;
  getNextClosingTime: () => ScheduleState;
};

const CountDown = ({ target, setTarget, getNextClosingTime }: CountDownProps) => {
  return (
    <Countdown
      date={target.nextTime}
      onComplete={() => setTarget(getNextClosingTime())}
      className='text-yellow-300 font-bold text-5xl '
    />
  );
};

export default CountDown;
