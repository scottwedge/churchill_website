import $, { css } from 'jquery';
import * as vars from '../../data/vars.json';
import * as stateHelper from '../stateHelper/stateHelper.js';

/**
 * replaces viewport height with javascript. call this on load and on resize
 * @param {*} elements pass a nodelist of elements, or a jquery selection.
 * @param {*} fraction element height as a viewport height fraction
 */
const resizeToViewportHeightFraction = ( elements, cssProperty, fraction = 1, addition = 0 ) => {
    $( elements ).each(function (index, element) {
        $(element).css(cssProperty, ( window.outerHeight === 0 ? window.innerHeight : Math.min( window.outerHeight, window.innerHeight ) ) * fraction + addition );
    })
}

const resizeElementsToHeightOf = ( elements, cssProperty, referenceElement, withMargin, positive = true ) => {
    let sign = positive ? 1 : -1;
    $( elements ).each( function ( index, element ) {
        $( element ).css( cssProperty, sign * $( referenceElement ).outerHeight( withMargin ) );
    })
}

export function returnViewportHeightFraction ( fraction = 1, addition = 0 ) {
    return ( window.outerHeight === 0 ? window.innerHeight : Math.min( window.outerHeight, window.innerHeight ) ) * fraction + addition;
}

export function resizeElements( pageLoad, data ) {
    console.log('resize');
    resizeElementsToHeightOf( $( ".m-text-container-absolute" ), "top", $( ".m-header" ), true );
    resizeElementsToHeightOf( $( ".m-text-container-absolute" ), "bottom", $( ".m-footer-transparent, .m-footer" ), true );
    resizeToViewportHeightFraction( $( ".m-arrow-container.next" ), "margin-top", parseFloat( vars.arrowAbsoluteHeightFractionMobile ) / 2, parseFloat( vars.arrowHeight ) / -2 );
    resizeToViewportHeightFraction( $( ".m-arrow-container.next" ), "height", parseFloat( vars.arrowAbsoluteHeightFractionMobile ) / 2, parseFloat( vars.arrowHeight ) / 2 + $( ".m-footer" ).outerHeight( true ) );

    // If address bar is visible
    if ( stateHelper.addressBarVisible() || pageLoad ) {
        resizeToViewportHeightFraction( $( ".m-media-canvas.top-arrow" ), "height", parseFloat( vars.mediaCanvasHeightTopArrowFractionMobile ) );
        resizeToViewportHeightFraction( $( ".m-media-canvas.no-top-arrow" ), "height", parseFloat( vars.mediaCanvasHeightNoTopArrowFractionMobile ) );
        resizeToViewportHeightFraction( $( ".m-heading-middle" ), "top", parseFloat( vars.mediaCanvasStickyFractionMobile ) );
    }
}