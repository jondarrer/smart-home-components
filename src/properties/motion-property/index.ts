import { Property, Thing, Value } from 'webthing';

class MotionProperty extends Property {
  constructor(thing: Thing, value = new Value('no motion')) {
    super(thing, 'motion', value, {
      '@type': 'MotionProperty',
      title: 'Motion',
      type: 'string',
      description: '"motion" when motion is detected, "no motion" otherwise',
    });
  }
}

export default MotionProperty;
