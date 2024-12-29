const data = [
    {
        cube: "3x3",
        times: {
            1: "39.002"
        }
    },
    {
        cube: "2x2",
        times: {
            1: "15.024"
        }
    }
];

document.addEventListener("DOMContentLoaded", 
    function setup() {
        document.getElementById("cube").innerHTML = `
            <select>
            <option value="3x3">3x3</option>
            <option value="2x2">2x2</option>
            <option value="4x4">4x4</option>
            <option value="5x5">5x5</option>
            <option value="6x6">6x6</option>
            <option value="7x7">7x7</option>
            <option value="3BLD">3x3 Blindfolded</option>
            <option value="3FM">3x3 Fewest Moves</option>
            <option value="3OH">3x3 One Hand</option>
            <option value="Clock">Clock</option>
            <option value="Mega">Megamix</option>
            <option value="Pyra">Pyraminx</option>
            <option value="Skewb">Skewb</option>
            <option value="Square1">Square-1</option>
            <option value="4BLD">4x4 Blindfolded</option>
            <option value="5BLD">5x5 Blindfolded</option>
            </select>
        `
    
        document.getElementById("mode").innerHTML = `
            <select>
            <option value="PC">PC</option>
            <option value="mobile">Mobile</option>
            </select>
            `
    
    }
);

const display = document.getElementById("TIME");
const statslist = document.getElementById("stats-1");
let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;
let solveno = 0;

// Start/Stop timer with spacebar
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        toggleTimer();
    }
});

function toggleTimer() {
    if (isRunning) {
        stopTimer();
    } else {
        startTimer();
    }
}

function startTimer() {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(updateTimer, 10);
    isRunning = true;
}

function stopTimer() {
    clearInterval(timer);
    isRunning = false;
    display.textContent = "0.000";
    solveno ++;

    statslist.innerHTML = `
                    <div class="time-item" id="time-item-${solveno}">
            <table>
            <tr>
            <td class="solveno">
                ${solveno}.
            </td>
            <td>
                <h4 class="timeofsolve" id="solveno-${solveno}">${(elapsedTime / 1000).toFixed(3)}</h4>
            </td>
            <td>
                <a class="plus2" href="javascript:update('2', ${solveno});">+2</a>
            </td>
            <td>
                <a class="dnf" href="javascript:update('DNF', ${solveno});">DNF</a>
            </td>
            <td>
                <a class="delete" href="javascript:update('DELETE', ${solveno});">DELETE</a>
            </td>
            </tr>
            </table>
                    </div>
    ${statslist.innerHTML}`
    
}

function updateTimer() {
    elapsedTime = Date.now() - startTime;
    display.textContent = (elapsedTime / 1000).toFixed(3);
}

function update(time, solveno) {
    if (time === "DELETE") {
        document.getElementById(`time-item-${solveno}`).remove();
    } else if (time === "DNF") {
        document.getElementById(`solveno-${solveno}`).textContent = "DNF";
    } else {
        document.getElementById(`solveno-${solveno}`).textContent = time + 2;
    }
}