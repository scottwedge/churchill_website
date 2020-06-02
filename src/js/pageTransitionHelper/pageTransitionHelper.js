import * as vars from '../../data/vars.json';
import * as detectScrollHelper from '../detectScrollHelper/detectScrollHelper.js'
import barba from '@barba/core';

let bottomObserver;
let topObserver;

function createPageArray() {
    let pageArray = [];
    for ( let index = 0; index < Object.keys( vars.pageOrder ).length; index++ ) {
        pageArray.push( vars.pageOrder[ index ].slice(1, -1) );
    }
    return pageArray;
}

function goToPrevPage( entries, observer ) {
    let pageArray = createPageArray();
    entries.forEach( element => {
        if( element.intersectionRatio === 1 ) {
            let curPagePath = window.location.pathname;
            if ( curPagePath === '/' ) {
                curPagePath = './index.html';
            }
            let curPageFile = curPagePath.substring( curPagePath.lastIndexOf('/') + 1 );
            let curIndex = pageArray.indexOf( curPageFile );
            let prevPageFile
            if( curIndex > 0 && detectScrollHelper.getIsScrolled() ) {
                let prevPageFile = pageArray[ ( curIndex - 1 )  ];
                if( curIndex === 1 ) {
                    barba.go( '/' + prevPageFile );
                } else {
                    barba.go( '/html/' + prevPageFile );
                }
            }
        }
    } )
}

function goToNextPage( entries, observer ) {
    let pageArray = createPageArray();
    entries.forEach( element => {
        if( !element.isIntersecting ) {
            let curPagePath = window.location.pathname;
            if ( curPagePath === '/' ) {
                curPagePath = './index.html';
            }
            let curPageFile = curPagePath.substring( curPagePath.lastIndexOf('/') + 1 );
            let curIndex = pageArray.indexOf( curPageFile );
            let nextPageFile
            if( curIndex < pageArray.length - 1  && detectScrollHelper.getIsScrolled() ) {
                nextPageFile = pageArray[ ( curIndex + 1 ) ];
                barba.go( '/html/' + nextPageFile );
            }
        }
    } )
}

function initiatePageTransitionsTop() {
   topObserver = detectScrollHelper.scrolledToTopObserver( goToPrevPage );
}

function initiatePageTransitionsBottom() {
    bottomObserver = detectScrollHelper.scrolledToBottomObserver( goToNextPage );
}

function resetPageTransitionsTop() {
    topObserver.disconnect();
    topObserver = detectScrollHelper.scrolledToTopObserver( goToPrevPage );

}

function resetPageTransitionsBottom() {
    bottomObserver.disconnect();
    bottomObserver = detectScrollHelper.scrolledToBottomObserver( goToNextPage );
}

export function initiatePageTransitions() {
    initiatePageTransitionsBottom();
    initiatePageTransitionsTop();
}

export function resetPageTransitions() {
    resetPageTransitionsTop();
    resetPageTransitionsBottom();
}