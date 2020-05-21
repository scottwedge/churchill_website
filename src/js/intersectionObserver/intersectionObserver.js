/**
 * Creates an intersectionObserver
 * @param {*} targetElem The intersecting element
 * @param {*} numSteps The granularity of observation. E.g. 100 for watching every change in percent steps.
 * @param {*} handleIntersect The callback executed on every intersection change. Defaults to console log.
 * @param {*} rootElem The "viewport" relative to which intersection will be measured. Defaults to document viewport.
 */
export function createObserver( targetElem, numSteps, handleIntersect = defaultHandleIntersect, rootElem = null ) {
    let observer;
  
    let options = {
        root: rootElem,
        rootMargin: "0px",
        threshold: buildThresholdList( numSteps )
    };
  
    observer = new IntersectionObserver( handleIntersect, options );
    observer.observe( targetElem );
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