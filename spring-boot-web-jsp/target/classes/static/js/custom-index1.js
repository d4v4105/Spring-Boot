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


//Selection Charts

$(function () {

    /*
     var data = [{
     label: "Planeadas",
     data: [[1, 2], [2, 32], [3, 58], [4, 38], [5, 26], [6, 163], [7, 26], [8, 49], [9, 12], [10, 45], [11, 78], [12, 10], [13, 34], [14, 58], [15, 113], [16, 113], [17, 113], [18, 113], [19, 113], [20, 113], [21, 113], [22, 113], [23, 113], [24, 113], [25, 113], [26, 113], [27, 113], [28, 113], [29, 113], [30, 113]]
     },
     {
     label: "Trabajadas",
     data: [[1, 1], [2, 8], [3, 34], [4, 6], [5, 10], [6, 17], [7, 60], [8, 21], [9, 86], [10, 19], [11, 22], [12, 74], [13, 38], [14, 13], [15, 237], [16, 800], [17, 13], [18, 31], [19, 113], [20, 113], [21, 113], [22, 113], [23, 113], [24, 113], [25, 113], [26, 113], [27, 113], [28, 113], [29, 113], [30, 113]]
     }];
     */
    
    
    
    var str = "[{" +
            "label: 'Planeadas'," +
            " data: [[1, 100], [2, 0], [3, 10], [4, 0], [5, 26], [6, 163], [7, 26], [8, 49], [9, 12], [10, 45], [11, 78], [12, 10], [13, 34], [14, 58], [15, 113], [16, 113], [17, 113], [18, 113], [19, 113], [20, 113], [21, 113], [22, 113], [23, 113], [24, 113], [25, 113], [26, 113], [27, 113], [28, 113], [29, 113], [30, 113]]" +
            "}," +
            "{" +
            "label: 'Trabajadas'," +
            "data: [[1, 80], [2, 8], [3, 34], [4, 6], [5, 10], [6, 17], [7, 60], [8, 21], [9, 86], [10, 19], [11, 22], [12, 74], [13, 38], [14, 13], [15, 237], [16, 10], [17, 13], [18, 31], [19, 113], [20, 113], [21, 113], [22, 113], [23, 113], [24, 113], [25, 113], [26, 113], [27, 113], [28, 113], [29, 113], [30, 113]]" +
            "}]";
    //var data = JSON.parse(str);
    var data = eval('(' + str + ')');

    console.log("data ahora tiene = " + data);

    /*
     var unidadoperativa = $("#unidadoperativa").val();
     
     if (unidadoperativa != 0 && unidadoperativa != null){
     unidadoperativa = 1;
     }
     */


    /*
     var request = $.ajax({
     type: 'POST',
     url: 'ajaxHPlanTrab.action',
     datatype: 'json',
     data: 'detefrom=' + datefrom + '&dateto=' + dateto + '&unidadoperativa=' + unidadoperativa,
     success: function (msg) {
     dataresult = msg;
     console.log("success = ***" + dataresult + " ***");
     
     
     
     data = [{
     label: "Planeadas",
     data: [[1, 2], [2, 32], [3, 58], [4, 38], [5, 26], [6, 163], [7, 26], [8, 49], [9, 12], [10, 45], [11, 78], [12, 10], [13, 34], [14, 58], [15, 113], [16, 113], [17, 113], [18, 113], [19, 113], [20, 113], [21, 113], [22, 113], [23, 113], [24, 113], [25, 113], [26, 113], [27, 113], [28, 113], [29, 113], [30, 113]]
     },
     {
     label: "Trabajadas",
     data: [[1, 1], [2, 8], [3, 34], [4, 6], [5, 10], [6, 17], [7, 60], [8, 21], [9, 86], [10, 19], [11, 22], [12, 74], [13, 38], [14, 13], [15, 237], [16, 800], [17, 13], [18, 31], [19, 113], [20, 113], [21, 113], [22, 113], [23, 113], [24, 113], [25, 113], [26, 113], [27, 113], [28, 113], [29, 113], [30, 113]]
     }];
     
     
     }
     });
     request.done(function (msg) {
     dataresult = msg;
     console.log("done = ***" + dataresult + " ***");
     });
     request.fail(function (jqXHR, textStatus) {
     console.log("Request failed: " + textStatus);
     dataresult = "";
     });
     
     */







    console.log("Antes de definir los options ");

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
            noColumns: 3
        },
        colors: ["#3b5a9b", "#d3503e"],
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
    



    
    
});


// Calendar
$(document).ready(function () {

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    var calendar = $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        selectable: true,
        selectHelper: true,
        select: function (start, end, allDay) {
            var title = prompt('Event Title:');
            if (title) {
                calendar.fullCalendar('renderEvent',
                        {
                            title: title,
                            start: start,
                            end: end,
                            allDay: allDay
                        },
                true // make the event "stick"
                        );
            }
            calendar.fullCalendar('unselect');
        },
        editable: true,
        events: [
            {
                title: 'All Day Event',
                start: new Date(y, m, 1)
            },
            {
                id: 999,
                title: 'Repeating Event',
                start: new Date(y, m, d - 3, 16, 0),
                allDay: false
            },
            {
                title: 'Meeting',
                start: new Date(y, m, d, 10, 30),
                allDay: false
            },
            {
                title: 'Lunch',
                start: new Date(y, m, d, 12, 0),
                end: new Date(y, m, d, 14, 0),
                allDay: false
            },
            {
                title: 'Birthday Party',
                start: new Date(y, m, d + 1, 19, 0),
                end: new Date(y, m, d + 1, 22, 30),
                allDay: false
            }
        ]
    });
});

// Morris Charts and Graphs
function socialGraph() {
    Morris.Donut({
        element: 'socialGraph',
        data: [
            {value: 47, label: 'Faltas'},
            {value: 28, label: 'Permisos'},
            {value: 17, label: 'Incapacidades'},
            {value: 8, label: 'Vacaciones'}
        ],
        labelColor: '#0b62a4',
        formatter: function (x) {
            return x + "%"
        }
    });
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
