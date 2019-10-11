/*
  powerup.js
  Super Mario Bros.

  GAM100 
  Fall 2019

  JoonHo Hwang Wrote all of this
  DoYoon Kim
  SeungGeon Kim 
  
  All content © 2019 DigiPen (USA) Corporation, all rights reserved.
*/

class Powerup 
{
    constructor(x, y, type)
    {
        this.x = x;
        this.y = y;
        this.originalY = y;
        this.type = type;  // EPowerupType; See below
        
        this.isGoingLeft = false;
        this.isPoppingUp = true;
        this.isBouncing = false;
        this.isOnGround = true;

        // all these values should be tested (except bouncing)
        this.slidingSpeed = HexFloatToDec("1.200");
        this.poppingSpeed = -HexFloatToDec("0.300");

        this.fallingAcceleration = HexFloatToDec("0.800");
        this.maxFallSpeed = HexFloatToDec("3.800");
        
        this.bouncingSlidingSpeed = HexFloatToDec("1.400");
        this.bouncingInitialSpeed = -HexFloatToDec("4.000");
        this.bouncingMaxFallSpeed = HexFloatToDec("3.000");
        this.bouncingFallingAcceleration = HexFloatToDec("0.500");

        this.soarInitialSpeed = -HexFloatToDec("7.000");  // should be tested

        this.speedX = 0;
        this.speedY = 0;

        this.spriteToDraw = undefined;
        switch (this.type)
        {
            case EPowerupType.Mushroom:
                this.spriteToDraw = sprites.mushroom;
                break;

            case EPowerupType.OneUp:
                this.spriteToDraw = sprites.mushroom_1up;
                break;
            
            case EPowerupType.FireFlower:
                this.spriteToDraw = sprites.flower_1;
                break;
            
            case EPowerupType.Star:
                this.spriteToDraw = sprites.star_1;
                break;
        }

        this.animationFrameCount = 0;
        this.animationFrameRate = 1;  // should be tested
        this.animator = undefined;
        switch (this.type)
        {
            case EPowerupType.FireFlower:
                this.animator = this.ChangeFireFlowerSprite();
                break;
            
            case EPowerupType.Star:
                this.animator = this.ChangeStarSprite();
                break;
        }

        this.hitbox = hitboxes.powerup;

        game.physics.RegisterToMovingObjectsArray(this);
        game.physics.RegisterToBucketMap(this);
    }

    Move()
    {
        this.speedX = (this.isBouncing ? this.bouncingSlidingSpeed : this.slidingSpeed) * (this.isGoingLeft ? -1 : 1);
        this.x += this.speedX;
    }

    Gravitate()
    {
        if (this.isOnGround)
            return;

        this.speedY += (this.isBouncing ? this.bouncingFallingAcceleration : this.fallingAcceleration);
        if (this.isBouncing && this.speedY > this.bouncingMaxFallSpeed)
        {
            this.speedY = this.bouncingMaxFallSpeed;
        }
        else if (this.speedY > this.maxFallSpeed)
        {
            this.speedY = this.maxFallSpeed;
        }
        
        this.y += this.speedY;
    }

    Update()
    {
        if (this.isPoppingUp)
        {
            this.y += this.poppingSpeed;
            
            if (this.y < this.originalY - BLOCK_SIZE / 2 - 1)
            {
                this.y = this.originalY - BLOCK_SIZE / 2 - 1;
                this.isPoppingUp = false;
            }

            return;
        }

        if (this.type != EPowerupType.FireFlower)
        {
            this.Move();
            this.Gravitate();
        }
    }

    *ChangeFireFlowerSprite()
    {
        while (true)
        {
            this.spriteToDraw = sprites.flower_1;
            yield;
            this.spriteToDraw = sprites.flower_2;
            yield;
            this.spriteToDraw = sprites.flower_3;
            yield;
            this.spriteToDraw = sprites.flower_4;
            yield;
        }
    }

    *ChangeStarSprite()
    {
        while (true)
        {
            this.spriteToDraw = sprites.star_1;
            yield;
            this.spriteToDraw = sprites.star_2;
            yield;
            this.spriteToDraw = sprites.star_3;
            yield;
            this.spriteToDraw = sprites.star_4;
            yield;
        }
    }

    Animate()
    {
        if (this.type != EPowerupType.FireFlower && this.type != EPowerupType.Star)
        {
            return;
        }

        if (this.animationFrameRate < this.animationFrameCount)
        {
            this.animationFrameCount = 0;
            this.animator.next();
        }
        else
        {
            this.animationFrameCount++;
        }
    }

    Draw()
    {
        this.Animate();
        DrawSprite(this.spriteToDraw, this.x, this.y);
    }

    Bounce(direction)
    {
        this.isBouncing = true;
        this.isGoingLeft = direction != DIRECTION.Left;
        this.speedY = this.bouncingInitialSpeed;
    }

    Soar()
    {
        this.speedY = this.soarInitialSpeed;
    }

    OnCollisionWith(collider, direction)
    {
        if (collider instanceof Mario)
        {
            this.Destroy();
            game.statistics.AddScore(SCORES.PowerUp);
        }
        else if (collider instanceof ActiveBlock)
        {
            switch (direction)
            {
                case DIRECTION.Left:
                case DIRECTION.Right:
                    this.isGoingLeft = !this.isGoingLeft;
                    break;

                case DIRECTION.Down:
                    if (this.type == EPowerupType.Star)
                    {
                        this.Soar();
                        return;
                    }

                    if (collider.isBouncing)
                    {
                        this.Bounce(this.x >= collider.x ? DIRECTION.Left : DIRECTION.Right);
                    }
                    else
                    {
                        this.speedY = 0;
                        this.y = collider.y - BLOCK_SIZE;
                        this.isBouncing = false;
                    }
                    break;
            }
        }
        else if (collider instanceof InactiveBlock)
        {
            switch (direction)
            {
                case DIRECTION.Left:
                case DIRECTION.Right:
                    this.isGoingLeft = !this.isGoingLeft;
                    break;

                case DIRECTION.Down:
                    if (this.type == EPowerupType.Star)
                    {
                        this.Soar();
                        return;
                    }

                    this.speedY = 0;
                    this.y = collider.y - BLOCK_SIZE;
                    this.isBouncing = false;
                    break;
            }
        }
    }

    Destroy()
    {
        game.Expel(this);
    }
}


const EPowerupType = {
    Mushroom : 0,
    OneUp : 1,
    FireFlower : 2,
    Star : 3
};