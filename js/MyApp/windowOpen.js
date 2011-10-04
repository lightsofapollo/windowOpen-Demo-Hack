MyApp.windowOpen = (function(){
	var Y = YAHOO;
	var Event = Y.util.Event;
	var Element = Y.util.Element;
	var Dom = Y.util.Dom;

	
	return {		
		init: function(windowClass){
			if(undefined === windowClass){
				windowClass = 'windowOpen';
			}
			
			
			var self = this;
			Event.onDOMReady(function(){
				self.initializeElements(windowClass);
			});
		},
		
		initializeElements: function(windowClass){
			var elements = Dom.getElementsByClassName(windowClass), i = 0, length, element;
			length = elements.length;
						
			for(var i = 0; i < length; i++){
				element = elements[i];
				this.bindElement(element);
			}
		},
		
		bindElement: function(element){
			Event.addListener(element, 'click', function(e, obj){
				Event.preventDefault(e);				
				var href = this.href, 
						newWin,
						title = this.title, 
						classes = this.className;

				newWin = window.open(href, title.replace(' ', ''), 'height=200,width=550');
				
				setTimeout(function(){
				    MyApp.windowOnLoad.popup = newWin;
            MyApp.windowOnLoad.checkPopupStatus();
        }, 4000);
							
			}, element);
		}
		
	}
}());