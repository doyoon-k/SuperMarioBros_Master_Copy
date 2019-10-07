/*
  fireball.js
  Super Mario Bros.

  GAM100 
  Fall 2019

  JoonHo Hwang Wrote all of this
  DoYoon Kim
  SeungGeon Kim 
  
  All content © 2019 DigiPen (USA) Corporation, all rights reserved.
*/

class Fireball
{
    constructor(x, y, isGoingLeft)
    {
        this.x = x;
        this.y = y;
        this.isGoingLeft = isGoingLeft;

        this.spriteToDraw = sprites.fireball_1;
        this.animationFrameCount = 0;
        this.animationFrameRate = 3;
        this.animator = this.ChangeSprite();

        // all these values should be tested
        this.movingSpeed = HexToFloat("5.000");
        this.bouncingInitialSpeed = -HexFloatToDec("0.600");
        this.fallingAcceleration = HexFloatToDec("1.500");
        this.maxFallSpeed = HexFloatToDec("4.800");

        this.speedX = this.movingSpeed * (isGoingLeft ? -1 : 1);
        this.speedY = 0;
        
        game.physics.RegisterToMovingObjectsArray(this);
    }

    Move()
    {
        this.x += this.speedX;
    }

    Gravitate()
    {
        this.speedY += this.fallingAcceleration;

        if (this.speedY > this.maxFallSpeed)
        {
            this.speedY = this.maxFallSpeed;
        }
        
        this.y += this.speedY;
    }

    Bounce()
    {
        this.speedY = this.bouncingInitialSpeed;
    }

    Update()
    {
        this.Move();
        this.Gravitate();
    }
    
    *ChangeSprite()
    {
        while (true)
        {
            this.spriteToDraw = sprites.fireball_1;
            yield;
            this.spriteToDraw = sprites.fireball_2;
            yield;
            this.spriteToDraw = sprites.fireball_3;
            yield;
            this.spriteToDraw = sprites.fireball_4;
            yield;
        }
    }

    Animate()
    {
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

    Destroy()
    {
        game.Expel(this);
    }

    OnCollisionWith(collider, direction)
    {
        if (collider instanceof BaseEnemy)
        {
            //particle here
            this.Destroy();
        }
        else if (collider instanceof ActiveBlock)
        {
            switch (direction)
            {
                case DIRECTION.Down:
                    this.Bounce();
                    break;
                
                default:
                    this.Destroy();
                    // particle here
                    break;
            }
        }
        else if (collider instanceof InactiveBlock)
        {
            switch (direction)
            {
                case DIRECTION.Down:
                    this.Bounce();
                    break;
                
                default:
                    this.Destroy();
                    // particle here
                    break;
            }
        }
    }
}