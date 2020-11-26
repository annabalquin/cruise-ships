(function exportController(){
   class Controller {
      constructor(ship) {
         this.ship = ship;

         this.initializeSea();

         document.querySelector('#sailbutton').addEventListener('click', () => this.setSail());
         document.querySelector('#returnbutton').addEventListener('click', () => this.returnShipToStart());
      }

      initializeSea() {
         const viewport = document.querySelector('#viewport');
         const backgrounds = ["url('./images/water0.png')", "url('./images/water1.png')"];
         let currentImg = 0;
         setInterval( () => {
            if (currentImg === 0) {         
               viewport.style.backgroundImage = backgrounds[1];
               currentImg = 1;
            } else {
               viewport.style.backgroundImage = backgrounds[0];
               currentImg = 0;
            }
         }, 1000);
      }

      renderPorts() {
        const portsContainer = document.querySelector('#ports');
        if (portsContainer.hasChildNodes()){ 
         while (portsContainer.firstChild) {
            portsContainer.removeChild(portsContainer.firstChild)
         }
      }
        let portsContainerWidth = 0;
        this.ship.itinerary.ports.forEach((port, index) => {
            let portDiv = document.createElement('div');
            portDiv.classList.add('port');
            portDiv.dataset.portName = port.name;
            portDiv.dataset.portIndex = index;
            portsContainer.appendChild(portDiv);
            portsContainerWidth += 256;
            portsContainer.width = `${portsContainerWidth}px`
        });

      }

      renderShip() {
         const viewport = document.querySelector('#viewport');
         const shipDiv = document.querySelector('#ship');
         shipDiv.classList.add('ship');
         const positionLeft = 60 + (this.ship.portsIndex * 256);
         shipDiv.style.left = `${positionLeft}px`;
         viewport.appendChild(shipDiv)
      }

      setSail() {
         if (!this.ship.itinerary.ports.length) {
            return this.renderMessage('No ports! Please set some ports before sailing.');
         }

         if (this.ship.itinerary.ports.length ===  1) {
            return this.renderMessage('Add at least 1 more port for us to sail to!');
         }
        
         if (this.ship.portsIndex === this.ship.itinerary.ports.length-1) {
            this.renderMessage('End of line! Please disembark. Have a nice day!')
            setTimeout(() => {
              const returnButton =  document.querySelector('#returnbutton');
              returnButton.style.display = 'block';
              document.querySelector('#sailbutton').style.display = 'none';

            }, 2000);
         } else {
            this.ship.setSail();
            this.renderMessage(`Now departing ${this.ship.previousPort.name}`)
            this.ship.dock();       
            const shipDiv = document.querySelector('#ship');
            setTimeout(() => {
               this.renderMessage(`Now arriving in ${this.ship.currentPort.name}`);
               this.renderHUD();
            }, 3000)
            shipDiv.style.left = `${60 + (this.ship.portsIndex * 256)}px`;
         }    
      }

      returnShipToStart() {
         document.querySelector('#ship').style.left = `60px`;
         this.ship.setSail();
         this.ship.dock();
         setTimeout(() => {
            const returnButton =  document.querySelector('#returnbutton');
            returnButton.style.display = 'none';
            document.querySelector('#sailbutton').style.display = 'block';
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
               hud.removeChild(hud.firstChild)
            }
         }
         const current = document.createElement('div')
         current.innerHTML = `Current Port: ${this.ship.currentPort.name}`;
         hud.appendChild(current);
        
         if (this.ship.itinerary.ports[this.ship.portsIndex+1]) {
            const next = document.createElement('div');
            next.innerHTML = `Next Port: ${this.ship.itinerary.ports[this.ship.portsIndex+1].name}`;
            hud.appendChild(next);
         }
         
         
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
//    const viewport = document.querySelector('#viewport');
//    let shipDiv = document.createElement('div');
//    shipDiv.classList.add('ship');
//    const index = ship.portsIndex;
//    const portElement = document.querySelector(`.port[data-port-index='${index}'`)
//    shipDiv.style.top = `${portElement.offsetTop + 32}px`;
//    shipDiv.style.left = `${portElement.offsetLeft - 32}px`;
//    console.log(shipDiv.top, shipDiv.left)
//    viewport.appendChild(shipDiv)
// }