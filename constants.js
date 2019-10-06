/*
  constants.js
  Super Mario Bros.

  GAM100 
  Fall 2019

  JoonHo Hwang Wrote all of this
  DoYoon Kim 
  SeungGeon Kim 
  
  All content © 2019 DigiPen (USA) Corporation, all rights reserved.
*/

const BLOCK_SIZE = 16;
const LEVEL_SECONDS = 160;
const ONE_FRAME_SECONDS  = 1 / 60;

const GOOMBA_REMAINS_STOMPED_SECONDS = 0.5;
const KOOPA_TROOPA_AWAKENING_SECONDS = 4;
const KOOPA_TROOPA_RECOVER_SECONDS = 1;

const BLOCK_BOUNCING_SECONDS = ONE_FRAME_SECONDS * (BLOCK_SIZE + 1); // 0.2? Should be tested
const BRICK_COIN_SPIT_SECONDS = 4;

const SCORES = {
    BreakBrickBlock : 50,
    TIME : 50,
    InstaKillGoomba : 100,
    Coin : 200,
    InstaKillKoopaTroopa : 200,
    InstaKillPiranhaPlant : 200,
    PushShell : 400,
    Firework : 500,
    StompShell : 500,
    PowerUp : 1000,
    Flagpole : [100, 400, 800, 2000, 5000],
    Stomp : [100, 200, 400, 500, 800, 1000, 2000, 4000, 5000, 8000, "1UP"],  // Should use map() and set withinBounds true
    InstaKillWithShell : [500, 800, 1000, 2000, 4000, 5000, 8000, "1UP"]  // Should use map() and set withinBounds true
};