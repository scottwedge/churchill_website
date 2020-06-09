import * as vars from '../../data/vars.json';
import $ from 'jquery';

export function navIsOpen() {
    return $( 'body' ).hasClass( vars.navigationOpenClass )
}

export function contentOpen() {
    return !navIsOpen();
}

export function registerNavigationToggle() {
    $( '.m-navigation-toggle' ).on( 'click', () => {
        $( 'body' ).toggleClass( vars.navigationOpenClass );
    } );
}