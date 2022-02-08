// List of available colors dark to light
const BRIGHT = ["#E43333", "#E48C33", "#E4E433", "#8CE433", "#33E433",
        "#33E48C", "#33E4E4", "#338CE4", "#3333E4", "#8C33E4", "#E433E4"];
const gridContainer = document.querySelector(".grid-container");

// Boolean of options to toggle for event listener removal
let customSet = true;
let rainbowSet = false;
let greyscaleSet = false;
let fadeSet = false;

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

const setColor = function () {
    const currentSetting = document.querySelector(".selected");
    if (currentSetting.firstElementChild.id == "customColor") {
        goCustomColor();
    } else if (currentSetting.firstElementChild.id == "greyscale") {
        goGreyscale();
    } else if (currentSetting.firstElementChild.id == "rainbow") {
        goRainbow();
    }
};

const setCustomColor = function (e) {
    let pickedColor = document.getElementById("customColor");
    pickedColor = pickedColor.value;
    e.target.style.backgroundColor = pickedColor;
}

const goCustomColor = function () {
    const tiles = document.querySelectorAll("#tile");
    removeListeners(tiles);
    customSet = true;
    tiles.forEach( (tile) => {
        // tile.style.backgroundColor = "#FFFFFF";
        tile.addEventListener("mouseenter", setCustomColor);
    })
}

const setGreyscale = function (e) {
    e.target.style.backgroundColor = "#000000"
    let opacity = e.target.style.opacity;
    if (opacity < 1) {
        e.target.style.opacity = ((opacity * 10) + (0.1 * 10))/ 10;
    }
}

const goGreyscale = function () {
    const greyTiles = document.querySelectorAll("#tile");
    removeListeners(greyTiles);
    greyscaleSet = true;
    greyTiles.forEach( (greyTile) => {
        greyTile.style.opacity = 0;
        greyTile.addEventListener("mouseenter", setGreyscale);
    })
};

const setRainbowColor = function (e) {
    let listLength = BRIGHT.length;
    let randomChoice = Math.floor(Math.random() * listLength);
    const randomColor = BRIGHT[randomChoice];
    e.target.style.backgroundColor = randomColor;
};

const goRainbow = function () {
    const rainbowTiles = document.querySelectorAll("#tile");
    removeListeners(rainbowTiles);
    rainbowSet = true;
    rainbowTiles.forEach( (rainbowTile) => {
        rainbowTile.addEventListener("mouseenter", setRainbowColor);
    })
}

const goGridSize = function (e) {
    if (e.target.value >= 2 && e.target.value <= 100) {
        resetGrid();
        drawGrid(e.target.value);
        setColor();
        if (enableFade.checked == true) {
            setFade();
        }
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
    resetGrid();
    drawGrid(changeGrid.value);
    setColor();
    const fadeTiles = document.querySelectorAll("#tile");
    const fadeToggle = document.getElementById("enableFade");
    if (fadeToggle.checked == true && fadeToggle.disabled == false) {
        fadeTiles.forEach( (fadeTile) => {
            fadeSet = true;
            fadeTile.addEventListener("mouseleave", fadeColor);
        })
    } else {
        fadeTiles.forEach( (fadeTile) => {
            fadeSet = false;
            fadeTile.removeEventListener("mouseleave", fadeColor);
        })
    }
};

const selectedOn = function (e) {
    selectedOff();
    if (e.target.firstElementChild) {
        const div = e.target;
        div.classList.add("selected");
    } else {
        const div = e.target.parentElement;
        div.classList.add("selected");
    }
    console.log(div);
}

const selectedOff = function () {
    const element = document.querySelector(".selected");
    if (element) {
        element.classList.remove("selected");
    }
}

// Helper function to remove any previous option listeners
const removeListeners = function (targetTiles) {
    if (customSet == true) {
        customSet = false;
        targetTiles.forEach ( (targetTile) => {
            targetTile.removeEventListener("mouseenter", setCustomColor);
        })
    } else if (greyscaleSet == true) {
        greyscaleSet = false;
        targetTiles.forEach( (targetTile) => {
            targetTile.style.backgroundColor = "#FFFFFF";
            targetTile.style.opacity = 1;
            targetTile.removeEventListener("mouseenter", setGreyscale);
        })
    } else if (rainbowSet == true) {
        rainbowSet = false;
        targetTiles.forEach( (targetTile) => {
            targetTile.removeEventListener("mouseenter", setRainbowColor);
        })
    } else if (fadeSet == true && enableFade.checked == false) {
        fadeSet = false;
        targetTiles.forEach( (targetTile) => {
            targetTile.removeEventListener("mouseleave", fadeColor);
        })
    }
}

drawGrid(16);
setColor();

// Listeners and helper fucntions for color options

const enableFade = document.getElementById("enableFade");
enableFade.addEventListener("change", setFade);

const customColor = document.querySelector(".custom");
customColor.addEventListener("click", goCustomColor);
customColor.addEventListener("click", selectedOn);
customColor.addEventListener("click", () => {
    enableFade.disabled = false;
})

const greyscaleColor = document.querySelector(".grey");
greyscaleColor.addEventListener("click", goGreyscale);
greyscaleColor.addEventListener("click", selectedOn);
greyscaleColor.addEventListener("click", () => {
    enableFade.checked = false;
    enableFade.disabled = true;
    setFade();
})

const rainbowColor = document.querySelector(".rainbow");
rainbowColor.addEventListener("click", goRainbow);
rainbowColor.addEventListener("click", selectedOn);
rainbowColor.addEventListener("click", () => {
    enableFade.disabled = false;
})

const changeGrid = document.getElementById("gridSize");
changeGrid.addEventListener("change", goGridSize);
changeGrid.addEventListener("click", () => {
    enableFade.disabled = false;
})


