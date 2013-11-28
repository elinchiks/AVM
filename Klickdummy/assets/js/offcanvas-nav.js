// OFF CANVAS NAVIGATION for javascript enabled

$(document).ready(function() {

	$('[data-toggle="slide-off"]').on('click', function(e) {
		if($('.navbar-collapse').hasClass('in')) {
			$('.navbar-collapse').css('display', 'none').removeClass('in').addClass('collapse');
			$('.container').animate({ left: '0' }, 500);
		} else {
			$('.navbar-collapse').css('display', 'block').removeClass('collapse').addClass('in');
			$('.container').animate({ left: '-80%' }, 500);
		}
	   e.preventDefault();
	});


	$( window ).resize(function() {
	 	$('.container').css('left', '0');
	 	$('.navbar-collapse').removeClass('in').addClass('collapse');
	});



	$('footer').find('.dropdown-menu a').each(function(){
		$(this).on('click', function(e){
			var newClass= $(this).find('span').attr('class');

			$(this).closest('.dropdown').find('.dropdown-toggle').find('i').attr('class', newClass);
			e.preventDefault();


		});
	});

});