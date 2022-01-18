import Trigger from '../trigger';

class PropertyTrigger implements Trigger {
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

  static fromDescription(description: any): PropertyTrigger {
    return new PropertyTrigger(
      description.type,
      description.value,
      description.property
    );
  }
}

export default PropertyTrigger;
