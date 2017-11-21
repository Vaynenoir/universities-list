'use strict';

var doc = document;
var table = doc.createElement('table');
var jsonTable = doc.querySelector("#json_table");
var count = 0;
var jsonSorted = [];
if (jsonTable.hasChildNodes() == true) {
    document.querySelector('#loading').innerHTML = '<img src="src/js_es6/808.gif" style="margin:0 auto;"/><p>loading...</p>';
}

loadData();

$(".button-collapse").sideNav();
$('.modal').modal();

var linkNav = document.querySelector('[href^="#footer_page"]'), 
    V = 0.1; 

    linkNav.addEventListener('click', function(e) { 
        e.preventDefault();
        var w = window.pageYOffset, 
            hash = this.href.replace(/[^#]*(.*)/, '$1'); 
       var  t = document.querySelector(hash).getBoundingClientRect().top,  
            start = null;
        requestAnimationFrame(step);  
        function step(time) {
            if (start === null) start = time;
            var progress = time - start,
                r = (t < 0 ? Math.max(w - progress/V, w + t) : Math.min(w + progress/V, w + t));
            window.scrollTo(0,r);
            if (r != w + t) {
                requestAnimationFrame(step)


            } else {
                return false;  

            }
            return false;
        }
    }, false);

var universitiesArray = [];

var checkedID = [];

function displayCount() {
    if(count > 0 ) doc.querySelector('#countText').style.display = "block";
    doc.querySelector('#count_list').innerHTML = count;
    doc.querySelector('#count').innerHTML = count;
    doc.querySelector('#count_list_mobile').innerHTML = count;

}

function checkboxCount() {

    count = doc.querySelectorAll('input[type=checkbox]:checked').length;
    displayCount();
}
var message = doc.querySelector("#message");
doc.querySelector(".reset_button").onclick = function () {
    doc.querySelector('.text_input').value = "";
    jsonTable.removeChild(table);
    table.innerHTML = "";
    console.log(table);
    doc.querySelector('#count').innerHTML = '0';
    doc.querySelector('#count_list').innerHTML = '0';
    doc.querySelector('#count_list_mobile').innerHTML = '0';
    localStorage.clear();
    doc.querySelector('#json_table').appendChild(message);
    message.style.display = "none";
};

doc.querySelector(".submit_button").onclick = function () {

    if((doc.querySelector('.text_input').value).length == 0){
      
        message.innerHTML = "This field should not be empty";
        message.style.color = "#f44336";
        message.style.fontStyle = "italic";
        message.style.fontSize = "25px";

        console.log(message);
        message.style.display = "block";
    }
    else if((doc.querySelector('.text_input').value).length > 0){
        message.style.display = "none";
    document.querySelector('#loading').innerHTML = '<img src="src/js_es6/808.gif" style="margin:0 auto;"/><p>loading...</p>';
    loadData();
    }
};

$(document).keypress(function (e) {
    if (e.which == 13) {
        if((doc.querySelector('.text_input').value).length == 0){
      
            message.innerHTML = "This field should not be empty";
            message.style.color = "#f44336";
            message.style.fontSize = "20px";
            console.log(message);
            message.style.display = "block";
        }
        else if((doc.querySelector('.text_input').value).length > 0){
            message.style.display = "none";
            document.querySelector('#loading').innerHTML = '<img src="src/js_es6/808.gif" style="margin:0 auto;"/><p>loading...</p>';
            loadData();
        }
    }
});





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

var date = new Date();
doc.querySelector('#date').innerHTML = RealDate(date);

function loadData() {

    displayCount();

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
                    table.innerHTML += '<thead><tr> <th>Number</th><th>Country</th><th>Domain</th><th>Name</th><th>Web page</th><th>Save</th> </tr></thead>';
                }


                var arr = JSON.parse(localStorage.getItem('selectedJson')) || [];
                data.forEach(function (d, i) {

                    if (text && text.toLowerCase() === d.country.toLowerCase()) {
                        
                        jsonSorted.push(d);
                        var check = '';

                        [].forEach.call(arr, function (el) {
                            if (d.domain == el.domain) {
                                check = 'checked';
                                console.log(check);
                            }
                        });

                        table.innerHTML += '<tr id="' + number + '"><td>  ' + ++number + '   </td><td>   ' + d.country + '   </td><td>   ' + d.domain + '   </td><td>   ' + d.name + '   </td><td>   ' + d.web_page.link(data[i].web_page) + '   </td>   <td><input id=\'tr_' + number + '\' ' + check + ' type="checkbox"><label for="tr_' + number + '"  >Save</label></td>';
                    }
                });
               


                localStorage.setItem('countryJson', JSON.stringify(jsonSorted));

                document.querySelector('#loading').innerHTML = '';
                jsonTable.appendChild(table);

                checkboxCount();
                var jsonChecked = [];
                [].forEach.call(document.querySelectorAll("input[type='checkbox']"), function (el) {

                    el.addEventListener('click', function (el, a) {
                        var data = [];

                        var id = this.closest('tr').id;
                        // console.log(id);
                        // console.log(id);

                        data = JSON.parse(localStorage.getItem('selected')) || [];

                        console.log(data);

                        if (this.checked) {
                            count += a ? -1 : 1;

                            if (JSON.parse(localStorage.getItem('selectedJson'))) {
                                jsonChecked = JSON.parse(localStorage.getItem('selectedJson'));
                            }
                            jsonChecked.push(jsonSorted[id]);
                            console.log(jsonChecked);
                            // console.log(jsonSorted[id]);
                            console.log(id);

                            data.push(id);
                            checkedID.push(this.id);
                            // console.log(checkedID);
                            displayCount();
                        } else if (~data.indexOf(id)) {
                            count += a ? 1 : -1;
                            jsonChecked.splice(id, 1);
                            console.log(jsonChecked);
                            checkedID.splice(id, 1);
                            data.splice(data.indexOf(id), 1);
                        }

                        displayCount();
                        localStorage.setItem('selectedJson', JSON.stringify(jsonChecked));
                        localStorage.setItem('countryJson', JSON.stringify(jsonSorted));
                        localStorage.setItem('Checkboxes', checkedID);
                        localStorage.setItem('selected', JSON.stringify(data));
                        displayCount();
                        // localStorage.setItem('countBox', JSON.stringify(count));
                    });
                });

                // let CheckboxesArray = localStorage.getItem('Checkboxes');

                // if (CheckboxesArray !== null) {
                //     let a = CheckboxesArray.split(',');
                //     var arr = [];
                //     for (let i = 0; i < a.length; i++) {

                //         [].forEach.call(doc.querySelectorAll(`#${a[i]}`), function(el) {
                //             console.log(1);
                //             el.setAttribute('checked', true);
                //             //     // console.log(arr.push(el));
                //             //     // console.log(arr);

                //         });

                //     }


                // }

                // checkboxCount();

            }, 2000);
        }
    });
}