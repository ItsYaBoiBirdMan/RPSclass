const width = 1000;
const height = 400;

var scoreBoard;

function preload() {
    
}

async function setup() {
    noLoop();
    let canvas = createCanvas(width, height);
    canvas.parent('game');
    let p1 = await requestPlayerMatchInfo(playerMatchId);
    let p2 = await requestPlayerMatchInfo(opponentMatchId);
    scoreBoard = new ScoreBoard(p1.ply_name,p2.ply_name,p1.pm_hp,p2.pm_hp,p1.pms_name,p2.pms_name); // we need to change the HP later
    loop();
}
function draw() {
    background(220);
    scoreBoard.draw();
}
function mouseClicked() {
         
}
