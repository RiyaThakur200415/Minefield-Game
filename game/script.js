let attemptsRemaining = 5;

const TOTAL_NODES = 40;

const files = [
"passwords.docx",
"aws_keys.txt",
"finance_report.xlsx",
"employee_records.xlsx",
"client_contract.pdf",
"backup_database.sql",
"todo.md",
"meeting_notes.docx",
"admin_credentials.txt"
];

let assetList = [];

for(let i=0;i<TOTAL_NODES-1;i++){
assetList.push({
label:files[i % files.length],
isReal:false
});
}

assetList.push({
label:"Production Server",
isReal:true
});

assetList.sort(()=>Math.random()-0.5);

const grid=document.getElementById("node-grid");
const log=document.getElementById("log-content");
const chanceDisplay=document.getElementById("chance-counter");

function renderGrid(){

grid.innerHTML="";

assetList.forEach(asset=>{

const div=document.createElement("div");

div.className="node";
div.innerText=asset.label;

div.onclick=()=>handleInteraction(asset);

grid.appendChild(div);

});

}

function handleInteraction(asset){

if(attemptsRemaining<=0)return;

if(asset.isReal){

triggerTrap(
"SUCCESS",
"You found the Production Server!"
);

}
else{

attemptsRemaining--;

chanceDisplay.innerText=`ATTEMPTS REMAINING: ${attemptsRemaining}`;

alert("Trap Triggered! This was a honeypot.");

log.innerHTML=
`<p style="color:red;">> Trap triggered on ${asset.label}</p>`+
log.innerHTML;

if(attemptsRemaining<=0){

triggerTrap(
"HACKER DETECTED",
"Too many traps triggered."
);

}

}

}

function triggerTrap(title,message){

const overlay=document.getElementById("alarm-overlay");
const msgBox=document.getElementById("alarm-msg");
const revealBtn=document.getElementById("reveal-btn");

overlay.classList.remove("hidden");

document.querySelector(".glitch").innerText=title;

msgBox.innerText=message;

revealBtn.classList.remove("hidden");

}

function auditReveal(){

document.getElementById("alarm-overlay").classList.add("hidden");

const nodes=document.querySelectorAll(".node");

nodes.forEach(node=>{

const match=assetList.find(a=>a.label===node.innerText);

if(match && match.isReal){

node.classList.add("real-blue");
node.innerText="REAL SERVER";

}

});

log.innerHTML=
`<p style="color:var(--blue);">> Audit complete. Real server identified.</p>`
+ log.innerHTML;

}

renderGrid();