//Variáveis da Bolinha
let xBolinha = 302;
let yBolinha = 200;
let diametro = 17;
let raio = diametro / 2;

//Velocidade da Bolinha
let velocidadeXBolinha = 5;
let velocidadeYBolinha = 5;
let raqueteComprimento = 10;
let raqueteAltura = 80;

//Variáveis da Linha Central
let xLinhaCentral = 300;
let yLinhaCentral = 0;
let linhaCentralComprimento = 5;
let linhaCentralAltura = 400

//Variáveis da Raquete Jogador 1
let xRaquete = 7;
let yRaquete = 150;

let colidiu = false;

// Placar do Jogo
let meusPontos = 0;
let pontosDoOponente = 0;

// Sons do jogo
  let trilha;
  let ponto;
  let raquete1;
  let raquete2;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquete1 = loadSound("raquete1.mp3");
  raquete2 = loadSound("raquete2.mp3");
}

//Variáveis da Raquete Jogador 2
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background('rgb(0,128,0)');
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  verificaColisaoRaquete();
  verificacolisaoRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  verificacolisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluirPlacar();
  marcaPonto();
  mostraLinhaCentral(xLinhaCentral, yLinhaCentral);
}

function mostraBolinha (){
  fill(color(255,255,0));
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda(){
  if (xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
}
  
  if (yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

  function mostraRaquete(x,y){
    fill(color(245,255,250));
    rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaqueteOponente -= 5;
  }
  
  if (keyIsDown(DOWN_ARROW)){
    yRaqueteOponente += 5;  }
}

function verificaColisaoRaquete(){
  if (xBolinha - raio < xRaquete + raqueteComprimento && 
      yBolinha - raio < yRaquete + raqueteAltura && 
      yBolinha + raio > yRaquete){
      velocidadeXBolinha *= -1;
      raquete1.play();
  }
}

function verificacolisaoRaquete(x, y){
  colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if (colidiu) {
      velocidadeXBolinha *= -1;
      raquete2.play();
  } 
}

function movimentaRaqueteOponente(){
   if (keyIsDown(87)){
    yRaquete -= 5;
  }
  if (keyIsDown(83)){
    yRaquete += 5;  }
 }

function incluirPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(25);
  fill(color(0, 0, 0));
  rect(150, 20, 40, 30);
  fill(255);
  text(meusPontos, 170, 45);
  fill(color(0, 0, 0));
  rect(450, 20, 40, 30);
  fill(255);
  text(pontosDoOponente, 470, 45);
}

function marcaPonto(){
  if (xBolinha > 590){
    meusPontos += 1;
    ponto.play();
  }
  
  if (xBolinha < 10){
    pontosDoOponente += 1;
    ponto.play();
  }
}

function mostraLinhaCentral(x,y){
  rect(x, y, linhaCentralComprimento, linhaCentralAltura);
}