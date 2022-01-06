import Light from './';

describe('Light', () => {
  it('should return a thing with an on/off property', () => {
    // Arrange & Act
    const light = new Light();

    // Assert
    expect(light.hasProperty('on'));
  });

  it('should default on/off property to "on"', () => {
    // Arrange & Act
    const light = new Light();

    // Assert
    expect(light.getProperty('on')).toBe(true);
  });
});
