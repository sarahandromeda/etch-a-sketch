// List of available colors dark to light
const COLORS = ["#154360", "#1A5276", "#1F618D", "#2471A3", "#2980B9",
        "#5499C7", "#7FB3D5", "#A9CCE3", "#D4E6F1", "#EAF2F8", "#FFFFFF"];
const gridContainer = document.querySelector(".grid-container");

const drawGrid = function (size) {
    for (let i=0; i < (size**2); i++) {
        const newTile = document.createElement("div");
        newTile.id = "tile";
        gridContainer.appendChild(newTile);
    }
    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
}

const resetGrid = function () {
    while (gridContainer.lastElementChild) {
        gridContainer.removeChild(gridContainer.lastElementChild)
    }
}

const fadeColor = function (e) {
    let i = 1;
    const targetElem = e.target;
    let interval = setInterval(paint, 500);
    function paint() {
        if (i < 0) {
            targetElem.style.backgroundColor = "#FFF";
            targetElem.style.opacity = 1;
            clearInterval(interval);
        } else {
            targetElem.style.opacity = i;
            i = (i * 10 - 0.2 * 10)/ 10;
        }
    }
};

const setFade = function () {
    const fadeTiles = document.querySelectorAll("#tile");
    const fadeToggle = document.getElementById("enableFade");
    if (fadeToggle.checked == true) {
        fadeTiles.forEach( (fadeTile) => {
            fadeTile.addEventListener("mouseleave", fadeColor);
        })
    } else {
        fadeTiles.forEach( (fadeTile) => {
            fadeTile.removeEventListener("mouseleave", fadeColor);
        })
    }
};

const getColor = function () {
    const colorPicker = document.getElementById("customColor");
    return colorPicker.value;
}

const setColor = function () {
    const pickedColor = getColor();
    console.log(pickedColor);
    const tiles = document.querySelectorAll("#tile");
    tiles.forEach( (tile) => {
        tile.addEventListener("mouseenter", () => {
            tile.style.backgroundColor = pickedColor;
        });
    })
};

drawGrid(16);
setColor();

// Listeners and helper fucntions for color options

const customColor = document.getElementById("customColor");
customColor.addEventListener("change", setColor);

const changeGrid = document.getElementById("gridSize");
changeGrid.addEventListener("change", (e) => {
    if (e.target.value >= 2 && e.target.value <= 100) {
        resetGrid();
        drawGrid(e.target.value);
        setColor();
        if (enableFade.checked == true) {
            setFade();
        }
    }
})

const enableFade = document.getElementById("enableFade");
enableFade.addEventListener("change", setFade);


