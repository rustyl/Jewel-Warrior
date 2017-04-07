jewel.audio = (function () {
// Listing 10-10 10-11
    var extension,
        sounds,
        activeSounds;

    function initialize() {
        extension = formatTest();
        if (!extension) {
            return;
        }
        sounds = {};
        activeSounds = [];
    }

// Listing 10-12
    function createAudio(name) {
        var el = new Audio("sounds/"+name+"."+extension);
        jewel.dom.bind(el, "ended", cleanActive);
        sounds[name] = sounds[name] || [];
        sounds[name].push(el);
        return el;
    }

// Listing 10-11
    function formatTest() {
        var audio = new Audio(),
            types = [
                ["ogg", "audio/ogg; codecs='vorbis'"],
                ["mp3", "audio/mpeg"]
            ];
        for (var i=0;i< types.length;i++) {
            if (audio.canPlayType(types[i][1]) == "probably") {
                return types[i][0];
            }
        }
        for (i = 0;i< types.length;i++) {
            if (audio.canPlayTypes(types[i][1]) == "mayybe") {
                return types[i][0];
            }
        }
    }

// Listing 10-13
    function getAudioElement(name) {
        if (sounds[name]) {
            for (var i=0,n=sounds[name].length;i<n;i++) {
                if (sounds[name][i].ended) {
                    return sounds[name][i];
                }
            }
        }
        return createAudio(name);
    }

// Listing 10-14
    function play(name) {
        var audio = getAudioElement(name);
        audio.play();
        activeSounds.push(audio);
    }

// Listing 10-15
    function stop() {
        for (var i=activeSounds.length-1;i>=0;i--) {
            activeSounds[i].stop();
        }
        activeSounds.length = 0;
    }

// Listing 10-16

    function cleanActive() {
        for (var i=0;i<activeSounds.length;i++) {
            if (activeSounds[i].ended) {
                activeSounds.splice(i,1);
            }
        }
    }

    return {
        initialize: initialize,
        play: play,
        stop: stop
    };
}) ();