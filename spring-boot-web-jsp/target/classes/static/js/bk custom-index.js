$('document').ready(function(){

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

if($("#serverLoad").length){
  var options = {
    series: { shadowSize: 1 },
    lines: { show: true, lineWidth: 3, fill: true, fillColor: { colors: [ { opacity: 0.5 }, { opacity: 0.5 } ] }},
    yaxis: { min: 0, max: 200, tickFormatter: function (v) { return v + "%"; }},
    xaxis: { show: false },
    colors: ["#3660aa"],
    grid: { tickColor: "#f2f2f2",
      borderWidth: 0, 
    },
  };
  var plot = $.plot($("#serverLoad"), [ getRandomData() ], options);
  function update() {
    plot.setData([ getRandomData() ]);
    // since the axes don't change, we don't need to call plot.setupGrid()
    plot.draw();
    setTimeout(update, updateInterval);
  }
  update();
}

if($("#realtimechart").length){
  var options = {
    series: { shadowSize: 1 },
    lines: { lineWidth: 1, fill: true, fillColor: { colors: [ { opacity: 1 }, { opacity: 0.1 } ] }},
    yaxis: { min: 0, max: 200 },
    xaxis: { show: false },
    colors: ["#3660aa"],
    grid: { tickColor: "#eeeeee",
      borderWidth: 0 
    },
  };
  var plot = $.plot($("#realtimechart"), [ getRandomData() ], options);
  function update() {
    plot.setData([ getRandomData() ]);
    // since the axes don't change, we don't need to call plot.setupGrid()
    plot.draw();
    setTimeout(update, updateInterval);
  }
  update();
}


//Selection Charts

$(function() {
    
/*    
    
    //Rome, Italy
var d1 = [[1262304000000, 12], [1264982400000, 13], [1267401600000, 15], [1270080000000, 18], [1272672000000, 23], [1275350400000, 27], [1277942400000, 30], [1280620800000, 30], [1283299200000, 27], [1285891200000, 22], [1288569600000, 16], [1291161600000, 13]];
// Paris, France
var d2 = [[1262304000000, 6], [1264982400000, 7], [1267401600000, 12], [1270080000000, 16], [1272672000000, 20], [1275350400000, 23], [1277942400000, 25], [1280620800000, 24], [1283299200000, 21], [1285891200000, 16], [1288569600000, 10], [1291161600000, 7]];
// Madrid, Spain
var d3 = [[1262304000000, 11], [1264982400000, 13], [1267401600000, 16], [1270080000000, 18], [1272672000000, 22], [1275350400000, 28], [1277942400000, 33], [1280620800000, 32], [1283299200000, 28], [1285891200000, 21], [1288569600000, 15], [1291161600000, 11]];
// London, UK
var d4 = [[1262304000000, 7], [1264982400000, 7], [1267401600000, 10], [1270080000000, 13], [1272672000000, 16], [1275350400000, 20], [1277942400000, 22], [1280620800000, 21], [1283299200000, 19], [1285891200000, 15], [1288569600000, 10], [1291161600000, 8]];
*/
var d1a=[[1485842400000,12],[1451628000000,13],[1451628000000,15],[1451628000000,18],[1451628000000,23],[1451628000000,27],[1451628000000,30],[1451628000000,30],[1451628000000,27],[1451628000000,22],[1451628000000,16],[1451628000000,13]];

var d2=[[1485842400000,6],[2457405,7],[1485842400000,12],[1485842400000,16],[1485842400000,20],[1485842400000,23],[1485842400000,25],[1485842400000,24],[1485842400000,21],[1485842400000,16],[1485842400000,10],[1485842400000,7]];
var d3=[[1485842400000,11],[1485842400000,13],[1485842400000,16],[2557374,18],[1485842400000,22],[1485842400000,28],[1485842400000,33],[1485842400000,32],[1485842400000,28],[1485842400000,21],[1485842400000,15],[1485842400000,11]];
var d4=[[1485842400000,7],[1485842400000,7],[1485842400000,10],[1485842400000,13],[1485842400000,16],[1485842400000,20],[1485842400000,22],[1485842400000,21],[1485842400000,19],[1485842400000,15],[1485842400000,10],[1485842400000,8]];


 /*
var data1 = [
    {label: "Rome, Italy",  data: d1, points: { symbol: "circle", fillColor: "#058DC7" }, color: '#058DC7'},
    {label: "Paris, France",  data: d2, points: { symbol: "diamond", fillColor: "#AA4643" }, color: '#AA4643'},
    {label: "Madrid, Spain",  data: d3, points: { symbol: "square", fillColor: "#50B432" }, color: '#50B432'},
    {label: "London, UK",  data: d4, points: { symbol: "triangle", fillColor: "#ED561B" }, color: '#ED561B'}
];
*/


var data1=[{
            label:"Citas, Agendadas",
            data:d1a,
            points:{
                symbol:"circle",
                fillColor:"#058DC7"
                },
            color:'#058DC7'
            },
            {
            label:"Citas, Atendidas",
            data:d2,
            points:{
                symbol:"diamond",
                fillColor:"#AA4643"},
                color:'#AA4643'
                },
            {
            label:"Citas, Canceladas",
            data:d3,
            points:{
                symbol:"square",
                fillColor:"#50B432"
                },
                color:'#50B432'
            },
            {
            label:"Citas, Sin Asistir",
            data:d4,
            points:{
                symbol:"triangle",
                fillColor:"#ED561B"
            },
            color:'#ED561B'
            }];

var placeholder = $("#selectionCharts");


$.plot(placeholder, data1, {
        xaxis: {
            min:(new Date(2015,12,01)).getTime(),
                        max:(new Date(2016,12,31)).getTime(),
            mode: "time",
            tickSize: [1, "month"],
            monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            tickLength: 0,
            axisLabel: 'Month',
            axisLabelUseCanvas: true,
            axisLabelFontSizePixels: 12,
            axisLabelFontFamily: 'Verdana, Arial, Helvetica, Tahoma, sans-serif',
            axisLabelPadding: 5
        },
        yaxis: {
            axisLabel:'Citas',
            axisLabelUseCanvas:true,
            axisLabelFontSizePixels: 12,
            axisLabelFontFamily: 'Verdana, Arial, Helvetica, Tahoma, sans-serif',
            axisLabelPadding: 5
        },
        series: {
            lines: { show: true },
            points: {
                radius: 3,
                show: true,
                fill: true
            },
        },
        grid: {
            hoverable: true,
            borderWidth: 1
        },
        legend: {
            labelBoxBorderColor: "none",
                position: "right"
        }
    });
 
    function showTooltip(x, y, contents, z) {
        $('<div id="flot-tooltip">' + contents + '</div>').css({
            top: y - 30,
            left: x - 135,
            'border-color': z,
        }).appendTo("body").fadeIn(200);
    }
     
    function getMonthName(numericMonth) {
        var monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var alphaMonth = monthArray[numericMonth];
         
        return alphaMonth;
    }
     
    function convertToDate(timestamp) {
        var newDate = new Date(timestamp);
        var dateString = newDate.getMonth();
        var monthName = getMonthName(dateString);
         
        return monthName;
    }
 
    var previousPoint = null;
    
    
    
     
    placeholder.bind("plothover", function (event, pos, item) {
        if (item) {
            if ((previousPoint != item.dataIndex) || (previousLabel != item.series.label)) {
                previousPoint = item.dataIndex;
                previousLabel = item.series.label;
             
                $("#flot-tooltip").remove();
 
                var x = convertToDate(item.datapoint[0]),
                y = item.datapoint[1];
                z = item.series.color;
                     
                showTooltip(item.pageX, item.pageY,
                    "<b>" + item.series.label + "</b><br /> " + x + " = " + y + "mm",
                    z);
            }
        } else {
            $("#flot-tooltip").remove();
            previousPoint = null;            
        }
    });
    
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
                                               medio   : $eventEl.find('meido').text(),
                                               mediodos   : $eventEl.find('meidodos').text(),
                                               descuento  : $eventEl.find('descuento').text()
                                       };

                                       // Push the objects into the eventArray;
                                       eventArray.push(eventObj);                                                               
                                  });
                              rawList = eventArray;
                          } 
                });
    */
    
    
/*
  var data = [{
    label: "Citas Agendadas",
    data: [['2016-08-01', 2], ['2016-08-01', 32], ['2016-08-02', 58], ['2016-08-03', 38], ['2016-08-04', 26], ['2016-08-05', 163], ['2016-08-06', 26], ['2016-08-07', 49], ['2016-08-08', 12], ['2016-08-09', 45], ['2016-08-10', 78], ['2016-08-11', 10], ['2016-08-12', 34], ['2016-08-13', 58], ['2016-08-14', 113]]
  },
  {
    label: "Citas Atendidas",
    data: [['2016-08-01', 1], ['2016-08-01', 8], ['2016-08-02', 34], ['2016-08-03', 6], ['2016-08-04', 10], ['2016-08-05', 17], ['2016-08-06', 60], ['2016-08-07', 21], ['2016-08-08', 86], ['2016-08-09', 19], ['2016-08-10', 22], ['2016-08-11', 74], ['2016-08-12', 38], ['2016-08-13', 13], ['2016-08-14', 237]]
  }];






  var options = {
    series: {
      lines: { show: true,
        lineWidth: 2,
        fill: false,
        },
      points: { show: true, 
        lineWidth: 2 
        },
      shadowSize: 0
    },
    grid: { hoverable: true, 
      clickable: true, 
      tickColor: "#eeeeee",
      borderWidth: 0
    },
    legend: {
      noColumns: 3
    },
    colors: ["#3b5a9b", "#d3503e"],
     xaxis: {ticks:12, tickDecimals: 0},
     yaxis: {ticks:3, tickDecimals: 0},
    selection: {
      mode: "x"
    },xLabelAngle: 70,
          xLabelFormat: function (x) {
                  var IndexToMonth = [ "Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez" ];
                  var month = IndexToMonth[ x.getMonth() ];
                  var day = x.toString().substring(0, 3);
                  
                  switch (day)
                        {
                           case "Mon":
                                day = "Lun";
                                break;
                           case "Tue":
                                day = "Mar";
                                break;
                           case "Wed": 
                                day = "Mie";
                                break;
                           case "Thu":
                                day = "Jue";
                                break;
                           case "Fri":
                                day = "Vie";
                                break;
                           case "Sat":
                               day = "Sab";
                                break;
                           case "Sun":
                               day = "Dom";
                                break;                          
                        }
                  
                  
                  var year = x.getFullYear();
                  //return year + ' ' + month;
                  
                  return day;
                  
              },
          dateFormat: function (x) {
                  var IndexToMonth = [ "Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez" ];
                  var month = IndexToMonth[ new Date(x).getMonth() ];
                  var day = x.toString().substring(0, 3);
                  
                  
                  switch (day)
                        {
                           case "Mon":
                                day = "Lun";
                                break;
                           case "Tue":
                                day = "Mar";
                                break;
                           case "Wed": 
                                day = "Mie";
                                break;
                           case "Thu":
                                day = "Jue";
                                break;
                           case "Fri":
                                day = "Vie";
                                break;
                           case "Sat":
                               day = "Sab";
                                break;
                           case "Sun":
                               day = "Dom";
                                break;                          
                        }
                  
                  
                  var year = new Date(x).getFullYear();
                  //return year + ' ' + month;
                  return day;
                  
              },
          resize: true
      
  };

  var placeholder = $("#selectionCharts");



  placeholder.bind("plotselected", function (event, ranges) {

   // $("#selection").text(ranges.xaxis.from.toFixed(1) + " to " + ranges.xaxis.to.toFixed(1));

    var zoom = $("#zoom").attr("checked");

    if (zoom) {
      plot = $.plot(placeholder, data, $.extend(true, {}, options, {
        /*
        xaxis: {
          min: ranges.xaxis.from,
          max: ranges.xaxis.to
        }
  
      }));
    }
    
    */
   
   placeholder.bind("plotunselected", function (event) {
  //  $("#selection").text("");
  });

  var plot = $.plot(placeholder, data, options);

  $("#clearSelection").click(function () {
    plot.clearSelection();
  });

  $("#setSelection").click(function () {
    
      /*
    plot.setSelection({
     
      xaxis: {
        from: 1994,
        to: 1995
      }
    });
    */
    
  });
  // Add the Flot version string to the footer
  $("#footer").prepend("Flot " + $.plot.version + " &ndash; ");
  
});
  
  

  




/*
Morris.Line({
  element: 'selectionCharts',
  data: [
    { y: '2016-08-01', a: 100, b: 90 },
    { y: '2016-08-02', a: 75,  b: 65 },
    { y: '2016-08-03', a: 50,  b: 40 },
    { y: '2016-08-04', a: 75,  b: 65 },
    { y: '2016-08-05', a: 50,  b: 40 },
    { y: '2016-08-06', a: 75,  b: 65 },
    { y: '2016-08-07', a: 100, b: 90 }
  ],
  xkey: 'y',
  ykeys: ['a', 'b'],
  labels: ['Agendadas', 'Asistidas'],
  xLabels: 'day',
  hideHover: 'auto',
  xLabelAngle: 70,
          xLabelFormat: function (x) {
                  var IndexToMonth = [ "Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez" ];
                  var month = IndexToMonth[ x.getMonth() ];
                  var day = x.toString().substring(0, 3);
                  
                  switch (day)
                        {
                           case "Mon":
                                day = "Lun";
                                break;
                           case "Tue":
                                day = "Mar";
                                break;
                           case "Wed": 
                                day = "Mie";
                                break;
                           case "Thu":
                                day = "Jue";
                                break;
                           case "Fri":
                                day = "Vie";
                                break;
                           case "Sat":
                               day = "Sab";
                                break;
                           case "Sun":
                               day = "Dom";
                                break;                          
                        }
                  
                  
                  var year = x.getFullYear();
                  //return year + ' ' + month;
                  
                  return day;
                  
              },
          dateFormat: function (x) {
                  var IndexToMonth = [ "Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez" ];
                  var month = IndexToMonth[ new Date(x).getMonth() ];
                  var day = x.toString().substring(0, 3);
                  
                  
                  switch (day)
                        {
                           case "Mon":
                                day = "Lun";
                                break;
                           case "Tue":
                                day = "Mar";
                                break;
                           case "Wed": 
                                day = "Mie";
                                break;
                           case "Thu":
                                day = "Jue";
                                break;
                           case "Fri":
                                day = "Vie";
                                break;
                           case "Sat":
                               day = "Sab";
                                break;
                           case "Sun":
                               day = "Dom";
                                break;                          
                        }
                  
                  
                  var year = new Date(x).getFullYear();
                  //return year + ' ' + month;
                  return day;
                  
              },
          resize: true
      });
*/





// Calendar
$(document).ready(function() {

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
    select: function(start, end, allDay) {
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
        start: new Date(y, m, d-3, 16, 0),
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
        start: new Date(y, m, d+1, 19, 0),
        end: new Date(y, m, d+1, 22, 30),
        allDay: false
      }
    ]
  });
});

// Morris Charts and Graphs
function socialGraph(){
  Morris.Donut({
    element: 'socialGraph',
    data: [
      {value: 47, label: 'Genearl'},
      {value: 28, label: 'Obstetricia'},
      {value: 17, label: 'Oftalmología'},
      {value: 8, label: 'Psicología'}
    ],
    labelColor: '#0b62a4',
    formatter: function (x) { return x + "%"}
  });
}
$(document).ready(function () {
  socialGraph();
});

//Resize charts and graphs on window resize
$(document).ready(function () {
  $(window).resize(function(){
    socialGraph();
  });
});
