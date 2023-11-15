import { EventBus } from '../src/EventBus.mjs';

const event = new EventBus();

const context = {
  contextA: 'contextA',
};

event.on('hello', function (payload) {
  console.log('hello bus', payload, this.contextA);
});

event.on('hello', function (payload) {
  console.log('hello bus 2', payload?.a);
});

event.once('hello-once', function () {
  console.log('hello once');
});

event.emit('hello');

event.emit('hello', null, {
  context,
});

event.emit('hello-once');
event.emit('hello-once');