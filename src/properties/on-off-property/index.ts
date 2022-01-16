import { Property, Thing, Value } from 'webthing';

class OnOffProperty extends Property {
  constructor(thing: Thing, value = new Value('off')) {
    super(thing, 'onoff', value, {
      '@type': 'OnOffProperty',
      title: 'OnOff',
      type: 'string',
      description: 'True when on',
    });
  }
}

export default OnOffProperty;
