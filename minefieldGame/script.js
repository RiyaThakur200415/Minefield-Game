let attemptsRemaining = 5;
const TOTAL_DECOYS = 51; // 50 traps + 1 real
let assetList = Array.from({ length: TOTAL_DECOYS }, (_, i) => ({
    label: `IP:.1.${100+i}`,
    isReal: false
}));

// Assign the Real Server randomly
const winner = Math.floor(Math.random() * TOTAL_DECOYS);
assetList[winner].isReal = true;

const grid = document.getElementById('node-grid');
const log = document.getElementById('log-content');
const chanceDisplay = document.getElementById('chance-counter');

function renderGrid() {
    grid.innerHTML = '';
    // Shuffling simulates the "Automated Adaptive Minefield" [7, 8]
    assetList.sort(() => Math.random() - 0.5); 
    
    assetList.forEach(asset => {
        const div = document.createElement('div');
        div.className = 'node';
        div.innerText = asset.label;
        div.onclick = () => handleInteraction(asset);
        grid.appendChild(div);
    });
}

function handleInteraction(asset) {
    if (attemptsRemaining <= 0) return;

    if (asset.isReal) {
        // High-Fidelity Signal logic: Touching the real server by chance [1, 9]
        triggerTrap("MISSION SUCCESS", "You successfully identified the Production Server.");
    } else {
        attemptsRemaining--;
        chanceDisplay.innerText = `ATTEMPTS REMAINING: ${attemptsRemaining}`;
        
        // Simulation of a "Binary and Ruthless" response [9]
        alert(`TRAP TRIGGERED! node ${asset.label} is an AI-decoy.\nShifting network topology...`);
        log.innerHTML = `<p style="color:red;">> IoC DETECTED: Intruder probed ${asset.label}</p>` + log.innerHTML;

        if (attemptsRemaining <= 0) {
            triggerTrap("!! HACKER DETECTED !!", "5/5 attempts triggered. Access is Denied.");
        } else {
            renderGrid(); // Shuffle and re-render
        }
    }
}

function triggerTrap(title, message) {
    const overlay = document.getElementById('alarm-overlay');
    const msgBox = document.getElementById('alarm-msg');
    const revealBtn = document.getElementById('reveal-btn');

    overlay.classList.remove('hidden');
    document.querySelector('.glitch').innerText = title;
    msgBox.innerText = message;

    // Show the hidden Audit button only when the intruder is blocked [10]
    revealBtn.classList.remove('hidden');
}

// Request: On clicking the button, show the window again and color real server blue
function auditReveal() {
    // 1. Hide the alarm overlay
    document.getElementById('alarm-overlay').classList.add('hidden');
    
    // 2. Identify and highlight the real server in BLUE
    const nodes = document.querySelectorAll('.node');
    nodes.forEach(node => {
        const match = assetList.find(a => a.label === node.innerText);
        if (match && match.isReal) {
            node.classList.add('real-blue');
            node.innerText = "REAL";
        }
    });

    log.innerHTML = `<p style="color:var(--blue);">> AUDIT COMPLETE: Real server location identified.</p>` + log.innerHTML;
    alert("Audit Successful: The location of the actual Production Asset is now highlighted in BLUE.");
}

renderGrid();
