import * as vars from '../../data/vars.json';
import $ from 'jquery';

let prevWindowHeight = 0;
let prevWindowWidth = 0;
let resizeCounter;

export function navIsOpen() {
    return $( 'body' ).hasClass( vars.navigationOpenClass )
}

export function contentOpen() {
    return !navIsOpen();
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