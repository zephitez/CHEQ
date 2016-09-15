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





    // CAROUSEL
    var carousel = document.getElementById('carousel'),
        navButtons = document.querySelectorAll('#navigation button'),
        panelCount = carousel.children.length,
        theta = 0;


    onArrowButtonClick = function( event ) {
        var increment;

        if(event.target.id == "increment") {
          increment = -1;
        } else {
          increment = 1;
        }
        // var increment = parseInt( event.target.getAttribute('data-increment') );
        theta += ( 360 / panelCount ) * increment * -1;

        carousel.style.transform = 'translateZ( -344px ) rotateY(' + theta + 'deg)';

        // testing purposes
        console.log("increment ", increment);
        console.log("panelCount ", panelCount);
        console.log("transform ", theta);
    };

    for (var i=0; i < 2; i++) {
      navButtons[i].addEventListener( 'click', onArrowButtonClick, false);
    }

    // PANEL 3

    var img = new Image();

    // User Variables - customize these to change the image being scrolled, its direction, and the speed.

    img.src = 'http://i.imgur.com/QtYhf3P.png';
    var CanvasXSize = 500;
    var CanvasYSize = 400;
    var speed = 10; //lower is faster
    var scale = 1.05;
    var y = -4.5; //vertical offset

    // Main program

    var dx = 0.75;
    var imgW;
    var imgH;
    var x = 0;
    var clearX;
    var clearY;
    var ctx;

    img.onload = function() {
      imgW = img.width*scale;
      imgH = img.height*scale;

      if (imgW > CanvasXSize) { x = CanvasXSize-imgW; } // image larger than canvas

      if (imgW > CanvasXSize) { clearX = imgW; } // image larger than canvas
      else { clearX = CanvasXSize; }

      if (imgH > CanvasYSize) { clearY = imgH; } // image larger than canvas
      else { clearY = CanvasYSize; }

      //Get Canvas Element
      ctx = document.getElementById('canvas').getContext('2d');

      //Set Refresh Rate
      return setInterval(draw, speed);
    }

  function draw() {
    //Clear Canvas
    ctx.clearRect(0,0,clearX,clearY);
    //If image is <= Canvas Size
    if (imgW <= CanvasXSize) {
        //reset, start from beginning
        if (x > (CanvasXSize)) { x = 0; }
        //draw aditional image
        if (x > (CanvasXSize-imgW)) { ctx.drawImage(img,x-CanvasXSize+1,y,imgW,imgH); }
    }
    //If image is > Canvas Size
    else {
        //reset, start from beginning
        if (x > (CanvasXSize)) { x = CanvasXSize-imgW; }
        //draw aditional image
        if (x > (CanvasXSize-imgW)) { ctx.drawImage(img,x-imgW+1,y,imgW,imgH); }
    }
    //draw image
    ctx.drawImage(img,x,y,imgW,imgH);
    //amount to move
    x += dx;
  }


};

window.addEventListener( 'DOMContentLoaded', init, false);
