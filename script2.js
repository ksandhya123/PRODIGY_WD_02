let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let laps = [];

function startStop() {
    if (isRunning) {
        clearInterval(timer);
        elapsedTime += Date.now() - startTime;
        document.getElementById('startStopBtn').textContent = 'Start';
    } else {
        startTime = Date.now();
        timer = setInterval(updateDisplay, 100);
        document.getElementById('startStopBtn').textContent = 'Stop';
    }
    isRunning = !isRunning;
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    laps = [];
    document.getElementById('display').textContent = '00:00:00.0';
    document.getElementById('startStopBtn').textContent = 'Start';
    updateLaps();
}

function recordLap() {
    if (isRunning) {
        const lapTime = elapsedTime + (Date.now() - startTime);
        laps.push(formatTime(lapTime));
        updateLaps();
    }
}

function updateDisplay() {
    const currentTime = elapsedTime + (Date.now() - startTime);
    document.getElementById('display').textContent = formatTime(currentTime);
}

function updateLaps() {
    const lapsList = document.getElementById('lapsList');
    lapsList.innerHTML = '';
    laps.forEach((lap, index) => {
        const li = document.createElement('li');
        li.textContent = `Lap ${index + 1}: ${lap}`;
        lapsList.appendChild(li);
    });
}

function formatTime(time) {
    const milliseconds = Math.floor(time % 1000 / 100);
    const seconds = Math.floor(time / 1000 % 60);
    const minutes = Math.floor(time / 60000 % 60);
    const hours = Math.floor(time / 3600000);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds}`;
}
