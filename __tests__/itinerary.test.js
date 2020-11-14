const Itinerary = require('../src/itinerary.js')
const Port = require('../src/port.js');


describe('Itinerary class', () => {
   it('can be instatiated', () => {
     expect(new Itinerary()).toBeInstanceOf(Object);
   });
});


describe('Itinerary properties', () => {
   let itinerary = new Itinerary([ new Port('Calais'), new Port('Hambourg'), new Port('Rotterdam')])

   it('has a destination ports property that has a value of an array containing a list of port objects', () => {
     expect(itinerary).toHaveProperty('destinationPorts', 
                                       [{name: 'Calais'}, {name: 'Hambourg'}, {name: 'Rotterdam'}]);
   });
});