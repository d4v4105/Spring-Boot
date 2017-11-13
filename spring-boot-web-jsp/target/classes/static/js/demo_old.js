$(document).ready(function() {


    $( "#Accordion1" ).accordion({
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
                 var url = "paciente/combopacientes.jsp?clinica=" + $("#id_clinica").val();;

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

                                               id    : $eventEl.find('id'),
                                               start    : $eventEl.find('start').text(),
                                               end    : $eventEl.find('end').text(),
                                               title    : $eventEl.find('title').text(),
                                               vez    : $eventEl.find('vez').text(),
                                               body    : $eventEl.find('otro').text(),
                                               medio   : $eventEl.find('meido').text()
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


    //alert("id Clinica " + idclinicaField.val() + " Id Doctor " + doctorField.val());

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

           alert(eventArray[i].start);
           //events = events + '{"id":"' + eventArray[i].id + '","start":"' + eventArray[i].start + '", "end": "' + eventArray[i].end + '", "title":"' + eventArray[i].title + '", "vez":"' + eventArray[i].vez + '"},';             
      });
      rawList = eventArray;
    });

    /***************************************************************************************************************************/


   // alert("antes del ajax");
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

                                               id    : $eventEl.find('id'),
                                               start    : $eventEl.find('start').text(),
                                               end    : $eventEl.find('end').text(),
                                               title    : $eventEl.find('title').text(),
                                               vez    : $eventEl.find('vez').text(),
                                               body    : $eventEl.find('otro').text(),
                                               medio   : $eventEl.find('medio').text()
                                       };

                                       // Push the objects into the eventArray;
                                       eventArray.push(eventObj);                                                               
                                  });
                              rawList = eventArray;
                          } 
                });





   $calendar.weekCalendar({
      timeslotsPerHour : 1.5,
      allowCalEventOverlap : true,
      overlapEventsSeparate: true,
      firstDayOfWeek : 1,
      businessHours :{start: 7, end: 18, limitDisplay: true },
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
         }
      },
      /*draggable : function(calEvent, $event) {
         return calEvent.readOnly != true;
      },*/
      resizable : function(calEvent, $event) {
         return calEvent.readOnly != true;
      },
      eventNew : function(calEvent, $event) {

         //alert("event new");
         var year = new Date().getFullYear();
         var month = new Date().getMonth();
         var day = new Date().getDate();

         var fechajson = new Date(year, month, day, 13, 30);

         var $dialogContent = $("#event_edit_container");
         resetForm($dialogContent);
         var startField = $dialogContent.find("select[name='start']").val(calEvent.start);
         var endField = $dialogContent.find("select[name='end']").val(calEvent.end);
         var titleField = $dialogContent.find("input[name='title']");
         //var vezField = $dialogContent.find("input[name='vez']");
         var vezField = $dialogContent.find("select[name='vez']");
         var bodyField = $dialogContent.find("textarea[name='body']");
         var medioField = $dialogContent.find("select[name='idMedio']");

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
                  //calEvent.title = fechajson;

                  //alert("EVENT NEW justo aqui guardaríamos Por primera vez");


                  

                  
                  //alert(leerxml());


                  //calEvent.body = bodyField.val();
                  //calEvent.vez = vezField.val();
                  //alert("Antes de altacita()");
                  
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


         //alert("event click");

         //var str_x = leerxml();

         //alert(str_x);

         var year = new Date().getFullYear();
         var month = new Date().getMonth();
         var day = new Date().getDate();

         var fechajson = new Date(year, month, day, 13, 30);

         var $dialogContent = $("#event_edit_container");
         resetForm($dialogContent);
         var startField = $dialogContent.find("select[name='start']").val(calEvent.start);
         var endField = $dialogContent.find("select[name='end']").val(calEvent.end);
         var titleField = $dialogContent.find("input[name='title']").val(calEvent.title);

         //var vezField = $dialogContent.find("input[name='vez']").val(calEvent.vez);
         var vezField = $dialogContent.find("select[name='vez']").val(calEvent.vez);
         
         var bodyField = $dialogContent.find("textarea[name='body']").val(calEvent.body);
         var medioField = $dialogContent.find("select[name='medio']").val(calEvent.medio);
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

                //alert("EVENT NEW justo aqui guardaríamos Por primera vez");

                  calEvent.start = new Date(startField.val());
                  calEvent.end = new Date(endField.val());
                  calEvent.title = titleField.val();
                  //calEvent.title = fechajson;
                  calEvent.body = bodyField.val();
                  calEvent.vez = vezField.val();

                  //alert("EVENT CLICK justo aqui actualizamos");
                  
                  //alert(leerxml());

                  $calendar.weekCalendar("updateEvent", calEvent);
                  $dialogContent.dialog("close");
               },
               "delete" : function() {
                  $calendar.weekCalendar("removeEvent", calEvent.id);
                  $dialogContent.dialog("close");
               },*/
               cerrar : function() {
                  $dialogContent.dialog("close");
               }
            }
         }).show();

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

            

            setTimeout(function(){

                events = '[';
                $.each(rawList, function(index, event){           
                    events = events + '{"id":"' + event.id + '","start":"' + event.start + '", "end": "' + event.end + '", "title":"' + event.title + '", "vez":"' + event.vez  + '", "body":"' + event.body +   '", "medio":"' + event.medio + '"},';
                });
                events=events.substr(0,events.length -1);
                events = events + ']';
                
                callback(JSON.parse(events));

            }, 1000);            

         //callback(getEventData());
         
      }
   });


        /*******************************************           ALTA CITA              ***********************************************/


       function altacita(calEvent){
            

          
          var $datos = $("#datos1");
          
          //alert("llegamos a altacita");

          var idPacienteField = $datos.find("input[name='idPaciente']");

          


          //alert("id Clinica " + idclinicaField.val() + " Id Doctor " + doctorField.val() + " Id Paciente = " + idPacienteField.val());
                  //alert(calEvent.start);
            
            
            //var url = "cita/agregarcita.jsp?start=" + calEvent.start + ",end=" + calEvent.end + ",title" + calEvent.title;
            //var startparam=calEvent.start;
            //var endtparam=calEvent.end;
                  /*
                  $.get('cita/agregarcita.jsp',{start:startparam},function(responseText) { 
                        //$('#welcometext').text(responseText);     
                        alert(responseText);    
                    });

*/


            $.ajax({
                  type:     "POST",
                  url:      "cita/agregarcita.jsp",
                  data:     'start=' + calEvent.start + '&end=' + calEvent.end + '&title=' + calEvent.title + '&vez=' + calEvent.vez + '&body=' + calEvent.body + '&doctor=' + doctorField.val() + '&clinica=' + idclinicaField.val() + '&paciente=' + idPacienteField.val() + '&medio=' + calEvent.medio,
                  success:  function(msg) {
                            //alert(msg);
                            location.reload();
                  }
                });

            
                                                    
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

          
          //alert('doctor=' + doctorField.val() + '&clinica=' + idclinicaField.val() + '&pnombre=' + nomPacField.val() + "&papaterno=" + apaPacField.val() + "&pamaterno=" + amaPacField.val() + '&pedad=' + nedadPacField.val() + "&psexo=" +  idSexoPacField.val() + "&pocupacion=" + ocupPacField.val() +'&pnivelestudios=' + idNivEstPacField.val() + '&ptelefono=' + telPacField.val() + '&pemail=' + emailPacField.val() + '&pdireccion=' + dirPacField.val() + '&paseguradora=' + idAsegPacField.val() + '&pfechanacimiento=' + dfecnacPacField.val());          
          

          //alert("id Clinica " + idclinicaField.val() + " Id Doctor " + doctorField.val());

          
            $.ajax({
                  type:     "POST",
                  url:      "cita/agregarpaciente.jsp",
                  //data:     'start=' + calEvent.start + '&end=' + calEvent.end + '&title=' + calEvent.title + '&vez=' + calEvent.vez + '&body=' + calEvent.body + '&doctor=' + doctorField.val() + '&clinica=' + idclinicaField.val() + '&pnombre=' + nomPacField.val() + "&papaterno=" + apaPacField + "&pamaterno=" + amaPacField + '&pedad=' + nedadPacField + "&psexo=" +  idSexoPacField + "&pocupacion=" + ocupPacField +'&pnivelestudios=' + idNivEstPacField + '&ptelefono=' + telPacField + '&pemail=' + emailPacField + '&pdireccion=' + dirPacField + '&paseguradora=' + idAsegPacField + '&pfechanacimiento=' + dfecnacPacField,
                  data:     'pdoctor=' + doctorField.val() + '&pclinica=' + idclinicaField.val() + '&pnombre=' + nomPacField.val() + "&papaterno=" + apaPacField.val() + "&pamaterno=" + amaPacField.val() + '&pedad=' + nedadPacField.val() + "&psexo=" +  idSexoPacField.val() + "&pocupacion=" + ocupPacField.val() +'&pnivelestudios=' + idNivEstPacField.val() + '&ptelefono=' + telPacField.val() + '&pemail=' + emailPacField.val() + '&pdireccion=' + dirPacField.val() + '&paseguradora=' + idAsegPacField.val() + '&pfechanacimiento=' + dfecnacPacField.val(),
                  success:  function(msg) {
                            //alert(msg);
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
         }
         var endSelected = "";
         if (endTime.getTime() === calEvent.end.getTime()) {
            endSelected = "selected=\"selected\"";
         }
         $startTimeField.append("<option value=\"" + startTime + "\" " + startSelected + ">" + timeslotTimes[i].startFormatted + "</option>");
         $endTimeField.append("<option value=\"" + endTime + "\" " + endSelected + ">" + timeslotTimes[i].endFormatted + "</option>");

      }
      $endTimeOptions = $endTimeField.find("option");
      $startTimeField.trigger("change");
   }

   var $endTimeField = $("select[name='end']");
   var $endTimeOptions = $endTimeField.find("option");

   //reduces the end time options to be only after the start time options.
   $("select[name='start']").change(function() {
      var startTime = $(this).find(":selected").val();
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