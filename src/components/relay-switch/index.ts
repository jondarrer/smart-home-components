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
      ['OnOffSwitch'],
      'A smart relay switch'
    );

    this.addProperty(new OnOffProperty(this));

    this.onoffGpioPin = new Gpio(pin, { mode: Gpio.OUTPUT, alert: false });
  }

  switchOn() {
    this.switch('on');
  }

  switchOff() {
    this.switch('off');
  }

  switch(onoff: 'on' | 'off') {
    this.setProperty('onoff', onoff);
    this.onoffGpioPin.digitalWrite(onoff === 'on' ? 1 : 0);
  }
}

export default RelaySwitch;
