import $ from 'jquery';
import createObserver from '../intersectionObserver/intersectionObserver.js';
import * as vars from '../../data/vars.json';
import barba from '@barba/core';

let isScrolled;

function bottomObserverMargin( nextBarbaContainer ) {
    let bottomMargin = parseFloat(vars.observerMarginTolerance);
    /*
    if ( $( nextBarbaContainer ).find( '.m-text-container' ).length > 0 ) {
        let textTableBottomMargin = $( '.m-text-table' ).css("marginBottom");
        topMargin = window.outerHeight === 0 ? window.innerHeight : Math.min( window.outerHeight, window.innerHeight ) - parseFloat(textTableBottomMargin.slice(0, -2)) + parseFloat(vars.observerMarginTolerance);
    } else {
        let textTableFixedBottomMargin = $( '.m-text-table-fixed' ).css("marginBottom");
        topMargin = window.outerHeight === 0 ? window.innerHeight : Math.min( window.outerHeight, window.innerHeight ) - $( '.m-footer-transparent' ).outerHeight( true ) - parseFloat(textTableFixedBottomMargin.slice(0, -2)) + parseFloat(vars.observerMarginTolerance);
    }
    */
    return '0px 0px 0px ' + Math.ceil( bottomMargin ) + 'px';
}

function scrolledToTopReference( nextBarbaContainer ) {
    return $( nextBarbaContainer ).find( '.scrolled-to-top-reference' );
}

function scrolledToBottomReference( nextBarbaContainer ) {
    return $( nextBarbaContainer ).find( '.scrolled-to-bottom-reference' );
}

function topObserverMargin( nextBarbaContainer ) {
    let topMargin = parseFloat(vars.observerMarginTolerance);
    /*
    if ( $( '.m-text-container' ).length > 0 ) {
        topMargin = 0;
    } else {
        topMargin = $( '.m-heading-top').outerHeight( true ) + parseFloat( scrolledToTopReference( nextBarbaContainer ).css('marginTop').slice( 0, -2 ) );
    }
    */
    return Math.ceil( topMargin ) + 'px 0px 0px 0px';
}

function scrolledToTopRoot() {
    return null;
}

function scrolledToBottomRoot() {
    return null;
}

export function scrolledToTopObserver( handleIntersect, nextBarbaContainer ) {
    return createObserver(
        scrolledToTopReference( nextBarbaContainer ),
        parseFloat( vars.intersectionObserverSteps ),
        handleIntersect,
        topObserverMargin( nextBarbaContainer ),
        scrolledToTopRoot()
    );
}

export function scrolledToBottomObserver( handleIntersect, nextBarbaContainer ) {
    return createObserver(
        scrolledToBottomReference( nextBarbaContainer ),
        parseFloat( vars.intersectionObserverSteps ),
        handleIntersect,
        bottomObserverMargin( nextBarbaContainer ),
        scrolledToBottomRoot()
    );
}
