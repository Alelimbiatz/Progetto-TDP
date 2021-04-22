let playerScore = 0;
let line;
let ball;
let bricks = [];

function setup() {
    createCanvas(800, 600);
    line = new Line();
    ball = new Ball(line);
    const bricksPerRow = 10;
    const brickWidth = width / bricksPerRow;
    for(let i = 0; i < bricksPerRow; i++){
        brick = new Brick(createVector(brickWidth * i, 0), brickWidth, 25, color(265, 165, 0));
        bricks.push(brick);
    }
}

function draw() {
    background(0); 
    //testo score
    textSize(32);
    text('Score:${playerScore}',width - 150, 50);
    fill(255);

    ball.bounceEdge();
    ball.bounceLine();

    ball.update();
    
    //assegnamento tasti
    if (keyIsDown(LEFT_ARROW)) {
        line.move('left');
    } else if (keyIsDown(RIGHT_ARROW)){
        line.move('right');
    }

    line.display();
    ball.display();
    bricks.forEach(brick => brick.display());

}

class Line {
    constructor() {
        this.width = 150;
        this.height = 25;
        this.color = color(255);
        this.location = createVector((width / 2) - (this.width / 2), height - 35);
        this.speed = {
             right: createVector(8, 0), 
             left: createVector(-8, 0)
        }

    }

    display() {
        fill(this.color);
        rect(this.location.x, this.location.y, this.width, this.height);

    }

    move(direction) {
        this.location.add(this.speed[direction]);

        if(this.location.x < 0) {
            this.location.x = 0;
        }else if(this.location.x + this.width > width) {
            this.location.x = width - this.width;
        }
    }
}

class Ball {
    constructor(line) {
        this.radius = 15;
        this.size = this.radius * 2;
        this.location = createVector(line.location.x + (line.width / 2), (line.location.y - this.radius - 5));
        this.color = color(255);
        this.velocity = createVector(5, -5);
        this.line = line;
    }

    bounceLine() {
        // siammo all'interno della larghezza della line
        if(this.location.x + this.radius >= this.line.location.x &&
           this.location.x + this.radius <= this.line.location.x + this.line.width) {
               if(this.location.y + this.radius > this.line.location.y) {
                   this.velocity.y *= -1;
                   //this.location.y += this.line.location.y - this.radius -1;
               }
           }
    }

    bounceEdge() {
        if(this.location.x + this.radius >= width) { //controllo bordo destro
            this.velocity.x *= -1;
        }else if(this.location.x - this.radius <= 0) { //controllo bordo sinistro
            this.velocity.x *= -1;
        }else if(this.location.y - this.radius <= 0) { //Controllo bordo superiore
            this.velocity.y *= -1;
        }
        
    }

    display() {
        fill(this.color);
        ellipse(this.location.x, this.location.y, this.size, this.size);
    }

    update() {
        this.location.add(this.velocity);
    }
}

class Brick{
    constructor(location, width, height, color) {
        this.location = location;
        this.width = width;
        this.height = height;
        this.color = color;
        this.points = 1;        
    }

    display() {
        fill(this.color);
        rect(this.location.x, this.location.y, this.width, this.height);
    }
}





