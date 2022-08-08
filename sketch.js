var PLAY= 1
var END = 0
var gameState = PLAY
 
var rocket
var mars
var star
var meteor
var rocketImg
var marsImg
var starImg
var meteorImg
var bgspace
var bgspaceImg
var starGrp
var meteorGrp

var score
var restart 
var restartImg


function preload(){
rocketImg = loadImage('rocket.png')
marsImg = loadImage('mars.png')
starImg = loadImage('star.png')
meteorImg = loadImage('meteor.png')
bgspaceImg = loadImage('bgspace.jpg')
restartImg = loadImage("restart.png")
jumpSound = loadSound("RocketWoosh.wav")
dieSound = loadSound("GameOver.wav")
checkPointSound = loadSound("checkpoint.mp3")

}

function setup() {
 createCanvas(500 , 600)
 bgspace = createSprite(250,300)
 bgspace.addImage("space" , bgspaceImg)
 bgspace.velocityY = 2   

rocket = createSprite(300 , 300 , 40, 20)
rocket.scale = 0.2
rocket.addImage("rocket" , rocketImg)

mars = createSprite(300 , 850 , 40 , 20)
mars.addImage('mars' , marsImg)
mars.scale - 0.1

//starGrp = createGroup()
meteorGrp = createGroup()

rocket.setCollider("circle",0,0,90);

restart = createSprite(250,500);
restart.addImage(restartImg);

rocket.debug = false;
score = 0;

}


function draw() {
background(0)
      if(gameState === PLAY){
        restart.visible = false;
        if(bgspace.y >400   ){
          bgspace.y = 300
        }
        if(keyDown('space')){
          rocket.velocityY = -7
          jumpSound.play()
        }
        if(keyDown('right_arrow')){
          rocket.x += 2
          jumpSound.play()
        }
        if(keyDown('left_arrow')){
          rocket.x -= 2
          jumpSound.play()
        }   
        //scoring
        score = score + Math.round(getFrameRate()/60);
        if(score > 0 && score%1000==0  ){
          checkPointSound.play()
        }
        if(rocket.isTouching(meteorGrp)||rocket.isTouching(mars)){
         gameState = END
         dieSound.play()

        }

      }
      else if (gameState === END) {
        restart.visible=true;
      // starGrp.destroyEach()
      meteorGrp.destroyEach()
      rocket.y = 300
      bgspace.destroy()
      mars.destroy()
      rocket.destroy()
      fill("Red")
      textSize(50)
      text("X GAMEOVER X" , 45 , 300)
    // starGrp.velocityEachY(0)
      meteorGrp.velocityEachY = 0    
       rocket.velocityY=0
      }

  if(mousePressedOver(restart)){
    reset()
  }

      rocket.velocityY = rocket.velocityY+0.5
    spawnObjects();
    drawSprites();
    fill("Yellow")
    text("Distance Covered: "+score, 10 , 50)
  
  }
  
function reset(){
    gameState = PLAY
    meteorGrp.destroyEach();
    score = 0;

 }

function spawnObjects(){
    if(frameCount % 60 === 0){
        //star = createSprite(Math.round(random(200 , 600)) , -1 , 10 , 20)
        //star.velocityY = 2
       // star.scale = 0.2
       // star.addImage('star' , starImg)
        meteor = createSprite( Math.round(random(200 , 600)), -1 , 10 , 20)
        meteor.velocityY = 2
        meteor.scale = 0.2
        meteor.addImage('meteor' , meteorImg)
       // starGrp.add(star)
        meteorGrp.add(meteor)
        //starGrp.setLifetimeEach(180)
        meteorGrp.setLifetimeEach(180)
        meteor.depth = mars.depth
        mars.depth = mars.depth+1
        
    }
  }

