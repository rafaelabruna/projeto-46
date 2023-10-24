var cidade, cidadeImg;
var balao, balaoImg;
var obstaculo1, obstaculoImg;
var obstaculos;
var PLAY=1;
var END=0;
var gameState=PLAY;

function preload(){
    cidadeImg=loadImage("assets/cityImage.png");
    balaoImg=loadAnimation("assets/balloon1.png", "assets/balloon2.png", "assets/balloon3.png");
    obstaculoImg=loadImage("assets/obsTop1.png");
}

function setup(){
    createCanvas(700,560);

    //imagem de fundo
    cidade=createSprite(350,280);
    cidade.addImage(cidadeImg);
    cidade.scale= 0.4;

    //personagem principal
    balao=createSprite(100,200,20,50);
    balao.addAnimation("balao", balaoImg);
    balao.scale= 0.35;

    //grupo dos obstaculos
    obstaculos=new Group();

}

function draw() {
    background("black");

    if (gameState==PLAY){
        //movendo o fundo
        cidade.velocityX= -2;
        if (cidade.x<200) {
            cidade.x= cidade.width/2-750;
        }

        //movendo o balao
        if (keyDown("space")) {
            balao.velocityY=-4;
        }

        //gravidade
        balao.velocityY+=0.4;


        //chamando a função dos obstaculos
        spawnObstacles();   
        
        //função para mudar de estado
        if (obstaculos.isTouching(balao)){
            gameState=END;
        }
    }

    if (gameState==END){
        //parando o balao
        balao.velocityY=0;

        //parando o fundo
        cidade.velocityX=0;

        //parando os adversarios
        obstaculos.setVelocityXEach(0);

        //tempo de vida para que subtraindo 1 nunca chegue em 0
        obstaculos.setLifetimeEach(-1);
    }
    

    drawSprites();
   
}

//função para gerar obstáculos
function spawnObstacles(){
    if(frameCount%75==0){
        var obstaculo=createSprite(650,50,40,50);
        obstaculo.addImage(obstaculoImg);
        obstaculo.scale=0.15
        obstaculo.y= Math.round(random(20,550));
        obstaculo.velocityX= -4;

        //adicionando ao grupo
        obstaculos.add(obstaculo);

        //tempo de vida dos obstaculos
        obstaculo.lifetime=200;
    }
}
