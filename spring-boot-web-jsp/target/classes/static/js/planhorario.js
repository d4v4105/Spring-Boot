/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
                $("#FechaIniPH").datepicker({
                                        dateFormat: "dd/mm/yyyy",
                                                                                        changeMonth: true,
                                                                                        changeYear: true,
                                                                                        showButtonPanel: true,
                                                                                        yearRange: '1900:2050',
                                        onSelect: function(dateText, inst) {
                                                var date = $.datepicker.parseDate(inst.settings.dateFormat || $.datepicker._defaults.dateFormat, dateText, inst.settings);
                                                var dateText1 = $.datepicker.formatDate("D, d M yy", date, inst.settings);
                                                date.setDate(date.getDate() + 7);
                                                var dateText2 = $.datepicker.formatDate("D, d M yy", date, inst.settings);
                                                //$("#dateoutput").html("Chosen date is <b>" + dateText1 + "</b>; chosen date + 7 days yields <b>" + dateText2 + "</b>");                                        


                                                                                                            var today = new Date();                      

                                                                                                            //alert(date);
                                                                                                            var dayDiff = Math.ceil(today - date) / (1000 * 60 * 60 * 24 * 365);
                                                                                                            var age = parseInt(dayDiff);

                                                                                                            //alert(age);
                                                                                                            //$('#p_nedad').val(age);

                                        }
	});
                $("#FechaFinPH").datepicker({
                                        dateFormat: "dd/mm/yyyy",
                                                                                        changeMonth: true,
                                                                                        changeYear: true,
                                                                                        showButtonPanel: true,
                                                                                        yearRange: '1900:2050',
                                        onSelect: function(dateText, inst) {
                                                var date = $.datepicker.parseDate(inst.settings.dateFormat || $.datepicker._defaults.dateFormat, dateText, inst.settings);
                                                var dateText1 = $.datepicker.formatDate("D, d M yy", date, inst.settings);
                                                date.setDate(date.getDate() + 7);
                                                var dateText2 = $.datepicker.formatDate("D, d M yy", date, inst.settings);
                                                //$("#dateoutput").html("Chosen date is <b>" + dateText1 + "</b>; chosen date + 7 days yields <b>" + dateText2 + "</b>");                                        


                                                                                                            var today = new Date();                      

                                                                                                            //alert(date);
                                                                                                            var dayDiff = Math.ceil(today - date) / (1000 * 60 * 60 * 24 * 365);
                                                                                                            var age = parseInt(dayDiff);

                                                                                                            //alert(age);
                                                                                                            //$('#p_nedad').val(age);

                                        }
	});
});