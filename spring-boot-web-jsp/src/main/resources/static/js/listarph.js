/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function confirmBox() {
                var answer;
                answer = window.confirm("Realmente deseas borrar este Registro?");
                if (answer == true) {
                    return true;
                } else {
                    return false;
                }
}
$(document).ready(function () {

            if(typeof readCookie('daterangecookie') !== "undefined")
                $("#date_range1").val(readCookie('daterangecookie'));

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

                setmenu("Plan de horario");
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
                    //alert($("#date_range1").val().length);
                    if ($("#date_range1").val().length == 23) {

                        var p_uo = $("#uoNUOrganizativaPk").val();
                        var p_division = $("#intIdDivision").val();
                        var p_subdivision = $("#intIdSubdivision").val();
                        var p_rangoFecha = $("#date_range1").val();

                        createCookie('daterangecookie',p_rangoFecha,7);


                        var request = $.ajax({
                            type: 'POST', url: 'AjaxListarInicioPlanhorario.action',
                            datatype: 'html',
                            data: 'p_uo=' + p_uo + '&p_division=' + p_division + '&p_subdivision=' + p_subdivision + '&p_rangoFecha=' + p_rangoFecha,
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

        $("#btnEditar").click(function (event) {
            var entradalab = $("#FechaEntradaLab").val();
            var auhjourdui = $("#auhjordui").val();
            var difDias = 1;
            console.log(entradalab + " " + auhjourdui);
            var jqxhr = $.getJSON('AjaxMostrarBtnPlanHorario', {
                Hoy: auhjourdui,
                FechaPlanHorario: entradalab
            }, function (jsonResponse) {
                difDias = jsonResponse.diasdediferencia;
                console.log(jsonResponse.diasdediferencia);
            }).done(function () {
                console.log("second success");
            })
                    .fail(function () {
                        console.log("error");
                    })
                    .always(function () {
                        console.log("complete");
                    });
            jqxhr.complete(function () {
                console.log("second complete");
            });

            console.log("despues del ajax");

            alert(difDias);

            if (difDias < 1) {
                    alert("No se puede modificar plan de horario para fechas de hoy o anteriores");
                    event.preventDefault();
            }
                event.preventDefault();
        });
    
        $(".icon-calendar").click(function(){
            $("#date_range1").focus();
        });
    
});