import $ from "jquery";
import * as vars from "../../data/vars.json";
import * as stateHelper from '../stateHelper/stateHelper.js';


// call on window load and resize!
export const adjustTextBreaks = ( pageLoad ) => {
    if ( stateHelper.addressBarVisible() || pageLoad ) {
        $( ".m-text-container, .m-text-container-absolute" ).each( function() {
            // reset text to be in the desired format
            $( this ).find( vars.textOverflowSpanSelector.slice(1, -1) ).each( function() {
                $( this ).removeClass( vars.overflownTextClass );
            } );
            // make text break if there is not enough width available
            if ( isOverflownHorizontally( this.clientWidth, this.scrollWidth ) ) {
                $( this ).find( vars.textOverflowSpanSelector.slice(1, -1) ).each( function() {
                    $( this ).addClass( vars.overflownTextClass );
                } );
            }
        })
    }
}

const isOverflownHorizontally = ( clientWidth, scrollWidth ) => {
    return scrollWidth > clientWidth;
}