
    var init = function() {
      var carousel = document.getElementById('carousel'),
          navButtons = document.querySelectorAll('#navigation button'),
          panelCount = carousel.children.length,
          theta = 0,

          onNavButtonClick = function( event ){
            var increment = parseInt( event.target.getAttribute('data-increment') );
            theta += ( 360 / panelCount ) * increment * -1;
            carousel.style.transform = 'translateZ( -288px ) rotateY(' + theta + 'deg)';
            console.log(carousel.style.transform)
          };
        console.log(carousel.style.transform)
      for (var i=0; i < 2; i++) {
        navButtons[i].addEventListener( 'click', onNavButtonClick, false);
      }

    };
    window.addEventListener( 'DOMContentLoaded', init, false);
