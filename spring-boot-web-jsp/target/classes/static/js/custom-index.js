$('document').ready(function () {

    //Scrollbar
    $('#scrollbar-three').tinyscrollbar();

});

// Flot Charts
var updateInterval = 500;

$("#updateInterval").val(updateInterval).change(function () {
    var v = $(this).val();
    if (v && !isNaN(+v)) {
        updateInterval = +v;
        if (updateInterval < 1)
            updateInterval = 1;
        if (updateInterval > 2000)
            updateInterval = 2000;
        $(this).val("" + updateInterval);
    }
});

var data = [], totalPoints = 200;
function getRandomData() {
    if (data.length > 0)
        data = data.slice(1);

    // do a random walk
    while (data.length < totalPoints) {
        var prev = data.length > 0 ? data[data.length - 1] : 50;
        var y = prev + Math.random() * 10 - 5;
        if (y < 0)
            y = 0;
        if (y > 100)
            y = 100;
        data.push(y);
    }

    // zip the generated y values with the x values
    var res = [];
    for (var i = 0; i < data.length; ++i)
        res.push([i, data[i]])
    return res;
}

if ($("#serverLoad").length) {
    var options = {
        series: {shadowSize: 1},
        lines: {show: true, lineWidth: 3, fill: true, fillColor: {colors: [{opacity: 0.5}, {opacity: 0.5}]}},
        yaxis: {min: 0, max: 200, tickFormatter: function (v) {
                return v + "%";
            }},
        xaxis: {show: false},
        colors: ["#3660aa"],
        grid: {tickColor: "#f2f2f2",
            borderWidth: 0,
        },
    };
    var plot = $.plot($("#serverLoad"), [getRandomData()], options);
    function update() {
        plot.setData([getRandomData()]);
        // since the axes don't change, we don't need to call plot.setupGrid()
        plot.draw();
        setTimeout(update, updateInterval);
    }
    update();
}

if ($("#realtimechart").length) {
    var options = {
        series: {shadowSize: 1},
        lines: {lineWidth: 1, fill: true, fillColor: {colors: [{opacity: 1}, {opacity: 0.1}]}},
        yaxis: {min: 0, max: 200},
        xaxis: {show: false},
        colors: ["#3660aa"],
        grid: {tickColor: "#eeeeee",
            borderWidth: 0
        },
    };
    var plot = $.plot($("#realtimechart"), [getRandomData()], options);
    function update() {
        plot.setData([getRandomData()]);
        // since the axes don't change, we don't need to call plot.setupGrid()
        plot.draw();
        setTimeout(update, updateInterval);
    }
    update();
}


$.fn.UseTooltip = function () {
    $(this).bind("plothover", function (event, pos, item) {


        // alert("dfdsfsdf");

        if (item) {
            if (previousPoint != item.dataIndex) {
                previousPoint = item.dataIndex;

                $("#tooltip").remove();

                var x = item.datapoint[0];
                var y = item.datapoint[1];

                //console.log(x + "," + y);

                showTooltip(item.pageX, item.pageY,
                        " Día : " + x + "<br/>" + "<strong>" + y + "</strong> (" + item.series.label + ")");
            }
        }
        else {
            $("#tooltip").remove();
            previousPoint = null;
        }
    });
};



function showTooltip(x, y, contents) {
    $('<div id="tooltip">' + contents + '</div>').css({
        position: 'absolute',
        display: 'none',
        top: y + 5,
        left: x + 20,
        border: '2px solid #4572A7',
        padding: '2px',
        size: '10',
        'border-radius': '6px 6px 6px 6px',
        'background-color': '#fff',
        opacity: 0.80
    }).appendTo("body").fadeIn(200);
}


//Selection Charts



function dashboard() {

    var p_rango_fecha = "";

    if ($("#date_range1").val() === null) {
        p_rango_fecha = '2016/12/01 - 2016/12/31';
    } else {
        p_rango_fecha = $("#date_range1").val();
    }
    if ($("#date_range1").val().length !== 23) {
        p_rango_fecha = '2016/12/01 - 2016/12/31';
    } else {
        p_rango_fecha = $("#date_range1").val();
    }

  
    $.getJSON('ajaxGraphAll', {
        Rango_Fechas: p_rango_fecha
    }, function (jsonResponse) {
        var valHorasPlaneadas = "";
        var valHorasTrabajadas = "";
        var valHorasAdicionales = "";
        var valHorasAdeudadas = "";
        var valEntradas = "";
        var valSalidas = "";
        var valHorasFueraOficina = "";
        var intCount = 1;
        var intVal = 0;
        $.each(jsonResponse.stateMap, function (key, value) {
            //console.log(" key = " + key + " value =  " + value.rthNHoraPlaneada);
            valHorasPlaneadas = valHorasPlaneadas + "[" + key + "," + value.rthNHoraPlaneada + "],";
            valHorasTrabajadas = valHorasTrabajadas + "[" + key + "," + (value.rthNHoraTrabajada / 60) + "],";            
            //valHorasAdicionales = valHorasAdicionales + "[" + key + "," + (value.rthFHoraAdicional / 60) + "],";            
            
            //valHorasAdicionales = valHorasAdicionales / 30;
            //valHorasAdicionales = valHorasAdicionales / 2;            
            
            valHorasAdicionales = valHorasAdicionales + "[" + key + "," + value.rthFHoraAdicional + "],";            
            valHorasAdeudadas = valHorasAdeudadas + "[" + key + "," + value.rthNHoraAdeudada + "],";
            valHorasFueraOficina = valHorasFueraOficina + "[" + key + "," + (value.rthNHoraFueraOficina / 60) + "],";
            valEntradas = valEntradas + "[" + key + "," + value.rthNEntrada + "],";
            valSalidas = valSalidas + "[" + key + "," + value.rthNSalida + "],";
            intCount++;
        });
        valHorasPlaneadas = valHorasPlaneadas.substr(0, valHorasPlaneadas.length - 1);
        //console.log(" Valor 1" + valHorasPlaneadas);
        valHorasTrabajadas = valHorasTrabajadas.substr(0, valHorasTrabajadas.length - 1);
        //console.log(" Valor 2" + valHorasTrabajadas);
        valHorasAdicionales = valHorasAdicionales.substr(0, valHorasAdicionales.length - 1);
        //console.log(" Valor 3" + valHorasAdicionales);
        valHorasAdeudadas = valHorasAdeudadas.substr(0, valHorasAdeudadas.length - 1);
        //console.log(" Valor 4" + valHorasAdeudadas);
        valHorasFueraOficina = valHorasFueraOficina.substr(0, valHorasFueraOficina.length - 1);
        //console.log(" Valor 5" + valHorasFueraOficina);
        valEntradas = valEntradas.substr(0, valEntradas.length - 1);
        //console.log(" Valor 6" + valEntradas);
        valSalidas = valSalidas.substr(0, valSalidas.length - 1);
        //console.log(" Valor 7" + valSalidas);
        var str = "[{" +
                "label: 'Planeadas'," +
                " data: [" +
                valHorasPlaneadas
                +
                "]" +
                "}," +
                "{" +
                "label: 'Trabajadas'," +
                "data: [" +
                valHorasTrabajadas
                +
                "]" +
                "}," +
                "{" +
                "label: 'Adicionales'," +
                "data: [" +
                valHorasAdicionales
                +
                "]" +
                "}," +
                "{" +
                "label: 'Adeudadas'," +
                "data: [" +
                valHorasAdeudadas
                +
                "]" +
                "}," +
                "{" +
                "label: 'FueraOficina'," +
                "data: [" +
                valHorasFueraOficina
                +
                "]" +
                "}," +
                "{" +
                "label: 'Entradas'," +
                "data: [" +
                valEntradas
                +
                "]" +
                "}," +
                "{" +
                "label: 'Salidas'," +
                "data: [" +
                valSalidas
                +
                "]" +
                "}]";
        //var data = JSON.parse(str);
        
      
      var  data = eval('(' + str + ')');
      
//      console.log(" string armado " + str);
//      console.log(" data =" + data)

        plot = $.plot(placeholder, data, options);
    });

    var options = {
        series: {
            lines: {show: true,
                lineWidth: 2,
                fill: false,
            },
            points: {show: true,
                lineWidth: 2
            },
            shadowSize: 0
        },
        grid: {hoverable: true,
            clickable: true,
            tickColor: "#eeeeee",
            borderWidth: 0
        },
        legend: {
            noColumns: 7,
            top:-12
        },
        colors: ["#2ba7cb", "#2b4fa2", "#40b402", "#CABC13", "#FE2604", "#ACA8A8", "#050505"],
        xaxis: {ticks: 12, tickDecimals: 0},
        yaxis: {ticks: 3, tickDecimals: 0},
        selection: {
            mode: "x"
        }
    };

    //#40b402


    var placeholder = $("#selectionCharts");

    placeholder.bind("plotselected", function (event, ranges) {

        $("#selection").text(ranges.xaxis.from.toFixed(1) + " to " + ranges.xaxis.to.toFixed(1));

        var zoom = $("#zoom").attr("checked");

        if (zoom) {
            plot = $.plot(placeholder, data, $.extend(true, {}, options, {
                xaxis: {
                    min: ranges.xaxis.from,
                    max: ranges.xaxis.to
                }
            }));
        }
    });

    placeholder.bind("plotunselected", function (event) {
        $("#selection").text("");
    });

    var plot = $.plot(placeholder, data, options);

    $("#clearSelection").click(function () {
        plot.clearSelection();
    });

    $("#setSelection").click(function () {
        plot.setSelection({
            xaxis: {
                from: 1994,
                to: 1995
            }
        });
    });
    // Add the Flot version string to the footer
    $("#footer").prepend("Flot " + $.plot.version + " &ndash; ");

    $("#selectionCharts").UseTooltip();

}

function dashboardGraph(p_uo, p_division, p_subdivision, p_rangoFecha) {
    var unidadorganizativa = p_uo;
    var division = p_division;
    var subdivision = p_subdivision;

    //console.log(" UO : " + unidadorganizativa + " Division : " + division + " SubDivision : " + subdivision)

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
    $.getJSON('ajaxGraphUODivSubDiv', {
        Rango_Fechas: p_rango_fecha,
        UnidadOrganizativa: unidadorganizativa,
        Division: division,
        SubDivision: subdivision
    }, function (jsonResponse) {
        var valHorasPlaneadas = "";
        var valHorasTrabajadas = "";
        var valHorasAdicionales = "";
        var valHorasAdeudadas = "";
        var valEntradas = "";
        var valSalidas = "";
        var valHorasFueraOficina = "";

        var intCount = 1;
        $.each(jsonResponse.stateMap, function (key, value) {
          //  console.log(" key = " + key + " value =  " + value.rthNHoraPlaneada);
            valHorasPlaneadas = valHorasPlaneadas + "[" + key + "," + value.rthNHoraPlaneada + "],";
            
            
            
            valHorasTrabajadas = valHorasTrabajadas + "[" + key + "," + (value.rthNHoraTrabajada / 60) + "],";
            
            //valHorasAdicionales = valHorasAdicionales / 30;
            //valHorasAdicionales = valHorasAdicionales / 2;            
            
            
            valHorasAdicionales = valHorasAdicionales + "[" + key + "," + value.rthFHoraAdicional + "],";            
            
            
            
            //valHorasAdicionales = valHorasAdicionales + "[" + key + "," + (value.rthFHoraAdicional / 60) + "],";                        
            valHorasAdeudadas = valHorasAdeudadas + "[" + key + "," + value.rthNHoraAdeudada + "],";
            valHorasFueraOficina = valHorasFueraOficina + "[" + key + "," + (value.rthNHoraFueraOficina / 60) + "],";
            valEntradas = valEntradas + "[" + key + "," + value.rthNEntrada + "],";
            valSalidas = valSalidas + "[" + key + "," + value.rthNSalida + "],";
            intCount++;
        });

        valHorasPlaneadas = valHorasPlaneadas.substr(0, valHorasPlaneadas.length - 1);
       // console.log(" Valor 1" + valHorasPlaneadas);
        valHorasTrabajadas = valHorasTrabajadas.substr(0, valHorasTrabajadas.length - 1);
       // console.log(" Valor 2" + valHorasTrabajadas);
        valHorasAdicionales = valHorasAdicionales.substr(0, valHorasAdicionales.length - 1);
       // console.log(" Valor 3" + valHorasAdicionales);
        valHorasAdeudadas = valHorasAdeudadas.substr(0, valHorasAdeudadas.length - 1);
       // console.log(" Valor 4" + valHorasAdeudadas);
        valHorasFueraOficina = valHorasFueraOficina.substr(0, valHorasFueraOficina.length - 1);
       // console.log(" Valor 5" + valHorasFueraOficina);
        valEntradas = valEntradas.substr(0, valEntradas.length - 1);
       // console.log(" Valor 6" + valEntradas);
        valSalidas = valSalidas.substr(0, valSalidas.length - 1);
       // console.log(" Valor 7" + valSalidas);

        var str = "[{" +
                "label: 'Planeadas'," +
                " data: [" +
                valHorasPlaneadas
                +
                "]" +
                "}," +
                "{" +
                "label: 'Trabajadas'," +
                "data: [" +
                valHorasTrabajadas
                +
                "]" +
                "}," +
                "{" +
                "label: 'Adicionales'," +
                "data: [" +
                valHorasAdicionales
                +
                "]" +
                "}," +
                "{" +
                "label: 'Adeudadas'," +
                "data: [" +
                valHorasAdeudadas
                +
                "]" +
                "}," +
                "{" +
                "label: 'FueraOficina'," +
                "data: [" +
                valHorasFueraOficina
                +
                "]" +
                "}," +
                "{" +
                "label: 'Entradas'," +
                "data: [" +
                valEntradas
                +
                "]" +
                "}," +
                "{" +
                "label: 'Salidas'," +
                "data: [" +
                valSalidas
                +
                "]" +
                "}]";
        //var data = JSON.parse(str);
        var data = eval('(' + str + ')');

     //   console.log(" string armado " + str);
     //   console.log(" data =" + data)

        plot = $.plot(placeholder, data, options);
    });

    var options = {
        series: {
            lines: {show: true,
                lineWidth: 2,
                fill: false,
            },
            points: {show: true,
                lineWidth: 2
            },
            shadowSize: 0
        },
        grid: {hoverable: true,
            clickable: true,
            tickColor: "#eeeeee",
            borderWidth: 0
        },
        legend: {
            noColumns: 7,
            top:-12
        },
        colors: ["#2ba7cb", "#2b4fa2", "#40b402", "#CABC13", "#FE2604", "#ACA8A8", "#050505"],
        xaxis: {ticks: 12, tickDecimals: 0},
        yaxis: {ticks: 3, tickDecimals: 0},
        selection: {
            mode: "x"
        }
    };

    var placeholder = $("#selectionCharts");

    placeholder.bind("plotselected", function (event, ranges) {

        $("#selection").text(ranges.xaxis.from.toFixed(1) + " to " + ranges.xaxis.to.toFixed(1));

        var zoom = $("#zoom").attr("checked");

        if (zoom) {
            plot = $.plot(placeholder, data, $.extend(true, {}, options, {
                xaxis: {
                    min: ranges.xaxis.from,
                    max: ranges.xaxis.to
                }
            }));
        }
    });

    placeholder.bind("plotunselected", function (event) {
        $("#selection").text("");
    });

    var plot = $.plot(placeholder, data, options);

    $("#clearSelection").click(function () {
        plot.clearSelection();
    });

    $("#setSelection").click(function () {
        plot.setSelection({
            xaxis: {
                from: 1994,
                to: 1995
            }
        });
    });
    // Add the Flot version string to the footer
    $("#footer").prepend("Flot " + $.plot.version + " &ndash; ");

    $("#selectionCharts").UseTooltip();

}

function dashboardEmpleado() {
    var empleado = 4;
    var p_rango_fecha = "";
    if ($("#intIdEmpleado").val() != null) {
        empleado = $("#intIdEmpleado").val();
    }
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

    $.getJSON('ajaxGraphEmpleado', {
        Rango_Fechas: p_rango_fecha,
        Empleado: empleado
    }, function (jsonResponse) {
       // console.log(" Response correcto de dashboadEmpleado ");
        var valHorasPlaneadas = "";
        var valHorasTrabajadas = "";
        var valHorasAdicionales = "";
        var valHorasAdeudadas = "";
        var valEntradas = "";
        var valSalidas = "";
        var valHorasFueraOficina = "";
        var intCount = 1;
        $.each(jsonResponse.stateMap, function (key, value) {
           // console.log(" key = " + key + " value =  " + value.rthNHoraPlaneada);
            valHorasPlaneadas = valHorasPlaneadas + "[" + key + "," + value.rthNHoraPlaneada + "],";
            valHorasTrabajadas = valHorasTrabajadas + "[" + key + "," + (value.rthNHoraTrabajada / 60) + "],";
            
            //valHorasAdicionales = valHorasAdicionales / 30;
            //valHorasAdicionales = valHorasAdicionales / 2;
            
            valHorasAdicionales = valHorasAdicionales + "[" + key + "," + value.rthFHoraAdicional + "],";
            valHorasAdeudadas = valHorasAdeudadas + "[" + key + "," + value.rthNHoraAdeudada + "],";
            valHorasFueraOficina = valHorasFueraOficina + "[" + key + "," + (value.rthNHoraFueraOficina / 60) + "],";
            valEntradas = valEntradas + "[" + key + "," + value.rthNEntrada + "],";
            valSalidas = valSalidas + "[" + key + "," + value.rthNSalida + "],";
            intCount++;
        });
        valHorasPlaneadas = valHorasPlaneadas.substr(0, valHorasPlaneadas.length - 1);
        //console.log(" Valor 1" + valHorasPlaneadas);
        valHorasTrabajadas = valHorasTrabajadas.substr(0, valHorasTrabajadas.length - 1);
        //console.log(" Valor 2" + valHorasTrabajadas);
        valHorasAdicionales = valHorasAdicionales.substr(0, valHorasAdicionales.length - 1);
        //console.log(" Valor 3" + valHorasAdicionales);
        valHorasAdeudadas = valHorasAdeudadas.substr(0, valHorasAdeudadas.length - 1);
        //console.log(" Valor 4" + valHorasAdeudadas);
        valHorasFueraOficina = valHorasFueraOficina.substr(0, valHorasFueraOficina.length - 1);
        //console.log(" Valor 5" + valHorasFueraOficina);
        valEntradas = valEntradas.substr(0, valEntradas.length - 1);
        //console.log(" Valor 6" + valEntradas);
        valSalidas = valSalidas.substr(0, valSalidas.length - 1);
        //console.log(" Valor 7" + valSalidas);

        var str = "[{" +
                "label: 'Planeadas'," +
                " data: [" +
                valHorasPlaneadas
                +
                "]" +
                "}," +
                "{" +
                "label: 'Trabajadas'," +
                "data: [" +
                valHorasTrabajadas
                +
                "]" +
                "}," +
                "{" +
                "label: 'Adicionales'," +
                "data: [" +
                valHorasAdicionales
                +
                "]" +
                "}," +
                "{" +
                "label: 'Adeudadas'," +
                "data: [" +
                valHorasAdeudadas
                +
                "]" +
                "}," +
                "{" +
                "label: 'FueraOficina'," +
                "data: [" +
                valHorasFueraOficina
                +
                "]" +
                "}," +
                "{" +
                "label: 'Entradas'," +
                "data: [" +
                valEntradas
                +
                "]" +
                "}," +
                "{" +
                "label: 'Salidas'," +
                "data: [" +
                valSalidas
                +
                "]" +
                "}]";
        //var data = JSON.parse(str);
        var data = eval('(' + str + ')');

       // console.log(" string armado " + str);
       // console.log(" data =" + data)
        
        //console.log("Antes del plot de empleado");

        plot = $.plot(placeholder, data, options);
    });

    var options = {
        series: {
            lines: {show: true,
                lineWidth: 2,
                fill: false,
            },
            points: {show: true,
                lineWidth: 2
            },
            shadowSize: 0
        },
        grid: {hoverable: true,
            clickable: true,
            tickColor: "#eeeeee",
            borderWidth: 0
        },
        legend: {
            noColumns: 7,
            top:-12
        },
        colors: ["#2ba7cb", "#2b4fa2", "#40b402", "#CABC13", "#FE2604", "#ACA8A8", "#050505"],
        xaxis: {ticks: 12, tickDecimals: 0},
        yaxis: {ticks: 3, tickDecimals: 0},
        selection: {
            mode: "x"
        }
    };

    var placeholder = $("#selectionCharts");

    placeholder.bind("plotselected", function (event, ranges) {

        $("#selection").text(ranges.xaxis.from.toFixed(1) + " to " + ranges.xaxis.to.toFixed(1));

        var zoom = $("#zoom").attr("checked");

        if (zoom) {
            plot = $.plot(placeholder, data, $.extend(true, {}, options, {
                xaxis: {
                    min: ranges.xaxis.from,
                    max: ranges.xaxis.to
                }
            }));
        }
    });

    placeholder.bind("plotunselected", function (event) {
        $("#selection").text("");
    });

    var plot = $.plot(placeholder, data, options);

    $("#clearSelection").click(function () {
        plot.clearSelection();
    });

    $("#setSelection").click(function () {
        plot.setSelection({
            xaxis: {
                from: 1994,
                to: 1995
            }
        });
    });
    // Add the Flot version string to the footer
    $("#footer").prepend("Flot " + $.plot.version + " &ndash; ");
    $("#selectionCharts").UseTooltip();
}

$(function () {
   // console.log("funcion sin metodo");
});

// Calendar
$(document).ready(function () {

});

// Morris Charts and Graphs
function socialGraph() {
    
    var var_faltas = parseInt($("#faltasinjustificadas").text(),"10") + parseInt($("#faltasjustificadas").text(),"10");
   // console.log(" FALTAS = " + var_faltas);
    var var_permisos = parseInt($("#permisos").text(),"10");
   // console.log(" PERMISOS " + var_permisos);
    var var_incapacidades = parseInt($("#incapacidades").text(),"10");
  //  console.log(" INCAPACIDADES = " + var_incapacidades);
    var var_vacaciones = parseInt($("#vacaciones").text(),"10");
  //  console.log(" VACACIONES = " + var_vacaciones);
    var total = var_faltas + var_permisos + var_incapacidades + var_vacaciones;
   // console.log(" TOTALES = " + total);
    
    var_faltas = (var_faltas * 100)/total;
//    var_faltas = var_faltas.toFixed(4);
  //  console.log(var_faltas);
    var_permisos = (var_permisos * 100)/total;
//    var_permisos = var_permisos.toFixed(4)
   // console.log(var_permisos);
    var_incapacidades = (var_incapacidades * 100)/total;
//    var_incapacidades = var_incapacidades.toFixed(4);
   // console.log(var_incapacidades);
    var_vacaciones = (var_vacaciones * 100)/total;
//    var_vacaciones = var_vacaciones.toFixed(4);
//    console.log(var_vacaciones);
    
    
    
    if (isNaN(var_faltas) || isNaN(var_permisos) || isNaN(var_incapacidades) || isNaN(var_vacaciones))
        console.log(" Alguan de las variables es incorrecta ");
    else{
        Morris.Donut({
            element: 'socialGraph',
            data: [
                {value:  var_faltas, label: 'Faltas'},
                {value: var_permisos, label: 'Permisos'},
                {value: var_incapacidades, label: 'Incapacidades'},
                {value:  var_vacaciones, label: 'Vacaciones'}
            ],
            labelColor: '#0b62a4',
            formatter: function (x) {
                return x + "%"
            }
        });
    }
}
$(document).ready(function () {
    socialGraph();
});

//Resize charts and graphs on window resize
$(document).ready(function () {
    $(window).resize(function () {
        socialGraph();
    });
});
