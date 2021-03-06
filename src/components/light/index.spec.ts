import Light from './';

describe('Light', () => {
  it('should have an onoff property', () => {
    // Arrange & Act
    const light = new Light();

    // Assert
    expect(light.hasProperty('onoff')).toBeTruthy();
  });

  it('should default onoff property to "off"', () => {
    // Arrange & Act
    const light = new Light();

    // Assert
    expect(light.getProperty('onoff')).toBe('off');
  });
});
