class Ship {
   constructor(itinerary) {
    this.itinerary = itinerary;
    this.portCount = 0;
    this.currentPort = this.itinerary.destinationPorts[this.portCount];
    this.previousPort = null;
    this.passengerCount = 0;
   }
   boardPassengers(num) {
      this.passengerCount += num;
   }
   setSail() {
      this.previousPort = this.currentPort;
      this.currentPort = null;
      this.portCount++
   }
   dock() {
      this.currentPort = this.itinerary.destinationPorts[this.portCount];
   }

}

module.exports = Ship