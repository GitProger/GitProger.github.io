
var items = [];
const db_url = 'db.json';

function update() {
    var e = document.getElementById("sortby");
    var list = document.getElementById("list");
    document.getElementById("man").hidden = (by !== "type");
    document.getElementById("sep").hidden = (by === "type");
    var by = e.value;
    if (by !== "")
        items.sort((a, b) => a[by] > b[by] ? 1 : -1);
    else
        items.sort((a, b) => a.id > b.id ? 1 : -1);
    
    var prev = "";
    list.innerHTML = "";
    for (var i = 0; i < items.length; i++) {
        var cur = items[i];
        if (prev[by] !== cur[by])
            list.innerHTML += "<hr>" + cur[by] + "<br>";
        var code = "<a href=\"" + cur.link + "\">" + cur.explan + "</a>";
        list.innerHTML += code + "<br>";
        prev = items[i];
    }
}

window.onload = function () {
    var req = new XMLHttpRequest();
    req.open('GET', db_url);
    req.onreadystatechange = function (e) {
        if (this.readyState == 4 && this.status == 200) {
            items = JSON.parse(this.responseText);
            items.sort((a, b) => a.id > b.id ? 1 : -1);
            var re = location.hash.match(/#(\d+)/);
            if (re)
                document.location = items[Number(re[1]) - 1].link;
            update();
        }
    }
    req.send();
}
