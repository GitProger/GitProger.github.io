function add(txt) {
    document.getElementById("LOG").innerHTML += txt;
}

VK.init(
    function () {
        alert("good");
    },
    function () {
        alert("bad");
    },
    '5.103'
);

VK.api(
    "users.get", 
    {
        'user_ids' : 1,
    },
    function (data) { 
        console.log(data.response[0].last_name);
    }
);
