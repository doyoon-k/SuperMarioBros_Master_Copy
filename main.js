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
let objectsToUpdate = [];  // temporary
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
    block_ground : loadImage("Sprites/Block/block_ground.png"),
    block_hard : loadImage("Sprites/Block/block_hard.png"),
    block_empty : loadImage("Sprites/Block/block_empty.png"),
    block_question_1 : loadImage("Sprites/Block/block_question_1.png"),
    block_question_2 : loadImage("Sprites/Block/block_question_2.png"),
    block_question_3 : loadImage("Sprites/Block/block_question_3.png"),
    block_brick : loadImage("Sprites/Block/block_brick.png"),
    
    block_ground_underground : loadImage("Sprites/Block/block_ground_underground.png"),
    block_hard_underground : loadImage("Sprites/Block/block_hard_underground.png"),
    block_empty_underground : loadImage("Sprites/Block/block_empty_underground.png"),
    block_question_underground_1 : loadImage("Sprites/Block/block_question_underground_1.png"),
    block_question_underground_2 : loadImage("Sprites/Block/block_question_underground_2.png"),
    block_question_underground_3 : loadImage("Sprites/Block/block_question_underground_3.png"),


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
  new Goomba(10, 10);
  new InactiveBlock(20, 20, EInactiveBlockType.Empty);

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
