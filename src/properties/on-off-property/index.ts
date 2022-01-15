import { Property, Thing, Value } from 'webthing';

class OnOffProperty extends Property {
  constructor(thing: Thing, value = new Value(false)) {
    super(thing, 'onoff', value, {
      '@type': 'OnOffProperty',
      title: 'OnOff',
      type: 'boolean',
      description: 'True when on',
    });
  }
}

export default OnOffProperty;
