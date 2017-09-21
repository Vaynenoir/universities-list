'use strict';

var doc = document;
var table = doc.createElement('table');
var jsonTable = doc.querySelector("#json_table");
var count = 0;
var JsonChecked = [];
if (jsonTable.hasChildNodes() == true) {
    document.querySelector('#loading').innerHTML = '<img src="src/js_es6/808.gif" style="margin:0 auto;"/><p>loading...</p>';
}

loadData();

$(".button-collapse").sideNav();

var universitiesArray = [];

var checkedID = [];

function displayCount() {
    doc.querySelector('#count_list').innerHTML = count;
    doc.querySelector('#count').innerHTML = count;
    doc.querySelector('#count_list_mobile').innerHTML = count;
}

function checkboxCount() {

    count = doc.querySelectorAll('input[type=checkbox]:checked').length;
    displayCount();
}

doc.querySelector(".reset_button").onclick = function () {
    doc.querySelector('.text_input').value = "";
    jsonTable.removeChild(table);
    table.innerHTML = "";
    console.log(table);
    doc.querySelector('#count').innerHTML = '0';
    doc.querySelector('#count_list').innerHTML = '0';
    doc.querySelector('#count_list_mobile').innerHTML = '0';
    localStorage.clear();
};

doc.querySelector(".submit_button").onclick = function () {
    document.querySelector('#loading').innerHTML = '<img src="src/js_es6/808.gif" style="margin:0 auto;"/><p>loading...</p>';
    loadData();
};

// console.log($('input'));


// console.log(1);


// let checkboxCount = () => {
//     count = doc.querySelectorAll('input[type=checkbox]:checked').length;
//     displayCount();

//     [].forEach.call(doc.querySelectorAll('input[type=checkbox]'), function(el) {


//         el.addEventListener('click', function(e, a) {
//             if (this.checked) {
//                 count += a ? -1 : 1;
//                 checkedID.push(this.id);


//             } else {
//                 count += a ? 1 : -1;
//                 checkedID.splice(count, 1);
//             }
//             displayCount();


//             localStorage.setItem('Checkboxes', checkedID);
//              localStorage.setItem('tRows', string );
//              console.log(localStorage.getItem('tRows'));
//             console.log(localStorage.getItem('Checkboxes'));
//         });
//     });
// }


var RealDate = function RealDate(date) {

    var days = date.getDate();
    if (days < 10) days = '0' + days;

    var month = date.getMonth() + 1;
    if (month < 10) month = '0' + month;

    var year = date.getFullYear();
    if (year < 10) year = '0' + year;

    return days + '.' + month + '.' + year;
};

var d = new Date();
doc.querySelector('#date').innerHTML = RealDate(d);

function loadData() {

    var TextInput = doc.querySelector(".text_input").value;
    if (TextInput.length) {
        localStorage.setItem('country', TextInput);
    }

    var text = TextInput || localStorage.getItem('country');

    // let getJSON = (url, callback) => {
    //     let xhr = new XMLHttpRequest();
    //     xhr.open('GET', url, true);
    //     xhr.responseType = 'json';
    //     xhr.onload = function() {
    //         let status = xhr.status;
    //         if (status === 200) {
    //             callback(null, xhr.response);
    //         } else {
    //             callback(status, xhr.response);
    //         }
    //     };
    //     xhr.send();
    // };

    $.ajax({
        type: "GET",
        dataType: "json",
        url: 'https://raw.githubusercontent.com/vargi/university-domains-list/master/world_universities_and_domains.json',
        success: function success(data) {
            // replace div's content with returned data
            // $('#loading').html('<img src="'+d.avatar_url+'"><br>'+d.login);
            // setTimeout added to show loading
            setTimeout(function () {
                var number = 0;

                if (text) {

                    table.innerHTML = '<tr> <th>Number</th><th>Country</th><th>Domain</th><th>Name</th><th>Web page</th><th>Save</th> </tr>';
                }

                data.forEach(function (d, i) {

                    if (text && text.toLowerCase() === d.country.toLowerCase()) {
                        JsonChecked.push(d);
                        table.innerHTML += '<tr id="' + number + '"><td>  ' + ++number + '   </td><td>   ' + d.country + '   </td><td>   ' + d.domain + '   </td><td>   ' + d.name + '   </td><td>   ' + d.web_page.link(data[i].web_page) + '   </td>   <td><input id=\'tr_' + number + '\'  type="checkbox"><label for="tr_' + number + '"  ></label></td>';
                    }
                });
                console.log(JsonChecked);
                localStorage.setItem('countryJson', JSON.stringify(JsonChecked));

                document.querySelector('#loading').innerHTML = '';
                jsonTable.appendChild(table);

                [].forEach.call(document.querySelectorAll("input[type='checkbox']"), function (el) {

                    el.addEventListener('click', function (el, a) {
                        var data = [];

                        var id = this.closest('tr').id;
                        console.log(id);
                        // console.log(id);
                        try {
                            data = JSON.parse(localStorage.getItem('selected')) || [];
                        } catch (e) {}

                        console.log(data);

                        if (this.checked) {
                            count += a ? -1 : 1;
                            data.push(id);
                            checkedID.push(this.id);
                            console.log(checkedID);
                            displayCount();
                        } else if (~data.indexOf(id)) {
                            count += a ? 1 : -1;
                            data.splice(data.indexOf(id), 1);
                        }

                        displayCount();

                        localStorage.setItem('Checkboxes', checkedID);
                        localStorage.setItem('selected', JSON.stringify(data));
                        displayCount();
                    });
                });

                var CheckboxesArray = localStorage.getItem('Checkboxes');

                if (CheckboxesArray !== null) {
                    var a = CheckboxesArray.split(',');
                    var arr = [];
                    for (var i = 0; i < a.length; i++) {

                        [].forEach.call(doc.querySelectorAll('#' + a[i]), function (el) {
                            console.log(1);
                            el.setAttribute('checked', true);
                            //     // console.log(arr.push(el));
                            //     // console.log(arr);
                        });
                    }
                }

                checkboxCount();
            }, 2000);
        }
    });
}