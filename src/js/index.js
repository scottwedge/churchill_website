import $ from 'jquery';
import scrollHorizontally from './fullpage.scrollHorizontally.min.js';
import fullpage from '../../node_modules/fullpage.js/dist/fullpage.extensions.min.js';
import vars from '../scss/vars/v-vars.scss';
import passwords from '../json/passwords.json';

console.log(vars);

new fullpage('#fullpage', {
    // scrollHorizontally
    scrollHorizontallyKey: passwords.fullpage_scrollHorizontal_key,
    scrollHorizontally: true,
    //options here
    licenseKey: passwords.fullpage_key,
    controlArrows: false,
    autoScrolling:true,
    anchors:['animation1', 'product1', 'functionality1', 'story1', 'sustainability1', 'aboutUs1', 'contact1'],
    onLeave: (origin, destination, direction) => {
        var leavingSection = this;
        if (origin.index == 0) {
            $('#m-header')[0].style.visibility = 'visible';
        } else if (origin.index == 1 && direction == 'up') {
            return false;
        }
    },
    afterRender: () => {
        console.log('render');
        //fullpage_api.setAllowScrolling(false);
        fullpage_api.setKeyboardScrolling(false);
        setTimeout(() => {
            var playPromise = $('#m-startvid')[0].play();
            if (playPromise !== undefined) {
                playPromise.then(function() {
                  // Automatic playback started!
                }).catch(function(error) {
                  // Automatic playback failed.
                  // Show a UI element to let the user manually start playback.
                });
            }

        }, 1500);
        $('#m-startvid')[0].addEventListener(
            'ended', 
            () => {
                $('#m-scrollhint')[0].style.visibility = 'visible';
                fullpage_api.setAllowScrolling(true);
                fullpage_api.setKeyboardScrolling(true);
            }, false
        );
    }
    });

    //methods