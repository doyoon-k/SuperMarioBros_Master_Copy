/*
  hitbox.js
  Super Mario Bros.

  GAM100
  Fall 2019

  JoonHo Hwang Searched and arranged the hitbox coords data (hitboxes)
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
}

hitboxes = {
    mario : new Hitbox(0, 0, 10, 12),
    big_mario : new Hitbox(0, 0, 12, 24),
    big_mario_duck : new Hitbox(0, 0, 12, 12),

    goomba : new Hitbox(0, 4, 10, 6),
    koopa_troopa : new Hitbox(0, 3, 12, 12),

    fireball : new Hitbox(0, 0, 8, 8),
    powerup : new Hitbox(0, 3, 12, 12)
};