class Ship {
   constructor(port) {
    this.currentPort = port;
    this.passengerCount = 0;
   }
   boardPassengers(num) {
      this.passengerCount += num;
   }
   setSail() {
     this.currentPort = null;
   }
   dock(port) {
      if (typeof port !== 'object') {
         throw new Error('ports must be objects')
      }
      this.currentPort = port;
   }

}

module.exports = Ship