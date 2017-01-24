jewel.screens["game-screen"] = (function () {
    var paused,
        firstRun = true;

    function exitGame() {
        pauseGame();
        var confirmed = window.confirm(
                "Do you want to return to the main ment?");
        if (confirmed) {
            jewel.showScreen("main-menu");
        } else {
            resumeGame();
        }
    }

    function startGame() {
        var board = jewel.board,
            display = jewel.display;

//console.log("in screen.game.js startGame");
        board.initialize(function () {
            display.initialize(function () {
                //start the game
                display.redraw(board.getBoard(), function () {
                    // do nothing for now
                });
            });
        });
        paused = false;
        var dom = jewel.dom,
            overlay = dom.$("#game-screen .pause-overlay") [0];
        overlay.style.display = "none";
    }

    function pauseGame() {
        if (paused) {
            return;
        }
        var dom = jewel.dom,
            overlay = dom.$("#game-screen .pause-overlay") [0];
        overlay.style.display = "block";
        paused = true;
    }

    function resumeGame() {
        var dom = jewel.dom,
            overlay = dom.$("#game-screen .pause-overlay") [0];
        overlay.style.display = "none";
        paused = false;
    }

    function setup() {
        var dom = jewel.dom;
        dom.bind("footer button.exit", "click", exitGame);
        dom.bind("footer button.pause", "click", pauseGame);
        dom.bind(".pause-overlay", "click", resumeGame);
        jewel.input.initialize();
    }

    function run() {
        if (firstRun) {
            setup();
            firstRun = false;
        }
        startGame();
    }


    return {
        run: run
    }
}) ();