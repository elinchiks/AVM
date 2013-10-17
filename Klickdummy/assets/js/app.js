$(document).ready(function()
{

	links = $('.filterbar').find('.filter-data a');
    $(links).each(function(i){
        $(this).click(function(e){
        	e.preventDefault();
        	var filterValue = $(this).text();
        	var filterParent= $(this).parents('.filter-data');
        	var filterWrapper = $(this).parents('.filter-wrapper');
        	var filterTrigger =  $(filterParent).prev('.filter-trigger');
        	console.log(filterTrigger);
        	$(filterTrigger).find('a').text("" + filterValue + "" );

        	$(filterWrapper).next('.filter-wrapper').find('.filter-trigger').removeClass('not-active');


        	//Activating the next filter

        });
    });


});