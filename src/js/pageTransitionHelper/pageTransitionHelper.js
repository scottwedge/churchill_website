import * as vars from '../../data/vars.json';
import * as detectScrollHelper from '../detectScrollHelper/detectScrollHelper.js';
import * as stateHelper from '../stateHelper/stateHelper.js';
import $ from 'jquery';
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
        if( element.intersectionRatio === 1 && stateHelper.contentOpen() ) {
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
        if( !element.isIntersecting && stateHelper.contentOpen() ) {
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
    topObserver = detectScrollHelper.scrolledToTopObserver( goToPrevPage, $( 'main' ) );
}

function initiatePageTransitionsBottom() {
    bottomObserver = detectScrollHelper.scrolledToBottomObserver( goToNextPage, $( 'main' ) );
}

function resetPageTransitionsTop( nextBarbaContainer ) {
    if ( topObserver ) {
        topObserver.disconnect();
    }
    topObserver = detectScrollHelper.scrolledToTopObserver( goToPrevPage, nextBarbaContainer );

}

function resetPageTransitionsBottom( nextBarbaContainer ) {
    if ( bottomObserver ) {
        bottomObserver.disconnect();
    }
    bottomObserver = detectScrollHelper.scrolledToBottomObserver( goToNextPage, nextBarbaContainer );
}

export function initiatePageTransitions() {
    initiatePageTransitionsBottom();
    initiatePageTransitionsTop();
}

export function resetPageTransitions( nextBarbaContainer ) {
    resetPageTransitionsTop( nextBarbaContainer );
    resetPageTransitionsBottom( nextBarbaContainer );
}