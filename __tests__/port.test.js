const Port = require('../src/port.js');

describe('Port class', () => {
   it('can be instantiated', () => {
      expect(new Port()).toBeInstanceOf(Object)
   })
})

describe('Port properties', () => {
   let calais;
   beforeEach(() => calais = new Port('Calais'))

   it('should have a name', () => {
      expect(calais).toHaveProperty('name', 'Calais')
   })
})  