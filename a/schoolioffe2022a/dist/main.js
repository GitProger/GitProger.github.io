function rand(k) {
    var res = Math.floor(Math.random() * k);
    return res;
}

function getJSONObj(url) {
    $.ajaxSetup({async: false}); // warn
    var resp = $.get(url);
    return resp.responseJSON;
}

function getHTML(name) {
    return '<input type="checkbox" name="" value="' + name + '" class="opt">' +
        name + "<br>";
}


function divToGroups(students) {
    var cnt = $("#count").val();
    if (cnt === undefined || cnt < 2 || cnt > 25) {
        alert("Число групп от 2 до 25!");
        return [[]];
    }

    var groups = [];
    for (var i = 0; i < cnt; i++) groups[i] = [];

    var cur_gr = 0;
    while (students.length > 0) {
        var i = rand(students.length);
        groups[cur_gr].push(students[i]);
        cur_gr = (cur_gr + 1) % cnt;
        students.splice(i, 1);
    }

    return groups;
}

function genTable(g) {
    var cnt = g.length; // of groups
    var tab = "<table border=1>";
    var peop_cnt = 0; // in each group (max)
    for (var i = 0; i < cnt; i++) {
        peop_cnt = Math.max(peop_cnt, g[i].length);
    }
    tab += "<tr>";
    for (var i = 0; i < cnt; i++) {
        tab += "<th>Группа №" + (i + 1) + "</th>";
    }
    tab += "</tr>";

    for (var i = 0; i < peop_cnt; i++) {
        tab += "<tr>";
        for (var g_id = 0; g_id < cnt; g_id++) {
            var name = g[g_id][i];
            if (name !== undefined) tab += "<td>" + name + "</td>";
        }
        tab += "</tr>";
    }

    tab += "</table>";
    return tab;
}

const stud_db = "students.json";

$(function () {
    var students = getJSONObj(stud_db).sort();
    students.forEach((name) => {
        $("#list").append(getHTML(name));
    });

    $("#select-all").click(function () {
        $(".opt").prop("checked", true);
    });
    $("#remove-all").click(function () {
        $(".opt").prop("checked", false);
    });

    $("#create").click(() => {
        var selected = [];
        $(".opt").each(function () {
            if ($(this).prop("checked"))
                selected.push($(this).attr("value"));
        });
        var htm = genTable(divToGroups(selected));
        $("#tab").html(htm);
    });
})
