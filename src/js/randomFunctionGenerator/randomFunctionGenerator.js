import * as vars from '../../data/vars.json';


// if min === max, then you get a constant function with value min
// if minFPC === maxFPC, then you get a function with framesPerCycle defined by minFPC.
export class RandomFunctionGenerator {
    constructor( time, min, max, minFPC, maxFPC) {
        
        this.timeStep = this.timeStep.bind( this );
        this.getCurrentFunctionValue = this.getCurrentFunctionValue.bind( this );
        this.updateFunctionPoints = this.updateFunctionPoints.bind( this );
        this.randomFloat = this.randomFloat.bind( this );
        this.randomInt = this.randomInt.bind( this );
        this.easeInOutCubic = this.easeInOutCubic.bind( this );
        this.easeInOutQuad = this.easeInOutQuad.bind( this );

        this.min = min;
        this.max = max;
        this.randomFunctionPoints = ( min === max ) ? new Array( this.max, this.max ) : new Array( this.randomFloat( min, max ), this.randomFloat( min, max ) );
        this.time = time;
        this.fpc = this.randomInt( minFPC, maxFPC );
        this.timeFraction = 0;
        this.d = ( min === max ) ? 0 : this.randomFunctionPoints[ 1 ] - this.randomFunctionPoints[ 0 ];
        this.lowerBorder = ( min === max ) ? this.max : Math.min( this.randomFunctionPoints[ 0 ], this.randomFunctionPoints[ 1 ] );
        this.upperBorder = ( min === max ) ? this.max : Math.max( this.randomFunctionPoints[ 0 ], this.randomFunctionPoints[ 1 ] );
        this.currentFunctionValue = ( min === max ) ? this.max : this.randomFunctionPoints[ 0 ];
    }

    // make a time step and update all values
    timeStep() {
        this.time = ( this.time + 1 ) % this.fpc;
        this.timeFraction = this.time / this.fpc;
        if ( !( this.min === this.max ) ){
            if (this.time === 0) {
                this.updateFunctionPoints();
                this.d = this.randomFunctionPoints[ 1 ] - this.randomFunctionPoints[ 0 ];
                this.lowerBorder = Math.min( this.randomFunctionPoints[ 0 ], this.randomFunctionPoints[ 1 ] );
                this.upperBorder = Math.max( this.randomFunctionPoints[ 0 ], this.randomFunctionPoints[ 1 ] );
            }
            
            this.currentFunctionValue = Math.max(
                Math.min(
                    this.randomFunctionPoints[ 0 ] + this.d * this.easeInOutQuad( this.timeFraction ), this.upperBorder
                    //this.randomFunctionPoints[ 0 ] + this.d * Math.sin( this.timeFraction * Math.PI - Math.PI / 2), this.upperBorder
                ), this.lowerBorder
            );
        }
    }

    // return current value of bezier curve going through random function points
    getCurrentFunctionValue( scale = 1 ) {
        return scale * this.currentFunctionValue;
    }

    easeInOutCubic( tF ) {
        return tF < .5 ? ( 4 * tF * tF * tF ) : ( ( tF-1 ) * ( 2 * tF - 2 ) * ( 2 * tF - 2 ) + 1 )
    }

    easeInOutQuad( tF ) {
        return tF < 0.5 ? ( 2 * tF * tF ) : ( 1 - Math.pow( -2 * tF + 2, 2 ) / 2 );
        }

    //update current function value;
    
    // create a new random point and remove the old one.
    updateFunctionPoints() {
        this.randomFunctionPoints.shift();
        this.randomFunctionPoints.push( this.randomFloat( this.min, this.max ) );
    }
    
    // random number generator
    randomFloat( min, max ) {
        return min + Math.random() * ( max - min );
    }

    randomInt( min, max ) {
        min = Math.ceil( min );
        max = Math.floor( max );
        return min + Math.floor( Math.random() * ( max - min ) );
    }
}