const body = document.querySelector("body");
const gridContainer = document.createElement("div");
const userInput = document.querySelector("input");
const enterBtn = document.querySelector("#enterBtn");
const resetBtn = document.querySelector("#resetBtn");

gridContainer.id = "gridContainer"

enterBtn.addEventListener("click", changeGrid)
resetBtn.addEventListener("click", resetGrid)


let input = 32; //# of squares should equal the input*input or input^2

const squares = [] //arrray to store squares for later modicifaction

//Created Grid
function createGrid(input){

    gridContainer.innerHTML = "";
    squares.length = 0; // also reset the squares array
    
    const squareSize = 2000 / input ; //set the size of the square equal to the width/height divided by the input number of squares

    for(let i=0; i < input * input; i++){ //loop through the total # of square which is input * input
        const square = document.createElement("div");
        square.style.width = `${squareSize}px`; //width = calculated squareSize
        square.style.height = `${squareSize}px`; //height = calculated squareSize
        square.addEventListener("mouseover", () => changeColor (square)); //Loop through and add event listener to every square and apply change color function

        gridContainer.appendChild(square); //add squares to grid container so they render
        squares.push(square); //add squares to array
    }
body.appendChild(gridContainer); //add grid container to body of page so it renders
}

//Function to change square to random color
function changeColor(square){       
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    square.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}

//Function to create new grid
function changeGrid(){
    const currentValue = Number(userInput.value);
    if(currentValue > 0 && currentValue <= 100){
        createGrid(currentValue);
    }
    else{
        alert("This input is not allowed. Please enter a number between 1 and 100.")
    }
}

//Function to reset the grid
function resetGrid(){
    
    /**Another way to do it
     
    const coloredSquares = gridContainer.children //Store squares from gridContainer
    for(const coloredSquare of coloredSquares){ //For loop through.
        coloredSquare.style.backgroundColor = ""
    }
    
    */
    
    squares.forEach(square => {
        square.style.backgroundColor = ""
       })

    
}
// Call create grid function
createGrid(input);