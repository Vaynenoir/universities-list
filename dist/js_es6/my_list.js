'use strict';

var doc = document;
var body = doc.body;
var table = doc.createElement('table');
var title = doc.createElement('h1');
var count = 0;
var Checked = [];
var RemovedCheckboxes = [];
var CheckedInput = document.querySelectorAll("input[type='checkbox']");
var selectedRows = JSON.stringify(localStorage.getItem('selected'));
document.querySelector('#loading').innerHTML = '<img src = "src/js_es6/808.gif"><p>loading...</p>';
setTimeout(loadRows, 2000);

function loadRows() {

    console.log(1);

    var text = localStorage.getItem('country') || '';

    selectedRows = JSON.parse(localStorage.getItem('selected')) || [];

    selectedRows = selectedRows.map(function (num) {
        return parseInt(num);
    });

    document.querySelector('#loading').innerHTML = '';
    document.querySelector('#myTable').style.margin = '0 auto';
    if (selectedRows.length) {
        doc.querySelector('h1').innerHTML = "UNIVERSITY LIST";
        loadData(selectedRows, text, function (data) {
            data.forEach(function (tr) {
                if (tr) {
                    console.log(tr);

                    table.innerHTML += tr;
                    console.log(table);
                }
            });
            doc.querySelector('#myTable').appendChild(table);
        });
    }
}

function loadData(selectedRows, text, cb) {

    var getJSON = function getJSON(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'json';
        xhr.onload = function () {
            var status = xhr.status;
            if (status === 200) {
                callback(null, xhr.response);
            } else {
                callback(status, xhr.response);
            }
        };
        xhr.send();
    };

    getJSON('https://raw.githubusercontent.com/vargi/university-domains-list/master/world_universities_and_domains.json', function (err, data) {
        console.log(data);
        function displayCount() {
            doc.querySelector('#SelectedCount').innerHTML = count;
        }

        function checkboxCount() {

            count = doc.querySelectorAll('input[type=checkbox]:checked').length;
            displayCount();
        }

        var filtered = data.filter(function (d, i) {
            return text.toLowerCase() == d.country.toLowerCase();
        });

        cb(filtered.map(function (d, i) {
            if (~selectedRows.indexOf(i)) {
                console.log(i);
                return '<tr id="' + i + '"><td>  ' + ++i + '   </td><td>   ' + d.country + '   </td><td>   ' + d.domain + '   </td><td>   ' + d.name + '   </td><td>   ' + d.web_page.link(data[i].web_page) + '   </td>   <td><p>delete</p><input id=\'tr_' + i + '\'  type="checkbox"><label for="tr_' + i + '"></label></td>';
            }
        }));

        [].forEach.call(document.querySelectorAll("input[type='checkbox']"), function (el) {

            el.addEventListener('click', function (el, a) {

                var trID = this.closest('tr').id;

                // console.log(RemovedCheckboxes);
                var rowID = this.closest('tr').id;

                if (this.checked) {
                    count += a ? -1 : 1;

                    selectedRows.splice(selectedRows.lastIndexOf(parseInt(rowID)), 1);
                    console.log(rowID);

                    RemovedCheckboxes.push(rowID);
                    console.log(RemovedCheckboxes);
                    Checked.push(this.id);

                    console.log(selectedRows);
                } else if (~RemovedCheckboxes.indexOf(rowID)) {
                    count += a ? 1 : -1;

                    RemovedCheckboxes.splice(RemovedCheckboxes.indexOf(rowID), 1);
                }
                localStorage.setItem('selected', JSON.stringify(selectedRows));
                localStorage.setItem('CheckboxesDelete', Checked);
                localStorage.setItem('deleted', JSON.stringify(RemovedCheckboxes));
                displayCount();
                try {
                    RemovedCheckboxes = JSON.parse(localStorage.getItem('deleted')) || [];
                } catch (e) {}
            });
        });

        document.querySelector('#delete_selected').onclick = function () {

            var arrDeleted = JSON.parse(localStorage.getItem('deleted')) || RemovedCheckboxes;

            // console.log(arrDeleted);

            [].forEach.call(arrDeleted, function (el, i) {
                // console.log(el);
                document.getElementById(parseInt(el)).parentNode.removeChild(document.getElementById(parseInt(el)));
            });
            console.log(selectedRows);
            document.querySelector('#SelectedCount').innerHTML = '0';
            // for(var i=0;i<arrDeleted.length;i++){

            // 	document.getElementById(parseInt(arrDeleted[i])).parentNode.removeChild(document.getElementById(parseInt(arrDeleted[i])));
            // }
        };

        // localStorage.removeItem('deleted');


        // let DeletedArray = localStorage.getItem('CheckboxesDelete');

        // if (DeletedArray !== null) {
        //     let a = DeletedArray.split(',');
        //     var arr = [];
        //     for (let i = 0; i < a.length; i++) {

        //         [].forEach.call(doc.querySelectorAll(`#${a[i]}`), function(el) {

        //             el.setAttribute('checked', true);
        //             //     // console.log(arr.push(el));
        //             //     // console.log(arr);

        //         });

        //     }


        // }


        // checkboxCount();

    });
}