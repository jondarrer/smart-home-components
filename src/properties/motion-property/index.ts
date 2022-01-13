import { Property, Thing, Value } from 'webthing';

class MotionProperty extends Property {
  constructor(thing: Thing) {
    super(thing, 'motion', new Value('no motion'), {
      '@type': 'MotionProperty',
      title: 'Motion',
      type: 'string',
      description: '"motion" when motion is detected, "no motion" otherwise',
    });
  }
}

export default MotionProperty;
