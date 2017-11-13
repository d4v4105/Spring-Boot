/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
     //Solo números
     $('input[type=number]').keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
             // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) || 
             // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
                 // let it happen, don't do anything
                 //alert("entramos al primer if");
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            
            //alert("entramos al segundo if");
                e.preventDefault();
            //else
                //return;
        }
        
        longitud = $(this).val().length;
        maxlong = $(this).attr('maxlength');
        
        //alert("longitud " + longitud + " longitud Máxima " + maxlong);
        if(longitud >= maxlong){
        
            //alert("longitud " + $(this).val().length + " longitud Máxima " + $(this).attr('maxlength'));
            e.preventDefault();
        }
    });
    
    
   
    
    $('input[type=text]').keypress(function (e) {
        
        
        
        //var regex = new RegExp("^[a-zA-Z0-9]+$");
        var regex = new RegExp("^[a-zA-Z0-9._\b\\-\\s]+$");
        
        
        /*   9  TAB 
         *   8 BACK SPACE
         *  left arrow 	37 
         *  right arrow 	39 
         *  delete 	46 
         */
        
        
        
        //Las Ñ's
        if(e.charCode == 134 || e.charCode == 135 || e.charCode == 209 || e.charCode == 241){
            return true;
            
        }
        
        
        if(e.keyCode == 9 || e.keyCode == 8 || e.keyCode == 37 || e.keyCode == 39 || e.keyCode == 46){
            return true;        
        }
        longitud = $(this).val().length;    
        maxlong = $(this).attr('maxlength');
        //alert("longitud " + longitud + " longitud Máxima " + maxlong);
        if(longitud >= maxlong){
            //alert("longitud " + $(this).val().length + " longitud Máxima " + $(this).attr('maxlength'));
            e.preventDefault();
            return false;
        }    
        var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
        if (regex.test(str)) {
            
            
            return true;
        }   
        e.preventDefault();
        return false;
});

});
