/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */





$(document).ready(function () {

    if (typeof readCookie('daterangecookie') !== "undefined")
        $("#date_range1").val(readCookie('daterangecookie'));

    if (typeof readCookie('uocookie') !== "undefined")
        $("#uoNUOrganizativaPk").val(readCookie('uocookie')).change();

    if (typeof readCookie('divcookie') !== "undefined")
        $("#intIdDivision").val(readCookie('divcookie')).change();

    if (typeof readCookie('subdivcookie') !== "undefined")
        $("#intIdSubdivision").val(readCookie('subdivcookie')).change();

    if (typeof readCookie('gpocookie') !== "undefined")
        $("#intIdGrupo").val(readCookie('gpocookie')).change();
    
    if (typeof readCookie('areacookie') !== "undefined")
        $("#intIdArea").val(readCookie('areacookie')).change();


    $("#uoNUOrganizativaPk").on('click change', function () {
        createCookie('uocookie', $("#uoNUOrganizativaPk").val(), 7);

        var uo = $("#uoNUOrganizativaPk").val();
        console.log("uo = " + uo);

        $.getJSON("ajaxFillDivisiones", {
            uo: uo
        }).done(function (jsonResponse) {
            //$('#intIdDivision').empty();                                                 

            var select = $('#intIdDivision');
            select.find('option').remove();

            $('#intIdSubdivision').find('option').remove();
            $('#intIdGrupo').find('option').remove();
            $('#intIdArea').find('option').remove();


            $.each(jsonResponse.stateMap, function (key, value) {
                $('<option>').val(key).text(value).appendTo(select);
            });
        }).fail(function (jqXHR, textStatus, errorThrown) {
            if (console && console.log) {
                console.log("Algo ha fallado: " + textStatus);
            }
        });
    });

    $("#intIdDivision").on('click change', function () {
        createCookie('divcookie', $("#intIdDivision").val(), 7);
        var uo = $("#uoNUOrganizativaPk").val();
        console.log("uo = " + uo);
        var div = $("#intIdDivision").val();
        console.log("div = " + div);
        $.getJSON("ajaxFillSubDivisiones", {
            uo: uo,
            div: div
        }).done(function (jsonResponse) {

            var select = $('#intIdSubdivision');
            select.find('option').remove();

            $('#intIdGrupo').find('option').remove();
            $('#intIdArea').find('option').remove();
            $.each(jsonResponse.stateMap, function (key, value) {
                $('<option>').val(key).text(value).appendTo(select);
            });
        }).fail(function (jqXHR, textStatus, errorThrown) {
            if (console && console.log) {
                console.log("Algo ha fallado: " + textStatus);
            }
        });
    });

    $("#intIdSubdivision").on('click change', function () {
        createCookie('subdivcookie', $("#intIdSubdivision").val(), 7);
        var uo = $("#uoNUOrganizativaPk").val();
        console.log("uo = " + uo);
        var div = $("#intIdDivision").val();
        console.log("div = " + div);
        var subdiv = $("#intIdSubdivision").val();
        console.log(" subdiv = " + subdiv);
        $.getJSON("ajaxFillGrupos", {
            uo: uo,
            div: div,
            subdiv: subdiv
        }).done(function (jsonResponse) {
            var select = $('#intIdGrupo');
            select.find('option').remove();
            $('#intIdArea').find('option').remove();
            $.each(jsonResponse.stateMap, function (key, value) {
                $('<option>').val(key).text(value).appendTo(select);
            });
        }).fail(function (jqXHR, textStatus, errorThrown) {
            if (console && console.log) {
                console.log("Algo ha fallado: " + textStatus);
            }
        });
    });

    $("#intIdGrupo").on('click change', function () {
        createCookie('gpocookie', $("#intIdGrupo").val(), 7);
        var uo = $("#uoNUOrganizativaPk").val();
        console.log("uo = " + uo);
        var div = $("#intIdDivision").val();
        console.log("div = " + div);
        var subdiv = $("#intIdSubdivision").val();
        console.log(" subdiv = " + subdiv);
        var gpo = $("#intIdGrupo").val();
        console.log(" gpo = " + gpo);


        $('#intIdArea').find('option').remove();


        $.getJSON("ajaxFillAreas", {
            uo: uo,
            div: div,
            subdiv: subdiv,
            gpo: gpo
        }).done(function (jsonResponse) {
            //$('#intIdDivision').empty();                                                 
            var select = $('#intIdArea');
            select.find('option').remove();

            $.each(jsonResponse.stateMap, function (key, value) {
                $('<option>').val(key).text(value).appendTo(select);
            });
        }).fail(function (jqXHR, textStatus, errorThrown) {
            if (console && console.log) {
                console.log("Algo ha fallado: " + textStatus);
            }
        });
    });

    $("#intIdArea").on("clic change", function(){
       createCookie('areacookie', $("#intIdArea").val(), 7);        
    });

    $("#indicadorP").on('click', function () {
        console.log(" Click en Indicador Permisos ");
    });
    $("#indicadorFI").on('click', function () {
        console.log(" Click en Indicador Faltas injustificadas ");
    });
    $("#indicadorFJ").on('click', function () {
        console.log(" Click en Indicador Faltas Justificadas ");
    });
    $("#indicadorV").on('click', function () {
        console.log(" Click en Indicador Vacaciones ");
    });
    $("#indicadorRJ").on('click', function () {
        console.log(" Click en Indicador Retardos Justificadas ");
    });
    $("#indicadorRI").on('click', function () {
        console.log(" Click en Indicador Retardos Injustificadas ");
    });
    $("#indicadorI").on('click', function () {
        console.log(" Click en Indicador Incapacidades ");
    });
    $("#indicadorHFO").on('click', function () {
        console.log(" Click en Indicador Horas Fuera Oficina ");
    });



    setmenu("Dashboard");
    //$('#mainnav').html('<ul><li class="active"><span class="current-arrow"></span><a id="admon" href="admon"> <div class="icon"> <span class="fs1" aria-hidden="true" data-icon="&#xe0c2;"></span> </div> Dashboard </a> </li><br><li><a href="BancoHoras"> <div class="icon"> <span class="fs1" aria-hidden="true" data-icon="&#xe02e;"></span> </div> Banco de Horas </a> </li> <!--br> <li> <span class=""></span> <a id="comparativohras" href="ComparativoHras"> <div class="icon"> <span class="fs1" aria-hidden="true" data-icon="&#xe047;"></span> </div> Comparativo Horas </a> </li--> <br> <li> <a id="plandehorario" href="ListarInicioPlanhorario"> <div class="icon"> <span class="fs1" aria-hidden="true" data-icon="&#xe053;"></span> </div> Plan de horario </a> </li> <br> <!--li> <a id="acumuladohrs" href="AcumuladoHras"> <div class="icon"> <span class="fs1" aria-hidden="true" data-icon="&#xe0b8;"></span> </div> Acumulado de horas </a> </li> <br--> <li> <a href="ListarInicioIncidencia"> <div class="icon"> <span class="fs1" aria-hidden="true" data-icon="&#xe053;"></span> </div> Incidencias </a> </li> <br> <li> <a href="FaltasRetardos"> <div class="icon"> <span class="fs1" aria-hidden="true" data-icon="&#xe1cf;"></span> </div> Faltas y Retardos </a> </li> <br> <li> <span class=""></span> <a href="ListarInicioTiempoxtiempo"> <div class="icon"> <span class="fs1" aria-hidden="true" data-icon="&#xe154;"></span> </div> Tiempo por tiempo </a> </li> <br> <li> <span class=""></span> <a href="ListarInicioAccesosCorrectos"> <div class="icon"> <span class="fs1" aria-hidden="true" data-icon="&#xe0f4;"></span> </div> Fuera de linea </a> </li> <br> <li> <span class=""></span> <a href="ListarInicioRelacionLaboral"> <div class="icon"> <span class="fs1" aria-hidden="true" data-icon="&#xe0f4;"></span> </div> Relaci&oacute;n Laboral </a> </li> <br> <li> <span class=""></span> <a href="CargaIncidenciasAction"> <div class="icon"><span class="fs1" aria-hidden="true" data-icon="&#xe0f4;"></span> </div> Carga de Incidencias </a></li><br> <li> <span class=""></span> <a href="SuspensionesAction"> <div class="icon"><span class="fs1" aria-hidden="true" data-icon="&#xe0f4;"></span> </div> Suspensiones </a></li></ul>');
    dashboard();
    $("#btnconsultar").click(function () {
        if ($("#date_range1").val().length == 23) {

            var p_uo = $("#uoNUOrganizativaPk").val();
            var p_division = $("#intIdDivision").val();
            var p_subdivision = $("#intIdSubdivision").val();
            var p_rango_fecha = $("#date_range1").val();

            if ($("#date_range1").val().length != 23) {
                p_rango_fecha = '2016/12/01 - 2016/12/31';
            } else {
                p_rango_fecha = $("#date_range1").val();
            }
            dashboardGraph(p_uo, p_division, p_subdivision, p_rango_fecha);
            createCookie('daterangecookie', p_rango_fecha, 7);
            $.getJSON('AjaxHorasTotalesUDS', {
                Rango_Fechas: p_rango_fecha,
                intuo: p_uo,
                intdiv: p_division,
                intsubdiv: p_subdivision
            }, function (jsonResponse) {
                $("#faltasjustificadas").text(jsonResponse.intFaltasJustificadas);
                //console.log(" Faltas Justificadas = " + jsonResponse.intFaltasJustificadas);
                $("#faltasinjustificadas").text(jsonResponse.intFaltasInjustificadas);
                //console.log(" Faltas Injustificadas =  " + jsonResponse.intFaltasInjustificadas);
                $("#retardosjustificados").text(jsonResponse.intRetardosJustificados);
                //console.log(" RetardosJustificados = " + jsonResponse.intRetardosJustificados);
                $("#retardosinjustificados").text(jsonResponse.intRetardosInjustificados);
                //console.log(" Retardos Injustificados  " + jsonResponse.intRetardosInjustificados);
                $("#horastrabajadas").text(jsonResponse.intHorasTrabajadas);
                //console.log(" Horas Trabajadas " + jsonResponse.intHorasTrabajadas);
                $("#horasadicionales").text(jsonResponse.intHorasAdicionales);
                //console.log(" Horas Adicionales " + jsonResponse.intHorasAdicionales);
                $("#horasadeudadas").text(jsonResponse.intHorasAdeudadas);
                //console.log(" Horas Adeudadas " + jsonResponse.intHorasAdeudadas);
                $("#vacaciones").text(jsonResponse.intVacaciones);
                //console.log(" Vacaciones = " + jsonResponse.intVacaciones);
                $("#incapacidades").text(jsonResponse.intIncapacidades);
                //console.log("Incapacidades = " + jsonResponse.intIncapacidades);
                $("#horasplaneadas").text(jsonResponse.intHorasPlaneadas);
                //console.log(" Horas Planeadas = " + jsonResponse.intHorasPlaneadas);
                $("#horasfueraoficina").text(jsonResponse.intHorasFueraOficina);
                //console.log(" Horas Fuera de Oficina = " + jsonResponse.intHorasFueraOficina);
                $("#permisos").text(jsonResponse.intPermisos);
                //console.log(" Permisos = " + jsonResponse.intPermisos);
            });
        } else {
            alert("Formado te Fechas Erroneo !!");
        }
    });
    $("#btnconsultarAll").click(function () {
        if ($("#date_range1").val().length == 23) {
            dashboard();
            var p_rango_fecha = "";
            if ($("#date_range1").val() == null) {
                p_rango_fecha = '2016/12/01 - 2016/12/31';
            } else {
                p_rango_fecha = $("#date_range1").val();
            }
            if ($("#date_range1").val().length != 23) {
                p_rango_fecha = '2016/12/01 - 2016/12/31';
            } else {
                p_rango_fecha = $("#date_range1").val();
            }

            createCookie('daterangecookie', p_rango_fecha, 7);
            //console.log(" create cookie " +  readCookie('daterangecookie'));
          
            $('#overlay').css('display', 'block');
            
            $.getJSON('AjaxHorasTotales', {
                Rango_Fechas: p_rango_fecha
            }, function (jsonResponse) {
                $('#overlay').css('display', 'none');
                $("#faltasjustificadas").text(jsonResponse.intFaltasJustificadas);
                //console.log(jsonResponse.intFaltasJustificadas);
                $("#faltasinjustificadas").text(jsonResponse.intFaltasInjustificadas);
                //console.log(jsonResponse.intFaltasInjustificadas);
                $("#retardosjustificados").text(jsonResponse.intRetardosJustificados);
                //console.log(jsonResponse.intRetardosJustificados);
                $("#retardosinjustificados").text(jsonResponse.intRetardosInjustificados);
                //console.log(jsonResponse.intRetardosInjustificados);
                $("#horastrabajadas").text(parseFloat(Math.round(jsonResponse.intHorasTrabajadas) / 60).toFixed(2));
                //console.log(jsonResponse.intHorasTrabajadas);
                $("#horasadicionales").text(jsonResponse.intHorasAdicionales);
                //console.log(jsonResponse.intHorasAdicionales);
                $("#horasadeudadas").text(jsonResponse.intHorasAdeudadas);
                //console.log(jsonResponse.intHorasAdeudadas);
                $("#vacaciones").text(jsonResponse.intVacaciones);
                //console.log(jsonResponse.intVacaciones);
                $("#incapacidades").text(jsonResponse.intIncapacidades);
                //console.log(jsonResponse.intIncapacidades);
                $("#horasplaneadas").text(jsonResponse.intHorasPlaneadas);
                //console.log(jsonResponse.intHorasPlaneadas);
                $("#horasfueraoficina").text(parseFloat(Math.round(jsonResponse.intHorasFueraOficina) / 60).toFixed(2));
                //console.log(jsonResponse.intHorasFueraOficina);
                $("#permisos").text(jsonResponse.intPermisos);
                //console.log(jsonResponse.intPermisos);
                

            });
        } else {
            alert("Formado te Fechas Erroneo !!");
        }
        
    });
    $(".icon-calendar").click(function () {
        $("#date_range1").focus();
    });

    //$(window).load(function() {
    console.log("window load event");
    $('#overlay').addClass('hide');

    //});

});
