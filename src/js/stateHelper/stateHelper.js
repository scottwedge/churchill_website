import * as vars from '../../data/vars.json';
import $ from 'jquery';
import barba from '@barba/core';

let prevWindowHeight = 0;
let prevWindowWidth = 0;
let resizeCounter;
let slideshowTimer;
let activeSlideIndex;
let sustainabilitySlides = [1, 2, 3, 4, 6, 8, 10, 11, 12, 13, 14, 17];

let activeSloganIndex;
let sloganTimer;

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

function addSloganVisibility( sloganIndex ) {
    $( '.m-slogan-word' ).eq( sloganIndex ).addClass( 'is-visible' );
}

function removeSloganVisibility( sloganIndex ) {
    $( '.m-slogan-word' ).eq( sloganIndex ).removeClass( 'is-visible' );
}

function advanceSustainabilitySlideshow() {
    removeSlideshowVisibility( activeSlideIndex );
    activeSlideIndex = ( activeSlideIndex + 1 ) % sustainabilitySlides.length ;
    addSlideshowVisibility( activeSlideIndex );
}

function advanceSloganAnimation() {
    //removeSloganVisibility( activeSloganIndex );
    activeSloganIndex++;
    if( activeSloganIndex !== 3 ) {
        addSloganVisibility( activeSloganIndex );
    } else {
        clearInterval( sloganTimer );
        barba.go('/html/product.html');
    }
}

export function registerNavigationToggle( ) {
    //$( '.m-navigation-toggle' ).off( 'click' );
    $( '.m-navigation-toggle' ).on( 'click', () => {
        $( 'body' ).toggleClass( vars.navigationOpenClass );
        adjustHeaderColor( false, !navIsOpen() );
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

export function registerIndexAnimationManager() {
    activeSloganIndex = 0;
    toggleSloganAnimation();
    addSloganVisibility( activeSloganIndex );
    clearInterval( sloganTimer );
    sloganTimer = setInterval( advanceSloganAnimation, vars.indexAnimationSloganInterval );
}

export function toggleSloganAnimation( ) {
    $( '.m-animation' ).toggleClass( 'slogan-visible' );
}

export function handleHeaderVisibility( data ) {
    if ( data.current.namespace === 'animation' ) {
        $( '.m-header' ).removeClass( 'is-not-visible' );
    }
    if ( data.next.namespace === 'animation' ) {
        $( '.m-header' ).addClass( 'is-not-visible' );
    }
}

export function handleFooterVisibility( data ) {
    if ( data.current.namespace === 'animation' ) {
        $( '.m-footer' ).removeClass( 'is-not-visible' );
    }
    if ( data.next.namespace === 'animation' ) {
        $( '.m-footer' ).addClass( 'is-not-visible' );
    }
}

function toggleHeaderColor() {
    $( '.m-header' ).toggleClass( 'white' );
}

export function adjustHeaderColor( pageTransitioning = false, navClosing = false, data = { next: { namespace: $( 'main' ).attr( 'data-barba-namespace' ) } } ) {
    if ( ( navClosing || pageTransitioning ) && vars.headerColors[ data.next.namespace ] === 'white' ) {
        $( '.m-header' ).removeClass( 'white' );
        $( '.m-header' ).addClass( 'white' );
    } else {
        $( '.m-header' ).removeClass( 'white' );
    }
}