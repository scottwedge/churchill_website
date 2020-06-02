
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
var handles = {};
var scopes = {};
var canvasses = {};
var views = {};
var bezierCenter = {};
var bezier = {};
var square = {};
var result = {};


// call on window load!
export const init = () => {
    setupCanvasses();
    setupScopes();
    setupViews();

    generateRandomOffsetFunctions();
    
    createPath();
    
    updateGeometry( );

    scopes[ "product" ].view.onFrame = function( event ) {
        var key = "product";
        scopes[ "empty" ].view.viewSize = scopes[ "product" ].view.viewSize;
        updateGeometry( );
        // activateView( key );
        drawWavyLine( vars.emptyCanvasKey );
        // first clear this scopes active layer:
        scopes[ key ].project.activeLayer.removeChildren();
        // now copy empty canvas product to this scopes active layer.
        result[ key ] = result [ vars.emptyCanvasKey ].copyTo( scopes[ key ].project );
        result[ key ].pivot = result[ key ].bounds.bottomLeft;
        result[ key ].position = scopes[ key ].view.bounds.bottomLeft;
        result[ key ].parent = scopes[ key ].project.activeLayer;
    }

    scopes[ "about" ].view.onFrame = function( event ) {
        var key = "about";
        scopes[ "empty" ].view.viewSize = scopes[ "about" ].view.viewSize;
        updateGeometry( );
        // activateView( key );
        drawWavyLine( vars.emptyCanvasKey );
        // first clear this scopes active layer:
        // first clear this scopes active layer:
        scopes[ key ].project.activeLayer.removeChildren();
        // now copy empty canvas product to this scopes active layer.
        result[ key ] = result [ vars.emptyCanvasKey ].copyTo( scopes[ key ].project );
        result[ key ].pivot = result[ key ].bounds.bottomLeft;
        result[ key ].position = scopes[ key ].view.bounds.bottomLeft;
        result[ key ].parent = scopes[ key ].project.activeLayer;
    }

    scopes[ "lemon" ].view.onFrame = function( event ) {
        var key = "lemon";
        scopes[ "empty" ].view.viewSize = scopes[ "lemon" ].view.viewSize;
        updateGeometry( );
        // activateView( key );
        drawWavyLine( vars.emptyCanvasKey );
        // first clear this scopes active layer:
        // first clear this scopes active layer:
        scopes[ key ].project.activeLayer.removeChildren();
        // now copy empty canvas product to this scopes active layer.
        result[ key ] = result [ vars.emptyCanvasKey ].copyTo( scopes[ key ].project );
        result[ key ].pivot = result[ key ].bounds.bottomLeft;
        result[ key ].position = scopes[ key ].view.bounds.bottomLeft;
        result[ key ].parent = scopes[ key ].project.activeLayer;
    }
    
    scopes[ "mint" ].view.onFrame = function( event ) {
        var key = "mint";
        scopes[ "empty" ].view.viewSize = scopes[ "mint" ].view.viewSize;
        updateGeometry( );
        // activateView( key );
        drawWavyLine( vars.emptyCanvasKey );
        // first clear this scopes active layer:
        // first clear this scopes active layer:
        scopes[ key ].project.activeLayer.removeChildren();
        // now copy empty canvas product to this scopes active layer.
        result[ key ] = result [ vars.emptyCanvasKey ].copyTo( scopes[ key ].project );
        result[ key ].pivot = result[ key ].bounds.bottomLeft;
        result[ key ].position = scopes[ key ].view.bounds.bottomLeft;
        result[ key ].parent = scopes[ key ].project.activeLayer;
    }
    
    scopes[ "salt" ].view.onFrame = function( event ) {
        var key = "salt";
        scopes[ "empty" ].view.viewSize = scopes[ "salt" ].view.viewSize;
        updateGeometry( );
        // activateView( key );
        drawWavyLine( vars.emptyCanvasKey );
        // first clear this scopes active layer:
        // first clear this scopes active layer:
        scopes[ key ].project.activeLayer.removeChildren();
        // now copy empty canvas product to this scopes active layer.
        result[ key ] = result [ vars.emptyCanvasKey ].copyTo( scopes[ key ].project );
        result[ key ].pivot = result[ key ].bounds.bottomLeft;
        result[ key ].position = scopes[ key ].view.bounds.bottomLeft;
        result[ key ].parent = scopes[ key ].project.activeLayer;
    }
    
    scopes[ "sustainability" ].view.onFrame = function( event ) {
        var key = "sustainability";
        scopes[ "empty" ].view.viewSize = scopes[ "sustainability" ].view.viewSize;
        updateGeometry( );
        // activateView( key );
        drawWavyLine( vars.emptyCanvasKey );
        // first clear this scopes active layer:
        // first clear this scopes active layer:
        scopes[ key ].project.activeLayer.removeChildren();
        // now copy empty canvas product to this scopes active layer.
        result[ key ] = result [ vars.emptyCanvasKey ].copyTo( scopes[ key ].project );
        result[ key ].pivot = result[ key ].bounds.bottomLeft;
        result[ key ].position = scopes[ key ].view.bounds.bottomLeft;
        result[ key ].parent = scopes[ key ].project.activeLayer;
    }
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

// do this in every frame!
const updateOffsetVectors = (  ) => {
    for ( let i = 0; i < parseFloat( vars.offsetPoints ); i++ ) {
        var vector = new paper.Point( randomOffsetFunctions.radial[ i ].getCurrentFunctionValue(), 0 );
        vector.angle += randomOffsetFunctions.angular[ i ].getCurrentFunctionValue( 360 );
        offsetVectors[ i ] = {
            vector: vector,
        }
    }
}

// do this in every frame!
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

// do this in every frame!
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

const scaleHandles = () => {
    var relativeHandles = {};
    for ( const key in handles ) {
        relativeHandles[ key ] = {
            previous: handles[ key ].previousHandle.subtract( offsetVectors[ key ].vector ),
            next: handles[ key ].nextHandle.subtract( offsetVectors[ key ].vector )
        }
        relativeHandles[ key ].previous.length *= parseFloat ( vars.handleScale );
        relativeHandles[ key ].next.length *= parseFloat ( vars.handleScale );
        handles[ key ].previousHandle = offsetVectors[ key ].vector.add( relativeHandles[ key ].previous );
        handles[ key ].nextHandle = offsetVectors[ key ].vector.add( relativeHandles[ key ].next );
    }
}

const drawWavyLine = ( key ) => {
    bezierCenter[ key ] = new paper.Point( views[ key ].center.x, views[ key ].viewSize.height - parseFloat( vars.widthScale ) * views[ key ].viewSize.width );
    bezier[ key ].removeSegments();
    bezier[ key ].moveTo( offsetVectors[ 0 ].vector.add( bezierCenter[ key ] ) );
    for (let index = 0; index < vars.offsetPoints; index++) {
        bezier[ key ].cubicCurveTo(
            handles[ index ].nextHandle.add( bezierCenter[ key ] ),
            handles[ (index + 1) % vars.offsetPoints ].previousHandle.add( bezierCenter[ key ] ),
            offsetVectors[ (index + 1) % vars.offsetPoints ].vector.add( bezierCenter[ key ])
        );
    }
    bezier[ key ].scale( parseFloat( vars.widthScale ) * views[ key ].viewSize.width / parseFloat( vars.offsetOuterRadius ), bezierCenter[ key ] );
    square[ key ].removeSegments();
    square[ key ].moveTo( new paper.Point( 0, 0 ) );
    square[ key ].lineTo( new paper.Point( views[ key ].viewSize.width, 0 ) );
    square[ key ].lineTo( new paper.Point( views[ key ].viewSize.width, views[ key ].viewSize.height ) );
    square[ key ].lineTo( new paper.Point( 0, views[ key ].viewSize.height ) );
    square[ key ].lineTo( new paper.Point( 0, 0 ) );
    result[ key ].removeSegments();
    result[ key ].copyContent(square[ key ].subtract( bezier[ key ] ));
}

const updateGeometry = (  ) => {
    updateRandomOffsetFunctions();
    updateOffsetVectors(  );
    updateStandardHandles();
    updateStandardHandleDistance();
    updateHandles();
    scaleHandles();
}

const setupCanvasses = () => {
    for ( const key in vars.modulesWithCanvas ) {
        canvasses[ key ] = $( vars.modulesWithCanvas[ key ].slice( 1, -1 ) ).find( ".m-canvas" )[ 0 ];
    }
}

const setupScopes = () => {
    scopes[ vars.emptyCanvasKey ] = new paper.PaperScope();
    scopes[ vars.emptyCanvasKey ].setup( [ vars.emptyCanvasWidth, vars.emptyCanvasHeight ] );
    for ( const key in vars.modulesWithCanvas ) {
        scopes[ key ] = new paper.PaperScope();
        scopes[ key ].setup( canvasses[ key ] );
    }
}

const setupViews = () => {
    views[ vars.emptyCanvasKey ] = scopes[ vars.emptyCanvasKey ].view;
    for ( const key in vars.modulesWithCanvas ) {
        views[ key ] = scopes[ key ].view;
    }
}


const createPath = () => {
    var key = vars.emptyCanvasKey;
    bezier[ key ] = new paper.Path();
    square[ key ] = new paper.Path();
    result[ key ] = new paper.Path();
    result[ key ].fillColor = vars.backgroundWhite;
    bezier[ key ].visible = false;
    square[ key ].visible = false;
    bezier[ key ].parent = scopes[ key ].project.activeLayer;
    square[ key ].parent = scopes[ key ].project.activeLayer;
    result[ key ].parent = scopes[ key ].project.activeLayer;
}

const activateView = ( key ) => {
    views[ key ]._project.activate();
}

const updateView = ( key ) => {
    views[ key ].play();
}