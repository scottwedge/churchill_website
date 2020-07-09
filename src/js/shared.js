import { adjustTextBreaks } from './textOverflowManager/textOverflowManager.js';
import { init } from './waveAnimation/waveAnimation.js';
import * as stateHelper from './stateHelper/stateHelper.js';
import * as resizeElement from './resizeElement/resizeElement.js';
import * as vars from '../data/vars.json';
import $ from 'jquery';
import barba from '@barba/core';
import gsap from 'gsap';
import * as pageTransitionHelper from './pageTransitionHelper/pageTransitionHelper.js';
import * as detectScrollHelper from './detectScrollHelper/detectScrollHelper.js';
import * as videoJsHelper from './videoJsHelper/videoJsHelper.js';

export default function sharedFunctions( ) {
    barba.init({
        debug: true,
        transitions: [{
            name: 'opacity-transition',
            once(data) {
                beforeEnterTransition( data );
                enterTransition( data );
                afterEnterTransition( data );
            },
            leave(data) {
                return gsap.to(data.current.container, {
                    autoAlpha: 0,
                    display: 'none'
                });
            },
            beforeEnter( data ) {
                beforeEnterTransition( data );
            },
            enter(data) {
                enterTransition( data );
                return gsap.from(data.next.container, {
                    autoAlpha: 0
                });
            },
            afterEnter(data) {
                afterEnterTransition( data );
            }
        }]
    });
    $( window ).on( "resize", () => {
        runOnResize( false );
    });
}

function scrollToBeginning( data ) {
    if( vars.scrollingContainer[data.next.namespace].slice( 1, -1 ) === 'window') {
        console.log("beginning");
        window.scrollTo( 0, resizeElement.returnViewportHeightFraction( vars.arrowAbsoluteHeightFractionMobile ) );
    } else {
        $( data.next.container ).find( vars.scrollingContainer[data.next.namespace].slice( 1, -1 ) )[0].scrollTo( 0, parseInt( vars.scrollToBeginningMeasurements[data.next.namespace] ) );
    }
}

function runOnResize( pageLoad, data = { next: { container: $( 'main' ), namespace: $( 'main' ).attr( 'data-barba-namespace' ) } } ) {
    // resizing elements with vh units
    resizeElement.resizeElements( pageLoad, data );

    // adjust text width to fit into container
    adjustTextBreaks( pageLoad );
}

function afterEnterTransition( data ) {
    // set proper classes
    stateHelper.adjustHeaderColor( true, false, data );
    stateHelper.handleFooterVisibility( data );
    stateHelper.handleHeaderVisibility( data );
    // register content manipulation and handlers
    stateHelper.registerNavigationToggle();
    if ( vars.pagesWithScrollTransition[data.next.namespace] === 'true') {
        pageTransitionHelper.resetPageTransitions( data.next.container);
    }
    stateHelper.registerSustainabilitySlideManager( data );
}

function enterTransition( data ) {
    scrollToBeginning( data );
}

function beforeEnterTransition( data ) {
    // cleaning up
    stateHelper.removeNavigationToggle();
    stateHelper.adjustFooterClass( data );
    //instantiating content and helpers from next page - do this in dom ready.
    videoJsHelper.instantiateVideoJs( data );
    runOnResize( true, data );
    init();
}