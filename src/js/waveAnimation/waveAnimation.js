
import { paper } from 'paper';
import { RandomFunctionGenerator } from '../randomFunctionGenerator/randomFunctionGenerator.js';
import $ from "jquery";
import * as vars from '../../data/vars.json';

var randomOffsetFunctions = {
    radial: new Array( parseFloat( vars.offsetPoints ) ),
    angular: new Array( parseFloat( vars.offsetPoints) ),
    handle: new Array( parseFloat( vars.offsetPoints ) )
};
var offsetVectors = {};
var standardHandles = {};
var standardHandleDistance = {};
var handles = {}
var scopes = {
    "product": new paper.PaperScope(),
};
var canvasses = {
    "product": $( "#product-canvas" )[ 0 ],
};
var bezierCenter;
var bezier;

export const init = () => {

    $( window ).on( "load", function() {

        scopes[ "product" ].setup( canvasses[ "product" ] );

        generateRandomOffsetFunctions();
        updateOffsetVectors( scopes[ "product" ] );
        updateStandardHandles();
        updateStandardHandleDistance();
        updateHandles();

        scopes[ "product" ].activate();

        bezierCenter = new scopes[ "product" ].Point( scopes[ "product" ].view.center.x, scopes[ "product" ].view.viewSize.height - parseFloat( vars.widthScale ) * scopes[ "product" ].view.viewSize.width );
        bezier = new scopes[ "product" ].Path();
        bezier.moveTo( offsetVectors[ 0 ].vector.add( bezierCenter ) );
        bezier.cubicCurveTo(
            handles[ 0 ].nextHandle.add( bezierCenter ),
            handles[ 1 ].previousHandle.add( bezierCenter ),
            offsetVectors[ 1 ].vector.add( bezierCenter)
        );
        for (let index = 1; index < vars.offsetPoints; index++) {
            bezier.cubicCurveTo(
                handles[ index ].nextHandle.add( bezierCenter ),
                handles[ (index + 1) % vars.offsetPoints ].previousHandle.add( bezierCenter ),
                offsetVectors[ (index + 1) % vars.offsetPoints ].vector.add( bezierCenter)
            );
        }
        bezier.fillColor = 'black';
        bezier.scale( parseFloat( vars.widthScale ) * scopes[ "product" ].view.viewSize.width / parseFloat( vars.offsetOuterRadius ), bezierCenter );
    
        scopes[ "product" ].view.onResize = function( event ) {
            updateOffsetVectors( scopes[ "product" ] );
            updateStandardHandles();
            updateStandardHandleDistance();
            updateHandles();

            scopes[ "product" ].activate();
            bezier.removeSegments();
            bezierCenter = new scopes[ "product" ].Point( scopes[ "product" ].view.center.x, scopes[ "product" ].view.viewSize.height - parseFloat( vars.widthScale ) * scopes[ "product" ].view.viewSize.width );
            bezier.moveTo( offsetVectors[ 0 ].vector.add( bezierCenter ) );
            bezier.cubicCurveTo(
                handles[ 0 ].nextHandle.add( bezierCenter ),
                handles[ 1 ].previousHandle.add( bezierCenter ),
                offsetVectors[ 1 ].vector.add( bezierCenter)
            );
            for (let index = 1; index < vars.offsetPoints; index++) {
                bezier.cubicCurveTo(
                    handles[ index ].nextHandle.add( bezierCenter ),
                    handles[ (index + 1) % vars.offsetPoints ].previousHandle.add( bezierCenter ),
                    offsetVectors[ (index + 1) % vars.offsetPoints ].vector.add( bezierCenter)
                );
            }
            bezier.scale( parseFloat( vars.widthScale ) * scopes[ "product" ].view.viewSize.width / parseFloat( vars.offsetOuterRadius ), bezierCenter );
        }

        scopes[ "product" ].view.onFrame = function( event ) {
            updateRandomOffsetFunctions();
            updateOffsetVectors( scopes[ "product" ] );
            updateStandardHandles();
            updateStandardHandleDistance();
            updateHandles();
            
            scopes[ "product" ].activate();
            bezier.removeSegments();
            bezierCenter = new scopes[ "product" ].Point( scopes[ "product" ].view.center.x, scopes[ "product" ].view.viewSize.height - parseFloat( vars.widthScale ) * scopes[ "product" ].view.viewSize.width );
            bezier.moveTo( offsetVectors[ 0 ].vector.add( bezierCenter ) );
            bezier.cubicCurveTo(
                handles[ 0 ].nextHandle.add( bezierCenter ),
                handles[ 1 ].previousHandle.add( bezierCenter ),
                offsetVectors[ 1 ].vector.add( bezierCenter)
            );
            for (let index = 1; index < vars.offsetPoints; index++) {
                bezier.cubicCurveTo(
                    handles[ index ].nextHandle.add( bezierCenter ),
                    handles[ (index + 1) % vars.offsetPoints ].previousHandle.add( bezierCenter ),
                    offsetVectors[ (index + 1) % vars.offsetPoints ].vector.add( bezierCenter)
                );
            }
            bezier.scale( parseFloat( vars.widthScale ) * scopes[ "product" ].view.viewSize.width / parseFloat( vars.offsetOuterRadius ), bezierCenter );
            bezier.selected = true;
            var circle = new scopes[ "product" ].Path.Circle( bezierCenter, 2);
            circle.fillColor = 'white';
        }
    } );
}

// do this only once on init! afterwards walk steps on function in every frame!
const generateRandomOffsetFunctions = () => {
    for ( let i = 0; i < vars.offsetPoints; i++ ) {
        randomOffsetFunctions.radial[ i ] = new RandomFunctionGenerator(
            0,
            parseFloat( vars.offsetInnerRadius ),
            parseFloat( vars.offsetOuterRadius ),
            parseFloat( vars.minFramesPerCycle ),
            parseFloat( vars.maxFramesPerCycle )
        );
        var offsetAngularMin = i / vars.offsetPoints - parseFloat( vars.offsetAngularVariance );
        var offsetAngularMax = i / vars.offsetPoints + parseFloat( vars.offsetAngularVariance );
        randomOffsetFunctions.angular[ i ] = new RandomFunctionGenerator(
            0,
            offsetAngularMin,
            offsetAngularMax,
            parseFloat( vars.minFramesPerCycle ),
            parseFloat( vars.maxFramesPerCycle )
        );
        randomOffsetFunctions.handle[ i ] = new RandomFunctionGenerator(
            0,
            0,
            1,
            parseFloat( vars.minFramesPerCycle ),
            parseFloat( vars.maxFramesPerCycle )
        )
    }
}

const updateRandomOffsetFunctions = () => {
    for ( let i = 0; i < vars.offsetPoints; i++ ) {
        randomOffsetFunctions.radial[ i ].timeStep();
        randomOffsetFunctions.angular[ i ].timeStep();
        randomOffsetFunctions.handle[ i ].timeStep();
    }
}

// do this in every frame and on init!
const updateOffsetVectors = ( paperScope ) => {
    for ( let i = 0; i < parseFloat( vars.offsetPoints ); i++ ) {
        var vector = new paperScope.Point( randomOffsetFunctions.radial[ i ].getCurrentFunctionValue(), 0 );
        vector.angle += randomOffsetFunctions.angular[ i ].getCurrentFunctionValue( 360 );
        offsetVectors[ i ] = {
            vector: vector,
        }
    }
}

// do this in every frame and on init!
const updateStandardHandles = () => {
    var previousOffsetVector = offsetVectors[ parseFloat( vars.offsetPoints - 1 ) ].vector
    var thisOffsetVector = offsetVectors[ 0 ].vector;
    var nextOffsetVector = offsetVectors[ 1 ].vector;
    for ( let i = 0; i < parseFloat( vars.offsetPoints ); i++ ) {
        // calculate next standard handle (standard means not varied by randomness)
        var halfAngleToNext = thisOffsetVector.getAngle( nextOffsetVector ) / 2;
        var nextHandle = thisOffsetVector.clone();
        nextHandle.length /= Math.cos( halfAngleToNext / 360 * 2 * Math.PI );
        nextHandle.angle += halfAngleToNext;
        // calculate previous standard handle
        var halfAngleToPrevious = thisOffsetVector.getAngle( previousOffsetVector ) / 2;
        var previousHandle = thisOffsetVector.clone();
        previousHandle.length /= Math.cos ( halfAngleToPrevious / 360 * 2 * Math.PI );
        previousHandle.angle -= halfAngleToPrevious;

        standardHandles[i] = {
            nextHandle: nextHandle,
            previousHandle: previousHandle,
            halfAngleToPrevious: halfAngleToPrevious,
            halfAngleToNext: halfAngleToNext
        }
        previousOffsetVector = thisOffsetVector;
        thisOffsetVector = nextOffsetVector;
        nextOffsetVector = offsetVectors[ ( i + 2) % parseFloat( vars.offsetPoints ) ].vector;
    }
}

// do this in every frame and on init!
const updateStandardHandleDistance = () => {
    for ( let i = 0; i < parseFloat( vars.offsetPoints ); i++ ) {
        var vectorToPrevious = standardHandles[ ( i + parseFloat( vars.offsetPoints ) - 1 ) % parseFloat( vars.offsetPoints ) ].nextHandle.subtract(standardHandles[ i ].previousHandle);
        var vectorToNext = standardHandles[ ( i + 1) % parseFloat( vars.offsetPoints ) ].previousHandle.subtract(standardHandles[ i ].previousHandle);

        standardHandleDistance[ i ] = {
            vectorToPrevious: vectorToPrevious,
            vectorToNext: vectorToNext
        }
    }
}

const updateHandles = () => {
    for ( let i = 0; i < parseFloat( vars.offsetPoints ); i++ ) {
        // all nextHandle data
        var relativeStandardHandleNext = standardHandles[ i ].nextHandle.subtract( offsetVectors[ i ].vector );
        var relativeNextHandle = standardHandleDistance[ i ].vectorToNext;
        relativeNextHandle.length *= randomOffsetFunctions.handle[ i ].getCurrentFunctionValue();
        relativeNextHandle = relativeNextHandle.add( relativeStandardHandleNext );
        var relativeNextHandleAngle = relativeStandardHandleNext.getDirectedAngle( relativeNextHandle );

        // all previousHandle data
        var relativeStandardHandlePrevious = standardHandles[ i ].previousHandle.subtract( offsetVectors[ i ].vector );
        var relativePreviousHandle = standardHandleDistance[ i ].vectorToPrevious;
        relativePreviousHandle.length *= randomOffsetFunctions.handle[ i ].getCurrentFunctionValue();
        relativePreviousHandle = relativePreviousHandle.add( relativeStandardHandlePrevious );
        var relativePreviousHandleAngle = relativeStandardHandlePrevious.getDirectedAngle( relativePreviousHandle );

        // test cases
        // angles have different signs or are both 0 -> take standard handles
        // angles have same sign ->
        //      smaller angle is to be selected and var previousHandle and var nextHandle to be constructed.

        var previousHandle = standardHandles[ i ].previousHandle;
        var nextHandle = standardHandles[ i ].nextHandle;

        if ( relativeNextHandleAngle * relativePreviousHandleAngle > 0 ) {
            var relativeHandleAngle = Math.min( Math.abs( relativeNextHandleAngle ), Math.abs( relativePreviousHandleAngle ) ) / 360 * 2 * Math.PI;
            var helperAngleNext = ( 90 + standardHandles[ i ].halfAngleToNext ) / 360 * 2 * Math.PI;
            var helperAnglePrevious = ( 90 + standardHandles[ i ].halfAngleToPrevious ) / 360 * 2 * Math.PI;
            if ( relativeNextHandleAngle < 0 ) {
                relativeHandleAngle *= -1;
            }
            
            var lengthFromPreviousStandardToHandle = relativeStandardHandleNext.length * Math.sin( relativeHandleAngle ) / Math.sin( helperAnglePrevious - relativeHandleAngle );
            var lengthFromNextStandardToHandle = relativeStandardHandleNext.length * Math.sin( relativeHandleAngle ) / Math.sin( helperAngleNext - relativeHandleAngle );

            previousHandle.length = previousHandle.length + lengthFromPreviousStandardToHandle;
            nextHandle.length = nextHandle.length - lengthFromNextStandardToHandle;
        }
        
        handles[ i ] = {
            previousHandle: previousHandle,
            nextHandle: nextHandle
        }
    }
}

const drawWavyLine = ( paperScope ) => {
    paperScope.activate();
}

// to dos for onFrame:
// 1. calculateoffsetpoints
// 2. update offset vectors
// 3. walk steps for every random function!