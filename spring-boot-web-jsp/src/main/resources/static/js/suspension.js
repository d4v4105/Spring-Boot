/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

            $(document).ready(function () {
                var tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);                                                
                setmenu("Suspensiones");
                $('#example').DataTable({
                    dom: 'Bfrtip',
                    buttons: [
                        'copyHtml5',
                        'excelHtml5',
                        'csvHtml5',
                        'pdfHtml5'
                    ]
                });

                $("#btnconsultar").click(function () {
                    if ($("#date_range1").val().length == 23) {
            
                        var p_rangoFecha = $("#date_range1").val();
                        var request = $.ajax({
                            type: 'POST', url: 'AjaxListarSuspenciones.action',
                            datatype: 'html',
                            data: 'p_rangoFecha=' + p_rangoFecha,
                            success: function (msg) {
                                //alert(msg);
                                //$("#divtabla").html(msg);
                            }
                        });
                        request.done(function (msg) {
                            $("#divtabla").html(msg);
                        });
                        request.fail(function (jqXHR, textStatus) {
                            alert("Request failed: " + textStatus);
                        });
                    } else {
                        alert("Formado te Fechas Erroneo !!");
                    }
                });
                
                $("#btnCancelar").click(function () {
                    window.history.back();
                });

                $("#guardar").click(function (e) {        
                    
                    
                    console.log(" Rango de Fecha " + $("#date_range1").val());
                    console.log(" Id DEl Empleado " + $("#idEmpleado").val());
                    
                    $.getJSON('AjaxSuspencionRepetida', {
                        date_range1 : $("#date_range1").val(),
                        empleado : $("#idEmpleado").val()
                        }, function(jsonResponse) {
                        $('#ajaxResponse').text(jsonResponse.dummyMsg);
                        //var select = $('#states');
                        //select.find('option').remove();
                        console.log(jsonResponse.toString());
                        e.preventDefault();
                        /*
                            $.each(jsonResponse.stateMap, function(key, value) {
                              $('<option>').val(key).text(value).appendTo(select);
                            });
                        */                      
                     });
                     e.preventDefault();
                });
                
                $(".icon-calendar").click(function(){
                    alert("date");
                    $("#datepicker").focus();
                });            
                $("date_range1").click(function(){
                    alert("date");
                    $("#datepicker").focus();
                });            
            });