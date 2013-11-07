/**
* @description will follow. this a working stable version
* @version v0.0.1
* @Plugin stickitjs
* @author Davor Ilic
* 
*/
(function ( $ ) {
 
    $.fn.stickit = function( options ) {
    
        var $stickit    = $(this);
        
        /**
        *
        * options: image or content, tooltip, input connection
        *
        */
        var defaults = {
            inputId                 : '#stickit',
            useIdName               : 'stickit', // the id which will be used to count the elements
            useClassName            : 'stickit', // the class which will use css hover and events for using stickit
            useToolTip              : false,
            useText                 : null,

            onEventInputAction      : function() {},
            onEventHoverInAction    : function() {}, // @todo will be an option in the feature
            onEventHoverOutAction   : function() {},
            onEventCopiedAction     : function() {}
        };
        
        // merge customer and default options
        var settings = $.extend(true, {}, defaults, options);
        
        var $input = $(settings.inputId);
        // add textarea to copy text from it
        // var form = $('body').append(settings.onEventInputAction);
        
        
        
        $stickit.each(function(i) {
            // set every elemet an unique id
            $(this).attr('id', settings.useIdName+(i+1));
			
        });
        	
        $stickit.hover(
                function() {
                    if(!$(this).hasClass(settings.useClassName))
                    {
                        $input.find('button').hover(
                            function() {
                                $input.find('button').text('cmd+c');
                            },
                            function() {
                                $input.find('button').text('stick it')
                            }
                        );
                        
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

        $input.click(function(event) {
            if($stickit.hasClass(settings.useClassName))
            {
                $(this).find('button').click(function(event) {
                    event.preventDefault();
                    $('#stickit').css('display','block');
                    var copyText = $('#stickit input').find('input').val();
                    console.log('content: '+copyText);
                    $input.find('input').select();
                });
            }
        });

        // when clicking
        /*
         * @descption outsource find('input') into own varible also button
         * 
         */
        settings.onEventHoverInAction = function() {
        }

        $stickit.bind({
            click       : _getOnEventInputAction,
            keydown     : _getOnEventCopiedAction,
            mouseenter  : _getOnEventHoverInAction,
            mouseleave  : _getOnEventHoverOutAction 
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
        
        function _getOnEventInputAction() {
            settings.onEventInputAction.call(this);
        }
        
        function _getOnEventCopiedAction() {
            settings.onEventCopiedAction.call(this);
        }
        
        function _getOnEventHoverInAction() {
            settings.onEventHoverInAction.call(this);
        }
        
        function _getOnEventHoverOutAction() {
            settings.onEventHoverOutAction.call(this);
        }
        
        return $stickit;
    };
})( jQuery );
