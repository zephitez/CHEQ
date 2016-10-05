var init = function() {


  // ACTIVE TAB/LINK HIGHLIGHT FOR DASHBOARD
  var tabs = document.querySelectorAll('.tabs ul li');
      tabsLink =
  document.querySelectorAll('.tabs ul li a'),
      current = window.location.pathname;


    for (i = 0; i < tabsLink.length; i++) {

      if (tabsLink[i].pathname == current) {
        tabs[i].className = "is-active"
        }
    }





    // // CAROUSEL
    // var carousel = document.getElementById('carousel'),
    //     navButtons = document.querySelectorAll('#navigation button'),
    //     panelCount = carousel.children.length,
    //     theta = 0;
    //
    //
    // onArrowButtonClick = function( event ) {
    //     var increment;
    //
    //     if(event.target.id == "increment") {
    //       increment = -1;
    //     } else {
    //       increment = 1;
    //     }
    //     // var increment = parseInt( event.target.getAttribute('data-increment') );
    //     theta += ( 360 / panelCount ) * increment * -1;
    //
    //     carousel.style.transform = 'translateZ( -344px ) rotateY(' + theta + 'deg)';
    //
    //     // testing purposes
    //     console.log("increment ", increment);
    //     console.log("panelCount ", panelCount);
    //     console.log("transform ", theta);
    // };
    //
    // for (var i=0; i < 2; i++) {
    //   navButtons[i].addEventListener( 'click', onArrowButtonClick, false);
    // }



};

window.addEventListener( 'DOMContentLoaded', init, false);
