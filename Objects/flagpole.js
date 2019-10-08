/*
  flagpole.js
  Super Mario Bros.

  GAM100 
  Fall 2019

  JoonHo Hwang Wrote all of this
  DoYoon Kim
  SeungGeon Kim 
  
  All content © 2019 DigiPen (USA) Corporation, all rights reserved.
*/

class Flagpole
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;

        this.spriteToDraw = sprites.flag;
        this.hitbox = hitboxes.flagpole;
    }

    Update() {}

    Draw()
    {
        DrawSprite(this.spriteToDraw, this.x, this.y);
    }

    Destroy()
    {
        game.Expel(this);
    }

    OnCollisionWith(collider, direction)
    {

    }
}