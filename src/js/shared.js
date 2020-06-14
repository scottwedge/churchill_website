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
            once(data) {
                runOnce( data );
            },
            after() {
                document.body.scrollTop = 0;
            },
            leave(data) {
                return gsap.to(data.current.container, {
                    autoAlpha: 0,
                    display: 'none'
                });
            },
            beforeEnter( data ) {
                runAfterTransition( data );
            },
            enter(data) {
                window.scrollTo(0, 0)
                return gsap.from(data.next.container, {
                    autoAlpha: 0
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
        runOnResize( false );
    });
}

function runOnResize( pageLoad, data = { next: { container: $( 'main' ) } } ) {
    // resizing elements with vh units
    resizeElement.resizeElements( pageLoad );

    // adjust text width to fit into container
    adjustTextBreaks( pageLoad );
    detectScrollHelper.registerPageScrollRecord();
    pageTransitionHelper.resetPageTransitions( data.next.container );
}

function runOnLoad( pageLoad = true ) {
    // resizing elements with vh units
    resizeElement.resizeElements( pageLoad );

    // adjust text width to fit into container
    adjustTextBreaks( pageLoad );
    detectScrollHelper.registerPageScrollRecord();
    pageTransitionHelper.initiatePageTransitions();
    stateHelper.registerNavigationToggle();
}

function runAfterTransition( data ) {
    stateHelper.removeNavigationToggle();
    stateHelper.toggleFooterTransparency( data );
    runOnResize( true, data );
    init();
}

function runOnce( data ) {
    stateHelper.toggleFooterTransparency( data );
    runOnLoad( );
    init();
}