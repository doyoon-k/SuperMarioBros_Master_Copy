/*
  powerup.js
  Super Mario Bros.

  GAM100 
  Fall 2019

  JoonHo Hwang Wrote all of this
  DoYoon Kim
  SeungGeon Kim 
  
  All content © 2019 DigiPen (USA) Corporation, all rights reserved.
*/

class Powerup 
{
    constructor(x, y, type)
    {
        this.x = x;
        this.y = y;
        this.type = type;  // EPowerupType; See below
    }
}


const EPowerupType = {
    Mushroom : 0,
    OneUp : 1,
    FireFlower : 2,
    Star : 3
};