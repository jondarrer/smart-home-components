import MotionSensor from './';

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
});
