(function exportController(){
   class Controller {
      constructor(ship) {
         this.ship = ship;

         this.initializeSea();

         document.querySelector('#sailbutton').addEventListener('click', () => this.setSail());
      }

      

      initializeSea() {
         const viewport = document.querySelector('#viewport');
         console.log(viewport.offsetTop, 'left', viewport.offsetLeft)
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
            if (this.ship.portsIndex === this.ship.itinerary.ports.length-1) {
               alert('End of line! Please disembark. Have a nice day. Ship is now reversing beeep beeep beeep')
            }
            this.ship.setSail();
            this.ship.dock();
            const shipDiv = document.querySelector('#ship');
            shipDiv.style.left = `${60 + (this.ship.portsIndex * 256)}px`;
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