import { Gpio } from 'pigpio';
import { Thing } from 'webthing';
import { OnOffProperty } from '../../properties';
import { generateRandomHexId } from '../../utils';

class RelaySwitch extends Thing {
  onoffGpioPin: Gpio;

  constructor(pin = 23) {
    super(
      `relay-switch-${generateRandomHexId(4)}`,
      'Relay Switch',
      ['RelaySwitch'],
      'A smart relay switch'
    );

    this.addProperty(new OnOffProperty(this));

    this.onoffGpioPin = new Gpio(pin, { mode: Gpio.OUTPUT, alert: false });
  }

  switchOn() {
    this.switch(true);
  }

  switchOff() {
    this.switch(false);
  }

  switch(onoff: boolean) {
    this.setProperty('onoff', onoff);
    this.onoffGpioPin.digitalWrite(onoff === true ? 1 : 0);
  }
}

export default RelaySwitch;
