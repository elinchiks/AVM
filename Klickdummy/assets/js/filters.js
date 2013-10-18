$(document).ready(function()
{

	links = $('.filterbar').find('.filter-data a');
    $(links).each(function(i){
    	triggeredFilter = $(this);
        triggeredFilter.click(function(e){
        	e.preventDefault();
        	var filterValue = $(this).text();
        	var filterParent= $(this).parents('.filter-data');
        	var filterWrapper = $(this).parents('.filter-wrapper');
        	var filterTrigger =  $(filterParent).prev('.filter-trigger');
        	var filterLinkHolder = $(filterTrigger).find('a');
        	filterLinkHolder.text("" + filterValue + "" );





        	//Activating the next filter
        	$(filterWrapper).next('.filter-wrapper').find('.filter-trigger').removeClass('not-active');




        	//Callback function which hides the filter data box after submitting the value
        	// Callback function filters the content, based on filters submitted
        	

        	setTimeout(function () { 

                // Close filter data window 
        		filterParent.removeClass('in');
        	    filterParent.addClass('collapse');
        	   
        	        jQuery.expr[':'].Contains = function (a, i, m) {
                        // || a.textContent || a.innerText || ""
                        var hardware = a.getAttribute("data-hardware");
                        var problems = a.getAttribute("data-problems");
                        var specific = a.getAttribute("data-specific");

                        return (hardware && problems && specific).toUpperCase().indexOf(m[3].toUpperCase())>=0;

        	        };

        	        function listFilter(list) {
        	                var filter = filterValue;
        	                if (filter) {
        	                    $(list).find("a:not(:Contains(" + filter + "))").parent().slideUp();

                             
                                var filteredList = $(list).find("a:Contains(" + filter + ")");
                                var numberReturned = $(filteredList).length;

                                


                                //Loop through the filtered list and style the new list elements
                                filteredList.css('background', '#fff');

                                for ( var i=0; i < filteredList.length; i++ )
                                  {
                                    // do stuff with boxes[i]
                                    if ( ( (i+1) % 2 ) === 0 )
                                      {
                                          $(filteredList[i]).css('background', '#f8f8f8');
                                          // do stuff with the fourth item
                                      }
                                  }

                                // writing the number returned 
                                $('#search-header').find('.search-count span').text(numberReturned);
                                $('#search-footer').find('.search-count span').text(numberReturned);



        	                    $(list).find("a:Contains(" + filter + ")").parent().slideDown();

        	                } else {
        	                    $(list).find("li").slideDown();
        	                }

        	                return false;
        	      
        	        }
        	        $(function () {
        	            listFilter($("#search-content"));
        	        });

        	}, 300); 



        });
    });


});