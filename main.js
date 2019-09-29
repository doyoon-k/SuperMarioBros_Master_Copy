/*
  main.js
  Super Mario Bros.

  GAM100 
  Fall 2019

  JoonHo Hwang did ---
  DoYoon Kim did ---
  SeungGeon Kim did ---
  
  All content © 2019 DigiPen (USA) Corporation, all rights reserved.
*/



let objMario;
let objectsToUpdate;
let statistics;
let font;
let sprites;

// let millis1;
// let millis2;
// let deltaTime;

//Should be 2 By default, but feel free to change it
let pixelMutliplier = 3;

function preload()
{
  font = loadFont("Font/font.ttf");
  sprites = {
    goomba_1 : loadImage("Sprites/Enemy/enemy_goomba_1.png"),
    goomba_2 : loadImage("Sprites/Enemy/enemy_goomba_2.png"),
    goomba_stomped : loadImage("Sprites/Enemy/enemy_goomba_stomped.png"),

    goomba_underground_1 : loadImage("Sprites/Enemy/enemy_goomba_underground_1.png"),
    goomba_underground_2 : loadImage("Sprites/Enemy/enemy_goomba_underground_2.png"),
    goomba_stomped_underground : loadImage("Sprites/Enemy/enemy_goomba_stomped_underground.png"),


    turtle_1 : loadImage("Sprites/Enemy/enemy_turtle_1.png"),
    turtle_2 : loadImage("Sprites/Enemy/enemy_turtle_2.png"),
    turtle_shell : loadImage("Sprites/Enemy/enemy_turtle_shell.png"),
    turtle_awakening : loadImage("Sprites/Enemy/enemy_turtle_awakening.png"),

    turtle_underground_1 : loadImage("Sprites/Enemy/enemy_turtle_underground_1.png"),
    turtle_underground_2 : loadImage("Sprites/Enemy/enemy_turtle_underground_2.png"),
    turtle_shell_underground : loadImage("Sprites/Enemy/enemy_turtle_shell_underground.png"),
    turtle_awakening_underground : loadImage("Sprites/Enemy/enemy_turtle_awakening_underground.png"),

    turtle_red_1 : loadImage("Sprites/Enemy/enemy_turtle_red_1.png"),
    turtle_red_2 : loadImage("Sprites/Enemy/enemy_turtle_red_2.png"),
    turtle_shell_red : loadImage("Sprites/Enemy/enemy_turtle_shell_red.png"),
    turtle_awakening_red : loadImage("Sprites/Enemy/enemy_turtle_awakening_red.png"),
  };
}

function setup() {


  //Two times bigger than the original resolution
  createCanvas(1024, 480);

  //Essential to stop image functions blurring the iamge all up
  noSmooth();

  imageMode(CORNER);

  objMario = new Mario();
  statistics = new Statistics();
  objectsToUpdate = [new Goomba(10, 10)];  // temporary variable

  // frameRate() is not working well
  setInterval(Draw, 1 / 60 * 1000);
}

function Draw() {

  // millis2 = millis();
  // deltaTime = (millis2 - millis1) / 16.7;
  // millis1 = millis();

  background(119, 181, 254);

  statistics.Update();
  objMario.Update();
  objectsToUpdate.forEach(object => object.Update());
}
