/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function llenaDatosEmpleado() {

   // console.log("llenaDatosEmpleado");

    var p_empleado = $("#intIdEmpleado").val();

   // console.log(" llenaDatosEmpleado() p_empleado = " + p_empleado);

    var request = $.ajax({
        type: 'POST',
        url: 'ajaxDatosEmpleadoHtml.action',
        datatype: 'html',
        data: 'p_empleado=' + p_empleado,
        async: true,
        success: function (msg) {
        }
    });
    request.done(function (msg) {
     //   console.log("ok con ajaxDatosEmpleadoHtml ");
     //   console.log(msg);
        $("#divEmpleado").html(msg);

    });
    request.fail(function (jqXHR, textStatus) {
        console.log("Request failed: " + textStatus);
    });
}

$(document).ready(function () {

    //console.log(" fecha cookie " + readCookie('daterangecookie') );
    
    if(typeof readCookie('daterangecookie') !== "undefined")
        $("#date_range1").val(readCookie('daterangecookie'));




    //$('#mainnav').html('<ul><li><a id="admon" href="admon"> <div class="icon"> <span class="fs1" aria-hidden="true" data-icon="&#xe0c2;"></span> </div> Dashboard </a> </li><br><li class="active"><span class="current-arrow"></span><a href="BancoHoras"> <div class="icon"> <span class="fs1" aria-hidden="true" data-icon="&#xe02e;"></span> </div> Banco de Horas </a> </li> <!--br> <li> <span class=""></span> <a id="comparativohras" href="ComparativoHras"> <div class="icon"> <span class="fs1" aria-hidden="true" data-icon="&#xe047;"></span> </div> Comparativo Horas </a> </li--> <br> <li> <a id="plandehorario" href="ListarInicioPlanhorario"> <div class="icon"> <span class="fs1" aria-hidden="true" data-icon="&#xe053;"></span> </div> Plan de horario </a> </li> <br> <!--li> <a id="acumuladohrs" href="AcumuladoHras"> <div class="icon"> <span class="fs1" aria-hidden="true" data-icon="&#xe0b8;"></span> </div> Acumulado de horas </a> </li> <br--> <li> <a href="ListarInicioIncidencia"> <div class="icon"> <span class="fs1" aria-hidden="true" data-icon="&#xe053;"></span> </div> Incidencias </a> </li> <br> <li> <a href="FaltasRetardos"> <div class="icon"> <span class="fs1" aria-hidden="true" data-icon="&#xe1cf;"></span> </div> Faltas y Retardos </a> </li> <br> <li> <span class=""></span> <a href="ListarInicioTiempoxtiempo"> <div class="icon"> <span class="fs1" aria-hidden="true" data-icon="&#xe154;"></span> </div> Tiempo por tiempo </a> </li> <br> <li> <span class=""></span> <a href="ListarInicioAccesosCorrectos"> <div class="icon"> <span class="fs1" aria-hidden="true" data-icon="&#xe0f4;"></span> </div> Fuera de linea </a> </li> <br> <li> <span class=""></span> <a href="ListarInicioRelacionLaboral"> <div class="icon"> <span class="fs1" aria-hidden="true" data-icon="&#xe0f4;"></span> </div> Relaci&oacute;n Laboral </a> </li> <br> <li> <span class=""></span> <a href="CargaIncidenciasAction"> <div class="icon"><span class="fs1" aria-hidden="true" data-icon="&#xe0f4;"></span> </div> Carga de Incidencias </a></li><br> <li> <span class=""></span> <a href="SuspensionesAction"> <div class="icon"><span class="fs1" aria-hidden="true" data-icon="&#xe0f4;"></span> </div> Suspensiones </a></li></ul>');

    setmenu("Banco de Horas");

    $('#example').DataTable({
        
        "dom": 'Blfrtip',
        "buttons": [
            'copyHtml5',
            'excelHtml5',
            'csvHtml5',
            'pdfHtml5'
        ],
         "iDisplayLength": 50
    });

    //,
         //"aLengthMenu": [[ 50, 100, 200, 300, 400, -1], [50, 100, 200, 300, 400, "All"]]

    //dashboardEmpleado();



    $("#btnconsultar").click(function () {
       // console.log($("#date_range1").val().length);
        if ($("#date_range1").val().length === 23) {
            if ($("#intIdEmpleado").val().length > 0) {
                createCookie('daterangecookie',$("#date_range1").val(),7);
                llenaDatosEmpleado();
                dashboardEmpleado();
               // console.log("Antes del Ajax ajaxGraphEmpleadoHtml ");
                var request = $.ajax({
                    type: 'POST',
                    url: 'ajaxGraphEmpleadoHtml.action',
                    datatype: 'html',
                    data: 'p_rangoFecha=' + $("#date_range1").val() + '&p_empleado=' + $("#intIdEmpleado").val(),
                    async: true
                });
                request.done(function (msg) {
                    //console.log("ok con ajaxGraphEmpleadoHtml ");
                    //console.log(msg);
                    $("#divtabla").html(msg);
                    //llenaDatosEmpleado();
                    //$("#btnconsultar").live("click", function(){ alert("yay!"); }); 
                });
                request.fail(function (jqXHR, textStatus) {
                    console.log("Request failed: " + textStatus);
                });
            } else {
                alert("Falta número de empleado a analizar");
            }

        } else {
            alert("Formado te Fechas Erroneo !!");
        }
    });
    
    $("#btnimprimir").click(function () {
        //console.log("Imprimir");
       window.print(); 
    });
    
    $(".icon-calendar").click(function(){
        $("#date_range1").focus();
    });

});
 