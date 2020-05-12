export const setTiming = ( timedFunction, fpc ) => {
    var interval = 1 / fpc;
    setInterval( () => {
        timedFunction();
    }, interval );
}