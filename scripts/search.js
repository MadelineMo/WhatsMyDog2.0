// https://stackoverflow.com/questions/39097948/simple-search-function-with-javascript

//https://www.w3schools.com/howto/howto_js_filter_lists.asp 

function searchFunction() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("textInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("dogList");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}