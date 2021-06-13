var backImage,backgr;
var player, player_running;
var ground,ground_img;
var banana, bananaImg;
var rock, rockImg;
var bananaGroup, rockGroup;
var score = 0;

var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImg = loadImage("banana.png");
  rockImg = loadImage("stone.png");
  gameOverImg = loadImage("gameOver.png");
  happyMonkeyImg = loadImage("happyMonkey.png");

}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,350,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.15;

  happyMonkey = createSprite(400, 320, 40, 80);
  happyMonkey.addImage(happyMonkeyImg);
  happyMonkey.scale = 0.1;
  happyMonkey.visible = false;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  gameOver = createSprite(400, 200);
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;

  bananaGroup = new Group();
  rockGroup = new Group();
  
}

function draw() { 
  background(0);

  if(gameState===PLAY){

    score = score + Math.round(getFrameRate()/60);

    spawnFood();
  spawnObstacles();
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") && player.y > 200) {
      player.velocityY = -12;
    }

    for(var i = 0; i<bananaGroup.length; i++){
      if(bananaGroup.isTouching(player)){
        bananaGroup.get(i).destroy();
        score = score + 1;
        player.scale += 0.01;
      }
    }

    if(rockGroup.isTouching(player)){
      gameState = END;
    }

    player.velocityY = player.velocityY + 0.6;
    player.collide(ground);

  }

  if(gameState === END){

    backgr.velocityX = 0;
    player.visible = false;
    gameOver.visible =  true;

    bananaGroup.destroyEach();
    rockGroup.destroyEach();

  }

  drawSprites();
  
  fill("white");
  textSize(25);
  text("Score: " + score, 600, 50);

  if(score === 650){
    gameState = END;
    happyMonkey.visible = true;

    fill("white");
    textSize(30);
    text("YOU WON!!", 300, 150);

 }
}

function spawnFood(){

  if(frameCount % 100 === 0){
     banana = createSprite(810, random(200, 300), 20, 20);
     banana.addImage("banana", bananaImg);
     banana.scale = 0.1;
     banana.velocityX = -4;
     banana.lifetime = 200;
     banana.setCollider("rectangle", 0, 0, 60, 20)
     bananaGroup.add(banana);
  }
}

function spawnObstacles(){
  if(frameCount % 80 === 0){
    rock = createSprite(810, 330, 40, 40);
    rock.addImage("rock", rockImg);
    rock.scale = 0.2;
    rock.velocityX = -4;
    rock.lifetime = 200;
    rock.setCollider("rectangle", 0, 0, 60, 60);
    rockGroup.add(rock);
  }
}
