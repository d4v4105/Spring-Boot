
function myFunction()
{
	var d = new Date();
	var x = document.getElementById("eldiadehoy");
	x.innerHTML=d;
}


function formattedDate(date) {
    var d = new Date(date || Date.now()),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    //return [day, month, year].join('/');
    var x = document.getElementById("eldiadehoy");
	x.innerHTML = [day, month, year].join('/');
}
