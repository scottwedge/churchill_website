import { adjustTextBreaks } from './textOverflowManager/textOverflowManager.js';
import { init } from './waveAnimation/waveAnimation.js';
import { createObserver } from './intersectionObserver/intersectionObserver.js';
import * as resizeElement from './resizeElement/resizeElement.js';
import * as vars from '../data/vars.json';
import videojs from 'video.js';
import $ from 'jquery';
import barba from '@barba/core';
import gsap from 'gsap';
import * as pageTransitionHelper from './pageTransitionHelper/pageTransitionHelper.js';
import * as detectScrollHelper from './detectScrollHelper/detectScrollHelper.js';

export default function sharedFunctions( ) {
    barba.init({
        transitions: [{
          name: 'opacity-transition',
          leave(data) {
            return gsap.to(data.current.container, {
              opacity: 0
            });
          },
          enter(data) {
            return gsap.from(data.next.container, {
              opacity: 0
            });
          }
        }],
        views: [{
            namespace: 'story',
            beforeEnter(data) {
                videojs( $('.m-video-container')[0] );
            }

        }]
      });
    
    barba.hooks.enter(() => {
        document.body.scrollTop = 0;
    });
    barba.hooks.after(() => {
        // resizing elements with vh units
        resizeElement.resizeElements();
    
        // start animation
        init();
        // adjust text width to fit into container
        adjustTextBreaks();
        detectScrollHelper.registerPageScrollRecord();
        pageTransitionHelper.initiatePageTransitions();
    });
    $( window ).on( "load", () => {
        // resizing elements with vh units
        resizeElement.resizeElements();
        
    
        // start animation
        init();
        // adjust text width to fit into container
        adjustTextBreaks();
        detectScrollHelper.registerPageScrollRecord();
        pageTransitionHelper.initiatePageTransitions();
    });
    $( window ).on( "resize", () => {
        // resizing elements with vh units
        resizeElement.resizeElements();
    
        // adjust text width to fit into container
        adjustTextBreaks();
        detectScrollHelper.registerPageScrollRecord();
        pageTransitionHelper.resetPageTransitions();
    });
}