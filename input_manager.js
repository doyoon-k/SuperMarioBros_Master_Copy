/*
  input_manager.js
  Super Mario Bros.

  GAM100
  Fall 2019

  JunHo Hwang did ---
  DoYoon Kim did ---
  SeungGeon Kim Wrote this all

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

function keyPressed() {
    switch (keyCode) {
        case 87:
            isDPadUp = true;
            break;
        case 65:
            isDPadLeft = true;
            break;
        case 83:
            isDPadDown = true;
            break;
        case 68:
            isDPadRight = true;
            break;
        case 85:
            isSelect = true;
            break;
        case 73:
            isStart = true;
            break;
        case 74:
            isDash = true;
            break;
        case 75:
            isJump = true;
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
            break;
    }
}