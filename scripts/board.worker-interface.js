jewel.board = (function() {
    var worker,
        messageCount,
        callbacks;

    function getJewel(x,y) {
        if (x<0 || x>cols-1 || y<0 || y>rows-1) {
            return -1;
        } else {
            return jewels[x][y];
        }
    }

    function print() {
        var str = "";
        for (var y = 0; y < rows; y++) {
            for (var x = 0; x < cols; x++) {
                str += getJewel(x,y) + " ";
            }
            str += "\r\n";
        }
        console.log(str);
    }

    function getBoard() {
        var copy = [],x;
        for (x=0; x < cols; x++) {
            copy[x] = jewels[x].slice(0);
        }
        return copy;
    }

    function messageHandler(event) {
        //uncomment to log worker message
        // console.log("event.data");

        var message = event.data;
        jewels = message.jewels;

        if (callbacks[message.id]) {
            callbacks[message.id] (message.data);
            delete callbacks[message.id];
        }
    }

    function initialize(callback) {
        rows = jewel.settings.rows;
        cols = jewel.settings.cols;
        messageCount = 0;
        callbacks = [];
        worker = new Worker("scripts/board.worker.js");
        jewel.dom.bind(worker, "message", messageHandler);
        post("initialize", jewel.settings, callback);
    }

    function post(command, data, callback) {
        callbacks[messageCount] = callback;
        worker.postMessage ({
            id: messageCount,
            command: command,
            data: data
        });
        messageCount++;
    }

    function swap(x1, y1, x2, y2, callback) {
        post("swap", {
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2
        }, callback);
    }

    return {
        initialize: initialize,
        swap: swap,
        getBoard: getBoard,
        print: print
    };

}) ();