import $ from 'jquery';
import createObserver from '../intersectionObserver/intersectionObserver.js';
import * as vars from '../../data/vars.json';
import barba from '@barba/core';

let isScrolled;

function bottomObserverMargin() {
    let topMargin;
    if ( $( '.m-text-container' ).length > 0 ) {
        let textTableBottomMargin = $( '.m-text-table' ).css("marginBottom");
        topMargin = $( window ).height() - parseFloat(textTableBottomMargin.slice(0, -2));
    } else {
        let textTableFixedBottomMargin = $( '.m-text-table-fixed' ).css("marginBottom");
        topMargin = $( window ).height() - $( '.m-footer-transparent' ).outerHeight( true ) - parseFloat(textTableFixedBottomMargin.slice(0, -2));
    }
    return '-' + Math.ceil( topMargin ) + 'px 0px 0px 0px';
}

function scrolledToTopReference() {
    return $( '.m-media-canvas' ).add( '.m-text-table-fixed p' ).first();
}

function scrolledToBottomReference() {
    return $( '.m-text-container, .m-text-table-fixed' );
}

function topObserverMargin() {
    let topMargin;
    if ( $( '.m-text-container' ).length > 0 ) {
        topMargin = 0;
    } else {
        topMargin = $( '.m-heading-top').outerHeight( true ) + parseFloat( scrolledToTopReference().css('marginTop').slice( 0, -2 ) );
    }
    return '-' + Math.floor( topMargin ) + 'px 0px 0px 0px';
}

function scrolledToTopRoot() {
    return null;
}

function scrolledToBottomRoot() {
    return null;
}

export function scrolledToTopObserver( handleIntersect ) {
    return createObserver(
        scrolledToTopReference(),
        parseFloat( vars.intersectionObserverSteps ),
        handleIntersect,
        topObserverMargin(),
        scrolledToTopRoot()
    );
}

export function scrolledToBottomObserver( handleIntersect ) {
    return createObserver(
        scrolledToBottomReference(),
        parseFloat( vars.intersectionObserverSteps ),
        handleIntersect,
        bottomObserverMargin(),
        scrolledToBottomRoot()
    );
}

// register this on load in index.js
export function registerPageScrollRecord() {
    isScrolled = false;
    let scrollCounter = 0;
    $( window ).add( '.m-text-container-fixed' ).on( 'scroll', function( event ) {
        if (scrollCounter === 0) {
            scrollCounter++
        } else {
            $( this ).off( event );
            isScrolled = true;
        }
    } )
}

export function getIsScrolled() {
    return isScrolled;
}
