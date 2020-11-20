const Ship = require('../src/ship.js');

describe('Ship properties and methods', () => {
   let ship;
   let itinerary = {ports: [{name: 'Dover'}, {name: 'Calais'}, {name: 'Hambourg'}]}
   beforeEach(() => {
      ship = new Ship(itinerary, 200);
   });

   it('can be instantiated', () => {
      expect(ship).toBeInstanceOf(Object);
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


   describe('Ship methods', () => {
   
      it('should have a boardPassengers method', () => {
         expect(ship).toHaveProperty('boardPassengers');
         expect(typeof ship.boardPassengers).toBe('function');
      });

      it(`boardPassengers should take in a number and add that number to the ship's passengers property`, () => {
         ship.boardPassengers(5);

         expect(ship.passengerCount).toBe(5);

         ship.boardPassengers(10);

         expect(ship.passengerCount).toBe(15);
      });

      it(`boardPassengers shouldn't result in a passenger count greater than the capacity of the ship`, () =>{
         ship.boardPassengers(205);

         expect(ship.passengerCount).toBe(200);

      });

      it(`boardPassengers shouldn't accept arguments that are not whole integers greater than 0`, () =>{
         expect( () => ship.boardPassengers('20')).toThrow(`Number of passengers to board must be a given as a number, not type: ${typeof '20'}`);
         expect( () => ship.boardPassengers()).toThrow(`Number of passengers to board must be a given as a number, not type: ${typeof undefined}`);
         expect( () => ship.boardPassengers(2.5)).toThrow(`Number of passengers to board must be a whole number`);
         expect( () => ship.boardPassengers(-5)).toThrow(`Cannot board zero passengers, nor a negative number of passengers`);
         expect( () => ship.boardPassengers(0)).toThrow(`Cannot board zero passengers, nor a negative number of passengers`);
      });
      

      it('should have a setSail method', () => {
         expect(ship).toHaveProperty('setSail');
         expect(typeof ship.setSail).toBe('function');
      });    
      
      it('should have a dock method', () => {
         expect(ship).toHaveProperty('dock');
         expect(typeof ship.dock).toBe('function');
      });
   });
});


describe('Ship methods that call port methods', () => {
   let ship;
   beforeEach(() => {
      const port = {
         removeShip: jest.fn(),
         addShip: jest.fn()
      }
      const itinerary = {
         ports: [{name: 'Dover', ...port},{name: 'Calais', ...port},{name: 'Hambourg', ...port}]
      }
      ship = new Ship(itinerary)
   });

   it(`setSail should set the previousPort to the same value as currentPort, and set current port to null`, () => {

      ship.setSail();

      expect(ship.previousPort.name).toBe('Dover');
      expect(ship.currentPort).toBeNull();
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
      for (let i = 0; i < ship.itinerary.ports.length; i++) {
         ship.setSail();
         ship.dock();
      }
         
      expect(ship.currentPort.name).toBe('Dover');
   });

   it('should get added to port after docking', () => {
      ship.setSail();
      ship.dock();

      expect(ship.currentPort.addShip).toHaveBeenCalledWith(ship);
   });

   it('should get removed from port ships list after setting sail', () => {
      ship.setSail();

      expect(ship.previousPort.removeShip).toHaveBeenCalledWith(ship);
   });
});
      

