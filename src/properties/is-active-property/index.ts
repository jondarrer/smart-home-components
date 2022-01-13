import { Property, Thing, Value } from 'webthing';

class IsActiveProperty extends Property {
  constructor(thing: Thing) {
    super(thing, 'isActive', new Value(false), {
      '@type': 'IsActiveProperty',
      title: 'Is Active',
      type: 'boolean',
      description: 'True when active',
    });
  }
}

export default IsActiveProperty;
