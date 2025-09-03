// ----------------------
// Global State
// ----------------------
let input = 32; // default grid size (# of squares per side)
let drawEnabled = false;
let eraserEnabled = false;
let rainbowEnabled = false;
let isMouseDown = false;

const squares = []; // array to store squares for later modification


// ----------------------
// DOM References
// ----------------------
const body = document.querySelector("body");
const gridContainer = document.createElement("div");
gridContainer.id = "gridContainer";

const userInput = document.querySelector("input");
const enterBtn = document.querySelector("#enterBtn");
const colorBtn = document.querySelector("#colorBtn");
const colorInput = document.querySelector("#colorPicker");
const rainbowBtn = document.querySelector("#rainbowBtn");
const drawBtn = document.querySelector("#drawBtn");
const eraserBtn = document.querySelector("#eraserBtn");
const resetBtn = document.querySelector("#resetBtn");


// ----------------------
// Global Event Listeners
// ----------------------
enterBtn.addEventListener("click", changeGrid);
colorBtn.addEventListener("click", () => colorInput.click());
rainbowBtn.addEventListener("click", toggleRainbow);
drawBtn.addEventListener("click", toggleDraw);
eraserBtn.addEventListener("click", toggleEraser);
resetBtn.addEventListener("click", resetGrid);

// Track mouse state for drag drawing
document.addEventListener("mousedown", () => { isMouseDown = true; });
document.addEventListener("mouseup", () => { isMouseDown = false; });


// ----------------------
// Functions
// ----------------------

// Create Grid
function createGrid(input) {
    gridContainer.innerHTML = "";
    squares.length = 0; // reset the squares array
    
    const squareSize = 550 / input;

    for (let i = 0; i < input * input; i++) {
        const square = document.createElement("div");
        square.style.width = `${squareSize}px`;
        square.style.height = `${squareSize}px`;

        // Color square on mouseover (drag painting)
        square.addEventListener("mouseover", () => {
            if (drawEnabled && isMouseDown) {
                changeColor(square);
            }
        });

        // Color square on single click
        square.addEventListener("mousedown", () => {
            if (drawEnabled) {
                changeColor(square);
            }
        });

        gridContainer.appendChild(square);
        squares.push(square);
    }

    body.appendChild(gridContainer);
}

// Change Color
function changeColor(square) {
    if (eraserEnabled) {
        square.style.backgroundColor = "white";
    } else if (rainbowEnabled) {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        square.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    } else {
        square.style.backgroundColor = colorInput.value;
    }
}

// Toggle Draw
function toggleDraw() {
    drawEnabled = !drawEnabled;
    drawBtn.textContent = drawEnabled ? "Draw: ON" : "Draw: OFF";
    drawBtn.style.backgroundColor = drawEnabled ? "green" : "";
}

// Toggle Eraser
function toggleEraser() {
    eraserEnabled = !eraserEnabled;
    eraserBtn.textContent = eraserEnabled ? "Eraser: ON" : "Eraser: OFF";
    eraserBtn.style.backgroundColor = eraserEnabled ? "green" : "";
}

// Toggle Rainbow
function toggleRainbow() {
    rainbowEnabled = !rainbowEnabled;
    rainbowBtn.style.background = rainbowEnabled
        ? "linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)"
        : "";
    rainbowBtn.style.color = rainbowEnabled ? "white" : "black";
}

// Change Grid
function changeGrid() {
    const currentValue = Number(userInput.value);
    if (currentValue > 0 && currentValue <= 100) {
        createGrid(currentValue);
    } else {
        alert("This input is not allowed. Please enter a number between 1 and 100.");
    }
}

// Reset Grid
function resetGrid() {
    squares.forEach(square => {
        square.style.backgroundColor = "";
    });
}


// ----------------------
// Init
// ----------------------
createGrid(input);
window.addEventListener('load', () => {
    alert("Welcome to my sketch pad!\n\nClick and drag on the grid to draw.\nUse the buttons to change colors, toggle rainbow mode, or erase.");
});