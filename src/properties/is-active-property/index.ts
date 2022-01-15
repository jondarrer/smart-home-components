import { Property, Thing, Value } from 'webthing';

class IsActiveProperty extends Property {
  constructor(thing: Thing, value = new Value(false)) {
    super(thing, 'isActive', value, {
      '@type': 'IsActiveProperty',
      title: 'Is Active',
      type: 'boolean',
      description: 'True when active',
    });
  }
}

export default IsActiveProperty;
