// List of available colors dark to light
const BRIGHT = ["#E43333", "#E48C33", "#E4E433", "#8CE433", "#33E433",
        "#33E48C", "#33E4E4", "#338CE4", "#3333E4", "#8C33E4", "#E433E4"];
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

const getCustomColor = function () {
    const colorPicker = document.getElementById("customColor");
    return colorPicker.value;
}

const setColor = function () {
    const currentSetting = document.querySelector(".selected");
    if (currentSetting.firstElementChild.id == "customColor") {
        const pickedColor = getCustomColor();
        console.log(pickedColor);
        const tiles = document.querySelectorAll("#tile");
        tiles.forEach( (tile) => {
            tile.addEventListener("mouseenter", () => {
                tile.style.backgroundColor = pickedColor;
            });
        })
    } else if (currentSetting.firstElementChild.id == "greyscale") {
        //
    } else if (currentSetting.firstElementChild.id == "rainbow") {
        setRainbow();
    }
};

const getRainbowColor = function () {
    let listLength = BRIGHT.length;
    let randomChoice = Math.floor(Math.random() * listLength);
    return BRIGHT[randomChoice];
};


const setRainbow = function () {
    const rainbowTiles = document.querySelectorAll("#tile");
    rainbowTiles.forEach( (rainbowTile) => {
        rainbowTile.addEventListener("mouseenter", () => {
            rainbowTile.style.backgroundColor = getRainbowColor();
        })
    })
}

const selectedOn = function (e) {
    selectedOff();
    const div = e.target.parentElement;
    console.log(div);
    div.classList.add("selected");
}

const selectedOff = function () {
    const element = document.querySelector(".selected");
    if (element) {
        element.classList.remove("selected");
    }
}

drawGrid(16);
setColor();

// Listeners and helper fucntions for color options

const customColor = document.getElementById("customColor");
customColor.addEventListener("change", setColor);
customColor.addEventListener("click", selectedOn);

const rainbowColor = document.getElementById("rainbow");
rainbowColor.addEventListener("click", setRainbow);
rainbowColor.addEventListener("click", selectedOn);

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


