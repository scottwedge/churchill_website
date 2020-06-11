import { adjustTextBreaks } from './textOverflowManager/textOverflowManager.js';
import { init } from './waveAnimation/waveAnimation.js';
import * as stateHelper from './stateHelper/stateHelper.js';
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
            once() {
                runOnce();
            },
            after() {
            },
            leave(data) {
                return gsap.to(data.current.container, {
                    autoAlpha: 0,
                    display: 'none'
                });
            },
            beforeEnter(data) {
                runAfterTransition(data.next.container);
            },
            enter(data) {
                return gsap.from(data.next.container, {
                    opacity: 0
                });
            },
            afterEnter(data) {
            }
        }],
        views: [{
            namespace: 'story',
            beforeEnter(data) {
                videojs( $('.m-video-container')[0] );
            }

        }]
    });
    $( window ).on( "resize", () => {
        runOnResize();
    });
}

function runOnResize( nextBarbaContainer ) {
    // resizing elements with vh units
    resizeElement.resizeElements();

    // adjust text width to fit into container
    adjustTextBreaks();
    detectScrollHelper.registerPageScrollRecord();
    pageTransitionHelper.resetPageTransitions( nextBarbaContainer );
}

function runOnLoad() {
    // resizing elements with vh units
    resizeElement.resizeElements();

    // adjust text width to fit into container
    adjustTextBreaks();
    detectScrollHelper.registerPageScrollRecord();
    pageTransitionHelper.initiatePageTransitions();
}

function runAfterTransition( nextBarbaContainer ) {
    init();
    runOnResize( nextBarbaContainer );
}

function runOnce() {
    init();
    runOnLoad();
    stateHelper.registerNavigationToggle();
}