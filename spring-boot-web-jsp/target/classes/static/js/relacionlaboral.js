/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


            $(document).ready(function () {    
                
                
                $('#example').DataTable({
                    dom: 'Bfrtip',
                    buttons: [
                        'copyHtml5',
                        'excelHtml5',
                        'csvHtml5',
                        'pdfHtml5'
                    ]
                });
    
    
                if(typeof readCookie('uocookie') !== "undefined")
                    $("#uoNUOrganizativaPk").val(readCookie('uocookie')).change();

                if(typeof readCookie('divcookie') !== "undefined")
                    $("#intIdDivision").val(readCookie('divcookie')).change();

                if(typeof readCookie('subdivcookie') !== "undefined")
                    $("#intIdSubdivision").val(readCookie('subdivcookie')).change();


                $("#uoNUOrganizativaPk").change(function(){
                    createCookie('uocookie',$("#uoNUOrganizativaPk").val(),7);
                });

                $("#intIdDivision").change(function(){
                    createCookie('divcookie',$("#intIdDivision").val(),7);
                });

                $("#intIdSubdivision").change(function(){
                    createCookie('subdivcookie',$("#intIdSubdivision").val(),7);
                });



                setmenu("Perfiles");
                
                
                
            
                //$("#perfil").click(function(){  
                //});
                
                $(".icon-calendar").click(function(){
                    $("#date_range1").focus();
                });

                
                
                $("#definir").click(function(){
                   console.log("Definir relación laboral"); 
                   $("input[name='perfil']").each(function( index ) {
                            if($(this).val() == "JEFE"){
                                console.log("Lo que hay en td " + $(this).parent().text());
                                
                                var v_id_empleado = $(this).closest('tr').children().first().text();
                                console.log(v_id_empleado);
                                
                                
                                var request = $.ajax({
                                type: 'POST', url: 'DefinirPerfil.action',
                                datatype: 'html',
                                data: 'p_id_empleado=' + v_id_empleado,
                                success: function (msg) {
                                    //alert(msg);
                                    //$("#divtabla").html(msg);
                                }
                                });
                                request.done(function (msg) {
                                    //$("#divtabla").html(msg);
                                    alert("Perfil Aplicado!!");
                                });
                                request.fail(function (jqXHR, textStatus) {
                                    alert("Request failed: " + textStatus);
                                });
                                
                                /*
                                $(this).closest('tr').children().each(function(){ 
                                    console.log($(this).text());
                                });
                                */
                            }
                   });
                });
                
                $("input[name='perfil']").click(function(){
                        $("input[name='perfil']").each(function( index ) {
                            $(this).val("SUBORDINADO");
                            $(this).next().text('Subordinado');
                        });
                        $(this).val("JEFE");
                        if(this.checked){
                            $(this).next().text('Jefe');
                        }
                        
                        
                        
                        
                    //$("input[name='perfil'] span").text("Jefe");
                    //$(this).find("span").text("Jefe");
                    //$(this).parent().html($(this).parent().html().replace("Subordinado","Jefe"));
                    
/*                    
        
                    console.log($(this).val());

                    $(this).parent().html($(this).parent().html().replace("Subordinado","Jefe"));
                    $(this).val("JEFE");
                    //$(this).attr('checked', true);
                    console.log("Ahora" + $(this).val());
*/

        /* 
                    $( "td" ).each(function( index ) {
                        //$(this).val('ss');
                          //$(this).html().replace("Jefe", "Subordinado");
                          
                          if($(this).text() == 'Jefe'){
                            console.log(" lo que contiene el td " + $(this).text());
                            //$(this).html('<input name="perfil" type="radio" value="SUBORDINADO" />Subordinado');
                            $(this).text().replace("Jefe","Subordinado")
                          }else if ($(this).text() == 'Subordinado'){
                            console.log(" lo que contiene el td " + $(this).text());
                          }
                    });*/
        
                    /*$("input[name='perfil']").each(function( index ) {
                        
                        
                        if($(this).is(':checked')){
                            console.log(index + $(this).val() + " is cheched ");
                            console.log($(this).parent().text());
                            //$(this).val('JEFE');
                            //$(this).parent().html('<input name="perfil" type="radio" checked="true" value="JEFE" />Jefe');
                            $(this).parent().html($(this).parent().html().replace("Jefe","Subordinado"));
                            $(this).val('SUBORDINADO');
                            
                        }else{
                            console.log($(this).val());
                        }
                          //$(this).val('Subordinado');
                      });*/
                        });
                        $("#btnconsultar").click(function () {                                                
                            var p_uo = $("#uoNUOrganizativaPk").val();
                            var p_division = $("#intIdDivision").val();
                            var p_subdivision = $("#intIdSubdivision").val();   
                            console.log("btnconsultar uo = " + p_uo + " div = " + p_division + " Subdiv = " + p_subdivision);
                            var request = $.ajax({
                                type: 'POST', url: 'AjaxListarRelacionLaboral.action',
                                datatype: 'html',
                                data: 'p_uo=' + p_uo + '&p_division=' + p_division + '&p_subdivision=' + p_subdivision,
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

                        });      
            });