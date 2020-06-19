import * as vars from '../../data/vars.json';
import $ from 'jquery';

let prevWindowHeight = 0;
let prevWindowWidth = 0;
let resizeCounter;
let slideshowTimer;
let activeSlideIndex;
let sustainabilitySlides = [1, 2, 3, 4, 6, 8, 10, 11, 12, 13, 14, 17];

export function navIsOpen() {
    return $( 'body' ).hasClass( vars.navigationOpenClass )
}

export function contentOpen() {
    return !navIsOpen();
}

function addSlideshowVisibility( slideIndex ) {
    $( '.m-sustainability .global-goals-' + sustainabilitySlides[ slideIndex ] ).addClass( 'is-visible' );
}

function removeSlideshowVisibility( slideIndex ) {
    $( '.m-sustainability .global-goals-' + sustainabilitySlides[ slideIndex ] ).removeClass( 'is-visible' );
}

function advanceSustainabilitySlideshow() {
    removeSlideshowVisibility( activeSlideIndex );
    activeSlideIndex = ( activeSlideIndex + 1 ) % sustainabilitySlides.length ;
    addSlideshowVisibility( activeSlideIndex );
}

export function registerNavigationToggle() {
    //$( '.m-navigation-toggle' ).off( 'click' );
    $( '.m-navigation-toggle' ).on( 'click', () => {
        $( 'body' ).toggleClass( vars.navigationOpenClass );
    } );
}

export function removeNavigationToggle() {
    $( 'body' ).removeClass( vars.navigationOpenClass );
}

export function toggleFooterTransparency( data ) {
    if ( data.current.namespace === 'story' || data.next.namespace === 'story' ) {
        $( '.m-footer, .m-footer-transparent' ).toggleClass( 'm-footer m-footer-transparent' );
    }
}

// return true the first time when the window size doesn't change.
export function afterWindowSizeChange( nextWindowHeight = window.outerHeight === 0 ? window.innerHeight : Math.min( window.outerHeight, window.innerHeight ), nextWindowWidth = $( window ).width() ) {
    if ( nextWindowWidth !== prevWindowWidth || nextWindowHeight !== prevWindowHeight ) {
        resizeCounter = 0;
        prevWindowWidth = nextWindowWidth;
        prevWindowHeight = nextWindowHeight;
        return false;
    } else if ( resizeCounter === 1 ) {
        resizeCounter++;
        return true;
    } else {
        resizeCounter++;
        return false;
    }
}

export function addressBarVisible( ) {
    return document.documentElement.clientHeight === (window.outerHeight === 0 ? window.innerHeight : Math.min( window.outerHeight, window.innerHeight ));
}

export function registerSustainabilitySlideManager( data ) {
    if( data.next.namespace === 'sustainability' ) {
        activeSlideIndex = 0;
        clearInterval( slideshowTimer );
        slideshowTimer = setInterval( advanceSustainabilitySlideshow, vars.sustainabilitySlideInterval );
    }
}