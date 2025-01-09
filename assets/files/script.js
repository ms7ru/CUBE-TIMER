import { randomScrambleForEvent } from "https://cdn.cubing.net/v0/js/cubing/scramble";

var lisOfSolvesArray = [];
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

var listsofsolves = {};

function stopTimer() {
    
    clearInterval(timer);
    isRunning = false;
    display.textContent = "0.000";
    solveno ++;

    
    //listsofsolves.push(elapsedTime / 1000);

    update(elapsedTime / 1000, solveno);
    
    elapsedTime = 0;
}

function updateTimer() {
    elapsedTime = Date.now() - startTime;
    display.textContent = (elapsedTime / 1000).toFixed(3);
}

function getScrambleANdUpdate() {
    randomScrambleForEvent("333").then((scramble) => {
        document.getElementById("SCRAMBLE").innerHTML = scramble;
    });

    document.getElementById("scramble").setAttribute("scramble", document.getElementById("SCRAMBLE").innerHTML);
}
let solveChart;

// Function to initialize or update the chart
function updateChart() {
    // If chart already exists, destroy it
    if (solveChart) {
        solveChart.destroy();
    }

    // Get the canvas element
    const ctx = document.getElementById('myChart').getContext('2d');

    // Create new chart
    solveChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({ length: lisOfSolvesArray.length }, (_, i) => i + 1),
            datasets: [{
                data: lisOfSolvesArray,
                borderColor: '#007bff',
                borderWidth: 2,
                fill: false,
                tension: 0.1,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#fff'
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#fff',
                        display: false
                    }
                }
            },
            animation: {
                duration: 4
            }
        }
    });
}

// Initialize the chart
updateChart();

// Modify your update function to update the chart when new solves are added
// Add these functions at the top of your script

function calculateAverage(solves, n) {
    if (solves.length < n) return null;
    
    // Get last n solves
    let lastNSolves = solves.slice(-n);
    
    // Sort to remove best and worst times
    let sortedSolves = [...lastNSolves].sort((a, b) => a - b);
    sortedSolves = sortedSolves.slice(1, -1); // Remove best and worst
    
    // Calculate average of remaining times
    let sum = sortedSolves.reduce((a, b) => a + b, 0);
    return (sum / sortedSolves.length).toFixed(3);
}

function getPersonalBest(solves) {
    if (solves.length === 0) return null;
    return Math.min(...solves).toFixed(3);
}

function updateStats() {
    const statsDisplay = document.getElementById('stats-3');
    const pb = getPersonalBest(lisOfSolvesArray);
    const ao5 = calculateAverage(lisOfSolvesArray, 5);
    const ao12 = calculateAverage(lisOfSolvesArray, 12);

    statsDisplay.innerHTML = `
        <div style="padding: 20px; font-family: 'Audiowide', serif; display: flex; flex-direction: column; gap: 10px;">
            <div style="background: #252429; padding: 15px; border-radius: 8px;">
                <div style="font-size: 12px; color: #666;">pb</div>
                <div style="font-size: 24px;">${pb || '--.---'}</div>
            </div>
            
            <div style="display: flex; gap: 10px;">
                <div style="background: #252429; padding: 15px; border-radius: 8px; flex: 1;">
                    <div style="font-size: 12px; color: #666;">ao5</div>
                    <div style="font-size: 24px;">${ao5 || '--.---'}</div>
                </div>
                
                <div style="background: #252429; padding: 15px; border-radius: 8px; flex: 1;">
                    <div style="font-size: 12px; color: #666;">ao12</div>
                    <div style="font-size: 24px;">${ao12 || '--.---'}</div>
                </div>
            </div>
        </div>
    `;
}

// Modify your existing update function to include stats update
function update(a, b) {
    statslist.innerHTML = `
                    <div class="time-item" id="time-item-${b}">
            <table>
            <tr>
            <td class="solveno">
                ${b}.
            </td>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
            <td>
                <h4 class="timeofsolve" id="solveno-${b}">${a}</h4>
            </td>
            </tr>
            </table>
                    </div>
    ${statslist.innerHTML}`

    getScrambleANdUpdate();

    lisOfSolvesArray.push(a);
    
    // Update the chart with new data
    updateChart();
    // Update statistics
    updateStats();

    console.log(lisOfSolvesArray);
}

// Initialize stats display
updateStats();

