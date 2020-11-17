const Itinerary = require('../src/itinerary.js')

describe('Itinerary class and properties', () => {
   const port1 = jest.fn(), port2 = jest.fn();
   let itinerary = new Itinerary([port1, port2]);
   
   describe('Itinerary class', () => {
      it('can be instatiated', () => {
      expect(itinerary).toBeInstanceOf(Object);
      });
   });

   describe('Itinerary properties', () => {
      it('has a ports property that has a value of an array containing a list of port objects', () => {
         expect(itinerary).toHaveProperty('ports', [port1, port2]);                                    
      });
   });
});
