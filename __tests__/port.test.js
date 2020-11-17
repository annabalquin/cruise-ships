const Port = require('../src/port.js');
const Ship = require('../src/ship.js');
const Itinerary = require('../src/itinerary.js');


describe('Port class and properties', () => {
   let calais = new Port('Calais');

   describe('Port class', () => {
      it('can be instantiated', () => {
         expect(calais).toBeInstanceOf(Object)
      });
   });

   describe('Port properties', () => {
      it('should have a name', () => {
         expect(calais).toHaveProperty('name', 'Calais');
      });

      it('should store an array of docked ships', () => {
         expect(calais).toHaveProperty('ships', []);
      });
   });
});


describe('Port methods', () => {
   let calais, itinerary, ship;
   beforeEach( () => {
      calais = new Port('Calais');
      ship = jest.fn();
   });

   it('should be able to add to its ships array', () => {
      calais.addShip(ship);

      expect(calais.ships).toContain(ship);
   });

   it('should be able to remove ships from its ships array', () => {
      calais.addShip(ship);
      calais.removeShip(ship);

      expect(calais.ships).not.toContain();
   });

   it('should be able to handle multiple ships arriving', () => {
      let itinerary = new Itinerary([ new Port('Dover'), calais]);
      let theLazyLobster = new Ship(itinerary)
      let theMurderousMermaid = new Ship(itinerary)

   
      theLazyLobster.setSail();
      theLazyLobster.dock();
      theMurderousMermaid.setSail();
      theMurderousMermaid.dock();
     
      
      expect(calais.ships).toContain(theLazyLobster && theMurderousMermaid);
   });
});