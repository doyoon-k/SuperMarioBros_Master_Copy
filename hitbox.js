/*
  hitbox.js
  Super Mario Bros.

  GAM100
  Fall 2019

  JoonHo Hwang Arranged the hitbox coords data (hitboxes)
  DoYoon Kim Wrote the class
  SeungGeon Kim did ---

  All content © 2019 DigiPen (USA) Corporation, all rights reserved.
*/

class Hitbox
{
    constructor(x, y, width, height)
    {
        // x, y is relative to the parent object's coordinates.
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    IsHit(x,y,parent)
    {
       let posX = parent.x+this.x;
       let posY = parent.y + this.y;
        //깊이체크로 방식 변경하기
       return CheckIsRectContainsThisPoint(x,y,posX-this.width/2,posY-this.height,posX+this.width/2,posY);
    }

    IsXcoordInBetween(x,parent)
    {
        return ((parent.x + this.x-this.width/2 <= x) && (x <= parent.x + this.x + this.width/2));
    }

    IsYcoordInBetween(y,parent)
    {
        return ((parent.y + this.y - this.height <= y) && (y <= parent.y + this.y));
    }
    
    GetRect(parent)
    {
        return { left_X: parent.x + this.x - this.width / 2, right_X: parent.x + this.x + this.width / 2, top_Y: parent.y + this.y - this.height, bottom_Y: parent.y + this.y };
    }

    DebugDraw(parent)
    {
        // if (parent instanceof Mario)
        // {
        //     push();
        //     rectMode(CENTER);
        //     rect((parent.x + this.x - (game.camera.x - 116)) * pixelMultiplier, (parent.y + this.y - this.height / 2) * pixelMultiplier, (this.width * 1.2) * pixelMultiplier, (this.height * 1.2) * pixelMultiplier);
        //     pop();
        // }
        // else
        // {
            push();
            rectMode(CENTER);
            rect((parent.x + this.x - (game.camera.x - 100)) * pixelMultiplier, (parent.y + this.y - this.height / 2) * pixelMultiplier, (this.width * 1.2) * pixelMultiplier, (this.height * 1.2) * pixelMultiplier);
            pop();
        }
    // }
}

const hitboxes = {
    mario : new Hitbox(0, 0, 10, 12),
    big_mario : new Hitbox(0, 0, 12, 24),
    big_mario_duck : new Hitbox(0, 0, 12, 12),

    goomba : new Hitbox(0, -4, 10, 6),
    koopa_troopa : new Hitbox(0, -3, 12, 12),

    fireball : new Hitbox(0, 0, 8, 8),
    powerup: new Hitbox(0, -3, 12, 12),  // including the coins
    
    active_block: new Hitbox(0, 0, 16, 16),
    inactive_block: new Hitbox(0, 0, 16, 16),

    pipe_horizontal: new Hitbox(0, 0, 32, 16),
    pipe_vertical: new Hitbox(0, 0, 16, 32)
};