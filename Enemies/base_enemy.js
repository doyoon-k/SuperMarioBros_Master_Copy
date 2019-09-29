/*
  base_enemy.js
  Super Mario Bros.

  GAM100 
  Fall 2019

  JoonHo Hwang Wrote all of this
  DoYoon Kim 
  SeungGeon Kim 
  
  All content © 2019 DigiPen (USA) Corporation, all rights reserved.
*/

class BaseEnemy
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;

        this.isGoingLeft = false;

        this.walkingSpeed = HexFloatToDec("0.900");

        this.spriteToDraw = undefined;
        this.animationFrameCount = 0;
        this.animationFrameRate = 6;
        this.animator = this.ChangeSprite();
    }

    *ChangeSprite() {}

    Animate() {}

    Stomped() {}

    InstaKilled() {}

    Destroy() {}

    Update() {}

    OnCollisionWith(collider) {}
}