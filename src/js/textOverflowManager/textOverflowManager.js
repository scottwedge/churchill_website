import $ from "jquery";

// call on window load and resize!
export const adjustTextBreaks = () => {
    $( ".m-text-container" ).each( function() {
        // reset text to be in the desired format
        $( this ).find( "p > span" ).each( function() {
            $( this ).css({
                "white-space": "nowrap",
                "display": "block",
            });
        } );
        // make text break if there is not enough width available
        if ( isOverflownHorizontally( this.clientWidth, this.scrollWidth ) ) {
            $( this ).find( "p > span" ).each( function() {
                $( this ).css({
                    "white-space": "normal",
                    "display": "inline",
                });
            } );
        }
    })
}

const isOverflownHorizontally = ( clientWidth, scrollWidth ) => {
    return scrollWidth > clientWidth;
}