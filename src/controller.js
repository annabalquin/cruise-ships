(function exportController(){
   class Controller {
      constructor() {
         this.initializeSea();
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

      renderPorts(ports) {
        const portsContainer = document.querySelector('#ports');
        let portsContainerWidth = 0;
        ports.forEach((port, index) => {
            let portDiv = document.createElement('div');
            portDiv.classList.add('port');
            portDiv.dataset.portName = port.name;
            portDiv.dataset.portIndex = index;
            portsContainer.appendChild(portDiv);
            portsContainerWidth += 256;
            portsContainer.width = `${portsContainerWidth}px`
        });

      }

      renderShip(ship) {
         const viewport = document.querySelector('#viewport');
         let shipDiv = document.createElement('div');
         shipDiv.classList.add('ship');
         let positionLeft;
         // ship.portsIndex = 1;
         if (ship.portsIndex === 0) {
            positionLeft = 60;
         } else {
            positionLeft = 60 + (ship.portsIndex * 256);
         }
         shipDiv.style.left = `${positionLeft}px`;
         viewport.appendChild(shipDiv)
      }
   }

   if (typeof module !== 'undefined' && module.exports) {
      module.exports = Controller;
   } else {
      window.Controller = Controller;
   }
}());


// MCR codes % solution for swtiching back and forht between images
// window.setInterval(() => {
//    document.querySelector('#viewport').style.backgroundImage = `url('${backgrounds[backgroundIndex % backgrounds.length]}')`;
//    backgroundIndex += 1;
//  }, 1000);


