/*
  main.js
  Super Mario Bros.

  GAM100 
  Fall 2019

  JoonHo Hwang DoYoon Kim planned out the flow of the function calls together. 
  Doyoon Kim Made the MapLoader AND the Map Creation Tool. 
  JoonHo Hwang set the framerate utilizing the setInterval(), making the framerate adjustments to actually work, and managed all of the assets being loaded here.
  SeungGeon Kim commited the initial main() script, came up with the pixelMultiplier concept and found the noSmooth() function and applied it.
  
  All content © 2019 DigiPen (USA) Corporation, all rights reserved.
*/


let game;
let font;
let sprites;

let g_soundManager = 0;

let g_marioSprite = 0;
let g_isCheckedPoint = false;

let g_lives = 3;
let g_interfaceFlow = 0;
let g_isNewGame = false;

//Should be 2 By default, but feel free to change it
let pixelMultiplier = 3.5;

function preload() {
  g_marioSprite = loadImage("Sprites/Mario/mario_stand_still.png");
  font = loadFont("Font/font.ttf");
  sprites = {
    block_ground: loadImage("Sprites/Block/block_ground.png"),
    block_hard: loadImage("Sprites/Block/block_hard.png"),
    block_empty: loadImage("Sprites/Block/block_empty.png"),
    block_question_1: loadImage("Sprites/Block/block_question_1.png"),
    block_question_2: loadImage("Sprites/Block/block_question_2.png"),
    block_question_3: loadImage("Sprites/Block/block_question_3.png"),
    block_brick: loadImage("Sprites/Block/block_brick.png"),

    block_ground_underground: loadImage("Sprites/Block/block_ground_underground.png"),
    block_hard_underground: loadImage("Sprites/Block/block_hard_underground.png"),
    block_empty_underground: loadImage("Sprites/Block/block_empty_underground.png"),
    block_question_underground_1: loadImage("Sprites/Block/block_question_underground_1.png"),
    block_question_underground_2: loadImage("Sprites/Block/block_question_underground_2.png"),
    block_question_underground_3: loadImage("Sprites/Block/block_question_underground_3.png"),
    block_brick_underground: loadImage("Sprites/Block/block_brick_underground.png"),
    block_brick_hit_underground: loadImage("Sprites/Block/block_brick_hit_underground.png"),


    goomba_1: loadImage("Sprites/Enemy/enemy_goomba_1.png"),
    goomba_2: loadImage("Sprites/Enemy/enemy_goomba_2.png"),
    goomba_stomped: loadImage("Sprites/Enemy/enemy_goomba_stomped.png"),

    goomba_underground_1: loadImage("Sprites/Enemy/enemy_goomba_underground_1.png"),
    goomba_underground_2: loadImage("Sprites/Enemy/enemy_goomba_underground_2.png"),
    goomba_stomped_underground: loadImage("Sprites/Enemy/enemy_goomba_stomped_underground.png"),

    turtle_1: loadImage("Sprites/Enemy/enemy_turtle_1.png"),
    turtle_2: loadImage("Sprites/Enemy/enemy_turtle_2.png"),
    turtle_shell: loadImage("Sprites/Enemy/enemy_turtle_shell.png"),
    turtle_awakening: loadImage("Sprites/Enemy/enemy_turtle_awakening.png"),

    turtle_underground_1: loadImage("Sprites/Enemy/enemy_turtle_underground_1.png"),
    turtle_underground_2: loadImage("Sprites/Enemy/enemy_turtle_underground_2.png"),
    turtle_shell_underground: loadImage("Sprites/Enemy/enemy_turtle_shell_underground.png"),
    turtle_awakening_underground: loadImage("Sprites/Enemy/enemy_turtle_awakening_underground.png"),

    turtle_red_1: loadImage("Sprites/Enemy/enemy_turtle_red_1.png"),
    turtle_red_2: loadImage("Sprites/Enemy/enemy_turtle_red_2.png"),
    turtle_shell_red: loadImage("Sprites/Enemy/enemy_turtle_shell_red.png"),
    turtle_awakening_red: loadImage("Sprites/Enemy/enemy_turtle_awakening_red.png"),


    bush_single: loadImage("Sprites/Background/bg_bush_single.png"),
    bush_double: loadImage("Sprites/Background/bg_bush_double.png"),
    bush_triple: loadImage("Sprites/Background/bg_bush_triple.png"),

    cloud_single: loadImage("Sprites/Background/bg_cloud_single.png"),
    cloud_double: loadImage("Sprites/Background/bg_cloud_double.png"),
    cloud_triple: loadImage("Sprites/Background/bg_cloud_triple.png"),

    mountain: loadImage("Sprites/Background/bg_mountain.png"),

    castle: loadImage("Sprites/Background/bg_castle.png"),


    coin_1: loadImage("Sprites/Item/item_coin_1.png"),
    coin_2: loadImage("Sprites/Item/item_coin_2.png"),
    coin_3: loadImage("Sprites/Item/item_coin_3.png"),

    coin_underground_1: loadImage("Sprites/Item/item_coin_underground_1.png"),
    coin_underground_2: loadImage("Sprites/Item/item_coin_underground_2.png"),
    coin_underground_3: loadImage("Sprites/Item/item_coin_underground_3.png"),

    flower_1: loadImage("Sprites/Item/item_flower_1.png"),
    flower_2: loadImage("Sprites/Item/item_flower_2.png"),
    flower_3: loadImage("Sprites/Item/item_flower_3.png"),
    flower_4: loadImage("Sprites/Item/item_flower_4.png"),

    flower_underground_1: loadImage("Sprites/Item/item_flower_underground_1.png"),
    flower_underground_2: loadImage("Sprites/Item/item_flower_underground_2.png"),
    flower_underground_3: loadImage("Sprites/Item/item_flower_underground_3.png"),
    flower_underground_4: loadImage("Sprites/Item/item_flower_underground_4.png"),

    mushroom: loadImage("Sprites/Item/item_mushroom.png"),

    mushroom_1up: loadImage("Sprites/Item/item_mushroom_1-up.png"),

    mushroom_1up_underground: loadImage("Sprites/Item/item_mushroom_1-up_underground.png"),

    star_1: loadImage("Sprites/Item/item_star_1.png"),
    star_2: loadImage("Sprites/Item/item_star_2.png"),
    star_3: loadImage("Sprites/Item/item_star_3.png"),
    star_4: loadImage("Sprites/Item/item_star_4.png"),

    star_underground_2: loadImage("Sprites/Item/item_star_underground_2.png"),
    star_underground_4: loadImage("Sprites/Item/item_star_underground_4.png"),


    fireball_1: loadImage("Sprites/Object/object_fireball_1.png"),
    fireball_2: loadImage("Sprites/Object/object_fireball_2.png"),
    fireball_3: loadImage("Sprites/Object/object_fireball_3.png"),
    fireball_4: loadImage("Sprites/Object/object_fireball_4.png"),

    pipe_body_hor: loadImage("Sprites/Object/object_pipe_body_hor.png"),
    pipe_body_ver: loadImage("Sprites/Object/object_pipe_body_ver.png"),
    pipe_head_hor: loadImage("Sprites/Object/object_pipe_head_hor.png"),
    pipe_head_ver: loadImage("Sprites/Object/object_pipe_head_ver.png"),
    pipe_intersect: loadImage("Sprites/Object/object_pipe_intersect.png"),

    pipe_body_hor_underground: loadImage("Sprites/Object/object_pipe_body_hor_underground.png"),
    pipe_body_ver_underground: loadImage("Sprites/Object/object_pipe_body_ver_underground.png"),
    pipe_head_hor_underground: loadImage("Sprites/Object/object_pipe_head_hor_underground.png"),
    pipe_head_ver_underground: loadImage("Sprites/Object/object_pipe_head_ver_underground.png"),
    pipe_intersect_underground: loadImage("Sprites/Object/object_pipe_intersect_underground.png"),

    flagpole_head: loadImage("Sprites/Object/object_flagpole_head.png"),
    flagpole: loadImage("Sprites/Object/object_flagpole.png"),
    flag: loadImage("Sprites/Object/object_flag.png"),

    particle_coin_1: loadImage("Sprites/Particle/particle_coin_1.png"),
    particle_coin_2: loadImage("Sprites/Particle/particle_coin_2.png"),
    particle_coin_3: loadImage("Sprites/Particle/particle_coin_3.png"),
    particle_coin_4: loadImage("Sprites/Particle/particle_coin_4.png"),

    particle_firework_1: loadImage("Sprites/Particle/particle_firework_1.png"),
    particle_firework_2: loadImage("Sprites/Particle/particle_firework_2.png"),
    particle_firework_3: loadImage("Sprites/Particle/particle_firework_3.png"),

    particle_brick: loadImage("Sprites/Particle/particle_brick.png"),
    particle_brick_underground: loadImage("Sprites/Particle/particle_brick_underground.png")
  };
}

function setup() {
  createCanvas(SCREEN_WIDTH_IN_BLOCK * BLOCK_SIZE * pixelMultiplier, SCREEN_HEIGHT_IN_BLOCK * BLOCK_SIZE * pixelMultiplier);

  g_soundManager = new SoundManager();
  
  //Essential to stop image functions blurring the iamge all up
  noSmooth();
  imageMode(CORNER);

  g_interfaceFlow = new InterfaceFlow();

  game = new Game();
  game.mapLoader = new MapLoader();
  game.LoadNewMap("Stages/stage1.json");

  // frameRate() is not working well
  a = setInterval(Draw, 1 / 60 * 1000);
}

function Draw() {
  if (g_interfaceFlow.flowState != g_interfaceFlow.screenState.underWorld && !game.isUnderground) {
    background(146, 144, 255);
  } else {
    background(0, 0, 0);
  }
  game.Update();
  game.Draw();
}