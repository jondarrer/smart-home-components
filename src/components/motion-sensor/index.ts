import { Gpio } from 'pigpio';
import { Thing } from 'webthing';
import { MotionProperty, IsActiveProperty } from '../../properties';
import { generateRandomHexId } from '../../utils';

class MotionSensor extends Thing {
  _motionGpioPin: Gpio;
  _changedEventHandlers: Array<Function> = [];
  _debouncing = false;

  constructor(warmupTime = 60_000, pin = 14, debounceTime = 20_000) {
    super(
      `motion-sensor-${generateRandomHexId(4)}`,
      'Motion Sensor',
      ['MotionSensor'],
      'A smart motion sensor'
    );

    this.addProperty(new MotionProperty(this));
    this.addProperty(new IsActiveProperty(this));

    // It takes a little time for the sensor to warm up,
    // typically 1 minute, but can vary (and useful for unit testing).
    setTimeout(() => {
      this.setProperty('isActive', true);
    }, warmupTime);

    this._motionGpioPin = new Gpio(pin, { mode: Gpio.INPUT, alert: true });
    this._motionGpioPin.on('alert', (level: 0 | 1, _tick: number) => {
      if (this.getProperty('isActive') === true && this._debouncing === false) {
        this.setProperty('motion', level === 0 ? 'no motion' : 'motion');
        this._changedEventHandlers.forEach((handler) =>
          handler(this.getProperty('motion'))
        );

        if (level === 1) {
          this._debouncing = true;
          setTimeout(() => {
            this.setProperty('motion', 'no motion');
            this._changedEventHandlers.forEach((handler) =>
              handler(this.getProperty('motion'))
            );
            this._debouncing = false;
          }, debounceTime);
        }
      }
    });
  }

  onChanged(handler: Function) {
    this._changedEventHandlers.push(handler);
  }
}

export default MotionSensor;
