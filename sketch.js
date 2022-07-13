var rocket,rocketImg;
var comet,cometImg,cometsGroup;
var sky,skyImg;
var gameOverImg;
var x,y;
var star,starImg,starsGroup;

var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score;

function preload(){

rocketImg = loadAnimation("rocket.png");
skyImg = loadImage("sky.jpg");
cometImg = loadImage("comet.png");
gameOverImg = loadImage("gameOver.png");
starImg = loadImage("star.png");

}

function setup() {
createCanvas(windowWidth,windowHeight);

sky = createSprite(width-300,height-300);
sky.addImage(skyImg);
sky.scale = 5

rocket = createSprite(width-300,height-100,50,50);
rocket.addAnimation("flying",rocketImg);
rocket.scale = 0.3

gameOver = createSprite(width-800,height-350);
gameOver.addImage(gameOverImg);
gameOver.scale = 3

cometsGroup = new Group();
starsGroup = new Group();
score = 0

}

function draw() {

    background(0);

    if(gameState===PLAY){

        
        rocket.x = mouseX;

        gameOver.visible = false;
        sky.velocityY = 4;

        if(rocket.isTouching(starsGroup)){
            score = score+1;

        }

        edges= createEdgeSprites();
        rocket.collide(edges);

    if(sky.y > 400 ){
        sky.y = height/2;
        }

          createComets();
          createStars();


    if(rocket.isTouching(cometsGroup)){
        gameState = END;
        console.log(gameState);
    }


    }

    if(gameState===END){
        gameOver.visible = true;
        cometsGroup.destroyEach();
        cometsGroup.setVelocityEach(0);
        starsGroup.destroyEach();
        starsGroup.setVelocityEach(0);
        sky.velocityY = 0;
        rocket.velocityX = 0;

    }

 
drawSprites();
textSize(30);
fill("white");
text("Score"+score,width-200,height-600);
}



function createComets(){
if (frameCount % 180 == 0) {
    var x = Math.round(random(100,1800))
    var y = Math.round(random(100,1800))
    var comet = createSprite(Math.round(random(x,y)));
    comet.addImage(cometImg);
    comet.scale=0.5;
    comet.velocityY = 3;
    comet.lifetime = 200;
    cometsGroup.add(comet);
}
}

function createStars(){
    if(frameCount % 180 ==0){
        var x = Math.round(random(100,1800))
        var y = Math.round(random(100,1800))  
        var star = createSprite(Math.round(random(x,y))) ;
        star.addImage(starImg);
        star.scale = 0.2;
        star.velocityY = 3;
        star.lifetime = 200;
        starsGroup.add(star);
    }
}