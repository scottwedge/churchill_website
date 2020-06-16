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
        debug: true,
        transitions: [{
            name: 'opacity-transition',
            once(data) {
                console.log('ran once');
                runOnce( data );
                scrollToBeginning( data );
            },
            after() {
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
                scrollToBeginning( data );
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

function scrollToBeginning( data ) {
    console.log(vars.scrollingContainer[data.next.namespace].slice( 1, -1 ))
    console.log(parseFloat( vars.scrollToBeginningMeasurements[data.next.namespace] ) );
    if( vars.scrollingContainer[data.next.namespace].slice( 1, -1 ) === 'window') {
        window.scrollTo( 0, parseFloat( vars.scrollToBeginningMeasurements[data.next.namespace] ) );
    } else {
        $( data.next.container ).find( vars.scrollingContainer[data.next.namespace].slice( 1, -1 ) )[0].scrollTo( 0, parseFloat( vars.scrollToBeginningMeasurements[data.next.namespace] ) );
    }
}

function runOnResize( pageLoad, data = { next: { container: $( 'main' ), namespace: $( 'main' ).css( 'data-barba-namespace' ) } } ) {
    // resizing elements with vh units
    resizeElement.resizeElements( pageLoad, data );

    // adjust text width to fit into container
    adjustTextBreaks( pageLoad );
    if ( vars.pagesWithScrollTransition[data.next.namespace] === 'true' ) {
        detectScrollHelper.registerPageScrollRecord();
        pageTransitionHelper.resetPageTransitions( data.next.container );
    }
}

function runOnLoad( data, pageLoad = true ) {
    // resizing elements with vh units
    resizeElement.resizeElements( pageLoad, data );

    // adjust text width to fit into container
    adjustTextBreaks( pageLoad );
    if ( vars.pagesWithScrollTransition[data.next.namespace] === 'true' ) {
        detectScrollHelper.registerPageScrollRecord();
        pageTransitionHelper.initiatePageTransitions();
    }
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
    runOnLoad( data );
    init();
}