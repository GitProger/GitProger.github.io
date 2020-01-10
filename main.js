window.onload = function() {
    var date = new Date();
    var year = String(date.getYear() + 1900);
    document.body.innerHTML += "<div id=\"copyright\"><hr><h6><pre>" + year + "</pre></h6></div>"
}
