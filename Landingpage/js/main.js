$(document).ready(function(){
	redrawDotNav();
	optimizeLayout();




	$(window).bind('scroll', function(e){
		redrawDotNav();

	});
	$(window).bind('resize', function(e){
		// parallaxScroll();
		optimizeLayout();
	});


	if($(window).scrollTop() > 300) {
		resizeAdjustments();
	}
	



	$('a.intro').click(function(){
		deactivate();
		$('#intro').addClass('active');
		$('html, body').animate({
			scrollTop:0
		}, 1000,   'easeInOutCubic', function(){

		});
		return false;
	});
	$('a.internet').click(function(){
		deactivate();
		$('#internet').addClass('active');
		$('html, body').animate({
			scrollTop: $('#internet').offset().top
		}, 1000, 'easeInOutCubic',  function(){
			// parallaxScroll();
		})
		return false;
	});

	$('a.wlan').click(function(){
		deactivate();
		$('#wlan').addClass('active');
		$('html, body').animate({
			scrollTop:$('#wlan').offset().top
		}, 1000,  'easeInOutCubic', function(){
			// parallaxScroll();
		});
		return false;
	});
	$('a.usb').click(function(){
		deactivate();
		$('#usb').addClass('active');
		$('html, body').animate({
			scrollTop: $('#usb').offset().top
		}, 1000,  'easeInOutCubic', function(){
			// parallaxScroll();
		});
		return false;
	});
	$('a.lan').click(function(){
		deactivate();
		$('#lan').addClass('active');
		$('html, body').animate({
			scrollTop: $('#lan').offset().top
		}, 1000, 'easeInOutCubic', function(){
			// parallaxScroll();
		});
		return false;
	});
	$('a.os').click(function(){
		deactivate();
		$('#os').addClass('active');
		$('html, body').animate({
			scrollTop: $('#os').offset().top
		}, 1000, 'easeInOutCubic', function(){
			// parallaxScroll();
		});
		return false;
	});
	$('a.auszeichnungen').click(function(){
		deactivate();
		$('#auszeichnungen').addClass('active');
		$('html, body').animate({
			scrollTop: $('#auszeichnungen').offset().top
		}, 1000, 'easeInOutCubic', function(){
			// parallaxScroll();
		});
		return false;
	});


	$('nav#primary a').hover(
		function(){
			$(this).prev('h5').show();
	},
	function(){
		$(this).prev('h5').hide();
		}
	);

});

/* Set navigation dots to an active state as the user scrolls */
function redrawDotNav(){
	var section1Top =  0;
	// The top of each section is offset by half the distance to the previous section.
	var section2Top =  $('#internet').offset().top - (($('#wlan').offset().top - $('#internet').offset().top) / 2);
	var section3Top =  $('#wlan').offset().top - (($('#usb').offset().top - $('#wlan').offset().top) / 2);
	var section4Top =  $('#usb').offset().top - (($('#lan').offset().top - $('#usb').offset().top) / 2);
	var section5Top =  $('#lan').offset().top - (($('#os').offset().top - $('#lan').offset().top) / 2);
	var section6Top =  $('#os').offset().top - (($('#auszeichnungen').offset().top - $('#os').offset().top) / 2);
	var section7Top =  $('#auszeichnungen').offset().top - (($(document).height() - $('#auszeichnungen').offset().top) / 2);


	$('nav#primary a').parents('li').removeClass('active');
	if($(document).scrollTop() >= section1Top && $(document).scrollTop() < section2Top){
		$('nav#primary a.intro').parents('li').addClass('active');
		$('#intro').addClass('active');

	} else if ($(document).scrollTop() >= section2Top && $(document).scrollTop() < section3Top){
		$('nav#primary a.internet').parents('li').addClass('active');
		$('#viewport').removeClass().addClass('section-internet');
		deactivate();
		$('#internet').addClass('active');
	} else if ($(document).scrollTop() >= section3Top && $(document).scrollTop() < section4Top){
		$('nav#primary a.wlan').parents('li').addClass('active');
		deactivate();
		$('#wlan').addClass('active');

	} else if ($(document).scrollTop() >= section4Top && $(document).scrollTop() < section5Top){
		$('nav#primary a.usb').parents('li').addClass('active');
		// $('#parallax-bg').removeClass().addClass('section-usb');
		deactivate();
		$('#usb').addClass('active');
	} else if ($(document).scrollTop() >= section5Top && $(document).scrollTop() < section6Top){

		$('nav#primary a.lan').parents('li').addClass('active');
		deactivate();
		$('#lan').addClass('active');

	} else if ($(document).scrollTop() >= section6Top && $(document).scrollTop() < section7Top){
		$('nav#primary a.os').parents('li').addClass('active');
		deactivate();
		$('#os').addClass('active');
		// $('#parallax-bg').removeClass().addClass('section-os');
	} else if ($(document).scrollTop() >= section7Top){
		$('nav#primary a.auszeichnungen').parents('li').addClass('active');
		deactivate();
		$('#auszeichnungen').addClass('active');

	}
}

/* Set navigation dots to an active state as the user scrolls */
function optimizeLayout(){
	$('article').each(function(){
		$(this).css({width:window.innerWidth, height: window.innerHeight});
	})
	$('#viewport').css({width:window.innerWidth, height: window.innerHeight});
}
function deactivate(){
	$('#content').find('article').each(function(){
		$(this).removeClass('active');
	})
}


// Adding functionality to arrow up, arrow down keys
$(document).keydown(function(e){
    if (e.keyCode == 38) { 
    	$('nav#primary li.active').prev('li').find('a').trigger('click');
       return false;
    }
    else if (e.keyCode == 40) { 
       $('nav#primary li.active').next('li').find('a').trigger('click');
       return false;
    }
});


$.fn.isolatedScroll = function() {
    this.bind('mousewheel DOMMouseScroll', function (e) {
        var delta = e.wheelDelta || (e.originalEvent && e.originalEvent.wheelDelta) || -e.detail,
            bottomOverflow = this.scrollTop + $(this).outerHeight() - this.scrollHeight >= 0,
            topOverflow = this.scrollTop <= 0;

        if ((delta < 0 && bottomOverflow) || (delta > 0 && topOverflow)) {
            e.preventDefault();
        }
    });
    return this;
};



////////////////////////////
// Custom Easing Extends
////////////////////////////

$.extend($.easing,
{
    def: 'easeOutQuad',
    swing: function (x, t, b, c, d) {
        return $.easing[$.easing.def](x, t, b, c, d);
    },

    easeInQuad: function (x, t, b, c, d) {
        return c*(t/=d)*t + b;
    },
    easeOutQuad: function (x, t, b, c, d) {
        return -c *(t/=d)*(t-2) + b;
    },
    easeInOutQuad: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t + b;
        return -c/2 * ((--t)*(t-2) - 1) + b;
    },
    easeInCubic: function (x, t, b, c, d) {
        return c*(t/=d)*t*t + b;
    },
    easeOutCubic: function (x, t, b, c, d) {
        return c*((t=t/d-1)*t*t + 1) + b;
    },
    easeInOutCubic: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t + b;
        return c/2*((t-=2)*t*t + 2) + b;
    }
});