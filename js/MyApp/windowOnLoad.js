MyApp.windowOnLoad = (function() {
    var Y = YAHOO;
    var Event = Y.util.Event;
    var Element = Y.util.Element;
    var Dom = Y.util.Dom;

    return {
        popup: null,

        init: function() {
            var self = this;
            Event.onDOMReady(function()
            {
                self.popup = window.open('other.html', 'Title', 'height=200,width=550');
                setTimeout(function(){
                    self.checkPopupStatus();
                }, 1000);
            });
        },

        hasPopupBlocker: function(poppedWindow) {
            var result = false;

            try {
                if (typeof poppedWindow == 'undefined') {
                    // Safari with popup blocker... leaves the popup window handle undefined
                    console.log('undefined case');
                    result = true;
            	}
            	else if (poppedWindow && poppedWindow.closed) {
                	// This happens if the user opens and closes the client window...
                	// Confusing because the handle is still available, but it's in a "closed" state.
                	// We're not saying that the window is not being blocked, we're just saying
                	// that the window has been closed before the test could be run.
                	console.log('we like sugar');
                	result = false;
            	}
            	else if (poppedWindow) {
                	// This is the actual test. The client window should be fine.
                	console.log('working well');
                	result = false;
            	}
            	else {
                	// Else we'll assume the window is not OK
                	console.log('popup window contracted rubela.');
                	result = true;
            	}
        	}
        	catch (err) {
            	// Could not access popup window
        	}

    		return result;
		},

        checkPopupStatus: function() {
            if(this.hasPopupBlocker(this.popup)) {
                console.log('Oh noez! There\'s no more fish!');
            }
        }
        
    };
}());