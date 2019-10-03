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

        this.isInstaKilled = true;

        this.walkingSpeed = HexFloatToDec("0.900");

        this.fallingSpeed = 0;
        this.fallingAcceleration = HexFloatToDec("0.900");
        this.maxFallSpeed = HexFloatToDec("4.800");

        this.instaKilledInitialSpeed = HexFloatToDec("4.000");

        this.spriteToDraw = undefined;
        this.animationFrameCount = 0;
        this.animationFrameRate = 6;
        this.animator = this.ChangeSprite();
    }

    *ChangeSprite() {}

    Animate() {}

    Draw() {}

    Move() {}

    Gravitate()
    {
        this.fallingSpeed += this.fallingAcceleration;
        if (this.fallingSpeed > this.maxFallSpeed)
        {
            this.fallingSpeed = this.maxFallSpeed;
        }
        
        this.y += this.fallingSpeed;
    }

    Stomped() {}

    InstaKilled(direction) {}

    Awake()
    {
        // TODO: 업뎃오브젝트에 푸시
        objectsToUpdate.push(this);
    }

    Destroy()
    {
        // TODO: 업뎃오브젝트에서 제거, 버킷맵에서 제거
        objectsToUpdate.splice(objectsToUpdate.indexOf(this), 1);
    }

    Update() {}

    OnCollisionWith(collider, direction) {}
}