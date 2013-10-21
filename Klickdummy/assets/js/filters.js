//////////////
// Lightbox
//////////////

var $lightboxOverlay,
    $lightboxDialog,
    $lightboxClose;

function releaseLightbox() {
    
    // Destroy Click Handlers
    $lightboxClose.unbind('click');
    $lightboxOverlay.unbind('click');
    $(document).unbind('keyup');
}

function closeLightbox() {

    $lightboxDialog.animate({ opacity: '0' }, 200, 'easeInOutQuad', function(){

        $lightboxOverlay.animate({ opacity: '0' }, 200, 'easeOutQuad', function(){
            $lightboxOverlay.remove();
        });
        
        $lightboxDialog.remove();
    });

    releaseLightbox();
}

function initLightbox() {
    
    //resizeDetailsDialog();

    $lightboxClose = $('.lightbox-close');

    // Close callback
    $lightboxClose.one('click', function(e){ 
        closeLightbox();
        e.preventDefault();
        return false;
    });
    $lightboxOverlay.one('click', closeLightbox);
    
    $(document).one('keyup', function(e) {
        if (e.keyCode == 27) { closeLightbox(); }   // esc
    });
}
    
function openLightbox(data) {
    var scrollTop = 0;
    $lightboxOverlay = $('<div id="lightbox-overlay"></div>');
    $lightboxDialog  = $('<div id="lightbox-dialog"><a href="#" id="lightbox-close" class="lightbox-close">Close</a></div>');

    $wrapper.append($lightboxOverlay)
            .append($lightboxDialog);
    
    $lightboxOverlay.animate({ opacity: '0.6' }, 200, 'easeInOutQuad', function() {

        $lightboxDialog.append(data);

        // Init lightbox
        initLightbox();

        $lightboxDialog.css({ opacity: '0', visibility: 'visible'  })
                    .animate({ opacity: '1' }, 250, 'easeOutQuad', function() {
                        isLoading = false;
                    });
    });
}


//////////////
// Pagination
//////////////


        function pagination() {

             var $pageNav = $('.search-nav'),
                 show_per_page = 6,
                 number_of_items = $('#search-content ul').children().size(), 
                 number_of_pages = Math.ceil(number_of_items/show_per_page);
            
             //set the value of hidden input fields  
             $('#current_page').val(0);  
             $('#show_per_page').val(show_per_page);  
             $('.search-count span').html(number_of_items);
            
            
             /* 
             what are we going to have in the navigation? 
                 - link to previous page 
                 - links to specific pages 
                 - link to next page 
             */  
             var navigation_html = '<a class="previous_link" href="javascript:previous();"><</a>';
             var current_link = 0;  
             while(number_of_pages > current_link){  
                 navigation_html += '<a class="page_link" href="javascript:go_to_page(' + current_link +')" longdesc="' + current_link +'">'+ (current_link + 1) +'</a>';  
                 current_link++;  
             }  

            navigation_html += '<a class="next_link" href="javascript:next();">></a>';
            
             $pageNav.html(navigation_html);  
            
             //add active_page class to the first page link  
              $pageNav.find('.page_link:first').addClass('active_page');  
            
             //hide all the elements inside content div  
             $('#search-content ul').children().css('display', 'none');  
            
             //and show the first n (show_per_page) elements  
             $('#search-content ul').children().slice(0, show_per_page).css('display', 'block');  
        } 

        function previous(){
            
            new_page = parseInt($('#current_page').val()) - 1;
            //if there is an item before the current active link run the function
            if($('.active_page').prev('.page_link').length==true){
                go_to_page(new_page);
            }
            
        }

        function next(){
            new_page = parseInt($('#current_page').val()) + 1;
            //if there is an item after the current active link run the function
            if($('.active_page').next('.page_link').length==true){
                go_to_page(new_page);
            } 
        }

        function go_to_page(page_num){  
            //get the number of items shown per page  
            var show_per_page = parseInt($('#show_per_page').val());  
          
            //get the element number where to start the slice from  
            start_from = page_num * show_per_page;  
          
            //get the element number where to end the slice  
            end_on = start_from + show_per_page;  
          
            //hide all children elements of content div, get specific items and show them  
            $('#search-content ul').children().css({"display":"none"}).slice(start_from, end_on).css({"display":"block"});  
          
            /*get the page link that has longdesc attribute of the current page and add active_page class to it 
            and remove that class from previously active page link*/  
            $('.page_link[longdesc=' + page_num +']').addClass('active_page').siblings('.active_page').removeClass('active_page');  
          
            //update the current page input field  
            $('#current_page').val(page_num);  
        }  

        function initMoreInfoBlock() {
         $('.filter-trigger > a').on('click', function(e) {
            console.log("Hello");

            $button = $(this);
            console.log($button);

            // $moreInfo = $button.siblings('.more-info').html();

            // openLightbox($moreInfo)

            e.preventDefault();
            return false;
        });
        }




//////////////
// DOCUMENT READY 
//////////////

$(document).ready(function() {

    pagination();


//triggering Overlay for mobile

if ($("html").hasClass("desktop")) {

console.log("Hello");



}


	links = $('.filterbar').find('.filter-data a');


    var filterValue;
    $(links).each(function(i){
    	triggeredFilter = $(this);




        triggeredFilter.click(function(e){

        	e.preventDefault();
          
            
         
        	filterValue = $(this).text(); 


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
                       hardware = a.getAttribute("data-hardware").toUpperCase().indexOf(m[3].toUpperCase())>=0;
                        problems = a.getAttribute("data-problems").toUpperCase().indexOf(m[3].toUpperCase())>=0;
                        specific = a.getAttribute("data-specific").toUpperCase().indexOf(m[3].toUpperCase())>=0;
                        filterValues = hardware + problems + specific;
                        return (filterValues);

                        // $('section:contains("ABC"):contains("DEF")');


        	        };

        	        function listFilter(list) {
        	                var filter = filterValue;

                            //checks the filter value, when "Alle Bereiche" is set, filtering is done without matching a value
        	                if (filter) {
                                if(filter == "Alle Bereiche") {
                                    filter = '';
                                    
                                    $(list).find("a:not(:Contains(" + filter+ "))").parent().slideUp();

                                    
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

                                }
        	                  
        	                } else {
        	                    $(list).find("li").slideDown();
        	                }

        	                return false;
        	      
        	        }
        	        $(function () {
        	            listFilter($("#search-content"));
        	        });

        	}, 500); 



        });
    });


});
 