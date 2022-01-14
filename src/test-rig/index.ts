import { MotionSensor } from '../components';

const rig = () => {
  console.log('Starting rig');
  const motionSensor = new MotionSensor(60_000, 14);
  motionSensor.onChanged((status: string) =>
    console.log(`${motionSensor.getId()} changed: ${status}`)
  );
  console.log('Rig has been setup');
};

rig();

setInterval(() => {}, 1 << 30);
