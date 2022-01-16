import { MultipleThings, WebThingServer } from 'webthing';
import { MotionSensor, RelaySwitch } from '../components';

const motionSensor = new MotionSensor(60_000, 14, 20_000);
const relaySwitch = new RelaySwitch(23);

motionSensor.onChanged((status: string) =>
  console.log(`${motionSensor.getId()} changed: ${status}`)
);

const server = new WebThingServer(
  new MultipleThings([motionSensor, relaySwitch], 'Bathroom Mirror'),
  8081
);

process.on('SIGINT', () => {
  server
    .stop()
    .then(() => {
      console.log('Stopping server');
      process.exit();
    })
    .catch(() => process.exit());
});

server.start().catch(console.error);
