import { Event, Thing } from 'webthing';

class MotionEvent extends Event {
  constructor(thing: Thing, data?: any) {
    super(thing, 'motion', data);
  }
}

export default MotionEvent;
