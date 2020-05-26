/**
Типы:
    У - Учебник
    Д - Диск или Группа
Предметы:
    Алгебра
    Геометрия
    Физика
    Химия
    Русский
    Литература
    История
    Информатика
    География
    Биология
    Английский
*/
var items;

function update() {
    var e = document.getElementById("sortby");
    var list = document.getElementById("list");
    var by = e.value;
    items.sort((a, b) => a[by] > b[by] ? 1 : -1);
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

document.onreadystatechange = function () {
    const db_url = 'https://gitproger.github.io/a/schoolioffe2022a/db.json';
    var req = new XMLHttpRequest();
    req.open('GET', db_url);
    req.onreadystatechange = function (e) {
        if (this.readyState == 4) {
            if (this.status == 200)
                items = JSON.parse(this.responseText);
            else
                alert("Load error. Restart the page.");
        }
    }
    req.send();
    update();
}
