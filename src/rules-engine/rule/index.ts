import { Effect, PropertyEffect } from '../../effects';
import { PropertyTrigger, Trigger } from '../../triggers';

class Rule {
  enabled = false;
  name: string | null;
  trigger: Trigger | null;
  effect: Effect | null;
  property: any;

  constructor() {
    this.name = null;
    this.trigger = null;
    this.effect = null;
  }
  static fromDescription(description: any): Rule {
    const rule = new Rule();
    rule.enabled = description.enabled;
    rule.name = description.name;

    switch (description.trigger.type) {
      case 'PropertyTrigger':
        rule.trigger = PropertyTrigger.fromDescription(description.trigger);
        break;
    }

    switch (description.effect.type) {
      case 'PropertyEffect':
        rule.effect = PropertyEffect.fromDescription(description.effect);
        break;
    }

    return rule;
  }
}

export default Rule;
