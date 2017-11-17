let doc = document;
let table = doc.createElement('table');
let title = doc.createElement('h1');
let titleSuccess = doc.createElement('h5');
let count = 0;
let myTable = doc.querySelector("#myTable");
let jsonData = JSON.parse(localStorage.getItem('selectedJson'));
let selectedRows = JSON.stringify(localStorage.getItem('selected'));
let rowArr = [];
let Checked = [];
let modal = document.getElementById('CommentModal');
$('.modal').modal();
document.querySelector('#loading').innerHTML = ('<img src = "src/js_es6/808.gif"><p>loading...</p>');
$(".button-collapse").sideNav();




setTimeout(loadTable, 2000);


function loadTable() {
let RealDate = (date) => {

    let days = date.getDate();
    if (days < 10) days = '0' + days;

    let month = date.getMonth() + 1;
    if (month < 10) month = '0' + month;

    let year = date.getFullYear();
    if (year < 10) year = '0' + year;

    return days + '.' + month + '.' + year;
}

let date = new Date();
doc.querySelector('#date').innerHTML = (RealDate(date));
    function displayCount() {

        doc.querySelector('#SelectedCount').innerHTML = (count);
        var CheckCount = JSON.parse(localStorage.getItem('selected'));
        var pageInputs = JSON.parse(localStorage.getItem('inputsOnPage'));
        doc.querySelector('#count_list').innerHTML = pageInputs;
        doc.querySelector('#count_list_mobile').innerHTML = pageInputs;
    }

    function checkboxCount() {

        count = doc.querySelectorAll('input[type=checkbox]:checked').length;
        displayCount();
    }
    document.querySelector('#loading').innerHTML = ('');
    var number = 0;
    var commentsID = [];
    [].forEach.call(jsonData, function(d, i) {

        table.innerHTML += (`<tr id="${i}"><td>  ${++number}   </td><td>   ${d.country}   </td><td>   ${d.domain}   </td><td>   ${d.name}   </td><td>   ${d.web_page.link(d.web_page)}   </td>   <td><input id='tr_${number}'  type="checkbox"><label for="tr_${number}"  ></label></td><td><i id="comment_${i}" class="fa fa-commenting-o list_comment waves-effect waves-light modal-trigger" href="#CommentModal"  style="hover:cursor:pointer;" aria-hidden="true"></i></td>`);



    });


    console.log(JSON.stringify(jsonData));
    document.querySelector('h1').innerHTML = "UNIVERSITY LIST";

    myTable.appendChild(table);
    console.log(jsonData);
    var inputs = document.querySelectorAll("input[type='checkbox']").length;
    localStorage.setItem('inputsOnPage', JSON.stringify(inputs));
    checkboxCount();




    [].forEach.call(jsonData, function(d, i) {
        if (d.identifier) {
            [].forEach.call(document.querySelectorAll(`#comment_${i}`), function(el) {
                el.style.color = ("red");

            });
        }
    });
    [].forEach.call(document.querySelectorAll("input[type='checkbox']"), function(el) {
        el.addEventListener('click', function(el, a) {


            const rowID = this.closest('tr').id;

            if (this.checked) {
                count += a ? -1 : 1;
                rowArr.push(rowID);
                console.log(rowArr);
                Checked.push(this.id);
                console.log(jsonData);


            } else if (~rowArr.indexOf(rowID)) {
                count += a ? 1 : -1;
                rowArr.splice(rowID, 1);
                console.log(rowArr);
                Checked.splice(this.id, 1);
                console.log(jsonData);
            }

            displayCount();
            localStorage.setItem('Checked', Checked);
            localStorage.setItem('RowArrIndexes', JSON.stringify(rowArr));

        });


    });

    var TestID = '';

    [].forEach.call(document.querySelectorAll('.list_comment'), function(el) {
        [].forEach.call(document.querySelectorAll(`#${el.id}`), function(comment, i) {
            comment.addEventListener('click', function() {
                modal.style.display = "block";
                jsonData = JSON.parse(localStorage.getItem('selectedJson'));
                TestID = this.closest('tr').id;

                console.log(jsonData[i].description);
                if (jsonData[TestID].description) {

                    document.querySelector('#comment_data').value = `${jsonData[parseInt(TestID)].description}`;
                    comment.style.color = "red";
                } else if (!jsonData[TestID].description) {
                    console.log(jsonData[TestID].description);
                    document.querySelector('#comment_data').value = "No comment yet!";
                }



                localStorage.setItem('CommentID', JSON.stringify(TestID));
                titleSuccess.parentNode.removeChild(titleSuccess);
            });
        });
    });


    document.querySelector('.submit_button').onclick = function() {
        jsonData = JSON.parse(localStorage.getItem('selectedJson'));

        TestID = JSON.parse(localStorage.getItem('CommentID'));

        var comment_data = document.querySelector('#comment_data').value;
        jsonData[parseInt(TestID)].description = comment_data;
        jsonData[parseInt(TestID)].identifier = TestID;
        console.log(jsonData[parseInt(TestID)].description);
        console.log(jsonData[parseInt(TestID)].identifier);
        document.querySelector(`i#comment_${TestID}`).style.color = "red";



        titleSuccess.innerHTML = 'Comment added successfully!';
        titleSuccess.style.color = "#fff";
        document.querySelector('.flex_container').appendChild(titleSuccess);
        localStorage.setItem('selectedJson', JSON.stringify(jsonData));
        delete localStorage['CommentID'];
        console.log(jsonData);
    }




    document.querySelector('#delete_selected').onclick = function() {


        if (rowArr.length > 0) {
            jsonData = jsonData.filter((value, index) => !rowArr.find(element => element == index));
            localStorage.setItem('selectedJson', JSON.stringify(jsonData));

            [].forEach.call(rowArr, function(el, i) {

                document.getElementById(parseInt(el)).parentNode.removeChild(document.getElementById(parseInt(el)));



            });
        } else {
            rowArr = JSON.parse(localStorage.getItem('RowArrIndexes'));
            console.log(rowArr);
            jsonData = jsonData.filter((value, index) => !rowArr.find(element => element == index));
            localStorage.setItem('selectedJson', JSON.stringify(jsonData));

            [].forEach.call(rowArr, function(el, i) {

                document.getElementById(parseInt(el)).parentNode.removeChild(document.getElementById(parseInt(el)));



            });
        }

        localStorage.removeItem('RowArrIndexes');
        var inputs = document.querySelectorAll("input[type='checkbox']").length;
        localStorage.setItem('inputsOnPage', JSON.stringify(inputs));
        console.log(jsonData);


        localStorage.removeItem('Checked');
        checkboxCount();
    }

    var CheckboxesArray = localStorage.getItem('Checked');

    if (CheckboxesArray !== null) {
        var a = CheckboxesArray.split(',');
        var arr = [];
        for (var i = 0; i < a.length; i++) {

            [].forEach.call(doc.querySelectorAll('#' + a[i]), function(el) {

                el.setAttribute('checked', true);

            });
        }
    }

    checkboxCount();
}