import gsap from 'gsap';

export function handleParagraphLineOpacity( entries, observer ) {
    entries.forEach( element => {
        var setter = gsap.quickSetter( element.target, "opacity" );
        setter( Math.floor(element.intersectionRatio) );
    });
}