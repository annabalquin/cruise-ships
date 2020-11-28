(function exportController(){
   class Controller {
      constructor(ship) {
         this.ship = ship;

         this.viewport = document.querySelector('#viewport');
         this.returnButton = document.querySelector('#return-button');
         this.sailButton = document.querySelector('#sail-button');
         this.clearPortsButton = document.querySelector('#clear-ports-button');
         this.shipDiv = document.querySelector('#ship');

         this.initializeSea();
         this.renderShip();

         this.sailButton.addEventListener('click', () => this.setSail());
         this.returnButton.addEventListener('click', () => this.returnShipToStart());
         this.clearPortsButton.addEventListener('click', () => this.clearPorts());
      }

      initializeSea() {
         const backgrounds = ["url('./images/water0.png')", "url('./images/water1.png')"];
         let currentImg = 0;
         setInterval( () => {
            if (currentImg === 0) {         
               this.viewport.style.backgroundImage = backgrounds[1];
               currentImg = 1;
            } else {
               this.viewport.style.backgroundImage = backgrounds[0];
               currentImg = 0;
            }
         }, 1000);
      }

      renderPorts() {
        const portsContainer = document.querySelector('#ports');
        if (portsContainer.hasChildNodes()){ 
         while (portsContainer.firstChild) {
            portsContainer.removeChild(portsContainer.firstChild);
         }
      }
        let portsContainerWidth = 0;
        if(this.ship.itinerary.ports.length > 0){
            this.ship.itinerary.ports.forEach((port, index) => {
               let portDiv = document.createElement('div');
               portDiv.classList.add('port');
               portDiv.dataset.portName = port.name;
               portDiv.dataset.portIndex = index;
               portsContainer.appendChild(portDiv);
               portsContainerWidth += 256;
               portsContainer.width = `${portsContainerWidth}px`;
            });
         }

      }

      renderShip() {
         this.shipDiv.classList.add('ship');
         const positionLeft = 60 + (this.ship.portsIndex * 256);
         this.shipDiv.style.left = `${positionLeft}px`;
      }

      setSail() {
         const { ports } = this.ship.itinerary;

         if (!ports.length) {
            return this.renderMessage('No ports! Please set some ports before sailing.');
         }

         if (ports.length ===  1) {
            return this.renderMessage('Add at least 1 more port for us to sail to!');
         }
        
         if (this.ship.portsIndex === ports.length-1) {
            this.renderMessage('End of line! Return to the start or add more ports');
            setTimeout(() => {
              this.returnButton.style.display = 'block';
              this.sailButton.style.display = 'none';
            }, 2000);
         } else {
            this.ship.setSail();
            this.renderMessage(`Now departing ${this.ship.previousPort.name}`);
            this.ship.dock();       
            setTimeout(() => {
               this.renderMessage(`Now arriving in ${this.ship.currentPort.name}`);
               this.renderHUD();
            }, 3000);
            this.shipDiv.style.left = `${60 + (this.ship.portsIndex * 256)}px`;
         }    
      }

      returnShipToStart() {
         this.shipDiv.style.left = `60px`;
         this.ship.setSail();
         this.ship.dock();
         setTimeout(() => {
            this.returnButton.style.display = 'none';
            this.sailButton.style.display = 'block';
            this.renderHUD();
         }, 3000);
      }

      renderMessage(message) {
         const messagebox = document.querySelector('#messagebox');
         messagebox.style.display = 'block';
         messagebox.innerHTML = message;
         setTimeout(() => {
            messagebox.style.display = 'none';
         }, 3000);
      }

      renderHUD() {
         const hud = document.querySelector('#hud');
         if (hud.hasChildNodes()){ 
            while (hud.firstChild) {
               hud.removeChild(hud.firstChild);
            }
         }
         if (this.ship.currentPort) {
            const current = document.createElement('div');
            current.innerHTML = `Current Port: ${this.ship.currentPort.name}`;
            hud.appendChild(current);
         }
         const nextPort = this.ship.itinerary.ports[this.ship.portsIndex+1];
         if (nextPort) {
            const next = document.createElement('div');
            next.innerHTML = `Next Port: ${this.ship.itinerary.ports[this.ship.portsIndex+1].name}`;
            hud.appendChild(next);
         }
      }

      clearPorts() {
         this.ship.itinerary.ports = [];
         this.ship.currentPort = null;
         this.ship.previousPort = null;
         this.ship.portsIndex = 0;
         this.renderPorts();
         this.renderHUD();
         document.querySelector('#ship').style.left = `60px`;
      }
   }

   if (typeof module !== 'undefined' && module.exports) {
      module.exports = Controller;
   } else {
      window.Controller = Controller;
   }
}());




//LEAVING COMMENTS HERE FOR MY REFERENCE 

// MCR CODES % MAKING WAVES
// window.setInterval(() => {
//    document.querySelector('#viewport').style.backgroundImage = `url('${backgrounds[backgroundIndex % backgrounds.length]}')`;
//    backgroundIndex += 1;
//  }, 1000);



//  MCR CODES RENDER SHIP
// renderShip(ship) {
//    
//    let shipDiv = document.createElement('div');
//    shipDiv.classList.add('ship');
//    const index = ship.portsIndex;
//    const portElement = document.querySelector(`.port[data-port-index='${index}'`)
//    shipDiv.style.top = `${portElement.offsetTop + 32}px`;
//    shipDiv.style.left = `${portElement.offsetLeft - 32}px`;
//    console.log(shipDiv.top, shipDiv.left)
//    this.viewport.appendChild(shipDiv)
// }