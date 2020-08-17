var player, player_img1, player_img2;
var bg, bg_img;
var mp, obstacle1;
var tri, obstacle2;
var wood1, obstacle3;
var wood2, obstacle4;
var gameEnd, gameEnd_img;
var ground;
var obstaclesGroup
var gameState = "play";
var score = 0;

function preload(){
    player_img1 = loadImage("Images/player.png");
    player_img2 = loadImage("Images/player2.png");
    bg_img = loadImage("Images/bg.jpg");
    obstacle1 = loadImage("Images/obstacle1.jpg");
    obstacle2 = loadImage("Images/obstacle2.png");
    obstacle3 = loadImage("Images/obstacle3.png");
    obstacle4 = loadImage("Images/obstacle4.png");
    gameEnd_img = loadImage("Images/gameEnd.jpg");

}
function setup(){
    var canvas = createCanvas(800,400);
    
    ground = createSprite(400,400,800,50);

    player = createSprite(250,300,5,5);
    player.addImage("player", player_img1);
    player.scale = 0.07;

    obstaclesGroup = new Group();
}

function draw(){
    background(bg_img);
    if(gameState === "play"){
        score = score + Math.round(getFrameRate()/60);

        player.velocityY = player.velocityY + 0.8

        if(keyDown("space")){
            player.y = player.y - 13;
        }
    
        if(keyDown("left_arrow")){
            player.x = player.x - 5;
            player.addImage("player", player_img2);
        }
    
        if(keyDown("right_arrow")){
            player.x = player.x + 5;
            player.addImage("player", player_img1);
        }
    
        if(frameCount > 250){
            ground.destroy();
        }
    
        player.collide(obstaclesGroup);
        player.collide(ground);
    
        
        spawnObstacles();
    }

    if(player.x < 0 || player.y > 400){
        gameState = "end";
    }

    if(gameState === "end"){
        gameEnd();
    }

    text("Score : " + score,380,25);
    drawSprites();
}   
  
function spawnObstacles() {
    if(frameCount % 25 === 0) {
      var obstacle = createSprite(780,random(50,350),10,40);
      obstacle.velocityX = -4;
      
      var rand = Math.round(random(1,3));
      switch(rand) {
        case 1: obstacle.addImage(obstacle2);
                break;
        case 2: obstacle.addImage(obstacle3);
                break;
        case 3: obstacle.addImage(obstacle4);
                break;
        default: break;
      }
      
      obstacle.scale = 0.5;
      obstaclesGroup.add(obstacle);
    }
  }

  function gameEnd(){
      player.destroy();
      obstaclesGroup.destroyEach();
      score = score;
      background(gameEnd_img);
  }