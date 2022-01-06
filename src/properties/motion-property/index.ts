import { Property, Thing, Value } from 'webthing';

class MotionProperty extends Property {
  constructor(thing: Thing) {
    super(thing, 'motion', new Value('no motion'), {
      '@type': 'MotionProperty',
      title: 'Motion',
      type: 'boolean',
      description: 'True when motion is detected',
    });
  }
}

export default MotionProperty;
