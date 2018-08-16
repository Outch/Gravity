'use strict';

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let cube_x = canvas.width / 2 - 10;
let cube_y = canvas.height - 60;
let cube_dx = 0;
let cube_dy = 0;
let	jumpKeyPress = false;
let gravity = 0.3;
let friction = 4;

function KeyboardController(keys, repeat) {
    // Lookup of key codes to timer ID, or null for no repeat
    //
    var timers = {};

    // When key is pressed and we don't already think it's pressed, call the
    // key action callback and set a timer to generate another one after a delay
    //
    document.onkeydown = function(event) {
        var key = (event || window.event).keyCode;
        if (!(key in keys))
            return true;
        if (!(key in timers)) {
            timers[key] = null;
            keys[key]();
            if (repeat !== 0)
                timers[key] = setInterval(keys[key], repeat);
        }
        return false;
    }

    // Cancel timeout and mark key as released on keyup
    //
    document.onkeyup = function(event) {
        var key = (event || window.event).keyCode;
        if (key in timers) {
            if (timers[key] !== null)
                clearInterval(timers[key]);
            delete timers[key];
        }
    }

    // When window is unfocused we may not get key events. To prevent this
    // causing a key to 'get stuck down', cancel all held keys
    //
    window.onblur = function() {
        for (key in timers)
            if (timers[key] !== null)
                clearInterval(timers[key]);
        timers = {};
    }
}

KeyboardController(
{
    37: function() {
    	cube_x -= 5;
    },
    39: function() {
    	cube_x += 5;
    },
    38: function() {
    	if (cube_y == (canvas.height - 20))
	    	cube_dy = -11;
    },
}, 8);

function drawCube()
{
	ctx.beginPath();
	ctx.rect(cube_x, cube_y, 20, 20);
	ctx.fillStyle = "#FF0000";
	ctx.fill();
	ctx.closePath();
}

function draw()
{
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawCube();

	if (cube_dy < 20)
		cube_dy += gravity;

	cube_y += cube_dy;

	if (cube_y + 20 + cube_dy > canvas.height)
	{
		cube_dy = 0;
		cube_y = canvas.height - 20;
	}
	if (cube_x + 20 >= canvas.width)
		cube_x = 0;
	else if (cube_x < 0)
		cube_x = canvas.width - 20;
}

setInterval(draw, 10);