/*
  pipe_head.js
  Super Mario Bros.

  GAM100 
  Fall 2019

  JoonHo Hwang Wrote all of this
  DoYoon Kim
  SeungGeon Kim 
  
  All content © 2019 DigiPen (USA) Corporation, all rights reserved.
*/

class PipeHead
{
    constructor(x, y, isHorizontal, containingMap)
    {
        this.x = x;
        this.y = y;
        this.isHorizontal = isHorizontal;
        this.containingMap = containingMap;

        this.spriteToDraw = isHorizontal ? sprites.pipe_head_hor : sprites.pipe_head_ver;

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