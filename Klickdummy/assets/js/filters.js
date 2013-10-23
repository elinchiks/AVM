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

function closeLightbox(parent) {

    $lightboxDialog.animate({ opacity: '0' }, 200, 'easeInOutQuad', function(){

        $lightboxOverlay.animate({ opacity: '0' }, 200, 'easeOutQuad', function(){
            $lightboxOverlay.remove();
        });
        
        $lightboxDialog.remove();
        overlayData = $lightboxDialog.find('.overlay-data');
        $(parent).append(overlayData);
    });
    releaseLightbox();
}

function initLightbox() {
    
    //resizeDetailsDialog();

    $lightboxClose = $('.lightbox-close');

    // Close callback
    $lightboxClose.on('click', function(e){ 
        closeLightbox();
        e.preventDefault();
        return false;
    });
    // $lightboxOverlay.on('click', closeLightbox);
    
    $(document).on('keyup', function(e) {
        if (e.keyCode == 27) { closeLightbox(); }   // esc
    });
}
    
function openLightbox(data) {
    var scrollTop = 0;
    $lightboxOverlay = $('<div id="lightbox-overlay"></div>');
    $lightboxDialog  = $('<div id="lightbox-dialog"><a href="#" id="lightbox-close" class="lightbox-close"></a></div>');

    $('body').append($lightboxOverlay)
            .append($lightboxDialog);
    
    $lightboxOverlay.animate({ opacity: '0.6' }, 200, 'easeInOutQuad', function() {

        $lightboxDialog.append(data);

        // Init lightbox
        initLightbox();

        $lightboxDialog.css({ opacity: '0', visibility: 'visible'  })
                    .animate({ opacity: '1' }, 250, 'easeInOutQuad', function() {
                        isLoading = false;
                    });
    });
}


//////////////
// Pagination
//////////////


        function pagination(countedResults, searchList) {

             var $pageNav = $('.search-nav'),
                 show_per_page = 6,
                 number_of_items = countedResults, 
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
             $(searchList).children().css('display', 'none');  
            
             //and show the first n (show_per_page) elements  
             $(searchList).children().slice(0, show_per_page).css('display', 'block');  
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

      
        // Defining function for content filter (defining filter values)
        jQuery.expr[':'].Contains = function (a, i, m) {
            // || a.textContent || a.innerText || ""
           hardware = a.getAttribute("data-hardware").toUpperCase().indexOf(m[3].toUpperCase())>=0;
            problems = a.getAttribute("data-problems").toUpperCase().indexOf(m[3].toUpperCase())>=0;
            specific = a.getAttribute("data-specific").toUpperCase().indexOf(m[3].toUpperCase())>=0;
            filterValues = hardware + problems + specific;
            return (filterValues);
        };


        // Filtering the content, returning the matched results, styling the results
        function listFilter(list, filterParent, filterValue) {
                var filter = filterValue,
                filter1,
                filter2,
                filter3;



                 if(typeof $( "body" ).data( "dataHardware") != "undefined") {
                  filter1 = $( "body" ).data( "dataHardware" );
               }  else {
                filter1 = $( ".filter-value" ).text();
               }   
                 if(typeof $( "body" ).data( "dataProblems") != "undefined") {
                  filter2 = $( "body" ).data( "dataProblems" );
               }  else {
                filter2 = $( ".filter-value" ).text();
               }  
                 if(typeof $( "body" ).data( "dataSpecific") != "undefined") {
                  filter3 = $( "body" ).data( "dataSpecific" );
               }  else {
                filter3 = $( ".filter-value" ).text();
               } 
             

                if (filter) {

                        $(list).find("a:not(:Contains(" + filter1 + filter2 + filter3 +"))").parent().slideUp();

                     
                        var filteredList = $(list).find("a:Contains(" + filter1 + filter2 + filter3  +")");
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
                        // pagination(numberReturned);



                        $(list).find("a:Contains(" + filter1 + filter2 + filter3 + ")").parent().slideDown();
                        pagination(numberReturned,  filteredList);


                 
                  
                } else {
                    $(list).find("li").slideDown();
                }

                return false;
        
        };

        // Function is used to change the value of previous filters

        function checkFilterState() {
            triggers = $('.filterbar').find('.filter-trigger a');

            $(triggers).each(function(i){

                    triggeredFilter = $(this);

                    triggeredFilter.click(function(e){

                    filterParent = $(this).parents('.filter-wrapper');
                    nextParent = $(filterParent).nextAll('.filter-wrapper');
                    nextTrigger = $(nextParent).find('.filter-trigger');
                

                    if($(nextTrigger).length > 0){
              
                    $(nextTrigger).each(function(i){


                    if($(this).hasClass('not-active')) {
                        
                    } else {
                        $(this).find('a').text("Alle Bereiche");
                        var linkId = $(this).find('a').attr("id");
                        $(this).next('.filter-data').removeClass("in").addClass('collapse');
                        $(this).addClass('not-active');                      
   
                    }

                    });
                }

                });
            });

        };


        function filters(){

            links = $('.filterbar').find('.filter-data a');

            var filterValue;
            $(links).each(function(i){

                    triggeredFilter = $(this);

                    triggeredFilter.click(function(e){
                   
                    e.preventDefault();
                    filterValue = $(this).text(); 

                    var filterParent= $(this).parents('.filter-data');

                 
                    dataId = $(filterParent).attr("id");
                    filterLinkHolder = $("a[data-parent='" + dataId +"']");
                    filterLinkId =$(filterLinkHolder).attr("id");
                

                    var filterWrapper = $(filterLinkHolder).parents('.filter-wrapper');
                    var filterTrigger =  $(filterLinkHolder).parents('.filter-trigger');

                   


                    // var filterLinkHolder = $(filterTrigger).find('a');
                    filterLinkHolder.text("" + filterValue + "" );



                    //Activating the next filter
                    $(filterWrapper).next('.filter-wrapper').find('.filter-trigger').removeClass('not-active');

                    //Rewrite the value for " Alle Bereiche "
                    if (filterValue == "Alle Bereiche") {
                      filterValue = " ";
                    }
                    
                    
                           //Detecting which filter was triggered and storing values
                           switch (filterLinkId) {
                               case ('data-hardware'):
                       
                                  $( "body" ).data( "dataHardware", filterValue );         
                                   break;
                               case ('data-problems'):
                                   $( "body" ).data( "dataProblems", filterValue );  
                                
                                   break;
                               case ('data-specific'):
                                   $( "body" ).data( "dataSpecific", filterValue );  
                                 
                                   break;
                               default:
                                  alert("The filter was not triggered");
                           }
   
                           
                    

                    //Callback function which hides the filter data box after submitting the value
                    // Callback function filters the content, based on filters submitted
                    

                    setTimeout(function () { 

                      if($(filterParent).hasClass('overlay-data')) {
                          closeLightbox(filterWrapper);
                      }


                        // Close filter data window 
                        filterParent.removeClass('in');
                        filterParent.addClass('collapse');
                        checkFilterState();
                    
                          
                        listFilter($("#search-content"), filterParent, filterValue);  


                    }, 500); 

                });
            });
};

//////////////
// DOCUMENT READY 
//////////////

$(document).ready(function() {


   // $( "body" ).data( "dataHardware", "" );         
   // $( "body" ).data( "dataProblems", "" );  
   // $( "body" ).data( "dataSpecific", "" );  
    number_of_items = $('#search-content ul').children().size();
    searchList = $('#search-content ul');
    pagination(number_of_items, searchList);
    filters();
    checkFilterState();


    //triggering Overlay for filters just for mobile

    if ($("html").hasClass("mobile")) {

        triggers = $('.filterbar').find('.filter-trigger a');

        $(triggers).each(function(i){
          trigger = $(this);

            trigger.click(function(e){
              dataOverlay = $(this).parent().next('.filter-data');
              dataOverlay.addClass('overlay-data');

              parentId = $(this).attr("data-parent");
         

                  openLightbox(dataOverlay);

                  e.preventDefault();
            });
         });
    }

});
 

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