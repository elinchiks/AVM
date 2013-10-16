$('document').ready(function(){
	console.log('I was here');
	$('#products .flayout').on('hover', function(){
		$(this).addClass('open');
	});

});