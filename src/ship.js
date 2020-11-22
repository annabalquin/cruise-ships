(function exportShip(){
   class Ship {
      constructor(itinerary, capacity) {
         this.itinerary = itinerary;
         this.capacity =  capacity;
         this.passengerCount = 0;
         this._portsIndex = 0;
         this.currentPort = this.itinerary.ports[this._portsIndex];
         this.previousPort = null;  
      }
      boardPassengers(num) {
         if (typeof num !== 'number') {
            throw new Error(`Number of passengers to board must be a given as a number, not type: ${typeof num}`)
         }
         if (!Number.isInteger(num)) {
            throw new Error(`Number of passengers to board must be a whole number`);
         }
         if (Math.sign(num) !== 1) {
            throw new Error(`Cannot board zero passengers, nor a negative number of passengers`)
         }
         if ((this.passengerCount + num) > this.capacity) {
            this.passengerCount = this.capacity;
            return `Cannot have more than ${this.capacity} passengers total`;
         } else {
            this.passengerCount += num;
         }
      }
      setSail() {
         this.currentPort.removeShip(this);
         this.previousPort = this.currentPort;
         this.currentPort = null;
         this._portsIndex < this.itinerary.ports.length-1 ? this._portsIndex++ : this._portsIndex = 0;
      }
      dock() {
      this.currentPort = this.itinerary.ports[this._portsIndex];
      this.currentPort.addShip(this);
      }

   }

   if (typeof module !== 'undefined' && module.exports){
       module.exports = Ship;
   } else {
      window.Ship = Ship
   }
}());
