let bgSound = new Audio("Background Sound 2.mp3");
let drawSound = new Audio("Draw sound.wav");
let winnigSound = new Audio("Game Winning Sound.mp3");
bgSound.loop = true;
// bgSound.volume = 0.5;
// bgSound.play();

// #########################################

const soundToggle = document.getElementById("soundToggle");
// const audio = new Audio("path/to/sound-file.mp3"); // Replace 'path/to/sound-file.mp3' with the actual path to your sound file

soundToggle.addEventListener("change", () => {
    if (soundToggle.checked) {
        bgSound.play();
    } else {
        bgSound.pause();
        // audio.currentTime = 0;
    }
});

// #########################################

// change the turn function
let turn = "O";
const changeTurn = () => {
    document.getElementById("termText").textContent = "Turn of " + turn;
    return turn === "O" ? "X" : "O";
};

// reload function
function refreshPage() {
    location.reload(); // Reload the current page
}

// check win function
const refreshBtn = document.querySelector(".bg button[type='reset']");
let flag = false;
let count = 0;

const checkWin = () => {
    count++;
    let boxes = document.querySelectorAll(".box");
    let wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    wins.forEach((e) => {
        if (
            boxes[e[0]].innerHTML === boxes[e[1]].innerHTML &&
            boxes[e[1]].innerHTML === boxes[e[2]].innerHTML &&
            boxes[e[0]].innerHTML !== ""
        ) {
            // Add a class to the winning boxes
            e.forEach((index) => {
                boxes[index].classList.add("winning-box");
            });

            // Set the winner text to an empty string
            document.getElementById("termText").textContent = "The Winner is " + boxes[e[0]].innerHTML;

            // Display the restart button
            document.querySelector("button[type='reset']").style.display = "inline-block";

            // Attach click event to the restart button
            document.querySelector("button[type='reset']").addEventListener("click", refreshPage);

            // Set the background sound volume to 0
            bgSound.volume = 0;

            // Play the winning sound
            winnigSound.play();

            // Set the background sound volume back to a lower level (adjust as needed)
            bgSound.volume = 0.2;

            // Set the flag to true
            flag = true;
        }
    });
};

// draw function
const checkDraw = () => {
    let boxes = document.querySelectorAll(".box");
    let isDraw = true;

    for (let i = 0; i < boxes.length; i++) {
        if (boxes[i].innerHTML === "") {
            isDraw = false;
            break;
        }
    }

    if (isDraw && !flag) {
        document.getElementById("termText").textContent = "It's a Draw!";
        refreshBtn.style.display = "inline-block";
        refreshBtn.addEventListener("click", refreshPage);
        bgSound.volume = 0;
        drawSound.play();
        bgSound.volume = 0.2;
    }
};

let boxes = document.querySelectorAll(".box");
Array.from(boxes).forEach((element) => {
    element.addEventListener("click", () => {
        if (element.innerHTML === "" && flag === false) {
            element.innerHTML = changeTurn();
            turn = changeTurn();
        }
        checkWin();
        checkDraw();
        // console.log(element.innerHTML);
    });
});
