import { Thing } from 'webthing';
import { MotionProperty, IsActiveProperty } from '../../properties';

class MotionSensor extends Thing {
  constructor(warmupTime = 60_000) {
    super(
      'urn:dev:ops:my-motion-sensor-1234',
      'My Motion Sensor',
      ['MotionSensor'],
      'A smart motion sensor'
    );

    this.addProperty(new MotionProperty(this));
    this.addProperty(new IsActiveProperty(this));
  }
}

export default MotionSensor;
