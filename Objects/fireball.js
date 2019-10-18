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

        this.zWeight = 4;

        this.isGoingLeft = isGoingLeft;

        this.spriteToDraw = sprites.fireball_1;
        this.animationFrameCount = 0;
        this.animationFrameRate = 3;
        this.animator = this.ChangeSprite();

        // all these values should be tested
        this.movingSpeed = HexFloatToDec("4.850");
        this.bouncingInitialSpeed = -HexFloatToDec("4.000");
        this.fallingAcceleration = HexFloatToDec("0.875");
        this.maxFallSpeed = HexFloatToDec("3.500");

        this.speedX = this.movingSpeed * (isGoingLeft ? -1 : 1);
        this.speedY = 0;

        this.hitbox = hitboxes.fireball;

        this.isDestroyed = false;
        
        game.physics.RegisterToMovingObjectsArray(this);
        game.physics.RegisterToBucketMap(this);
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
        if (g_interfaceFlow.flowState == g_interfaceFlow.screenState.inGame && !game.mario.isTransforming)
        this.Animate();
        DrawSprite(this.spriteToDraw, this.x, this.y);
    }

    Destroy()
    {
        if (this.isDestroyed)
        {
            return;
        }

        let particleFirework = new ParticleFirework(this.x, this.y,true);
        game.gameObjects.push(particleFirework);
        game.Enroll(particleFirework);

        this.isDestroyed = true;
        game.mario.fireballCount--;
        game.Expel(this);
    }

    OnCollisionWith(collider, direction) {}
}