const Port = require('../src/port.js');
const Ship = require('../src/ship.js');
const Itinerary = require('../src/itinerary.js');

const itinerary = new Itinerary([ new Port('Dover'), new Port('Calais'), new Port('Hambourg'), new Port('Rotterdam')]);

describe('Ship class', () => {
   it('can be instantiated', () => {
      expect(new Ship(itinerary)).toBeInstanceOf(Object);
   });
});

describe('Ship properties', () => {
   let ship;
   beforeEach(() =>  {
      ship = new Ship(itinerary);
   });

   it('should have a current port property set to the initial port', ()  => {
      expect(ship).toHaveProperty('currentPort', {name: 'Dover'});
   });

   it('should have a passengerCount property initialised to 0', ()  => {
      expect(ship).toHaveProperty('passengerCount', 0);
   });

   
   
});

describe('Ship methods', () => {
   let ship;
   let itinerary;
   beforeEach(() =>  {
      itinerary = new Itinerary([ new Port('Dover'), new Port('Calais'), new Port('Hambourg'), new Port('Rotterdam')]);
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

      expect(ship.currentPort).toEqual({name: 'Calais'});

      ship.setSail();
      ship.dock();

      expect(ship.currentPort).toEqual({name: 'Hambourg'});
   });
     
});