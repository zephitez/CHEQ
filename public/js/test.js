
    var init = function() {
      var carousel = document.getElementById('carousel'),
          navButtons = document.querySelectorAll('#navigation button'),
          panelCount = carousel.children.length,
          theta = 0,


          onNavButtonClick = function( event ){
            var increment;
            if(event.target.id == "increment"){
              increment = -1;
            }else{
            increment = 1;
            }
            // var increment = parseInt( event.target.getAttribute('data-increment') );
            theta += ( 360 / panelCount ) * increment * -1;
            carousel.style.transform = 'translateZ( -344px ) rotateY(' + theta + 'deg)';
            console.log("increment ", increment);
            console.log("panelCount ", panelCount);
            console.log("transform ", theta);
          };

      for (var i=0; i < 2; i++) {
        navButtons[i].addEventListener( 'click', onNavButtonClick, false);
      }
      console.log("loaded");

    };
    window.addEventListener( 'DOMContentLoaded', init, false);
