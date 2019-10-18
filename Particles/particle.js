/*
  particle.js
  Super Mario Bros.

  GAM100 
  Fall 2019

  JoonHo Hwang 
  DoYoon Kim Wrote all of this base on Joonho Hwang's class
  SeungGeon Kim


  
  All content © 2019 DigiPen (USA) Corporation, all rights reserved.
*/

class Particle
{
    constructor(x,y)
    {
        this.x = x;
        this.y = y;
       this.zWeight = 5;

       this.spriteToDraw = null;
       this.animationFrameCount = 0;
       this.animationFrameRate = 0;
       this.animator = this.ChangeSprite();
    }

    *ChangeSprite(){}

    Animate(){}

    Draw(){}

    Destroy(){}

    Update(){}
}