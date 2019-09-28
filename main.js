/*
  main.js
  Super Mario Bros.

  GAM100 
  Fall 2019

  JunHo Hwang did ---
  DoYun Kim did ---
  SeungGeon Kim did ---
  
  All content © 2019 DigiPen (USA) Corporation, all rights reserved.
*/



let objMario;

// let millis1;
// let millis2;
// let deltaTime;

//2 By default
let pixelMutliplier = 2;



function setup() {

  frameRate(60);

  //Two times bigger than the original resolution
  createCanvas(1024, 480);

  //Essential to stop image functions blurring the iamge all up
  noSmooth();

  imageMode(CORNER);

  objMario = new Mario();
}

function draw() {

  // millis2 = millis();
  // deltaTime = (millis2 - millis1) / 16.7;
  // millis1 = millis();

  background(119, 181, 254);

  objMario.Update();
  
}
