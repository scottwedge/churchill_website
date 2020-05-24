import { adjustTextBreaks } from './textOverflowManager/textOverflowManager.js';
import { init } from './waveAnimation/waveAnimation.js';
import { createObserver, observe } from './intersectionObserver/intersectionObserver.js';
import { resizeToViewportHeightFraction } from './resizeToViewportHeightFraction/resizeToViewportHeightFraction.js'
import { handleParagraphLineOpacity } from './elementAnimations/elementAnimations.js';
import * as vars from '../data/vars.json';
import $ from 'jquery';

$( window ).on( "load", () => {
    // resizing elements with vh units
    resizeToViewportHeightFraction( $( ".m-spacer" ), "height", vars.mediaCanvasHeightFractionMobile );
    resizeToViewportHeightFraction( $( ".m-media-canvas" ), "height", vars.mediaCanvasHeightFractionMobile );
    

    // start animation
    init();
    // adjust text width to fit into container
    adjustTextBreaks();

    var headings = $( 'h1' );
    var headingsMap = new Map();
    headings.each( function( index, heading ) {
        var targets = {
            "paragraphLines": $( heading ).siblings( '.' + vars.paragraphsSelector ).find( '.' + vars.paragraphLineClass ),
            "rootMarginTopFraction": parseFloat( vars.mediaCanvasStickyFractionMobile ) + $( heading ).outerHeight( true ) / $( window ).height(),
            "rootMarginBottomFraction": $( "footer" ).outerHeight( true ) / $( window ).height()
        };
        headingsMap.set( $( heading ), targets );
    })
    // for every heading in headingsmap create a seperate obsever.
    headingsMap.forEach( ( targets, heading, map ) => {
        var topValue = ( targets[ "rootMarginTopFraction" ] + parseFloat(vars.rootMarginFractionAddition) ) * 100 + '%';
        var bottomValue = ( targets[ "rootMarginBottomFraction" ] + parseFloat(vars.rootMarginFractionAddition) ) * 100 + '%';
        targets[ "observer" ] = createObserver( 1, "-" + topValue + " 0% -" + bottomValue + " 0%", handleParagraphLineOpacity );
        targets[ "paragraphLines" ].each( function( index, line ) {
            observe( targets[ "observer" ], line );
        });
    } )
    
});
$( window ).on( "resize", () => {
    // resizing elements with vh units
    resizeToViewportHeightFraction( $( ".m-spacer" ), "height", vars.mediaCanvasHeightFractionMobile );
    resizeToViewportHeightFraction( $( ".m-media-canvas" ), "height", vars.mediaCanvasHeightFractionMobile );

    // adjust text width to fit into container
    adjustTextBreaks();
});