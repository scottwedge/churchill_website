import * as vars from '../../data/vars.json';
import $ from 'jquery';

let innerHeight

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