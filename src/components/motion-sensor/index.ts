import { Gpio } from 'pigpio';
import { Thing } from 'webthing';
import { MotionProperty, IsActiveProperty } from '../../properties';
import { generateRandomHexId } from '../../utils';

class MotionSensor extends Thing {
  motionGpioPin: Gpio;

  constructor(warmupTime = 60_000, pin = 24) {
    const id = generateRandomHexId(4);
    super(
      `urn:jd:shc:motion-sensor-${id}`,
      'Motion Sensor',
      ['MotionSensor'],
      'A smart motion sensor'
    );

    this.addProperty(new MotionProperty(this));
    this.addProperty(new IsActiveProperty(this));

    // It takes a little time for the sensor to warm up,
    // typically 1 minute, but can vary (especially for testing).
    setTimeout(() => {
      this.setProperty('isActive', true);
    }, warmupTime);

    this.motionGpioPin = new Gpio(pin, { mode: Gpio.INPUT, alert: true });
    this.motionGpioPin.on('alert', (level: 0 | 1, _tick: number) => {
      if (this.getProperty('isActive') === true) {
        this.setProperty('motion', level === 0 ? 'no motion' : 'motion');
      }
    });
  }
}

export default MotionSensor;
