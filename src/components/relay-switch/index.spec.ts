import EventEmitter from 'events';
import { Gpio } from 'pigpio';

import RelaySwitch from './';

jest.mock('pigpio', () => {
  return {
    Gpio: jest.fn().mockImplementation(() => mockGpio),
  };
});

class MockGpio extends EventEmitter {
  digitalWrite;

  constructor() {
    super();
    this.digitalWrite = jest.fn();
  }
}

const mockGpio = new MockGpio();
mockGpio.digitalWrite = jest.fn();

describe('RelaySwitch', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should have an onoff property', () => {
    // Arrange & Act
    const relaySwitch = new RelaySwitch();

    // Assert
    expect(relaySwitch.hasProperty('onoff')).toBeTruthy();
  });

  it('should default onoff property to "false"', () => {
    // Arrange & Act
    const relaySwitch = new RelaySwitch();

    // Assert
    expect(relaySwitch.getProperty('onoff')).toBe(false);
  });

  it('should set the GPIO pin to on when switchOn is called', () => {
    // Arrange
    const relaySwitch = new RelaySwitch();

    // Act
    relaySwitch.switchOn();

    // Assert
    expect(mockGpio.digitalWrite).toHaveBeenCalledWith(1);
  });

  it('should set the GPIO pin to off when switchOff is called', () => {
    // Arrange
    const relaySwitch = new RelaySwitch();

    // Act
    relaySwitch.switchOff();

    // Assert
    expect(mockGpio.digitalWrite).toHaveBeenCalledWith(0);
  });
});
