import { Thing } from 'webthing';
import { OnOffProperty } from '../../properties';
import { generateRandomHexId } from '../../utils';

class Light extends Thing {
  constructor() {
    super(
      `light-${generateRandomHexId(4)}`,
      'Light',
      ['OnOffSwitch', 'Light'],
      'A smart light'
    );

    this.addProperty(new OnOffProperty(this));
  }
}

export default Light;
