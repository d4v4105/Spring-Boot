/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


        function setmenu(puntomenu) {
          //var href = $('.active').attr('href');
          //alert(" href " + href);
          $( "li" ).each(function( index ) {
              if ($(this).hasClass('active')){
                $(this).children().removeClass('current-arrow');
                $(this).removeClass('active'); 
              }
              if($(this).text().trim()=== puntomenu){
                $(this).children().append("<span class='current-arrow'></span>");
                $(this).addClass('active');
              }
          });
        }
             