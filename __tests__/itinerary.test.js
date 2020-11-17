const Itinerary = require('../src/itinerary.js')
const Port = require('../src/port.js');

describe('Itinerary class and properties', () => {
   let calais = new Port('Calais');
   let hambourg = new Port('Hambourg');
   let itinerary = new Itinerary([calais, hambourg]);
   
   describe('Itinerary class', () => {
      it('can be instatiated', () => {
      expect(itinerary).toBeInstanceOf(Object);
      });
   });

   describe('Itinerary properties', () => {
      it('has a ports property that has a value of an array containing a list of port objects', () => {
         expect(itinerary).toHaveProperty('ports', [calais, hambourg]);                                    
      });
   });
});
