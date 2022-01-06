import { Thing } from 'webthing';
import { OnOffProperty } from '../../properties';

class Light extends Thing {
  constructor() {
    super(
      'urn:dev:ops:my-light-1234',
      'My Light',
      ['OnOffSwitch', 'Light'],
      'A smart light'
    );

    this.addProperty(new OnOffProperty(this));
  }
}

export default Light;
