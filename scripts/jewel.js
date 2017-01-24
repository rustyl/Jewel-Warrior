var jewel = (function() {

    var settings = {
        rows: 8,
        cols: 8,
        baseScore: 100,
        numJewelTypes: 7,
        controls: {
            // keyboard
            KEY_UP: "moveUp",
            KEY_LEFT: "moveLeft",
            KEY_DOWN: "moveDown",
            KEY_RIGHT: "moveRight",
            KEY_ENTER: "selectJewel",
            KEY_SPACE: "selectJewel",
            // mouse and touch
            CLICK: "selectJewel",
            TOUCH: "selectJewel",
            // gamepad
            BUTTON_A: "selectJewel",
            LEFT_STICK_UP: "moveUp",
            LEFT_STICK_DOWN: "moveDown",
            LEFT_STICK_LEFT: "moveLeft",
            LEFT_STICK_RIGHT: "moveRight"
        }
    };

    var scriptQueue = [],
        numResourcesLoaded = 0,
        numResources = 0,
        executeRunning = false;

    function executeScriptQueue() {
        var next = scriptQueue[0],
            first, script;

        if (next && next.loaded) {
            executeRunning = true;
            // remove the first element in the queue
            scriptQueue.shift();
            first = document.getElementsByTagName("script")[0];
            script = document.createElement("script");
            script.onload = function() {
                if (next.callback) {
                    next.callback();
                }
                // try to execute more scripts
                executeScriptQueue();
            };
            script.src = next.src;
            first.parentNode.insertBefore(script, first);
        } else {
            executeRunning = false;
        }
    }

    function load(src, callback) {
        var image, queueEntry;
        numResources++;

        // add this resource to the execution queue
        queueEntry = {
            src: src,
            callback: callback,
            loaded: false
        };
        scriptQueue.push(queueEntry);

        image = new Image();
        image.onload = image.onerror = function() {
            numResourcesLoaded++;
            queueEntry.loaded = true;
            if(!executeRunning) {
                executeScriptQueue();
            }
        };
        image.src = src;
    }

    function isStandalone() {
        return (window.navigator.standalone !== false);
    }

    function setup() {
        if (isStandalone()) {
            jewel.showScreen("splash-screen");
        } else {
            jewel.showScreen("install-screen");
        }
        console.log("Jewel.setup success");
    }

    // hide the actiove screen if any and show the screen
    // with the wpecified id
    function showScreen(screenId) {
        var dom = jewel.dom,
            $ = dom.$,
            activeScreen = $("#game .screen.active")[0],
            screen = $("#" + screenId)[0];

console.log("in showScreen with "+screenId+screen)
        if (!jewel.screens[screenId]) {
            alert("This module is not implemented !");
            return;
        }

        if(activeScreen) {
            dom.removeClass(activeScreen, "active");
        }
        dom.addClass(screen, "active");
        jewel.screens[screenId].run();
    }

    function hasWebWorkers() {
        // to force non worker board
//        return false;
        return ("Worker" in window);
    }

    function preload(src) {
        var image = new Image();
        image.src = src;
    }

    function getLoadProgress() {
        return numResourcesLoaded / numResources;
    }

    // expose public methods
    return {
        getLoadProgress: getLoadProgress,
        preload: preload,
        hasWebWorkers: hasWebWorkers,
        load : load,
        setup : setup,
        showScreen : showScreen,
        screens: {},
        isStandalone: isStandalone,
        settings: settings
    };
})();
