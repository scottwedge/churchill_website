import $ from 'jquery';
import createObserver from '../intersectionObserver/intersectionObserver.js';
import * as vars from '../../data/vars.json';
import barba from '@barba/core';

let isScrolled;

function footerObserverMargin() {
    const topMargin = $( window ).height() / 4 * 3 + 1;
    return '-' + Math.floor( topMargin ) + 'px 0px 0px 0px';
}

function canvasObserverMargin() {
    return '0px 0px 0px 0px';
}

function scrolledToTopReference() {
    return $( '.m-media-canvas' );
}

function scrolledToBottomReference() {
    return $( '.m-text-container' );
}

export function scrolledToTopObserver( handleIntersect ) {
    return createObserver(
        scrolledToTopReference(),
        parseFloat( vars.intersectionObserverSteps ),
        handleIntersect,
        canvasObserverMargin()
    );
}

export function scrolledToBottomObserver( handleIntersect ) {
    return createObserver(
        scrolledToBottomReference(),
        parseFloat( vars.intersectionObserverSteps ),
        handleIntersect,
        footerObserverMargin()
    );
}

// register this on load in index.js
export function registerPageScrollRecord() {
    isScrolled = false;
    let scrollCounter = 0;
    $( window ).on( 'scroll', function( event ) {
        if (scrollCounter === 0) {
            scrollCounter++
        } else {
            $( this ).off( event );
            isScrolled = true;
        }
    } )
}

export function getIsScrolled() {
    if (isScrolled) console.log('scrolled');
    return isScrolled;
}
