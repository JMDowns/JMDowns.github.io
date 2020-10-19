var canvas = document.getElementById("grid");
var grid_size = 5;
canvas.width = grid_size*40;
canvas.height = grid_size*40;
var ctx = canvas.getContext("2d");

var interval_time = 250;

for (var i = 0; i < grid_size; i++) {
    for (var j = 0; j < grid_size; j++) {
	ctx.fillStyle = "#000000"
	ctx.strokeRect(40*i,40*j,40,40);
    }
}

var sizeText = document.getElementById("size");
var slider = document.getElementById("myRange");
sizeText.innerHTML = slider.value;

var button = document.getElementById("mybutton");

var grid = new Array(grid_size*grid_size).fill(0);
var new_grid = new Array(grid_size*grid_size).fill(0);

var game_started = false;

slider.oninput = () => {
    sizeText.innerHTML = slider.value;
}

slider.addEventListener('mouseup', (event) => {
    if (game_started) {
	return;
    }
    grid_size = slider.value;
    
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

});

var interval;

runGame = () => {
    console.log(grid);
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
	    if (sum > 3 || sum < 2) {
		new_grid[i] = 0;
	    }
	    else {
		new_grid[i] = 1;
	    }
	}
	else {
	    if (sum == 3) {
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
	game_started = !game_started;
	//Found the concept of an interval on stackoverflow
	interval = window.setInterval(() => {
	    runGame();
	}, interval_time);
    }
    else {
	button.innerHTML = "Start";
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
    
