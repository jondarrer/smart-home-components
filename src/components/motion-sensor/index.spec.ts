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

  it('should fire the onChanged callback after motion has been detected after the thing is active', async () => {
    // Arrange
    const motionSensor = new MotionSensor(0);
    const mockHandler = jest.fn();
    motionSensor.onChanged(mockHandler);

    // Act
    await sleep(0);
    mockGpio.emit('alert', 1);

    // Assert
    expect(mockHandler).toHaveBeenCalledWith('motion');
  });

  it('should not fire the onChanged callback after motion has been detected before the thing is active', () => {
    // Arrange
    const warmupTime = 10;
    const motionSensor = new MotionSensor(warmupTime);
    const mockHandler = jest.fn();
    motionSensor.onChanged(mockHandler);

    // Act
    mockGpio.emit('alert', 1);

    // Assert
    expect(mockHandler).not.toHaveBeenCalled();
  });

  it('should not fire the onChanged callback while motion has been detected after the thing is active before the debounce time', async () => {
    // Arrange
    const debounceTime = 20;
    const motionSensor = new MotionSensor(0, 14, debounceTime);
    const mockHandler = jest.fn();
    motionSensor.onChanged(mockHandler);

    // Act
    await sleep(0);
    mockGpio.emit('alert', 1);
    await sleep(debounceTime - 1);
    mockGpio.emit('alert', 0);

    // Assert
    expect(mockHandler).not.toHaveBeenCalledWith('no motion');
  });

  it('should fire the onChanged callback while motion has been detected after the thing is active after the debounce time', async () => {
    // Arrange
    const debounceTime = 20;
    const motionSensor = new MotionSensor(0, 14, debounceTime);
    const mockHandler = jest.fn();
    motionSensor.onChanged(mockHandler);

    // Act
    await sleep(0);
    mockGpio.emit('alert', 1);
    await sleep(debounceTime + 1);
    mockGpio.emit('alert', 0);

    // Assert
    expect(mockHandler).toHaveBeenCalledWith('no motion');
  });
});
