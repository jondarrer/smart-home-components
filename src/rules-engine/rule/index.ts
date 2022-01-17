import { Effect, Trigger } from '../..';

class Rule {
  trigger: Trigger | null;
  effect: Effect | null;
  property: any;

  constructor() {
    this.trigger = null;
    this.effect = null;
  }
  static fromDescription(description: any): Rule {
    return new Rule();
  }
}

export default Rule;
