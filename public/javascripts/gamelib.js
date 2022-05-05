const width = 1000;
const height = 400;

var scoreBoard;

function preload() {
    
}

async function setup() {
    noLoop();
    let canvas = createCanvas(width, height);
    canvas.parent('game');
    let p1 = await requestPlayerInfo(playerId);
    let p2 = await requestPlayerInfo(opponentId);
    scoreBoard = new ScoreBoard(p1.ply_name,p2.ply_name,3,3); // we need to change the HP later
    loop();
}
function draw() {
    background(220);
    scoreBoard.draw();
}
function mouseClicked() {
         
}
