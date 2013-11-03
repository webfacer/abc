/**
*
* @version v0.0.1
* @Plugin stickitjs
* @author Davor Ilic
* 
*/
(function ( $ ) {
 
    $.fn.stickit = function( options ) {
    
        var $stickit = $(this);
        
        /**
        *
        * options: image or content, tooltip, input connection
        *
        */
        var defaults = {
        	useIdName		: 'stickit', // the id which will be used to count the elements
        	useClassName	: 'stickit', // the class which will use css hover and events for using stickit
        	inputConnection	: $('<textarea size="1" id="connectToStickit" />'),
        	useToolTip		: false,
        	useText			: null,
        	
        	onEventHoverIn	: function() {}, // @todo will be an option in the feature
        	onEventHoverOut	: function() {},
        	onEventCopied	: function() {}
        };
        
        // merge customer and default options
        var settings = $.extend(true, {}, defaults, options);
        
        // add textarea to copy text from it
        var form = $('body').append(settings.inputConnection);
        
        $stickit.each(function(i) {
        	// set every elemet an unique id
        	$(this).attr('id', settings.useIdName+(i+1));
			
        });
        	
		$stickit.hover(
			function() {
				if(!$(this).hasClass(settings.useClassName))
				{
					$(this).click(function(event) {
						event.preventDefault();
						
						// remove text if exists to replace it with newer one
						if(settings.inputConnection.val())
						{
							settings.inputConnection.val('');
						}
						
						// copied text will be now append into textarea
						var copyText = $(this).text();
						settings.inputConnection.val(copyText);
						settings.inputConnection.select();
					});
				
					$(this).addClass(settings.useClassName);
				}
			},
			function() {
				if($(this).hasClass(settings.useClassName))
				{
					$(this).removeClass(settings.useClassName);
				}
			}
		);
        
	    $stickit.bind({
	    	click		: getOnEventCopied,
	    	mouseenter	: getOnEventHoverIn,
	    	mouseleave	: getOnEventHoverOut 
	    });
						
		$(document).bind('keydown', function(event) {
			// CNTRL+C
			if(event.ctrlKey&&event.which==67)
			{
				form.focusout();
			}
			
			// stop pateevent to not paste into the textarea
			if(event.ctrlKey&&event.which==86)
			{
				return false;
			}
		});
        
        function getOnEventCopied() {
        	settings.onEventCopied.call(this);
        }
        
        function getOnEventHoverIn() {
        	settings.onEventHoverIn.call(this);
        }
        
        function getOnEventHoverOut() {
        	settings.onEventHoverOut.call(this);
        }
        
        return $stickit;
    };
})( jQuery );
