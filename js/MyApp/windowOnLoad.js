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
                }, 3000);
            });
        },

        hasPopupBlocker: function(poppedWindow) {
          var result = false;
                                   
          try {
              if (typeof(poppedWindow) == 'undefined') {
                  // Safari with popup blocker... leaves the popup window handle undefined
                  result = true;
              }
              else if (poppedWindow && poppedWindow.closed) {
                  // This happens if the user opens and closes the client window...
                  // Confusing because the handle is still available, but it's in a "closed" state.
                  // We're not saying that the window is not being blocked, we're just saying
                  // that the window has been closed before the test could be run.
                  result = false;               
              }
              else if (poppedWindow && window.YChildOpen) {                  
                  // This is the actual test. The client window should be fine.
                  result = false;
              }
              else {
                  // Else we'll assume the window is not OK
                  result = true;
              }

          } catch (err) {
              if (console) {
                 console.warn("Could not access popup window", err);
              }
          }

          return result;
        },

        checkPopupStatus: function() {
            if(this.hasPopupBlocker(this.popup)) {
                Dom.get('popup_blocked_msg').innerHTML = 'Please enable pop-ups for all panda-related '
                    + 'sites and click the above link to open the next page.';
            }
        }
        
    };
}());