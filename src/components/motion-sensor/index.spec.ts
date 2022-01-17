import EventEmitter from 'events';

import MotionSensor from './';
import { sleep } from '../../utils';

const mockGpio = new EventEmitter();

jest.mock('pigpio', () => {
  return {
    Gpio: jest.fn().mockImplementation(() => mockGpio),
  };
});

describe('MotionSensor', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('should have a motion property', () => {
    // Arrange & Act
    const motionSensor = new MotionSensor(0);

    // Assert
    expect(motionSensor.hasProperty('motion')).toBeTruthy();
  });

  it('should default motion property to "no motion"', () => {
    // Arrange & Act
    const motionSensor = new MotionSensor(0);

    // Assert
    expect(motionSensor.getProperty('motion')).toBe('no motion');
  });

  it('should have an isActive property', () => {
    // Arrange & Act
    const motionSensor = new MotionSensor(0);

    // Assert
    expect(motionSensor.hasProperty('isActive')).toBeTruthy();
  });

  it('should not be immediately active', () => {
    // Arrange & Act
    const motionSensor = new MotionSensor(0);

    // Assert
    expect(motionSensor.getProperty('isActive')).toBeFalsy();
  });

  it('should be active after the initial start up delay', async () => {
    // Arrange
    const warmupTime = 10;
    const motionSensor = new MotionSensor(warmupTime);

    // Act
    await sleep(warmupTime);

    // Assert
    expect(motionSensor.getProperty('isActive')).toBeTruthy();
  });

  it('should set the motion property to "motion" when motion has been detected after the thing is active', async () => {
    // Arrange
    const motionSensor = new MotionSensor(0);

    // Act
    await sleep(0);
    mockGpio.emit('alert', 1);

    // Assert
    expect(motionSensor.getProperty('motion')).toBe('motion');
  });

  it('should not set the motion property to "motion" when motion has been detected before the thing is active', () => {
    // Arrange
    const warmupTime = 10;
    const motionSensor = new MotionSensor(warmupTime);

    // Act
    mockGpio.emit('alert', 1);

    // Assert
    expect(motionSensor.getProperty('motion')).toBe('no motion');
  });

  it('should notify subscribers of the "motion:motion" change after motion has been detected after the thing is active', async () => {
    // Arrange
    const motionSensor = new MotionSensor(0);
    const mockHandler = { send: jest.fn() };
    motionSensor.addSubscriber(mockHandler);

    // Act
    await sleep(0);
    mockGpio.emit('alert', 1);

    // Assert
    expect(mockHandler.send).toHaveBeenCalledWith(
      '{"messageType":"propertyStatus","data":{"motion":"motion"}}'
    );
  });

  it('should not notify subscribers of the "motion:motion" change callback after motion has been detected before the thing is active', () => {
    // Arrange
    const warmupTime = 10;
    const motionSensor = new MotionSensor(warmupTime);
    const mockHandler = { send: jest.fn() };
    motionSensor.addSubscriber(mockHandler);

    // Act
    mockGpio.emit('alert', 1);

    // Assert
    expect(mockHandler.send).not.toHaveBeenCalledWith(
      '{"messageType":"propertyStatus","data":{"motion":"motion"}}'
    );
  });

  it('should not notify subscribers of the "motion:no motion" change while motion has been detected after the thing is active before the debounce time', async () => {
    // Arrange
    const debounceTime = 20;
    const motionSensor = new MotionSensor(0, 14, debounceTime);
    const mockHandler = { send: jest.fn() };
    motionSensor.addSubscriber(mockHandler);

    // Act
    await sleep(0);
    mockGpio.emit('alert', 1);
    await sleep(debounceTime - 1);
    mockGpio.emit('alert', 0);

    // Assert
    expect(mockHandler.send).not.toHaveBeenCalledWith(
      '{"messageType":"propertyStatus","data":{"motion":"no motion"}}'
    );
  });

  it('should notify subscribers of the "motion:no motion" change while motion has been detected after the thing is active after the debounce time', async () => {
    // Arrange
    const debounceTime = 20;
    const motionSensor = new MotionSensor(0, 14, debounceTime);
    const mockHandler = { send: jest.fn() };
    motionSensor.addSubscriber(mockHandler);

    // Act
    await sleep(0);
    mockGpio.emit('alert', 1);
    await sleep(debounceTime + 1);
    mockGpio.emit('alert', 0);

    // Assert
    expect(mockHandler.send).toHaveBeenCalledWith(
      '{"messageType":"propertyStatus","data":{"motion":"no motion"}}'
    );
  });

  it('should build a motion sensor from a "JSON description"', () => {
    // Arrange
    const description = {
      title: '',
      warmupTime: 2,
      pin: -1,
      debounceTime: 5,
    };

    // Act
    const motionSensor = MotionSensor.fromDescription(description);

    // Assert
    expect(motionSensor.getProperty('motion')).toBe('no motion');
    expect(motionSensor.getProperty('isActive')).toBe(false);
    expect(motionSensor).toHaveProperty('_debouncing', false);
  });
});
