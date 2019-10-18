/*
  pipe_intersect.js
  Super Mario Bros.

  GAM100 
  Fall 2019

  JoonHo Hwang
  DoYoon Kim Wrote all of this base on Joonho Hwang's class
  SeungGeon Kim 
  
  All content © 2019 DigiPen (USA) Corporation, all rights reserved.
*/

class PipeIntersect
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;

        this.zWeight = 9;

        this.spriteToDraw = sprites["pipe_intersect" + (game.isUnderground ? "_underground" : "")];
    }

    Update() { }
    
    Draw()
    {
        DrawSprite(this.spriteToDraw, this.x, this.y);
    }

    Destroy()
    {
        game.Expel(this);
    }
}