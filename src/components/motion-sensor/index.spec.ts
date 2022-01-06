import MotionSensor from './';

describe('MotionSensor', () => {
  it('should return a thing with a motion property', () => {
    // Arrange & Act
    const motionSensor = new MotionSensor();

    // Assert
    expect(motionSensor.hasProperty('motion'));
  });

  it('should default motion property to "no motion"', () => {
    // Arrange & Act
    const motionSensor = new MotionSensor();

    // Assert
    expect(motionSensor.getProperty('motion')).toBe('no motion');
  });
});
