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
    for(let i = bricks.length -1; i >= 0; i--) {
        const brick = bricks[i];
        brick.display();
        if (brick.isColliding(ball)) {
            ball.reverse('y');
            bricks.splice(i, 1);
            playerScore += brick.points;
        }
    }

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
                   this.reverse('y');
                   //this.location.y += this.line.location.y - this.radius -1;
               }
           }
    }

    bounceEdge() {
        if(this.location.x + this.radius >= width) { //controllo bordo destro
            this.reverse('x');
        }else if(this.location.x - this.radius <= 0) { //controllo bordo sinistro
            this.reverse('x');
        }else if(this.location.y - this.radius <= 0) { //Controllo bordo superiore
            this.reverse('y');
        }
        
    }

    display() {
        fill(this.color);
        ellipse(this.location.x, this.location.y, this.size, this.size);
    }

    update() {
        this.location.add(this.velocity);
    }

    reverse(coord) {
        this.velocity[coord] *= -1;;
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
    
    isColliding(ball) {
        //collide con il brick
        if(ball.location.y - ball.radius <= this.location.y + this.height && //check della y
            ball.location.y + ball.radius >= this.location.y &&
            ball.location.x + ball.radius >= this.location.x && //x della ball va sul lato dx del brick
            ball.location.x - ball.radius <= this.location.x + this.width) { //x della ball va sul lato sx del brick
            return true;            }
    }
}





