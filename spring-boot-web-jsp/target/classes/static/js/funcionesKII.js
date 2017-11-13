/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


//var FromDate = new Date(2001, 9, 11, 1, 23, 45);
//var ToDate = new Date();


function sumarTiempo(startDateTime, Horas){
    startDateTime = startDateTime.replace('/','-');
    startDateTime = startDateTime.replace('/','-');    
    console.log(startDateTime);
    
    var a = moment(startDateTime);
    console.log(a.add(2,'hours').format('hh:mm A'));
    
    //console.log(a);
}

function compareDates(startDateTime, endDateTime) {
    

    startDateTime = startDateTime.replace('/','-');
    startDateTime = startDateTime.replace('/','-');    
    console.log(startDateTime);
    endDateTime = endDateTime.replace('/','-');
    endDateTime = endDateTime.replace('/','-');
    console.log(endDateTime);
    var a = moment(endDateTime);//now
    var b = moment(startDateTime);
    console.log(a.diff(b, 'seconds')) // 44700
    console.log(a.diff(b, 'minutes')) // 44700
    console.log(a.diff(b, 'hours')) // 745
    console.log(a.diff(b, 'days')) // 31
    console.log(a.diff(b, 'weeks')) // 4

    return a.diff(b, 'seconds');
}

function stringTokenizer(Cadena, Delimitador){

    console.log(Delimitador);

    var Token = Cadena.split(Delimitador);
    for(i=0;i<Token.length;i++){
        console.log(" " + Token[i] );
    }

}

function getIniFinRango(rangofecha){  
 if (rangofecha!== null){
  console.log(" Rango Fecha Recibido " + rangofecha);
  var rangoRegreso = rangofecha.split(" - ");
  //console.log(" Primero " + rangoRegreso[0] );
  //console.log(" Segundo " + rangoRegreso[1] );
  return rangoRegreso;
 }else{
  return null;
 }
}


     //Solo números
     $('input[type=number]').keydown(function (e) {
         console.log(" keycode =  " + e.keyCode);
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
             // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) || 
             // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
                 // let it happen, don't do anything
                 //alert("entramos al primer if");
                 console.log("return");
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                console.log(e.preventDefault());
            //alert("entramos al segundo if");
                e.preventDefault();
            //else
                //return;
        }
        
        longitud = $(this).val().length;
        maxlong = $(this).attr('maxlength');
        
        //alert("longitud " + longitud + " longitud Máxima " + maxlong);
        if(longitud >= maxlong){
            console.log("ya llego al maxlength");
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