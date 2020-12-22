var girl, temple, girlimage1, girlimage2, girlimage3, templeimage;
var edges,coin,coinimage,obstacle;
var obstacleimage;
var boximage, box,boxgroup; 
var coingroup,invisibleground;
var score = 0;
var PLAY = 1;
var END = 2;
gameState = PLAY

function preload(){
girlimage1=loadAnimation("girl1.png","girl2.png","girl3.png")
//girlimage2=loadImage()
//girlimage3=loadImage("running-girl-iamges-main/girl3.png")
templeimage = loadImage("background.png")
coinimage=loadImage("coin.png")
obstacleimage = loadImage("monster.png");
boximage = loadImage("box.png")
}

function setup(){
createCanvas(1000, 800)

temple = createSprite(500, 400, 1000,800);
temple.addImage(templeimage)
temple.scale=3;
temple.velocityY = 4

girl = createSprite(600,400,50,50)
girl.addAnimation("running",girlimage1)

edges=createEdgeSprites()
//temple.scale = 1.5;




girl.debug= false;
girl.setCollider("circle",0,0,30)

invisibleground=createSprite(500,600,1000,20)
invisibleground.visible = false;

coingroup= new Group()
boxgroup= new Group()
}

function draw(){
//background(bg)


 if (gameState===PLAY){

  if(girl.isTouching(coingroup)){
    score=score+10
    coingroup.destroyEach();
}

if(keyDown(LEFT_ARROW)){
   girl.x=girl.x-5
}

if(keyDown(RIGHT_ARROW)){
   girl.x=girl.x+5
}

if(keyDown(UP_ARROW)){
   girl.y=girl.y-5
}

if(keyDown(DOWN_ARROW)){
   girl.y=girl.y+5
} 
//obstacles();

if(keyDown("space")){
   girl.velocityY =-15
}

girl.velocityY=girl.velocityY+0.8

if(temple.y > 100){
   temple.y = 400;
}
spawncoins()
 boxes()

if (girl.isTouching(boxgroup)){

  gameState= END;}}

  else if(gameState === END){
  girl.setCollider("rectangle",0,0,100,girl.height)
  textSize(80)
  text(" You lost", width/2,height/2);
  coingroup.destroyEach()
  boxgroup.destroyEach()
  boxgroup.setVelocityEach(0);
  coingroup.setVelocityEach(0);
  girl.debug=true;
  box.debug= true;
  box.setCollider("rectangle",0,0,100,box.height)
  temple.velocityY = 0
  girl.velocityY=0
   }
   

girl.collide(invisibleground)
drawSprites()
    
stroke("red")
fill("Yellow")
textSize(25);
text("score :"+score, 300,300);
} 

/*function spawncoins(){

    if(frameCount%400){
    coin=createSprite(500,80,20,20)
    coin.x = Math.round(random(200,800));   
    coin.addImage(coinimage)
    coin.velocityY=2
    coin.scale=0.3
  }
    coingroup.add(coin)
    }*/ 

function boxes(){
    if(frameCount%80==0){  
    box=createSprite(500, 430, 20, 20)
    box.x = Math.round(random(200,600))
    box.addImage(boximage)
    box.scale=0.2
    box.velocityY=4
    boxgroup.add(box)
 }
}



function spawncoins(){
  
    coin = createSprite(100, -40, 20, 20);
    coin.addImage("coins", coinimage);
    coin.scale = 0.3;
    coin.lifetime = 120;
    coingroup.add(coin);
    coinRand = Math.round(random(1,3));

    //Asigning random places for the coins
    if(frameCount%90 === 0){
      switch(coinRand) {
          case 1: coin.x = 100;
          coin.velocityY = +(6 + 3*score/100);
            break;
          case 2: coin.x = 300;
          coin.velocityY = +(6 + 3*score/100);
            break;
          case 3: coin.x = 500;
          coin.velocityY = +(6 + 3*score/100);
            break;
          default: break;
      }
    }
  }