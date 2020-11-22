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


