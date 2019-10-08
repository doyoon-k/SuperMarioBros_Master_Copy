/*
  pipe_body.js
  Super Mario Bros.

  GAM100 
  Fall 2019

  JoonHo Hwang Wrote all of this
  DoYoon Kim
  SeungGeon Kim 
  
  All content © 2019 DigiPen (USA) Corporation, all rights reserved.
*/

class PipeBody
{
    constructor(x, y, isHorizontal)
    {
        this.x = x;
        this.y = y;
        this.isHorizontal = isHorizontal;

        this.spriteToDraw = isHorizontal ? sprites.pipe_body_hor : sprites.pipe_body_ver;

        this.hitbox = isHorizontal ? hitboxes.pipe_horizontal : hitboxes.pipe_vertical;
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

    OnCollisionWith(collider, direction) {}
}