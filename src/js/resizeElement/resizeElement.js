import $ from 'jquery';
import * as vars from '../../data/vars.json';

/**
 * replaces viewport height with javascript. call this on load and on resize
 * @param {*} elements pass a nodelist of elements, or a jquery selection.
 * @param {*} fraction element height as a viewport height fraction
 */
const resizeToViewportHeightFraction = ( elements, cssProperty, fraction = 1 ) => {
    $( elements ).each(function (index, element) {
        $(element).css(cssProperty, window.innerHeight * fraction);
        //alert(window.innerHeight + ', ' + fraction + ', ' + $(element).css(cssProperty) + ', ' + $(window).height() + ', ' + window.innerHeight);
    })
}

const resizeElementsToHeightOf = ( elements, cssProperty, referenceElement, withMargin ) => {
    $( elements ).each( function ( index, element ) {
        $( element ).css( cssProperty, $( referenceElement ).outerHeight( withMargin ) );
    })
}

export function resizeElements() {
    resizeElementsToHeightOf( $( ".m-heading-top" ), "margin-top", $( ".m-header" ), true );
    resizeElementsToHeightOf( $( ".m-text-container-absolute" ), "top", $( ".m-header" ), true );
    resizeElementsToHeightOf( $( ".m-text-container-absolute" ), "margin-top", $( ".m-heading-top" ), false );
    resizeElementsToHeightOf( $( ".m-text-container-absolute" ), "bottom", $( ".m-footer-transparent" ), true );
    resizeToViewportHeightFraction( $( ".m-media-canvas" ), "height", vars.mediaCanvasHeightFractionMobile );
}