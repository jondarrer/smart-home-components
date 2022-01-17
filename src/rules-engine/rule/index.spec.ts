import Rule from './';
import { Effect, PropertyEffect } from '../../effects';
import { Trigger, PropertyTrigger } from '../../triggers';
import { MotionProperty, OnOffProperty } from '../../properties';
import { MotionSensor, RelaySwitch } from '../../components';

describe('Rule', () => {
  it('should construct a new Property/Property rule from description', () => {
    // Arrange
    const description = {
      enabled: true,
      name: 'Property/Property Test Rule',
      trigger: {
        property: {
          type: 'string',
          thing: 'motion-sensor-1',
          id: 'motion',
        },
        type: 'PropertyTrigger',
        value: 'motion',
      },
      effect: {
        property: {
          type: 'string',
          thing: 'relay-switch-1',
          id: 'onoff',
        },
        type: 'PropertyEffect',
        value: 'on',
      },
    };

    // Act
    const rule = Rule.fromDescription(description);

    // Assert
    expect(rule).toHaveProperty('enabled', true);
    expect(rule).toHaveProperty('name', 'Property/Property Test Rule');
    expect(rule).toHaveProperty('trigger');
    expect(rule.trigger).toBeInstanceOf(PropertyTrigger);
    expect(rule).toHaveProperty('effect');
    expect(rule.effect).toBeInstanceOf(PropertyEffect);
  });
});
