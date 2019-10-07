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

        this.isGoingLeft = true;

        this.isInstaKilled = false;

        this.walkingSpeed = HexFloatToDec("0.900");
        this.speedX = -this.walkingSpeed;
        this.speedY = 0;
        this.fallingAcceleration = HexFloatToDec("0.900");
        this.maxFallSpeed = HexFloatToDec("4.800");

        this.instaKilledWalkingSpeed = HexFloatToDec("1.200");
        this.instaKilledInitialSpeed = -HexFloatToDec("4.000");
        this.instaKilledMaxFallSpeed = HexFloatToDec("3.000");
        this.instaKilledFallingAcceleration = HexFloatToDec("0.500");

        this.spriteToDraw = undefined;
        this.animationFrameCount = 0;
        this.animationFrameRate = 6;
        this.animator = this.ChangeSprite();

        this.hitbox = undefined;

        game.physics.RegisterToMovingObjectsArray(this);
    }

    *ChangeSprite() {}

    Animate() {}

    Draw() {}

    Move() {}

    Gravitate()
    {
        this.speedY += (this.isInstaKilled ? this.instaKilledFallingAcceleration : this.fallingAcceleration);
        if (this.isInstaKilled && this.speedY > this.instaKilledMaxFallSpeed)
        {
            this.speedY = this.instaKilledMaxFallSpeed;
        }
        else if (this.speedY > this.maxFallSpeed)
        {
            this.speedY = this.maxFallSpeed;
        }
        
        this.y += this.speedY;
    }

    Stomped() {}

    InstaKilled(direction) {}

    Destroy()
    {
        game.Expel(this);
    }

    Update() {}

    OnCollisionWith(collider, direction) {}
}