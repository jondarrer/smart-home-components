import Effect from '../effect';

class PropertyEffect implements Effect {
  type: string | null;
  value: string | null;
  property: any;

  constructor(type: string, value: string, property: any) {
    this.type = type;
    this.value = value;
    this.property = {
      type: property.type,
      thing: property.thing,
      id: property.id,
    };
  }

  static fromDescription(description: any): PropertyEffect {
    return new PropertyEffect(
      description.type,
      description.value,
      description.property
    );
  }
}

export default PropertyEffect;
