const Port = require('../src/port.js');
const Ship = require('../src/ship.js')

describe('Ship class', () => {
   it('can be instantiated', () => {
      expect(new Ship()).toBeInstanceOf(Object);
   });
});

describe('Ship properties', () => {
   let ship
   let dover
   beforeEach(() =>  {
      dover = new Port('Dover');
      ship = new Ship(dover);
   })

   it('should have a current port property set to the initial port', ()  => {
      expect(ship).toHaveProperty('currentPort', dover);
   });

   it('should have a passengerCount property initialised to 0', ()  => {
      expect(ship).toHaveProperty('passengerCount', 0);
   });

   xit('should have a isSailing property initialised as false', ()  => {
      expect(ship).toHaveProperty('isSailing', false);
   });

   xit('should have a dockedAt property initialised as the starting port', ()  => {
      expect(ship).toHaveProperty('dockedAt', dover);
   });

   
});

describe('Ship methods', () => {
   let ship
   let dover
   beforeEach(() =>  {
      dover = new Port('Dover');
      ship = new Ship(dover);
   })

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
   
   it(`setSail should set the ship's currentPort property to null`, () => {
      ship.setSail();

      expect(ship.currentPort).toBeNull();
   });

   it('should have a dock method that only accepts objects as its argument', () => {
      expect(ship).toHaveProperty('dock');
      expect(typeof ship.dock).toBe('function');
      expect( () => ship.dock('Calais')).toThrow('ports must be objects')
   });
   
   it('should be able to dock at different ports', () => {
      let calais = new Port('Calais')
      
      ship.dock(calais)

      expect(ship.currentPort).toBe(calais)
   });
      
});