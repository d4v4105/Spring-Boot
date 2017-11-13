$(document).ready(function() {
    $( "#Accordion1" ).accordion({
    animate:{easing: "linear"},
    icons:{header: "ui-icon-carat-1-e", activeHeader: "ui-icon-carat-1-s"},
    heightStyle:"content",
    collapsible:true
  }); 
  $( "#Accordion2" ).accordion({
    animate:{easing: "linear"},
    icons:{header: "ui-icon-carat-1-e", activeHeader: "ui-icon-carat-1-s"},
    heightStyle:"content",
    collapsible:true
  }); 
  

   var $calendar = $('#calendar');
   var id = 10;
   var events = "";
   var XML_OBJ     = [];
   var rawList;
   var str_return = "";      

   //Nos traemos datos  del div de información 
    
   var $top1Content = $("#datos1");
   var doctorField = $top1Content.find("select[name='idDoctor']");

   


    var $topContent = $("#datos");

    var clinicaField = $topContent.find("input[name='clinica']");
    var idclinicaField = $topContent.find("input[name='id_clinica']");
    
    var idpacienteField = "";


    /*Y vemos el tema de Ajax*/

                var xmlhttp;
                 var url = "paciente/combopacientes.jsp?clinica=" + $("#id_clinica").val();

                 if (window.XMLHttpRequest)
                 {
                     // code for IE7+, Firefox, Chrome, Opera, Safari
                     xmlhttp=new XMLHttpRequest();
                 }
                 else{
                     // code for gIE6, IE5
                     xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
                 }
                 xmlhttp.onreadystatechange=function(){
                     var d = document.getElementById("div_combo_pacientes")
                     d.innerHTML= xmlhttp.responseText;
                 }
                 xmlhttp.open("POST",url,true);
                 xmlhttp.send(null); 
      /*          AQUI TERMINA EL TEMAEL AJAX PARA PACIENTES*/

    $("#idDoctor").change(function(){
                
                $.ajax({
                  type:     'GET',
                  url:      'cita/getcitas.jsp',
                  datatype: 'text',
                  data:     'doctor=' + doctorField.val() + '&clinica=' + idclinicaField.val(),
                  success:  function(msg) {                            
                                var eventArray = [];
                                $(msg).find('cita').each(function(i){                              
                                    var $eventEl  = $(this);
                                    var eventObj  = {

                                               id    : $eventEl.find('id').text(),
                                               start    : $eventEl.find('start').text(),
                                               end    : $eventEl.find('end').text(),
                                               title    : $eventEl.find('title').text(),
                                               vez    : $eventEl.find('vez').text(),
                                               body    : $eventEl.find('otro').text(),
                                               medio   : $eventEl.find('medio').text(),
                                               mediodos   : $eventEl.find('mediodos').text(),
                                               descuento  : $eventEl.find('descuento').text()
                                       };

                                       // Push the objects into the eventArray;
                                       eventArray.push(eventObj);                                                               
                                  });
                              rawList = eventArray;
                          } 
                });
                
                $calendar.weekCalendar("refresh");
                //this._clearCalendar();
                //this._loadCalEvents(this.element.data("startDate")); //reload with existing week

    });


   

 /************************************************LOAD XML************************************************************/

 /*
    // We use jQuery to load the external XML
    $.get('xml/citas.xml', function(d){ // d represents the XML object


    // Create an array outside the .each loop to hold the results
    var eventArray = [];
    // use jQuery to load the XML object and 'find' 
      $(d).find('cita').each(function(i){

        var $eventEl  = $(this);

        var eventObj  = {

                   id    : $eventEl.attr('id'),
                   start    : $eventEl.find('start').text(),
                   end    : $eventEl.find('end').text(),
                   title    : $eventEl.find('title').text(),
                   vez    : $eventEl.find('vez').text(),
                   body    : $eventEl.find('body').text()
           };



           // Push the objects into the eventArray;
           eventArray.push(eventObj);

          
           //events = events + '{"id":"' + eventArray[i].id + '","start":"' + eventArray[i].start + '", "end": "' + eventArray[i].end + '", "title":"' + eventArray[i].title + '", "vez":"' + eventArray[i].vez + '"},';             
      });
      rawList = eventArray;
    });

    /***************************************************************************************************************************/

/*
   
    $.ajax({
                  type:     'GET',
                  url:      'cita/getcitas.jsp',
                  datatype: 'text',
                  data:     'doctor=' + doctorField.val() + '&clinica=' + idclinicaField.val(),
                  success:  function(msg) {                            
                                var eventArray = [];
                                $(msg).find('cita').each(function(i){                              
                                    var $eventEl  = $(this);
                                    var eventObj  = {

                                               id    : $eventEl.find('id').text(),
                                               start    : $eventEl.find('start').text(),
                                               end    : $eventEl.find('end').text(),
                                               title    : $eventEl.find('title').text(),
                                               vez    : $eventEl.find('vez').text(),
                                               body    : $eventEl.find('otro').text(),
                                               medio   : $eventEl.find('medio').text(),
                                               mediodos   : $eventEl.find('mediodos').text(),
                                               descuento   : $eventEl.find('descuento').text()
                                       };

                                       // Push the objects into the eventArray;
                                       eventArray.push(eventObj);                                                               
                                  });
                              rawList = eventArray;
                          } 
                });


*/


   $calendar.weekCalendar({
      timeslotsPerHour : 1.5,
      allowCalEventOverlap : true,
      overlapEventsSeparate: true,
      firstDayOfWeek : 1,
      businessHours :{start: 7, end: 18, limitDisplay: true},
      daysToShow : 6,
      height : function($calendar) {
         return $(window).height() - $("h1").outerHeight() - 1;
      },
      eventRender : function(calEvent, $event) {
          
         
          
         if (calEvent.end.getTime() < new Date().getTime()) {
            $event.css("backgroundColor", "#aaa");
            $event.find(".wc-time").css({
               "backgroundColor" : "#999",
               "border" : "1px solid #888"
            });
         }else if (calEvent.vez ==1 || calEvent.vez ==2){
            $event.css("backgroundColor", "#71B1FB");
            $event.find(".wc-time").css({
               "backgroundColor" : "#4B82C1",
               "border" : "1px solid #4B82C1"
            });
         }else if (calEvent.vez ==3 || calEvent.vez ==4){
            $event.css("backgroundColor", "#15D361");
            $event.find(".wc-time").css({
               "backgroundColor" : "#1BA150",
               "border" : "1px solid #1BA150"
            });
         }else if (calEvent.vez ==5){
            $event.css("backgroundColor", "#FF9A0C");
            $event.find(".wc-time").css({
               "backgroundColor" : "#BF7917",
               "border" : "1px solid #BF7917"
            });
         }else if (calEvent.vez ==6){
            $event.css("backgroundColor", "#77ABA4");
            $event.find(".wc-time").css({
               "backgroundColor" : "#0DA793",
               "border" : "1px solid #0DA793"
            });
         }
         
      },
      /*draggable : function(calEvent, $event) {
         return calEvent.readOnly != true;
      },*/
      resizable : function(calEvent, $event) {
         return calEvent.readOnly != true;
      },
      eventNew : function(calEvent, $event) {

         var year = new Date().getFullYear();
         var month = new Date().getMonth();
         var day = new Date().getDate();

         var fechajson = new Date(year, month, day, 13, 30);

         var $dialogContent = $("#event_edit_container");
         resetForm($dialogContent);
         var startField = $dialogContent.find("select[name='start']").val(calEvent.start);
         var idField = $dialogContent.find("input[name='id']").val(calEvent.id);
         var endField = $dialogContent.find("select[name='end']").val(calEvent.end);
         var titleField = $dialogContent.find("input[name='title']");
         
         var $datospaciente = $("#datos1");
         
         var nombrepaciente = $datospaciente.find("input[id='p_cnombre']").val();
         var apaternopaciente = $datospaciente.find("input[id='p_capaterno']").val();
         var amaternopaciente = $datospaciente.find("input[id='p_camaterno']").val();
         
         
         
         $('span#nompaciente').html(nombrepaciente + " " + apaternopaciente + " " + amaternopaciente);
        
         //var vezField = $dialogContent.find("input[name='vez']");
         var vezField = $dialogContent.find("select[name='vez']");
         var bodyField = $dialogContent.find("textarea[name='body']");
         
         //GENERAR CLAVE DE 
         var nombredoc = $("#idDoctor option:selected").text();
        var nomdividido = nombredoc.split(" ");
         var nom = nomdividido[0];
         var apaterno  = nomdividido[1];
         nom = nom.substr(0,1);
         apaterno = apaterno.substr(0,1);                
         var fecha = calEvent.start.toString();               
        var mes = fecha.slice(4,7);                      
        var dia = fecha.slice(8,10);          
        var anio = fecha.slice(11,15);        
        var hora = fecha.slice(16,21);      
        
        //quitamos : a la hora
        
        var horadividida = hora.split(":");
         var horas = horadividida[0];
         var minutos  = horadividida[1];
        
        hora = horas + '' + minutos;
        
        
        
        
         var clavecita = nom + apaterno + dia + mes + anio + hora;
         var bodyField = $dialogContent.find("textarea[name='body']").val(clavecita);        
         
         
         
         var medioField = $dialogContent.find("select[name='idMedio']");
         var mediodosField = $dialogContent.find("select[name='idMediodos']");
         
         
         //$dialogContent.find("input").val("");
         //$dialogContent.find("input[name='n_descuento']").text("0");
         $dialogContent.find("input[name='n_descuento']").val("0");
         
         var descuentoField = $dialogContent.find("input[name='n_descuento']");

         $dialogContent.dialog({
            modal: true,
            title: "Agendar Cita",
            close: function() {
               $dialogContent.dialog("destroy");
               $dialogContent.hide();
               $('#calendar').weekCalendar("removeUnsavedEvents");
            },
            buttons: {
               guardar : function() {
                  calEvent.id = id;
                  id++;
                  calEvent.start = new Date(startField.val());
                  calEvent.end = new Date(endField.val());
                  calEvent.title = titleField.val();
                  calEvent.vez = vezField.val();
                  calEvent.body = bodyField.val();
                  calEvent.medio = medioField.val();
                  calEvent.mediodos = mediodosField.val();
                  calEvent.descuento = descuentoField.val();                 
                  $calendar.weekCalendar("removeUnsavedEvents");
                  $calendar.weekCalendar("updateEvent", calEvent);
                  $dialogContent.dialog("close");
                  //      ALTA CITA
                  altacita(calEvent);
               },
               cerrar : function() {
                  $dialogContent.dialog("close");
               }
            }
         }).show();
          $dialogContent.find("select[name='start']").empty();
          $dialogContent.find("select[name='end']").empty();
          $dialogContent.find(".date_holder").text($calendar.weekCalendar("formatDate", calEvent.start));
          setupStartAndEndTimeFields(startField, endField, calEvent, $calendar.weekCalendar("getTimeslotTimes", calEvent.start));
      },
      eventDrop : function(calEvent, $event) {
      },
      eventResize : function(calEvent, $event) {
      },
      eventClick : function(calEvent, $event) {
         if (calEvent.readOnly) {
            return;
         }
         //var str_x = leerxml();
         var year = new Date().getFullYear();
         var month = new Date().getMonth();
         var day = new Date().getDate();

         var fechajson = new Date(year, month, day, 13, 30);
         var $dialogContent = $("#event_edit_container");
         resetForm($dialogContent);
         var startField = $dialogContent.find("select[name='start']").val(calEvent.start);
         var idField = $dialogContent.find("input[name='id']").val(calEvent.id);
         var endField = $dialogContent.find("select[name='end']").val(calEvent.end);
         var titleField = $dialogContent.find("input[name='title']").val(calEvent.title);
         var pacientenombre = calEvent.title.toString().slice(16,calEvent.title.toString().length);         
         $('span#nompaciente').html(pacientenombre);
         //var vezField = $dialogContent.find("input[name='vez']").val(calEvent.vez);
         var vezField = $dialogContent.find("select[name='vez']").val(calEvent.vez);         
         var bodyField = $dialogContent.find("textarea[name='body']").val(calEvent.body);
         var medioField = $dialogContent.find("select[name='idMedio']").val(calEvent.medio);
         var mediodosField = $dialogContent.find("select[name='idMediodos']").val(calEvent.mediodos);
         var descuentoField = $dialogContent.find("input[name='n_descuento']").val(calEvent.descuento);
         bodyField.val(calEvent.body);
         $dialogContent.dialog({
            modal: true,
            title: "Cita - " + calEvent.title,
            close: function() {
               $dialogContent.dialog("destroy");
               $dialogContent.hide();
               $('#calendar').weekCalendar("removeUnsavedEvents");
            },
            buttons: {
              /*
               save : function() {
                  calEvent.start = new Date(startField.val());
                  calEvent.end = new Date(endField.val());
                  calEvent.title = titleField.val();
                  //calEvent.title = fechajson;
                  calEvent.body = bodyField.val();
                  calEvent.vez = vezField.val();
                  $calendar.weekCalendar("updateEvent", calEvent);
                  $dialogContent.dialog("close");
               },*/
               Cancelar : function() {
                  calEvent.id = idField.val();
                  //id++;
                  calEvent.start = new Date(startField.val());
                  calEvent.end = new Date(endField.val());
                  calEvent.title = titleField.val();
                  calEvent.vez = vezField.val();
                  calEvent.body = bodyField.val();
                  calEvent.medio = medioField.val();
                  calEvent.mediodos = mediodosField.val();
                  calEvent.descuento = descuentoField.val();
                  //      ALTA CITA
                  cancelarcita(calEvent);
                  $calendar.weekCalendar("removeEvent", calEvent.id);
                  $dialogContent.dialog("close");
               },
               cerrar : function() {
                  $dialogContent.dialog("close");
               }
            }
         }).show();
        $dialogContent.find("select[name='start']").empty();
        $dialogContent.find("select[name='end']").empty();
         var startField = $dialogContent.find("select[name='start']").val(calEvent.start);
         var endField = $dialogContent.find("select[name='end']").val(calEvent.end);
         $dialogContent.find(".date_holder").text($calendar.weekCalendar("formatDate", calEvent.start));
         setupStartAndEndTimeFields(startField, endField, calEvent, $calendar.weekCalendar("getTimeslotTimes", calEvent.start));
         $(window).resize().resize(); //fixes a bug in modal overlay size ??
      },
      eventMouseover : function(calEvent, $event) {
      },
      eventMouseout : function(calEvent, $event) {
      },
      noEvents : function() {
      },
      data : function(start, end, callback) {
          
         // alert("data ");
            setTimeout(function(){
                events = '[';
                $.each(rawList, function(index, event){           
                    events = events + '{"id":"' + event.id + '","start":"' + event.start + '", "end": "' + event.end + '", "title":"' + event.title + '", "vez":"' + event.vez  + '", "body":"' + event.body + '", "descuento":"' + event.descuento +  '", "mediodos":"' + event.mediodos + '", "medio":"' + event.medio + '"},';
                });
                events=events.substr(0,events.length -1);
                events = events + ']';
                
                callback(JSON.parse(events));

               // 

            }, 1000);            
         //callback(getEventData());         
      }
   });


        /*******************************************           ALTA CITA              ***********************************************/


       function altacita(calEvent){
          var $datos = $("#datos1");
          var idPacienteField = $datos.find("input[name='idPaciente']");
            $.ajax({
                  type:     "POST",
                  url:      "cita/agregarcita.jsp",
                  data:     'start=' + calEvent.start + '&end=' + calEvent.end + '&title=' + calEvent.title + '&vez=' + calEvent.vez + '&body=' + calEvent.body + '&doctor=' + doctorField.val() + '&clinica=' + idclinicaField.val() + '&paciente=' + idPacienteField.val() + '&medio=' + calEvent.medio + '&mediodos=' + calEvent.mediodos + '&descuento=' + calEvent.descuento,
                  success:  function(msg) {                            
                            location.reload();
                  }
                });                                
             /* AGREGAMOS EL PAGO PENDIENTE A LA TABLE tbl_ctasxcobrar               */   
                /*
             $.ajax({
                  type:     "POST",
                  url:      "ctasxcobrar/addpagoconsulta.jsp",
                  data:     'start=' + calEvent.start + '&end=' + calEvent.end + '&title=' + calEvent.title + '&vez=' + calEvent.vez + '&body=' + calEvent.body + '&doctor=' + doctorField.val() + '&clinica=' + idclinicaField.val() + '&paciente=' + idPacienteField.val() + '&medio=' + calEvent.medio + '&mediodos=' + calEvent.mediodos + '&descuento=' + calEvent.descuento,
                  success:  function(msg) {                           
                            location.reload();
                  }
                });   
                */
     }
        /*******************************************           CANCELAR CITA              ***********************************************/


       function cancelarcita(calEvent){
          var $datos = $("#datos1");
          var idPacienteField = $datos.find("input[name='idPaciente']");
            $.ajax({
                  type:     "POST",
                  url:      "cita/cancelarcita.jsp",
                  data:     'start=' + calEvent.start + '&end=' + calEvent.end + '&title=' + calEvent.title + '&vez=' + calEvent.vez + '&body=' + calEvent.body + '&doctor=' + doctorField.val() + '&clinica=' + idclinicaField.val() + '&paciente=' + idPacienteField.val() + '&medio=' + calEvent.medio + '&mediodos=' + calEvent.mediodos + '&descuento=' + calEvent.descuento + '&id=' + calEvent.id,
                  success:  function(msg) {                            
                            location.reload();
                  }
                });
             /* AGREGAMOS EL PAGO PENDIENTE A LA TABLE tbl_ctasxcobrar               */   
                /*
             $.ajax({
                  type:     "POST",
                  url:      "ctasxcobrar/addpagoconsulta.jsp",
                  data:     'start=' + calEvent.start + '&end=' + calEvent.end + '&title=' + calEvent.title + '&vez=' + calEvent.vez + '&body=' + calEvent.body + '&doctor=' + doctorField.val() + '&clinica=' + idclinicaField.val() + '&paciente=' + idPacienteField.val() + '&medio=' + calEvent.medio + '&mediodos=' + calEvent.mediodos + '&descuento=' + calEvent.descuento,
                  success:  function(msg) {
                            
                            location.reload();
                  }
                });   
                */
     }
        function altapaciente(){
          var $paciente = $("#alta_paciente");  
          var nomPacField = $paciente.find("input[name='paciente.CNombre']");
          var apaPacField = $paciente.find("input[name='paciente.CApaterno']");
          var amaPacField = $paciente.find("input[name='paciente.CAmaterno']");
          var nedadPacField = $paciente.find("input[name='paciente.NEdad']");
          var idSexoPacField = $paciente.find("select[name='paciente.idSexo']");
          var ocupPacField = $paciente.find("input[name='paciente.COcupacion']");
          var idNivEstPacField = $paciente.find("select[name='paciente.idNivelestudios']");
          var telPacField = $paciente.find("input[name='paciente.CTelefono']");
          var emailPacField = $paciente.find("input[name='paciente.CEmail']");
          var dirPacField = $paciente.find("input[name='paciente.CDireccion']");
          var idAsegPacField = $paciente.find("select[name='paciente.idAseguradora']");
          var dfecnacPacField = $paciente.find("input[name='paciente.Dfecnac']");

          
          

          
            $.ajax({
                  type:     "POST",
                  url:      "cita/agregarpaciente.jsp",
                  //data:     'start=' + calEvent.start + '&end=' + calEvent.end + '&title=' + calEvent.title + '&vez=' + calEvent.vez + '&body=' + calEvent.body + '&doctor=' + doctorField.val() + '&clinica=' + idclinicaField.val() + '&pnombre=' + nomPacField.val() + "&papaterno=" + apaPacField + "&pamaterno=" + amaPacField + '&pedad=' + nedadPacField + "&psexo=" +  idSexoPacField + "&pocupacion=" + ocupPacField +'&pnivelestudios=' + idNivEstPacField + '&ptelefono=' + telPacField + '&pemail=' + emailPacField + '&pdireccion=' + dirPacField + '&paseguradora=' + idAsegPacField + '&pfechanacimiento=' + dfecnacPacField,
                  data:     'pdoctor=' + doctorField.val() + '&pclinica=' + idclinicaField.val() + '&pnombre=' + nomPacField.val() + "&papaterno=" + apaPacField.val() + "&pamaterno=" + amaPacField.val() + '&pedad=' + nedadPacField.val() + "&psexo=" +  idSexoPacField.val() + "&pocupacion=" + ocupPacField.val() +'&pnivelestudios=' + idNivEstPacField.val() + '&ptelefono=' + telPacField.val() + '&pemail=' + emailPacField.val() + '&pdireccion=' + dirPacField.val() + '&paseguradora=' + idAsegPacField.val() + '&pfechanacimiento=' + dfecnacPacField.val(),
                  success:  function(msg) {
                            
                  }
                });
          
            
                                                    
     }
 
 

         function resetForm($dialogContent) {
            $dialogContent.find("input").val("");
            $dialogContent.find("textarea").val("");
         }




   function getEventData() {



   }


   /*
    * Sets up the start and end time fields in the calendar event
    * form for editing based on the calendar event being edited
    */
   function setupStartAndEndTimeFields($startTimeField, $endTimeField, calEvent, timeslotTimes) {

      for (var i = 0; i < timeslotTimes.length; i++) {
         var startTime = timeslotTimes[i].start;
         var endTime = timeslotTimes[i].end;
         var startSelected = "";
         if (startTime.getTime() === calEvent.start.getTime()) {
            startSelected = "selected=\"selected\"";
            $startTimeField.append("<option value=\"" + startTime + "\" " + startSelected + ">" + timeslotTimes[i].startFormatted + "</option>");
            $endTimeField.append("<option value=\"" + endTime + "\" " + endSelected + ">" + timeslotTimes[i].endFormatted + "</option>");
         }
         var endSelected = "";
         if (endTime.getTime() === calEvent.end.getTime()) {
            endSelected = "selected=\"selected\"";
         }

         /*
         $startTimeField.append("<option value=\"" + startTime + "\" " + startSelected + ">" + timeslotTimes[i].startFormatted + "</option>");
         $endTimeField.append("<option value=\"" + endTime + "\" " + endSelected + ">" + timeslotTimes[i].endFormatted + "</option>");
        */
      }
      $endTimeOptions = $endTimeField.find("option");
      $startTimeField.trigger("change");
   }

   var $endTimeField = $("select[name='end']");
   var $endTimeOptions = $endTimeField.find("option");

   //reduces the end time options to be only after the start time options.
   $("select[name='start']").change(function() {
      
      var startTime = $(this).find(":selected").val();
      

      //GENERAR CLAVE DE 
      var nombredoc = $("#idDoctor option:selected").text();
        var nomdividido = nombredoc.split(" ");
         var nom = nomdividido[0];
         var apaterno  = nomdividido[1];
         nom = nom.substr(0,1);
         apaterno = apaterno.substr(0,1);                
         var fecha = startTime.toString();               
        var mes = fecha.slice(4,7);                      
        var dia = fecha.slice(8,10);          
        var anio = fecha.slice(11,15);        
        var hora = fecha.slice(16,21);          
        
        
        //quitamos : a la hora
        
        var horadividida = hora.split(":");
         var horas = horadividida[0];
         var minutos  = horadividida[1];
        
        hora = horas + '' + minutos;
        
         var clavecita = nom + apaterno + dia + mes + anio + hora;
          var $dialogContent = $("#event_edit_container");
         var bodyField = $dialogContent.find("textarea[name='body']").val(clavecita);       


      var currentEndTime = $endTimeField.find("option:selected").val();
      $endTimeField.html(
            $endTimeOptions.filter(function() {
               return startTime < $(this).val();
            })
            );

      var endTimeSelected = false;
      $endTimeField.find("option").each(function() {
         if ($(this).val() === currentEndTime) {
            $(this).attr("selected", "selected");
            endTimeSelected = true;
            return false;
         }
      });

      if (!endTimeSelected) {
         //automatically select an end date 2 slots away.
         $endTimeField.find("option:eq(1)").attr("selected", "selected");
      }

   });


   var $about = $("#about");

   $("#about_button").click(function() {
      $about.dialog({
         title: "Clinica",
         width: 600,
         close: function() {
            $about.dialog("destroy");
            $about.hide();
         },
         buttons: {
            close : function() {
               $about.dialog("close");
            }
         }
      }).show();
   });


   //Ventana Paciente
   var $paciente = $("#alta_paciente");

   $("#paciente_button").click(function() {
      $paciente.dialog({
         title: "Alta Pciente",
         width: 600,
         close: function() {
            $paciente.dialog("destroy");
            $paciente.hide();
         },
         buttons: {
            save : function() {
                  //guardamos al paciente
                  altapaciente();
                  //guardamos la cita con todo y paciente
                  //altacita(calEvent);

                  //lo guardamos en el calendario
                  //$calendar.weekCalendar("updateEvent", calEvent);
                  $paciente.dialog("close");
               },
            close : function() {
               $paciente.dialog("close");
            }
         }
      }).show();
   });
});