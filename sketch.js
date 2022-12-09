var path,among,diamonds,jwellery,sword,dead, end;
var pathImg,amongImg,cashImg,diamondsImg,jwelleryImg,swordImg,deadImg;
var treasureCollection = 0;
var diamondsG,jwelleryG,swordGroup;

//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("Fondo.webp");
  amongImg = loadAnimation("amongus1.png", "amongus2.png", "amongus3.png", "amongus4.png");
  diamondsImg = loadImage("Diamante.png");
  jwelleryImg = loadImage("Moneda.png");
  swordImg = loadImage("Sus.png");
  endImg =loadAnimation("gameOver.png");
  deadImg =loadAnimation("amongus5.png", "amongus6.png");

  
}

function setup(){
  
  


path=createSprite(width/2,200);
path.addImage("path", pathImg);
path.velocityX = 4;



among = createSprite(50, width/2,height-70,20,50);
among.addAnimation("amongus", amongImg);
among.scale=0.4;
  
  

diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}

function draw() {

  if(gameState===PLAY){
  background(0);
  among.x = World.mouseX;

 if((touches.length > 0 || keyDown("SPACE")) && among.y  >= height-120) {
      
      among.velocityY = -10;
       
    }
among.velocityY = among.velocityY + 0.8;

  edges= createEdgeSprites();
  among.collide(edges);
  
  if(path.x > 320 ){
    path.x = width/2;
  }

    createDiamonds();
    createJwellery();
    createSword();


    if (diamondsG.isTouching(among)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection + 100;
      
    }else if(jwelleryG.isTouching(among)) {
      jwelleryG.destroyEach();
      treasureCollection= treasureCollection + 150;
      
    }else{
      if(swordGroup.isTouching(among)) {
        gameState=END;
        
        among.addAnimation(deadImg);

        among.scale=0.6;
        
        end = createSprite(180,280,20,20);
        end.addAnimation("gameover",endImg);
        end.scale=0.7

        diamondsG.destroyEach();
        jwelleryG.destroyEach();
        swordGroup.destroyEach();
        
        diamondsG.setVelocityXEach(0);
        jwelleryG.setVelocityXEach(0);
        swordGroup.setVelocityXEach(0);
     
    }
  }
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Score: "+ treasureCollection,width-150,30);
  }

}


function createDiamonds() {
  if (World.frameCount % 320 == 0) {
   
    var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
    diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 5;
  diamonds.lifetime = 200;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 410 == 0) {
    //Modificar las posiciones de las joyas para hacerlas aparecer en el tamaño de pantaña disponible.

    var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
    jwellery.addImage(jwelleryImg);
  jwellery.scale=0.03;
  jwellery.velocityY = 5;
  jwellery.lifetime = 200;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 530 == 0) {
    //Modificar las prosiciones de la espada para hacerla aparecer en el tamaño de pantaña disponible. 

    var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
    sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 4;
  sword.lifetime = 200;
  swordGroup.add(sword);
  }
}
