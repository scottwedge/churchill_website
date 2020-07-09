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
                curPagePath = '/index.html';
            }
            let curPageFile = curPagePath.substring( curPagePath.lastIndexOf('/') + 1 );
            let curIndex = pageArray.indexOf( curPageFile );
            let prevPageFile
            if( curIndex > 0 ) {
                let prevPageFile = pageArray[ ( curIndex - 1 )  ];
                barba.go( '/html/' + prevPageFile );
            }
        }
    } )
}

function goToNextPage( entries, observer ) {
    let pageArray = createPageArray();
    entries.forEach( element => {
        if( element.intersectionRatio >= 0.9 && stateHelper.contentOpen() ) {
            let curPagePath = window.location.pathname;
            if ( curPagePath === '/' ) {
                curPagePath = '/index.html';
            }
            let curPageFile = curPagePath.substring( curPagePath.lastIndexOf('/') + 1 );
            let curIndex = pageArray.indexOf( curPageFile );
            let nextPageFile
            if( curIndex < pageArray.length - 1 ) {
                nextPageFile = pageArray[ ( curIndex + 1 ) ];
                if( bottomObserver ) bottomObserver.disconnect();
                if( topObserver ) topObserver.disconnect();
                barba.go( '/html/' + nextPageFile );
            }
        }
    } )
}

function initiatePageTransitionsTop() {
    console.log('initiateObserverTop');
    topObserver = detectScrollHelper.scrolledToTopObserver( goToPrevPage, $( 'main' ) );
}

function initiatePageTransitionsBottom() {
    console.log('initiateObserverBottom');
    bottomObserver = detectScrollHelper.scrolledToBottomObserver( goToNextPage, $( 'main' ) );
}

function resetPageTransitionsTop( nextBarbaContainer ) {
    console.log('resetObserverTop');
    topObserver = detectScrollHelper.scrolledToTopObserver( goToPrevPage, nextBarbaContainer );

}

function resetPageTransitionsBottom( nextBarbaContainer ) {
    console.log('resetObserverBottom');
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