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

        this.zWeight = 4;

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

        this.starHorizontalSpeed = HexFloatToDec("1.800");
        this.starMaxFallSpeed = HexFloatToDec("3.000");
        this.soarInitialSpeed = -HexFloatToDec("6.400");  // should be tested

        this.speedX = 0;
        this.speedY = 0;

        this.isDestroyed = false;

        this.spriteToDraw = undefined;
        switch (this.type)
        {
            case EPowerupType.Mushroom:
                this.spriteToDraw = sprites.mushroom;
                break;

            case EPowerupType.OneUp:
                this.spriteToDraw = sprites["mushroom_1up" + (game.isUnderground ? "_underground" : "")];
                break;
            
            case EPowerupType.FireFlower:
                this.spriteToDraw = sprites["flower" + (game.isUnderground ? "_underground_1" : "_1")];
                break;
            
            case EPowerupType.Star:
                this.spriteToDraw = sprites["star" + (game.isUnderground ? "_underground_1" : "_1")];
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
        this.speedX = (this.isBouncing ? this.bouncingSlidingSpeed : (this.type == EPowerupType.Star ? this.starHorizontalSpeed : this.slidingSpeed)) * (this.isGoingLeft ? -1 : 1);
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
        else if (this.speedY > (this.type == EPowerupType.Star ? this.starMaxFallSpeed : this.maxFallSpeed))
        {
            this.speedY = (this.type == EPowerupType.Star ? this.starMaxFallSpeed : this.maxFallSpeed);
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
            this.spriteToDraw = sprites["flower" + (game.isUnderground ? "_underground_1" : "_1")];
            yield;
            this.spriteToDraw = sprites["flower" + (game.isUnderground ? "_underground_2" : "_2")];
            yield;
            this.spriteToDraw = sprites["flower" + (game.isUnderground ? "_underground_3" : "_3")];
            yield;
            this.spriteToDraw = sprites["flower" + (game.isUnderground ? "_underground_4" : "_4")];
            yield;
        }
    }

    *ChangeStarSprite()
    {
        while (true)
        {
            this.spriteToDraw = sprites.star_1;
            yield;
            this.spriteToDraw = sprites["star" + (game.isUnderground ? "_underground_2" : "_2")];
            yield;
            this.spriteToDraw = sprites.star_3;
            yield;
            this.spriteToDraw = sprites["star" + (game.isUnderground ? "_underground_4" : "_4")];
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
        if (g_interfaceFlow.flowState == g_interfaceFlow.screenState.inGame && !game.mario.isTransforming)
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
            if (!collider.isTransforming) {
                switch (this.type) {
                    case EPowerupType.Star:
                        collider.isInvincible = true;
                        break;
                    case EPowerupType.Mushroom:
                        collider.PowerupTo(collider.marioState.bigMario);
                        break;
                    case EPowerupType.FireFlower:
                        if (collider.powerupState == collider.marioState.mario) {
                            collider.PowerupTo(collider.marioState.bigMario);
                        } else if (collider.powerupState == collider.marioState.bigMario) {
                            collider.PowerupTo(collider.marioState.fireMario);
                        } else {
                            //Earn Points
                        }
                        break;
                    case EPowerupType.OneUp:
                        g_lives++;
                        //Oneup sound here
                        break;
                }
            }
        }
    }

    Destroy()
    {
        if (this.isDestroyed)
        {
            return;
        }
        this.isDestroyed = true;

        game.statistics.AddScore(SCORES.PowerUp);
                
        let particleScore = new ParticleScore(this.x, this.y - BLOCK_SIZE, SCORES.PowerUp);
        game.gameObjects.push(particleScore);
        game.Enroll(particleScore);

        if (this.type == EPowerupType.Star)
        {
            g_soundManager.Play("star");
        }
        game.Expel(this);
    }
}


const EPowerupType = {
    Mushroom : 0,
    OneUp : 1,
    FireFlower : 2,
    Star : 3
};