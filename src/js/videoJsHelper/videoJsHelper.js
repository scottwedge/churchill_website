import videojs from 'video.js';
import $ from 'jquery';
import * as stateHelper from '../stateHelper/stateHelper.js';

let video;
let player;

export function instantiateVideoJs(data) {
    if (data.next.namespace === 'story') {
        video = videojs( $('.m-video-container')[0] ).ready( function() {
            player = this;
        });
    } else if (data.next.namespace === 'animation') {
        video = videojs( $('.m-animation-video')[0] ).ready( function() {
            player = this;
            registerVideoEndedAction( player );
        });
    }
}

export function registerVideoEndedAction( player ) {
    player.on('ended', function() {
        stateHelper.registerIndexAnimationManager();
    });
}