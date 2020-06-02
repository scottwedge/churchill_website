import $ from 'jquery';

/**
 * Creates an intersectionObserver
 * @param {*} targetElems The intersecting elements
 * @param {*} numSteps The granularity of observation. E.g. 100 for watching every change in percent steps.
 * @param {*} rootMargin Margin added to the observed area of the viewport. Pxls or percent. Either one or four values.
 * @param {*} handleIntersect The callback executed on every intersection change. Defaults to console log.
 * @param {*} rootMargin The Margin added to the applied rootElem intersection Area. Format: '0px 0px 0px 0px'.
 * @param {*} rootElem The "viewport" relative to which intersection will be measured. Defaults to document viewport.
 */

export default function createObserver( targetElems, numSteps, handleIntersect = defaultHandleIntersect, rootMargin = "0px", rootElem = null) {
    let observer = null;
  
    if ( $( targetElems ).length > 0 ) {
        let options = {
            root: rootElem,
            rootMargin: rootMargin,
            threshold: buildThresholdList( numSteps )
        };
    
        observer = new IntersectionObserver( handleIntersect, options );
        $( targetElems ).each( function( index, element ) {
            observer.observe( element );
        } );
    } else {
    }

    return observer;
}

function buildThresholdList( numSteps ) {
    let thresholds = [];
  
    for ( let i=1.0; i<=numSteps; i++ ) {
        let ratio = i/numSteps;
        thresholds.push( ratio );
    }
  
    thresholds.push( 0 );
    return thresholds;
}

function defaultHandleIntersect( entries, observer ) {
    entries.forEach( element => {
        console.log( element.intersectionRatio );
    });
}