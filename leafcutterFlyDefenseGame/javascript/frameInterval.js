function frameInterval(updateFunction, frameRate) {
    var timerObject = setInterval(updateFunction, frameRate);

    this.stop = function() {
        if (timerObject) {
            clearInterval(timerObject);
            timerObject = null;
        }
        return this;
    }

    // start timer using current settings (if it's not already running)
    this.start = function() {
        if (!timerObject) {
            this.stop();
            timerObject = setInterval(updateFunction, frameRate);
        }
        return this;
    }

    // start with new interval, stop current interval
    this.reset = function(newRate) {
        frameRate = newRate;
        return this.stop().start();
    }
}
