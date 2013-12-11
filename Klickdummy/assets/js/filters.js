/**
 * Functions created for content filtering
 * Author: Elina Sundukova
 * Comment: Different Layouts for filtering in different devices,
 * filters are based on hooks in the content with HTML5 data fileds
 */

// Initializing variables
//////////////

var $lightboxOverlay,
    $lightboxDialog,
    $lightboxClose,
    searchList,
    filterLinks;


// Lightbox Functions
//////////////////////

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
        overlayData = $lightboxDialog.find('.overlay-data').parent();
        $(parent).append(overlayData);
    });
    releaseLightbox();
}

function initLightbox() {

    $lightboxClose = $('.lightbox-close');

    // Close callback
    $lightboxClose.on('click', function(e){ 
        closeLightbox();
        e.preventDefault();
        return false;
    });
    links = $lightboxDialog.find('a');

    filters(links);
}
    
function openLightbox(data) {
    var scrollTop = 0;
    $lightboxOverlay = $('<div id="lightbox-overlay"></div>');
    $lightboxDialog  = $('<div id="lightbox-dialog"><a href="#" id="lightbox-close" class="lightbox-close"></a></div>');

    $('body').append($lightboxOverlay)
            .append($lightboxDialog);
    
    $lightboxOverlay.animate({ opacity: '0.6' }, 200, 'easeInOutQuad', function() {

        $lightboxDialog.append(data);

        initLightbox();

        $lightboxDialog.css({ opacity: '0', visibility: 'visible'  })
            .animate({ opacity: '1' }, 250, 'easeInOutQuad', function() {
                isLoading = false;
        });
    });
}



// Pagination For Search Results
////////////////////////////


function pagination(countedResults, storedSearchList) {
    searchList  = storedSearchList;

     var $pageNav = $('.search-nav'),
         show_per_page = 6,
         number_of_items = countedResults, 
         number_of_pages = Math.ceil(number_of_items/show_per_page);
    
     //set the value of hidden input fields  
     $('#current_page').val(0);  
     $('#show_per_page').val(show_per_page);  
     $('.search-count span').html(number_of_items);
    
    
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
     $(searchList).css('display', 'none');  

    
     //and show the first n (show_per_page) elements  
     $(searchList).slice(0, show_per_page).css('display', 'block');  
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
    $(searchList).css({"display":"none"}).slice(start_from, end_on).css({"display":"block"});  
  
    /*get the page link that has longdesc attribute of the current page and add active_page class to it 
    and remove that class from previously active page link*/  
    $('.page_link[longdesc=' + page_num +']').addClass('active_page').siblings('.active_page').removeClass('active_page');  
  
    //update the current page input field  
    $('#current_page').val(page_num);  
}  


// Content Filter function
////////////////////////////

// Defining function for content filter (defining filter values)
jQuery.expr[':'].Contains = function (a, i, m) {
    // || a.textContent || a.innerText || ""
   hardware = a.getAttribute("data-hardware").toUpperCase().indexOf(m[3].toUpperCase())>=0;
    problems = a.getAttribute("data-problems").toUpperCase().indexOf(m[3].toUpperCase())>=0;
    specific = a.getAttribute("data-specific").toUpperCase().indexOf(m[3].toUpperCase())>=0;
    moreSpecific = a.getAttribute("data-moreSpecific").toUpperCase().indexOf(m[3].toUpperCase())>=0;
    filterValues = hardware + problems + specific + moreSpecific;
    return (filterValues);
};


// Filtering the content, returning the matched results, styling the results
function listFilter(list, filterParent, filterValue) {
    var filter = filterValue;


    //Checking if filter was triggered
    if (filter != "undefined") {

        //if the list items don't contain filters, they slide up
        $(list).find("a:not(:Contains(" + filter +"))").parent().slideUp();


        //Finding the number of returned items  
        var filteredList = $(list).find("a:Contains(" + filter +")");
     


        //Loop through the filtered list and style the new list elements ,
        //necessary because of even and odd backgrounds
        styleList(filteredList);

        var numberReturned = $(filteredList).length;

        // writing the number returned 
        $('#search-header').find('.search-count span').text(numberReturned);
        $('#search-footer').find('.search-count span').text(numberReturned);

        //Sliding down the list items which contains filtered categories
        $(list).find("a:Contains(" + filter + ")").parent().slideDown();

        //Renewing the pagination
        pagination(numberReturned,  filteredList);

    } else {
        $(list).find("li").slideDown();
    }

    return false;
};

//Function to add backgrounds for :even and :odd list items

function styleList(filteredList) {

    for ( var i=0; i < filteredList.length; i++ ){

        if ( ( (i+1) % 2 ) === 0 ){
            $(filteredList[i]).removeClass('filtered-list').addClass('filtered-list-colored');
        } else {
          $(filteredList[i]).removeClass('filtered-list-colored').addClass('filtered-list');
        }
    }
}


// Deactivate following filters, when the previous filter is triggered
function checkFilterState() {

    triggers = $('.filterbar').find('.filter-trigger a');

    $(triggers).each(function(i) {

            triggeredFilter = $(this);

            triggeredFilter.click(function(e) {

                filterParent = $(this).parents('.filter-wrapper');
                nextParent = $(filterParent).nextAll('.filter-wrapper');
                nextTrigger = $(nextParent).find('.filter-trigger');
            

                if($(nextTrigger).length > 0) {
          
                $(nextTrigger).each(function(i) {

                    if($(this).hasClass('not-active')) {
                        
                    } else {
                        // Deactivated filters get default value "Alle Bereiche" and are disactivated for click
                        $(this).find('a').text("Alle Bereiche");
                        var linkId = $(this).find('a').attr("id");

                        //if the filter trigger was open, it gets closed
                        $(this).next().find('.filter-data').removeClass("in").addClass('collapse');
                        $(this).addClass('not-active');  

                                 //Detecting which filter was triggered and storing values
                           switch (linkId) {
                               case ('data-hardware'):
                       
                                  $( "body" ).data( "dataHardware", "" );         
                                   break;
                               case ('data-problems'):
                                   $( "body" ).data( "dataProblems", "" );  
                                
                                   break;
                               case ('data-specific'):
                                   $( "body" ).data( "dataSpecific", "" );  
                                 
                                   break;
                                case ('data-moreSpecific'):
                                    $( "body" ).data( "dataMoreSpecific", "" );  
                                  
                                    break;
                               default:
                                  alert("The filter was not triggered");
                           }
                       
                    }

                });
            }

        });
    });

};

//Function to Append the new value for the trigger and to close drop down
function filters(links){

    var filterValue;
    $(links).each(function(i){
        triggeredFilter = $(this);

        //Getting the Value from triggered filter
        triggeredFilter.click(function(e){
       
            e.preventDefault();
            filterValue = $(this).text(); 


            var filterParent= $(this).parents('.filter-data');

         
            dataId = $(filterParent).attr("id");
            filterLinkHolder = $("a[data-parent='" + dataId +"']");
            filterLinkId =$(filterLinkHolder).attr("id");


            var filterWrapper = $(filterLinkHolder).parents('.filter-wrapper');
            var filterTrigger =  $(filterLinkHolder).parents('.filter-trigger');


            //Adding new value to the filter
            filterLinkHolder.text("" + filterValue + "" );
            filterTrigger.removeClass('active');


            //Activating the next filter only if value is set to not default
            if ( filterValue != "Alle Bereiche") {
                $(filterWrapper).next('.filter-wrapper').find('.filter-trigger').removeClass('not-active');
            }

            //Rewrite the value for " Alle Bereiche "
            if (filterValue == "Alle Bereiche") {

              //Detecting which filter was triggered and storing values

               switch ( filterLinkId ) {
                  case ('data-hardware'):
                   filterValue = "";
                    break;
                   case ('data-problems'):
                     filterValue = $( "body" ).data( "dataHardware");  
                     break;
                   case ('data-specific'):
                      filterValue = $( "body" ).data( "dataProblems");  
                      break;
                    case ('data-moreSpecific'):
                       filterValue = $( "body" ).data( "dataSpecific");  
                       break;
                   
                  
               }
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

                case ('data-moreSpecific'):
                    $( "body" ).data( "dataMoreSpecific", filterValue );  
                  
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
        

            //Passing the triggered filter value to content filtering function              
            listFilter($("#search-content"), filterParent, filterValue);  


        }, 500); 

    });
    });
};

// Initializing Functions
////////////////////////////

$(document).ready(function() {

    number_of_items = $('#search-content ul').children().size();
    searchList = $('#search-content ul').find('a');
    pagination(number_of_items, searchList);

    checkFilterState();
    filterLinks = $('body').find('.filter-data a');
    filters(filterLinks);



      
    //Adding class active to filter trigger
    triggers = $('.filterbar').find('.filter-trigger a');

    $(triggers).each(function(i){
      trigger = $(this);

        trigger.click(function(e){

        if($(this).parent().hasClass('active')) {
          $(this).parent().removeClass('active');
        }else {
          $(this).parent().addClass('active');
        }
        
          e.preventDefault();
        });
     });




// Initializing Overlays for Mobile
////////////////////////////

if ($("html").hasClass("mobile")) {

    // Filters appear as pop ups in mobile devices

    triggers = $('.filterbar').find('.filter-trigger a');

    $(triggers).each(function(i){
      trigger = $(this);

        trigger.click(function(e){


          overlayData =  $(this).parent().next().find('.filter-data');
          overlayData.addClass('overlay-data');
          dataOverlay = $(this).parent().next('div');

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