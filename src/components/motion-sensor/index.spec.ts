import MotionSensor from './';
import { sleep } from '../../utils';

describe('MotionSensor', () => {
  it('should have a motion property', () => {
    // Arrange & Act
    const motionSensor = new MotionSensor();

    // Assert
    expect(motionSensor.hasProperty('motion')).toBeTruthy();
  });

  it('should default motion property to "no motion"', () => {
    // Arrange & Act
    const motionSensor = new MotionSensor();

    // Assert
    expect(motionSensor.getProperty('motion')).toBe('no motion');
  });

  it('should have an isActive property', () => {
    // Arrange & Act
    const motionSensor = new MotionSensor();

    // Assert
    expect(motionSensor.hasProperty('isActive')).toBeTruthy();
  });

  it('should not be immediately active', () => {
    // Arrange & Act
    const motionSensor = new MotionSensor();

    // Assert
    expect(motionSensor.getProperty('isActive')).toBeFalsy();
  });

  it.skip('should be active after the initial start up delay', () => {
    // Arrange
    const warmupTime = 100;
    // Act
    const motionSensor = new MotionSensor(warmupTime);
    sleep(warmupTime);

    // Assert
    expect(motionSensor.getProperty('isActive')).toBeTruthy();
  });
});
