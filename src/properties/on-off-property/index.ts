import { Property, Thing, Value } from 'webthing';

class OnOffProperty extends Property {
  constructor(thing: Thing) {
    super(thing, 'onoff', new Value(false), {
      '@type': 'OnOffProperty',
      title: 'OnOff',
      type: 'boolean',
      description: 'True when on',
    });
  }
}

export default OnOffProperty;
