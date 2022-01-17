import { Gpio } from 'pigpio';
import { Thing, Value } from 'webthing';
import { MotionProperty, IsActiveProperty } from '../../properties';
import { generateRandomHexId } from '../../utils';

class MotionSensor extends Thing {
  _motionGpioPin: Gpio;
  _debouncing = false;
  _motionValue = new Value('no motion');
  _isActiveValue = new Value(false);

  constructor(warmupTime = 60_000, pin = 14, debounceTime = 20_000) {
    super(
      `motion-sensor-${generateRandomHexId(4)}`,
      'Motion Sensor',
      ['MotionSensor'],
      'A smart motion sensor'
    );

    this.addProperty(new MotionProperty(this, this._motionValue));
    this.addProperty(new IsActiveProperty(this, this._isActiveValue));

    // It takes a little time for the sensor to warm up,
    // typically 1 minute, but can vary (and useful for unit testing).
    setTimeout(() => {
      this._isActiveValue.notifyOfExternalUpdate(true);
    }, warmupTime);

    this._motionGpioPin = new Gpio(pin, { mode: Gpio.INPUT, alert: true });
    this._motionGpioPin.on('alert', (level: 0 | 1, _tick: number) => {
      if (this.getProperty('isActive') === true && this._debouncing === false) {
        this._motionValue.notifyOfExternalUpdate(
          level === 0 ? 'no motion' : 'motion'
        );

        if (level === 1) {
          this._debouncing = true;
          setTimeout(() => {
            this._motionValue.notifyOfExternalUpdate('motion');
            this._debouncing = false;
          }, debounceTime);
        }
      }
    });
  }

  static fromDescription({
    warmupTime = 60_000,
    pin = 14,
    debounceTime = 20_000,
  }): MotionSensor {
    const motionSensor = new MotionSensor(warmupTime, pin, debounceTime);

    return motionSensor;
  }
}

export default MotionSensor;
