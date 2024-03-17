( function( $ ) {

	"use strict";

  $(".card").tilt({
    maxTilt: 15,
    perspective: 1400,
    easing: "cubic-bezier(.03,.98,.52,.99)",
    speed: 1000,
    glare: true,
    maxGlare: 0.3,
    scale: 1.06
  });
  
}( jQuery ) );