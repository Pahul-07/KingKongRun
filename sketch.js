var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

function preload(){
  
  //animation of monkey to move
  monkey_running =  loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  //banana and obstacle image
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}



function setup() {
  
  //canvas
  createCanvas(400,400);
  
  //survival time
  var survivalTime=0;
  
  //creating monkey
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;
  
  //creating ground
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x)
  
  //groups
  FoodGroup= new Group();
  obstaclesGroup = new Group();
  
  
  //score
  score=0;
}


function draw() {
  
  //background
 background(255);
  
  //infinite ground
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  
  //making monkey to jump when press space
  if(keyDown("space")){
    monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY+0.8;
  
  //making monkey collide to ground
  monkey.collide(ground);
  
  //calling obstacles and food
  spawnFood();
  spawnObstacles();
  
  drawSprites();
  
  //text score
  stroke("white");
  textSize(20);
  fill("white");
  text("Score:  "+ score,500,50);

  //making everything stop when monkey touches obstacle
  if(obstaclesGroup.isTouching(monkey)){
    ground.velocityX = 0;
    monkey.velocityY = 0;
    
    obstaclesGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    
    obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
  }
  
  //text survival time
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time: "+ survivalTime,100,50);
}

//creating food
function spawnFood(){
  if (frameCount % 80 === 0){
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);
    banana.velocityX= -5;
    
    banana.lifetime = 300;
    monkey.depth=banana.depth+1;
    
    banana.addImage(bananaImage);
    banana.scale=0.05;
    
    FoodGroup.add(banana);
  }
  
}

//creating obstacles
function spawnObstacles(){
  if (frameCount % 300 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
    
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15;
    
    obstacle.lifetime = 300;
    
    obstaclesGroup.add(obstacle);
  }
  
  
}
 



