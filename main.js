window.onload = function() {
    var date = new Date();
    var year = date.getYear() + 1900;
    document.body.innerHTML += "<br><hr>" + year;
}
