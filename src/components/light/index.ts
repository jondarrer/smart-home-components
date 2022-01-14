import { Thing } from 'webthing';
import { OnOffProperty } from '../../properties';
import { generateRandomHexId } from '../../utils';

class Light extends Thing {
  constructor() {
    const id = generateRandomHexId(4);
    super(
      `urn:jd:shc:light-${id}`,
      'Light',
      ['OnOffSwitch', 'Light'],
      'A smart light'
    );

    this.addProperty(new OnOffProperty(this));
  }
}

export default Light;
