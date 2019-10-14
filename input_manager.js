/*
  input_manager.js
  Super Mario Bros.

  GAM100
  Fall 2019

  JoonHo Hwang Added some helper comments
  DoYoon Kim did ---
  SeungGeon Kim Wrote almost all of this

  All content © 2019 DigiPen (USA) Corporation, all rights reserved.
*/



let isDPadUp = false;
let isDPadLeft = false;
let isDPadDown = false;
let isDPadRight = false;

let isSelect = false;
let isStart = false;

let isDash = false;
let isJump = false;

let isJumpPast = false;

function keyPressed() {
    switch (keyCode) {
        case 32:  //Space
            //game.mario.isInvincible = !game.mario.isInvincible;
            if (!game.mario.isTransforming)
                if (game.mario.powerupState == 0) {
                    game.mario.PowerupTo(1);
                } else if (game.mario.powerupState == 1) {
                    game.mario.PowerupTo(2);
                } else if (game.mario.powerupState == 2) {
                    game.mario.PowerupTo(0);
                }
            break;
        case 87:  //W
            isDPadUp = true;
            break;
        case 65:  //A
            isDPadLeft = true;
            break;
        case 83:  //S
            isDPadDown = true;
            break;
        case 68:  //D
            isDPadRight = true;
            break;
        case 85:  //U
            isSelect = true;
            if (game.interfaceFlow.flowState == game.interfaceFlow.screenState.menu)
                game.isSinglePlayer = !game.isSinglePlayer;
            break;
        case 73:  //I
            isStart = true;
            game.interfaceFlow.OnStartPressed();
            break;
        case 74:  //J
            isDash = true;
            if (game.mario.fireballCount < 2 && game.mario.powerupState == game.mario.marioState.fireMario && !game.mario.isTransforming)
                game.mario.ThrowFireball();
            break;
        case 75:  //K
            isJump = true;
            if (!game.mario.isJumping)
                game.mario.isJumpPast = false;
            break;
    }
}

function keyReleased() {
    switch (keyCode) {
        case 87:
            isDPadUp = false;
            break;
        case 65:
            isDPadLeft = false;
            break;
        case 83:
            isDPadDown = false;
            break;
        case 68:
            isDPadRight = false;
            break;
        case 85:
            isSelect = false;
            break;
        case 73:
            isStart = false;
            break;
        case 74:
            isDash = false;
            break;
        case 75:
            isJump = false;
            game.mario.jumpKeyReleased = true;
            break;
    }
}