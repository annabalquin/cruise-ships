const Port = require('../src/port.js');
const Ship = require('../src/ship.js');
const Itinerary = require('../src/itinerary.js');



describe('Ship class and properties', () => {
   let ship;
   beforeEach(() =>  {
      ship = new Ship(new Itinerary([new Port('Dover')]))
   });

   describe('Ship class', () => {
      it('can be instantiated', () => {
         expect(ship).toBeInstanceOf(Object);
      });
   });

   describe('Ship properties', () => {
      it('should have a current port property set to the initial port', ()  => {
         expect(ship).toHaveProperty('currentPort');
         expect(ship.currentPort.name).toBe('Dover');
      });

      it('should have a passengerCount property initialised to 0', ()  => {
         expect(ship).toHaveProperty('passengerCount', 0);
      });
   });
})

describe('Ship methods', () => {
   let dover, calais, hambourg, rotterdam, itinerary, ship;
    beforeEach(() =>  {
      dover = new Port('Dover');
      calais = new Port('Calais');
      hambourg = new Port('Hambourg');
      rotterdam = new Port('Rotterdam');
      itinerary = new Itinerary([ dover, calais, hambourg, rotterdam]);
      ship = new Ship(itinerary);
  });

   it('should have a boardPassengers method', () => {
      expect(ship).toHaveProperty('boardPassengers');
      expect(typeof ship.boardPassengers).toBe('function');
   });

   it(`boardPassengers should take in a number and add that number to the ship's passnegers property`, () => {
      ship.boardPassengers(5);

      expect(ship.passengerCount).toBe(5);

      ship.boardPassengers(10);

      expect(ship.passengerCount).toBe(15);
   })

   it('should have a setSail method', () => {
      expect(ship).toHaveProperty('setSail');
      expect(typeof ship.setSail).toBe('function');
   });    
   
   it(`setSail should set the previousPort to the same value as currentPort, 
      and set current port to null`, () => {
      ship.setSail();

      expect(ship.previousPort).toEqual(new Port('Dover'));
      expect(ship.currentPort).toBeNull();
   }); 

   it('should have a dock method', () => {
      expect(ship).toHaveProperty('dock');
      expect(typeof ship.dock).toBe('function');
   });
   
   it('should dock at the next port on the itinerary ', () => {  
      ship.setSail();
      ship.dock();

      expect(ship.currentPort.name).toBe('Calais');

      ship.setSail();
      ship.dock();

      expect(ship.currentPort.name).toBe('Hambourg');
   });

   it('should go back to the originating port after docking in the last port on the itinerary', () => {
      for (let i = 0; i < itinerary.ports.length; i++) {
         ship.setSail();
         ship.dock();
      }
         
      expect(ship.currentPort.name).toBe('Dover');

   });

   it('should get added to port after docking', () => {
      ship.setSail();
      ship.dock();

      expect(ship.currentPort.ships).toContain(ship);
   });

   it('should get removed from port ships list after setting sail', () => {
      ship.setSail();

      expect(ship.previousPort.ships).not.toContain(ship);
   })
     
});