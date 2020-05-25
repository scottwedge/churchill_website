import { adjustTextBreaks } from './textOverflowManager/textOverflowManager.js';
import { init } from './waveAnimation/waveAnimation.js';
import { createObserver } from './intersectionObserver/intersectionObserver.js';
import { resizeToViewportHeightFraction } from './resizeToViewportHeightFraction/resizeToViewportHeightFraction.js'
import { setImagePosition } from './elementAnimations/elementAnimations.js';
import * as vars from '../data/vars.json';
import $ from 'jquery';
import barba from '@barba/core';
import gsap from 'gsap';

barba.init({
    transitions: [{
      name: 'opacity-transition',
      leave(data) {
          console.log("now");
        return gsap.to(data.current.container, {
          opacity: 0
        });
      },
      enter(data) {
        return gsap.from(data.next.container, {
          opacity: 0
        });
      }
    }]
  });

$( window ).on( "load", () => {
    // resizing elements with vh units
    resizeToViewportHeightFraction( $( ".m-spacer" ), "height", vars.mediaCanvasHeightFractionMobile );
    resizeToViewportHeightFraction( $( ".m-media-canvas" ), "height", vars.mediaCanvasHeightFractionMobile );
    // resizeToViewportHeightFraction( $( "h1" ), "padding-top", vars.h1PaddingTopFractionMobile );
    

    // start animation
    init();
    // adjust text width to fit into container
    adjustTextBreaks();
});
$( window ).on( "resize", () => {
    // resizing elements with vh units
    resizeToViewportHeightFraction( $( ".m-spacer" ), "height", vars.mediaCanvasHeightFractionMobile );
    resizeToViewportHeightFraction( $( ".m-media-canvas" ), "height", vars.mediaCanvasHeightFractionMobile );
    // resizeToViewportHeightFraction( $( "h1" ), "padding-top", vars.h1PaddingTopFractionMobile );

    // adjust text width to fit into container
    adjustTextBreaks();
});