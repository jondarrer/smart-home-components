import { MotionSensor, RelaySwitch } from '../components';

const rig = () => {
  console.log('Starting rig');
  const motionSensor = new MotionSensor(60_000, 14);
  motionSensor.onChanged((status: string) =>
    console.log(`${motionSensor.getId()} changed: ${status}`)
  );

  const relaySwitch = new RelaySwitch(23);
  setInterval(() => {
    const currentValue = relaySwitch.getProperty('onoff');
    relaySwitch.switch(currentValue === 'on' ? 'off' : 'on');
    console.log(
      `${motionSensor.getId()} switched ${currentValue !== 'on' ? 'off' : 'on'}`
    );
  }, 30_000);
  console.log('Rig has been setup');
};

rig();

setInterval(() => {}, 1 << 30);
