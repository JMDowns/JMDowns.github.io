var canvas = document.getElementById("grid");
var grid_size = 5;
canvas.width = grid_size*40;
canvas.height = grid_size*40;
var ctx = canvas.getContext("2d");

var interval_time = Math.floor(1000 / document.getElementById("iterations").value);

for (var i = 0; i < grid_size; i++) {
    for (var j = 0; j < grid_size; j++) {
	ctx.fillStyle = "#000000"
	ctx.strokeRect(40*i,40*j,40,40);
    }
}

var aliveRules = [1,1,0,0,1,1,1,1,1]
var deadRules = [0,0,0,1,0,0,0,0,0]

var sizeText = document.getElementById("size");
var sliderSize = document.getElementById("myRange");
sizeText.innerHTML = sliderSize.value;

var speedText = document.getElementById("speed");
var sliderSpeed = document.getElementById("iterations");
speedText.innerHTML = sliderSpeed.value;

var button = document.getElementById("mybutton");

var grid = new Array(grid_size*grid_size).fill(0);
var new_grid = new Array(grid_size*grid_size).fill(0);

var game_started = false;


A0 = document.getElementById("A0")

A0.onchange = () => {
aliveRules[0] = A0.checked;
}

A1 = document.getElementById("A1")

A1.onchange = () => {
aliveRules[1] = A1.checked;
}

A2 = document.getElementById("A2")

A2.onchange = () => {
aliveRules[2] = A2.checked;
}

A3 = document.getElementById("A3")

A3.onchange = () => {
aliveRules[3] = A3.checked;
}

A4 = document.getElementById("A4")

A4.onchange = () => {
aliveRules[4] = A4.checked;
}

A5 = document.getElementById("A5")

A5.onchange = () => {
aliveRules[5] = A5.checked;
}

A6 = document.getElementById("A6")

A6.onchange = () => {
aliveRules[6] = A6.checked;
}

A7 = document.getElementById("A7")

A7.onchange = () => {
aliveRules[7] = A7.checked;
}

A8 = document.getElementById("A8")

A8.onchange = () => {
aliveRules[8] = A8.checked;
}


D0 = document.getElementById("D0")

D0.onchange = () => {
deadRules[0] = D0.checked;
}

D1 = document.getElementById("D1")

D1.onchange = () => {
deadRules[1] = D1.checked;
}

D2 = document.getElementById("D2")

D2.onchange = () => {
deadRules[2] = D2.checked;
}

D3 = document.getElementById("D3")

D3.onchange = () => {
deadRules[3] = D3.checked;
}

D4 = document.getElementById("D4")

D4.onchange = () => {
deadRules[4] = D4.checked;
}

D5 = document.getElementById("D5")

D5.onchange = () => {
deadRules[5] = D5.checked;
}

D6 = document.getElementById("D6")

D6.onchange = () => {
deadRules[6] = D6.checked;
}

D7 = document.getElementById("D7")

D7.onchange = () => {
deadRules[7] = D7.checked;
}

D8 = document.getElementById("D8")

D8.onchange = () => {
deadRules[8] = D8.checked;
}

sliderSpeed.oninput = () => {
    speedText.innerHTML = sliderSpeed.value;
    if (game_started) {
    window.clearInterval(interval);
    interval_time = Math.floor(1000 / document.getElementById("iterations").value);
    interval = window.setInterval(() => {
	    runGame();
    }, interval_time);
    }
}

sliderSpeed.onchange = () => {
    interval_time = Math.floor(1000 / document.getElementById("iterations").value);
    if (game_started) {
    window.clearInterval(interval);
    interval = window.setInterval(() => {
	    runGame();
    }, interval_time);
    }
}

sliderSize.oninput = () => {
    sizeText.innerHTML = sliderSize.value;
}

sliderSize.onchange = () => {
    if (game_started) {
	return;
    }
    grid_size = sliderSize.value;
    
    canvas.width = grid_size*40;
    canvas.height = grid_size*40;
    for (var i = 0; i < grid_size; i++) {
	for (var j = 0; j < grid_size; j++) {
	    ctx.fillStyle = "#000000"
	    ctx.strokeRect(40*i,40*j,40,40);
	}
    }

    grid = new Array(grid_size*grid_size).fill(0);
    new_grid = new Array(grid_size*grid_size).fill(0);

}

var interval;

runGame = () => {
    for (i = 0; i < grid.length; i++) {
	var sum = 0;
	
	var x = i % grid_size;
	var y = Math.floor(i / grid_size);

	var directions = [[-1,-1], [0,-1], [1,-1], [-1,0], [1,0], [-1,1], [0,1], [1,1]];

	for (direction in directions) {
	    dx = directions[direction][0];
	    dy = directions[direction][1];

	    x_change = x + dx;
	    y_change = y + dy;
	    
	    if (x_change == -1) {
		x_change = grid_size - 1;
	    }
	    if (x_change == grid_size) {
		x_change = 0;
	    }

	    if (y_change == -1) {
		y_change = grid_size - 1;
	    }
	    if (y_change == grid_size) {
		y_change = 0;
	    }

	    sum = sum + grid[y_change*grid_size + x_change];
	}

	if (grid[i] == 1) {
	    if (aliveRules[sum]){
		new_grid[i] = 0;
	    }
	    else {
		new_grid[i] = 1;
	    }
	}
	else {
	    if (deadRules[sum]) {
		new_grid[i] = 1;
	    }
	    else {
		new_grid[i] = 0;
	    }
	}
    }

    for (var i = 0; i < grid.length; i++) {
	grid[i] = new_grid[i];
    }
    
    draw();
}

draw = () => {
    for (var i = 0; i < grid_size; i++) {
	for (var j = 0; j < grid_size; j++) {
	    if (grid[grid_size*j+i] == 1) {
		ctx.fillStyle = "#000000";
	    }
	    else {
		ctx.fillStyle = "#FFFFFF";
	    }

	    ctx.fillRect(40*i+1,40*j+1,38,38);
	}
    }
}

button.addEventListener('mouseup', (event) => {
    if (!game_started) {
	button.innerHTML = "Stop";
	button.style.backgroundColor = "red";
	game_started = !game_started;
	//Found the concept of an interval on stackoverflow
	interval = window.setInterval(() => {
	    runGame();
	}, interval_time);
    }
    else {
	button.innerHTML = "Start";
	button.style.backgroundColor = "green";
	game_started = !game_started;
	window.clearInterval(interval);
    }	
});

makeTileBlack = (i,j) => {
    ctx.fillStyle = "#000000"
    ctx.fillRect(40*i+1,40*j+1,38,38);
}

makeTileWhite = (i,j) => {
    ctx.fillStyle = "#FFFFFF"
    ctx.fillRect(40*i+1,40*j+1,38,38);
}

//Found this method on stackoverflow
getMousePos = (event) => {
    var c = canvas.getBoundingClientRect();
    return {
	x: event.clientX - c.left,
	y: event.clientY - c.top
    };
}

canvas.addEventListener('mouseup', (event) => {
    var mouse_pos = getMousePos(event);

    var i = Math.floor(mouse_pos.x/ 40);
    var j = Math.floor(mouse_pos.y/ 40);

    index = grid_size*j+i;

    if (grid[index] == 0) {
	makeTileBlack(i,j);
	grid[index] = 1;
    }
    else {
	makeTileWhite(i,j);
	grid[index] = 0;
    }
});
    
