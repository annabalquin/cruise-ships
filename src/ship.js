class Ship {
   constructor(itinerary) {
    this.itinerary = itinerary;
    this.portsIndex = 0;
    this.currentPort = this.itinerary.ports[this.portsIndex];
    this.previousPort = null;
    this.passengerCount = 0;
   }
   boardPassengers(num) {
      this.passengerCount += num;
   }
   setSail() {
      this.currentPort.removeShip(this);
      this.previousPort = this.currentPort;
      this.currentPort = null;
      this.portsIndex < this.itinerary.ports.length-1 ? this.portsIndex++ : this.portsIndex = 0;
   }
   dock() {
     this.currentPort = this.itinerary.ports[this.portsIndex];
     this.currentPort.addShip(this);
   }

}

module.exports = Ship