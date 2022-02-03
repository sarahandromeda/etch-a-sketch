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
    let i = 0;
    const targetElem = e.target;
    let interval = setInterval(paint, 1000);
    function paint() {
        if (i == COLORS.length) {
            clearInterval(interval);
        } else {
            targetElem.style.backgroundColor = COLORS[i];
            i++;
        }
    }
};

const setFade = function () {
    const fadeTiles = document.querySelectorAll("#tile");
    const fadeToggle = document.getElementById("noFade");
    if (fadeToggle.checked == false) {
        fadeTiles.forEach( (fadeTile) => {
            fadeTile.addEventListener("mouseleave", fadeColor);
        })
    };
}

const setColor = function () {
    const tiles = document.querySelectorAll("#tile");
    tiles.forEach( (tile) => {
        tile.addEventListener("mouseenter", () => {
            tile.style.backgroundColor = COLORS[0];
        });
    })
};

drawGrid(16);
setColor();
setFade();

const changeGrid = document.getElementById("gridSize");
changeGrid.addEventListener("change", (e) => {
    if (e.target.value >= 2 && e.target.value <= 100) {
        resetGrid();
        drawGrid(e.target.value);
        setColor();
        setFade();
    }
})

const disableFade = document.getElementById("noFade");
disableFade.addEventListener("change", (e) => {
    if (disableFade.checked == true) {
        const gridTiles = document.querySelectorAll("#tile");
        gridTiles.forEach( (elem) => {
            elem.removeEventListener("mouseleave", fadeColor)
        })
    } else {
        const gridTiles = document.querySelectorAll("#tile");
        gridTiles.forEach( (elem) => {
            elem.addEventListener("mouseleave", fadeColor)
        })
    }
})


