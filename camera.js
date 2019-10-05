/*
  camera.js
  Super Mario Bros.

  GAM100 
  Fall 2019

  JoonHo Hwang 
  DoYoon Kim
  SeungGeon Kim Wrote this
  
  All content © 2019 DigiPen (USA) Corporation, all rights reserved.
*/

class Camera {

    constructor() {
        this.relativeWorldX = 0;
    }

    Update() {

        this.relativeWorldX = -game.mario.x;

    }

}