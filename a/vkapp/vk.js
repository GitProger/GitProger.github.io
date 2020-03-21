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

Ball.prototype.okX = function () {
    return (this.x + this.vx > this.R && this.x + this.vx < this.canvas.width - this.R);
}
Ball.prototype.okY = function () {
    return (this.y + this.vy > this.R && this.y + this.vy < this.canvas.height - this.R);
}

Ball.prototype.move = function () {
    this.x += this.vx;
    this.y += this.vy;
    if (!this.okX())
        this.vx *= -1;
    if (!this.okY())
        this.vy *= -1;
}

Ball.prototype.draw = function (ctx) {
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = this.color;
    ctx.arc(Math.round(this.x), Math.round(this.y), this.R, 0, 2 * Math.PI, false);
    ctx.stroke();
    ctx.closePath();
}

Ball.prototype.checkCollision = function (balls, current) {
    for (var i = current + 1; i < balls.length; i++) {
        var ball = balls[i];
        var dx = this.x + this.vx - ball.x - ball.vx;
        var dy = this.y + this.vy - ball.y - ball.vy;
        if (dx * dx + dy * dy <= (this.R + ball.R) ** 2) {                        
            // this - ball 1
            // ball - ball 2
//            var theta1 = Math.atan2(this.vy, this.vx);
//            var theta2 = Math.atan2(ball.vy, ball.vx);
//            var v1 = Math.sqrt(this.vx ** 2 + this.vy ** 2);
//            var v2 = Math.sqrt(ball.vx ** 2 + ball.vy ** 2);

            var a = this.vx;
            var b = this.vy;
            this.vx = ball.vx;
            ball.vx = a;
            this.vy = ball.vy;
            ball.vy = b;           
        }
	}
}

function start(
             params = ["mousedown", "mousemove"] /* mobile optimal */
         ) {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    var balls = [];
    var cnt = 10 + rand(91);
    for (var i = 0; i < cnt; i++) {
        var b = new Ball(canvas, 10 + rand(11));
        balls.push(b);
    }

    var bubbles = []; //bubbles
    function removeBall(event) {
        var rect = canvas.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
        for (var i = 0; i < balls.length; i++) {
            var dx = Math.abs(x - balls[i].x);
            var dy = Math.abs(y - balls[i].y);
            if (dx * dx + dy * dy <= balls[i].R * balls[i].R) {
                var bubble = {x: balls[i].x, y: balls[i].y, R: balls[i].R}; // bubbles
                bubbles.push(bubble); // bubbles
                balls.splice(i, 1);
                break;
            }
        }
    }

    params.forEach(function (react) {
        canvas.addEventListener(react, removeBall);
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

        for (var i = 0; i < balls.length; i++)
            balls[i].checkCollision(balls, i);
        balls.forEach(function (ball) {
            ball.move();
        });
        balls.forEach(function (ball) {
            ball.draw(ctx);
        });

        (function __proccess() { // bubbles
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = "white";
            for (var i = 0; i < bubbles.length; i++) {
                if (bubbles[i].R <= 0) {
                    bubbles.splice(i, 1);
                    i--;
                    continue;
                }
                for (
                    var x = bubbles[i].x - bubbles[i].R;
                    x <= bubbles[i].x + bubbles[i].R;
                    x += 1 + rand(20)
                )
                    for (
                        var y = bubbles[i].y - bubbles[i].R;
                        y <= bubbles[i].y + bubbles[i].R;
                        y += 1 + rand(20)
                    )
                        ctx.arc(x, y, rand(bubbles[i].R), 0, 2 * Math.PI, false);
                bubbles[i].R -= 2;
            }
            ctx.stroke();
            ctx.closePath();
        })();
    }, 20);
}
