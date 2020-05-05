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

function update(items) {
    return function () {
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
}

function upd() {}

window.onload = function () {
    var items;
    var req = new XMLHttpRequest();
    req.open('GET', 'db.json');
    req.onreadystatechange = function (e) {
        if (this.readyState == 4) {
            if (this.status == 200)
                items = JSON.parse(this.responseText);
            else
                document.location = document.location;
        }
    }
    req.send(null);
    upd = update(items)
    upd();
}
