
$(document).ready(function(){

    loadData();

    $(".button-collapse").sideNav();


// $.makeTable = function (data) {
//     var table = $('<table border=1>');
//     var tableHeader = "<tr>";
//     for (var k in data[0]) tableHeader += "<th>" + k + "</th>";
//     tableHeader += "</tr>";
//     $(tableHeader).appendTo(table);
//     $.each(data[0], function (index, value) {
//         var TableRow = "<tr>";
//         $.each(value, function (key, val) {
//              if(key == "web_page") 
//                  TableRow += '<td><a href="' + val +'"">' + val + '</a></td>';
//             else
//              TableRow += "<td>" + val + "</td>";

//         });
//         TableRow += "</tr>";
//         $(table).append(TableRow);
//     });
//     return ($(table));
// };


var count = 0;
var inputs = $('input');



var universitiesObj={
    "number": "",
    "web_page": "",
    "country": "",
    "domain": "",
    "name": "",
    "checked": true
};
var universitiesArray = [];
   
    

    $(".reset_button").on('click',function(){
        $('.text_input').val('');
        $('#json_table table').remove();
        $('#count').text('0');
        localStorage.clear(); 
    });

    $(".submit_button").on('click', loadData);               
                        
function RealDate(date) {

  var days = date.getDate();
  if (days < 10) days = '0' + days;

  var month = date.getMonth() + 1;
  if (month < 10) month = '0' + month;

  var year = date.getFullYear();
  if (year < 10) year = '0' + year;

  return days + '.' + month + '.' + year;
}

var d = new Date();
$('#date').text(RealDate(d));
                

           
});
var checkedID = [];
function displayCount() {
    $('#count').text(count);
   
}

function checkboxCount() {
    count = $('input[type=checkbox]:checked').length;
    displayCount();

    $('input[type=checkbox]').bind('click' , function(e, a) {   
         if (this.checked) {
              count += a ? -1 : 1;
              checkedID.push(this.id);
              

         } else {
              count += a ? 1 : -1;
              checkedID.splice(count, 1);  
         }
         displayCount();
         
         
         
         localStorage.setItem('Checkboxes', checkedID );
         console.log(localStorage.getItem('Checkboxes'));
    });
}

function loadData() {
    console.log('1');
    if ($('.text_input').val().length) {
        localStorage.setItem('country', $('.text_input').val());
    }
    var myurl = "https://raw.githubusercontent.com/vargi/university-domains-list/master/world_universities_and_domains.json";
    var text = $('.text_input').val() || localStorage.getItem('country');
    $('.text_input').val(text);

    $("#json_table").empty();

    $.getJSON(myurl, function(data){
       
        $("#json_table").append("<table />");

        var number = 0;
        console.log('2');
        $('#json_table').addClass('responsive');
        if(text){
        $('#json_table table').append('<tr> <th>Number</th><th>Country</th><th>Domain</th><th>Name</th><th>Web page</th><th>Save</th> </tr>');
        }
        data.forEach(function(d, i) {

            if( text && text.toLowerCase() === d.country.toLowerCase()){

                $('#json_table table').append('<tr><td> ' + (++number) + ' </td><td> ' + d.country + ' </td><td> ' + d.domain + ' </td><td> '+ d.name + ' </td><td> '+ d.web_page.link(data[i].web_page) + ' </td> ' + '<td><input id="tr_'+ number +'" type="checkbox"><label for="tr_' + number + '"></label></td>');
            }

        });

        var CheckboxesArray = localStorage.getItem('Checkboxes');
       
        if(CheckboxesArray !== null){
            var a = CheckboxesArray.split(',');
                
                // 
                // console.log(CheckboxesArray);
            for(var i=0; i < a.length; i++ ){
                // $('#' + a[i] + '').attr('checked');
                $('#' + a[i] + '').prop('checked',true);
                // $(('input[id=' + a[i] + ']')).attr('checked');
                // console.log(a[i]);
            }
        }

       checkboxCount();
    }); 
}



