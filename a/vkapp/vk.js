function rand(k) {
    return Math.floor(Math.random() * k);
}

var Ball = function (canvas, r) {
    this.R = r;
    this.canvas = canvas;
    this.x = this.R + rand(canvas.width - 2 * this.R);
    this.y = this.R + rand(canvas.height - 2 * this.R);
    this.vx = 1 + rand(5);
    this.vy = 1 + rand(5);
    this.color = ["red", "blue", "green", "yellow"][rand(4)];
}

Ball.prototype.move = function () {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x - this.R <= 0 || this.x + this.R >= this.canvas.width)
        this.vx *= -1;
    if (this.y - this.R <= 0 || this.y + this.R >= this.canvas.height)
        this.vy *= -1;
}

Ball.prototype.draw = function (ctx) {
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = this.color;
    ctx.arc(this.x, this.y, this.R, 0, 2 * Math.PI, false);
    ctx.stroke();
    ctx.closePath();
}



function removeBall(canvas, event, balls) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    for (var i = 0; i < balls.length; i++) {
        var dx = Math.abs(x - balls[i].x);
        var dy = Math.abs(y - balls[i].y);
        var dist = Math.sqrt(dx * dx + dy * dy)
        if (dist <= balls[i].R) {
            balls.splice(i, 1);
            break;
        }
    }
}

function start() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    var balls = [];
    var cnt = 10 + rand(91);
    for (var i = 0; i < cnt; i++) {
        var b = new Ball(canvas, 10 + rand(11));
        balls.push(b);
    }

    canvas.addEventListener("mousedown", function(e) {
        removeBall(canvas, e, balls);
    });

    canvas.addEventListener("mousemove", function(e) {
        removeBall(canvas, e, balls);
    });


    var iters = 0;
    var timeout = setInterval(function() {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        if (balls.length === 0) {
            var t = "Your score: " + String(Math.ceil(iters * 0.02)) + " seconds.";
            ctx.font = "30px Comic Sans MS";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText(t, canvas.width / 2, canvas.height / 2);
            iters--;
        }
        iters++;
        balls.forEach(
            function (ball) {
                ball.move();
            }
        );
        balls.forEach(
            function (ball) {
                ball.draw(ctx);
            }
        );
    }, 20);
}
