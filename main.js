window.onload = function() {
    var date = new Date();
    var year = String(date.getYear() + 1900);
    var copyright = "(C) " + year;
    document.body.innerHTML += "<hr><div id=\"copyright\"><h6><pre>" + copyright + "</pre></h6></div>"
}
