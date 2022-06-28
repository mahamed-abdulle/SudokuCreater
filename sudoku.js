
/**
 * It takes a row of numbers and returns a 4x4 array of those numbers
 * @param row - an array of 4 numbers
 * @returns A 2D array of the same row.
 */

function makeRows(row) {
	var puzzle = [];
	for(var i = 0; i < 4; i++) {
		puzzle.push(row.slice());
		// console.log(i);
	}
	return puzzle;
}
// var row = [1, 2, 3, 4];
// var puzzle = makeRows(row);
// console.log(visPuzzle(puzzle));

/**
 * A queue is an array with a head and a tail, where you can only add to the tail and remove from the
 * head.
 * @returns the value of the first element in the array.
 */
function Queue() {
	this.arr = [];
	this.head = function() {
		return this.arr[0];
	};
	this.dequeue = function() {
		if (this.arr.length == 0) {
			return "Queue underflow!";
		} else {
			return this.arr.shift();
		}
	};
	this.enqueue = function(o) {
		this.arr.push(o);
	};
	this.isEmpty = function() {
			return this.arr.length == 0;
	};
}

/**
 * It takes a row of numbers and shifts them to the right by p places.
 * @param row - an array of numbers
 * @param p - the number of times to shift the row
 * @returns an array of the values in the queue.
 */
function permuteRow(row, p) {
	let queue;
	queue = new Queue();
	for (var i = 0; i < row.length; i++) {
		// complete this loop to enqueue the values in the array to the queue
		  queue.enqueue(row[i]);
	  }
	while(p > 0) {
		// row = new Queue();
		queue.enqueue(queue.head());
		queue.dequeue();
		p--;
	}
	var arr = [];
	while(!queue.isEmpty()){
		arr.push(queue.head());
		queue.dequeue();
	}
	return arr;
	

}
// var row = [1, 2, 3, 4,5];
// console.log(permuteRow(row , 3));

/**
 * It takes a puzzle and three permutations, and returns the puzzle with the rows permuted according to
 * the permutations
 * @param puzzle - the puzzle to be permuted
 * @param p - the permutation of the first row
 * @param q - the permutation of the first row
 * @param r - the row to permute
 * @returns The puzzle is being returned.
 */
function permutePuzzle(puzzle, p, q, r) {
	var perms = [p,q,r];
    for (var i=0; i<3; i++){
        puzzle[i + 1] = permuteRow(puzzle[i + 1], perms[i]);
    }
    return puzzle;
}
// var row = [1, 2, 3, 4];
// var puzzle = makeRows(row);
// console.log(permutePuzzle(puzzle, 1, 2, 3));



/**
 * For each item in the array, check if it is the item we are looking for.
 * @param array - The array to search through
 * @param item - The item to search for.
 * @returns True or false
 */
function linearSearch(array, item) {
	var n = array.length;
	for (var i = 0; i < n; i++) {
		if (array[i] == item) {
			return true;
		}
 	}
	return false;
}
/**
 * The function checkColumn takes a 2D array and an integer as parameters and returns a boolean value
 * @param puzzle - the puzzle array
 * @param j - the column number
 * @returns a boolean value.
 */

function checkColumn(puzzle, j) {
	//first make an array out of the values stored in column j
	let check = [];
	let checked;
	for(var i = 0; i < 4; i++) {
		check.push(puzzle[i][j]);
		// console.log(check);
		//call linearSearch on the array of column values for all values of k from 1 to 4
		for(var k = 1; k < 5; k++) {
		checked = linearSearch(check,k);
		if(checked == false) {
			break;
			}
		}
	}
	return checked;
}

// var puzzle = [[1 , 2, 3, 4], [2, 3, 4, 1], [3, 4, 1, 2], [4, 1, 2, 3]];
// console.log(checkColumn(puzzle , 1));
// puzzle = [[1 , 2, 3, 4], [2, 3, 4, 1], [2, 3, 4, 1], [4, 1, 2, 3]];
// console.log(checkColumn (puzzle, 2));





/**
 * It takes a puzzle and checks each column for a match
 * @param puzzle - the puzzle to be checked
 * @returns The puzzle with the columns checked.
 */
function colCheck(puzzle) {
	let checkedPuzzle;
	for(var i = 0; i < 4; i++) {
		checkedPuzzle = checkColumn(puzzle,i);
	}
	return checkedPuzzle;
}

// var puzzle = [[1 , 2, 3, 4], [2, 3, 4, 1], [3, 4, 1, 2], [4, 1, 2, 3]];
// console.log(colCheck(puzzle));
// puzzle = [[1 , 2, 3, 4], [2, 3, 4, 1], [2, 3, 4, 1], [4, 1, 2, 3]];
// console.log(colCheck(puzzle));




/**
 * It takes a 2D array, and returns a 1D array of the elements in the 2D array between the given
 * coordinates
 * @param puzzle - the puzzle array
 * @param row1 - the starting row of the grid
 * @param row2 - the row number of the bottom right corner of the grid
 * @param col1 - the column number of the first element in the grid
 * @param col2 - the column number of the last element in the grid
 * @returns An array of all the elements in the grid.
 */
function makeGrid(puzzle, row1, row2, col1, col2) {
	//this copies all elements in a grid from co-ordinates (row1, col1) to (row2,col2) to an array
	var array = [];
	for (var i = row1; i <= row2; i++) {
		for (var j = col1; j <= col2; j++) {
			array.push(puzzle[i][j]);
		}
	}
	return array;
}


/**
 * The function checks if a grid is valid by making a grid, putting the values in an array, and then
 * checking if the array contains the numbers 1-4
 * @param puzzle - the puzzle array
 * @param row1 - the starting row of the grid
 * @param row2 - the row that the grid ends on
 * @param col1 - the first column of the grid
 * @param col2 - the column number of the last column in the grid
 * @returns A boolean value.
 */
function checkGrid(puzzle, row1, row2, col1, col2) {
	let grid =  makeGrid(puzzle, row1, row2, col1, col2);
	let array = [];
	let checked;
	for(var i = 0; i < 4; i++) {
		array.push(grid[i]);
		for(var k = 1; k < 5; k++){
			checked = linearSearch(array,k);
			if(checked == false) {
				break;
			}
		}		
	}
	return checked;
	}
// var puzzle = [[1, 2, 3, 4], [2, 3, 4, 1], [3, 4, 1, 2], [4, 1, 2, 3]];
// console.log(checkGrid(puzzle, 0, 1, 2, 3));
// puzzle = [[1 , 2, 3, 4], [3, 4, 1, 2], [4, 1, 2, 3], [4, 1, 2, 3]];
// console.log(checkGrid (puzzle, 0, 1, 0, 1));




/**
 * This function checks the four grids of the puzzle to see if they are valid
 * @param puzzle - the puzzle to be checked
 * @returns the value of the variable checkedGrid.
 */
function checkGrids(puzzle) {
	let checkedGrid;
	checkedGrid = checkGrid(puzzle,0,1,0,1);
	checkedGrid1 = checkGrid(puzzle,0,1,2,3);
	checkedGrid2 = checkGrid(puzzle,2,3,0,1);
	checkedGrid3 = checkGrid(puzzle,2,3,2,3);
	if(checkedGrid == true && checkedGrid1 == true && checkedGrid2 == true && checkedGrid3 == true) {
		return checkedGrid;
	} 
	return checkedGrid;
}

// var puzzle = [[1, 2, 3, 4], [2, 3, 4, 1], [3, 4, 1, 2], [4, 1, 2, 3]];
// console.log(checkGrids(puzzle));
// puzzle = [[1, 2, 3, 4], [3, 4, 1, 2], [4, 1, 2, 3], [2, 3, 4, 1] ,];
// console.log(checkGrids(puzzle));



/**
 * It takes a row of numbers, makes a puzzle out of it, permutes the puzzle, checks to see if the
 * puzzle is valid, and if it is, returns the puzzle
 * @param row - the row that the user is trying to solve
 * @returns an array of arrays.
 */

function makeSolution(row) {
let arr;
	for(var p = 1; p < 4; p++) {
		for(var q = 1; q < 4; q++) {
			for(var r = 1; r < 4; r++) {
				var puzzle = makeRows(row);
				arr = permutePuzzle(puzzle,p,q,r);
				if(checkGrids(arr) == true && colCheck(arr) == true) {
					return arr;
				}
			}
		}
	}
	return arr;
}
// var row = [1, 2, 3, 4];
// var puzzle = makeSolution(row)
// console.log(puzzle);
// console.log(visPuzzle(puzzle));



/**
 * It takes a number n and returns an array of n random entries from a 4x4 grid
 * @param n - the number of entries to delete
 * @returns An array of arrays.
 */
function entriesToDel(n) {
		var array = [];
		for(let row = 0; row <= 3; row++) {
			for(let col = 0; col <= 3; col++) {
				array.push([row,col])
			}
		}
		let result = [];
		for(let i = 0;i < n; i++) {
			const randomIndex= Math.floor(Math.random() * array.length);
			result.push(array.splice(randomIndex,1)[0])
		}
		return result;
}


/**
 * It takes a row of numbers and a number of blank spaces, and returns a puzzle with that many blank
 * spaces
 * @param row - the row of the solution you want to generate
 * @param n - the number of blank spaces in the puzzle
 * @returns A 2D array of strings.
 */
function genPuzzle(row, n) {
	if (n >= 16) {
		return "Error! Too many blank spaces!";
	}
	var solution = makeSolution(row);
	var blanks = entriesToDel(n);
	for (var i = 0; i < blanks.length; i++) {
		solution[blanks[i][0]][blanks[i][1]] = " ";
	}
	return solution;
}
// var row = [1,2,3,4];
// console.log(visPuzzle(genPuzzle(row,3)))



/**
 * It takes a puzzle and returns a string that represents the puzzle
 * @param puzzle - the puzzle to be visualized
 * @returns A string representation of the puzzle.
 */

function visPuzzle(puzzle) {
	var viz = "";

	for (var i = 0; i < puzzle.length; i++) {
		for (var j = 0; j < puzzle.length; j++) {
			viz = viz + "----";
		}
		viz = viz + "-\n";
		for (var j = 0; j < puzzle.length; j++) {
			viz = viz + "| " + puzzle[i][j] + " ";
		}
		viz = viz + "| " + "\n";
	}
	for (var j = 0; j < puzzle.length; j++) {
			viz = viz + "----";
	}
	viz = viz + "-";

	return viz;
}

