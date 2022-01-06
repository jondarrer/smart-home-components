import { Thing } from 'webthing';
import { MotionProperty } from '../../properties';

class MotionSensor extends Thing {
  constructor() {
    super(
      'urn:dev:ops:my-motion-sensor-1234',
      'My Motion Sensor',
      ['MotionSensor'],
      'A smart motion sensor'
    );

    this.addProperty(new MotionProperty(this));
  }
}

export default MotionSensor;
