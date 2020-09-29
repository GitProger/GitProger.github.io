function rand(k, id) {
    var res = Math.floor(Math.random() * k);
    if (res === rand.last[id]) {
        return rand(k, id);
    } else {
        rand.last[id] = res;
    }
    return res;
}
rand.last = [];

function simpleRand(k) {
    return Math.floor(Math.random() * k);
}

function getScore() {
    var r = window.localStorage.getItem("high");
    if (r === null) { r = 0; }
    return Number(r);
}
function setScore(s) {
    window.localStorage.setItem("high", s);
}

const SIZE = 5;
const WIDTH = 140;
const HEIGHT = 160;
const OFFSET = Math.floor((window.innerWidth - 700) / 2);

var count = 0;
var mX = Math.floor(SIZE / 2); /* 0..4 */

var canvas, ctx;
var all = [];


var Teacher = function () { // 140 x 160
    var a = [
        "aa", "av", "ea_geo", "ea_lit", "ga",
        "kms", "med", "mg", "minar", "nv",
        "sir", "ta", "ti", "vaspal", "vb",
    ].map((img) => img + ".jpg");
    this.src = a[rand(a.length, 1)];
    this.x = rand(SIZE, 2);
    this.y = -1 - rand(5, 3);
    this.img = new Image();
    this.img.src = this.src;
}

Teacher.prototype.move = function () {
    this.y += 1/25;
}

Teacher.prototype.draw = function () {
    ctx.drawImage(this.img, OFFSET + this.x * WIDTH, this.y * HEIGHT);
}


function moveLeft() {
    if (mX > 0) { mX--; }
}

function moveRight() {
    if (mX < SIZE - 1) { mX++; }
}

function start() {
    $(document).on("swiperight", moveRight); // "swipe"
    $(document).on("swipeleft", moveLeft);
    const LEFT_CODE = 37, RIGHT_CODE = 39;
    $(document).on("keydown", function (e) {
        if (e.keyCode === LEFT_CODE) {
            moveLeft();
        } else if (e.keyCode === RIGHT_CODE) {
            moveRight();
        }
    });

    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    var dt = 20;
    var gen = 0;
    var timeout = setInterval(function() {
        if (++gen === 50) {
            all.push(new Teacher());
            gen = 0;
        }

        ctx.fillStyle = "black"; // background
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath(); // border
        ctx.moveTo(OFFSET, 0);
        ctx.lineTo(OFFSET, canvas.height);
        ctx.moveTo(OFFSET + SIZE * WIDTH, 0);
        ctx.lineTo(OFFSET + SIZE * WIDTH, canvas.height);
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#ffffff";
        ctx.stroke();

        all.forEach(function (e) {
            e.move();
            e.draw();
        });

        ctx.fillStyle = "red"; // player
        ctx.fillRect(OFFSET + mX * WIDTH + 5, window.innerHeight - HEIGHT / 2, WIDTH - 10, HEIGHT / 2);



        all.forEach(function (e) {
            var realY = e.y * HEIGHT;
            if (e.x === mX
                && realY >= window.innerHeight - HEIGHT / 2 - e.img.height
                && realY <= window.innerHeight - HEIGHT / 2  /* Если краем задел, то обидно */
            ) {
                clearInterval(timeout);
                alert("Game over. Score: " + count + ", High score: " + getScore());
            }
        });

        for (var i = 0; i < all.length; i++) {
            if (all[i].y * HEIGHT >= window.innerHeight) {
                all.splice(i, 1);
                i--;
                count++;
            }
        }
        if (count > getScore())
            setScore(count);
    }, dt);
}
