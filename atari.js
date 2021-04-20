let playerScore = 0;
let line;

function setup() {
    createCanvas(800, 600);
    line = new Line();
}

function draw() {
    background(0);
    //dimensioni pallina
    ellipse(50, 50, 50, 50); 
    //testo score
    textSize(32);
    text('Score:${playerScore}',width - 150, 50);
    fill(255);
    line.display();
}

class Line {
    constructor() {
        this.width = 150;
        this.height = 25;
        this.color = color(255);
        this.location = createVector((width / 2) - (this.width / 2), height - 35);
    }

    display() {
        fill(this.color);
        rect(this.location.x, this.location.y, this.width, this.height);

    }
}

