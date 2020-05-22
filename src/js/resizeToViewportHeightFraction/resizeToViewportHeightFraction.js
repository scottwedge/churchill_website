import $ from 'jquery';

/**
 * replaces viewport height with javascript. call this on load and on resize
 * @param {*} elements pass a nodelist of elements, or a jquery selection.
 * @param {*} fraction element height as a viewport height fraction
 */
export const resizeToViewportHeightFraction = ( elements, cssProperty, fraction = 1 ) => {
    $( elements ).each(function (index, element) {
        $(element).css(cssProperty, window.innerHeight * fraction);
    })
}