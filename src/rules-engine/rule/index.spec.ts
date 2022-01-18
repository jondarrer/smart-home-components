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
    expect(rule.trigger?.property).toHaveProperty('type', 'string');
    expect(rule.trigger?.property).toHaveProperty('thing', 'motion-sensor-1');
    expect(rule.trigger?.property).toHaveProperty('id', 'motion');
    expect(rule.trigger).toHaveProperty('type', 'PropertyTrigger');
    expect(rule.trigger).toHaveProperty('value', 'motion');
    expect(rule).toHaveProperty('effect');
    expect(rule.effect).toBeInstanceOf(PropertyEffect);
    expect(rule.effect?.property).toHaveProperty('type', 'string');
    expect(rule.effect?.property).toHaveProperty('thing', 'relay-switch-1');
    expect(rule.effect?.property).toHaveProperty('id', 'onoff');
    expect(rule.effect).toHaveProperty('type', 'PropertyEffect');
    expect(rule.effect).toHaveProperty('value', 'on');
  });
});
