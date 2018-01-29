window.onload = function() {
	//run the init function on load
	init();
}

//initialises the canvas and adds event listeners

function init() {
	var canvas = document.getElementById("canvas");
	window.ctx = canvas.getContext("2d");
	var width = canvas.width, height = canvas.height, size = 130;

	// generate initial tree at 45 deg
	run(width, height, size, -Math.PI/4, 10);

	//event listener for click of run button, will generate a tree with 45deg angle
	document.getElementById("limitButton").addEventListener("click", function(e) {
		run(width, height, size,  -Math.PI/4, 10);
	});

	//event listener for canvas hover, obtain the location of mouse to get angle value
	document.getElementById("canvas").addEventListener("mousemove", function(e) {
		var dy = e.clientY, dx = e.clientX - this.offsetLeft; // set to canvas width
		//convert the y mouse position into a limit between 1 and 12
		var limit = Math.floor(12 - (dy/100));
		//convert the x position into an angle between 0 and 1.5 (0 and 90deg)
		angle = Math.abs(1.5 - dx/1000);
		//run th function to build the tree
		run(width, height, size, -angle, limit);
	});
}

// function to build the tree, pass in an angle and limit as a parameter

function run(width, height,size, angle, limit) {

	ctx.clearRect(0, 0, width, height);

	var branchAngleA = angle; //minus becuase it rotates counter clockwise
  
    //call the function to draw boxes

    tree(width/2 - 75, height, size, 0, limit);

	function tree(x, y, size, angle, limit) {
		ctx.save();
		ctx.translate(x, y);
		ctx.rotate(angle);
		ctx.fillStyle  = 'rgb(0, ' + Math.floor(42.5 * limit) + ', ' + Math.floor(25 * limit) + ' )';
		ctx.fillRect(0, 0, size, -size);

		//left hand square 

		var x0 = 0, 
		y0 = -size, 
		size0 = Math.abs(Math.cos(branchAngleA) * size), 
		angle0 = branchAngleA;

		if (limit > 0) {
			tree(x0, y0, size0, angle0, limit - 1);
		} else {
			ctx.save();
			ctx.translate(x0, y0);
			ctx.rotate(angle0);
			ctx.fillRect(0, 0, size0, -size0);
			ctx.restore();
		}

		//right hand square

		var y1 = y0 - Math.abs(Math.sin(branchAngleA) * size0);
		var x1 = x0 + Math.abs(Math.cos(branchAngleA) * size0);
		var angle1 = angle0 + Math.PI / 2;
		var size1 = Math.abs(Math.cos(angle1) * size);

		if (limit > 0) {
			tree(x1, y1, size1, angle1, limit - 1);
		} else {
			ctx.save();
			ctx.translate(x1, y1);
			ctx.rotate(angle1);
			ctx.fillRect(0, 0, size1, -size1);
			ctx.restore();
		}

		ctx.restore();
	}

} // end of function



