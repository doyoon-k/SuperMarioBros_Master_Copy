/*
  goomba.js
  Super Mario Bros.

  GAM100 
  Fall 2019

  JoonHo Hwang Arranged & Wrote all of the main properties and functions
  DoYoon Kim wrote case InactiveBlock: of onCollisionWith() function.
  SeungGeon Kim 
  
  All content © 2019 DigiPen (USA) Corporation, all rights reserved.
*/

class Goomba extends BaseEnemy
{
    constructor(x, y)
    {
        super(x, y);
        this.isStomped = false;

        this.hitbox = hitboxes.goomba;

        this.spriteToDraw = sprites["goomba" + (game.IsUnderground() ? "_underground_1" : "_1")];
    }

    Move()
    {
        if (this.isStomped)
        {
            return;
        }

        this.speedX = (this.isInstaKilled ? this.instaKilledWalkingSpeed : this.walkingSpeed) * (this.isGoingLeft ? -1 : 1);
        this.x += this.speedX;
    }

    Stomped()
    {
        if (this.isStomped)
        {
            return;
        }
        this.isStomped = true;
        this.spriteToDraw = sprites["goomba_stomped" + (game.IsUnderground() ? "_underground" : "")];
        setTimeout(() => this.Destroy(), GOOMBA_REMAINS_STOMPED_SECONDS * 1000);

        game.statistics.AddScore(SCORES.Stomp[map(++game.mario.stompCombo, 0, SCORES.Stomp.length - 1, 0, SCORES.Stomp.length - 1, true)]);
    
        game.soundManager.Play("enemy_stomped");
    }

    InstaKilled(direction)
    {
        if (this.isInstaKilled)
        {
            return;
        }
        this.isInstaKilled = true;
        this.speedY = this.instaKilledInitialSpeed;
        this.isGoingLeft = direction == DIRECTION.Right;
        
        game.physics.RemoveFromMovingObjectsArray(this);
        game.physics.RemoveFromBucketMap(this);

        game.statistics.AddScore(SCORES.InstaKillGoomba);
    
        game.soundManager.Play("enemy_instakilled");
    }

    *ChangeSprite()
    {
        while (true)
        {
            this.spriteToDraw = sprites["goomba" + (game.IsUnderground() ? "_underground_1" : "_1")];
            yield;
            this.spriteToDraw = sprites["goomba" + (game.IsUnderground() ? "_underground_2" : "_2")];
            yield;
        }
    }

    Animate()
    {
        if (this.isStomped)
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

    Update()
    {
        this.Move();
        this.Gravitate();
    }

    Draw()
    {
        if (game.interfaceFlow.flowState == game.interfaceFlow.screenState.inGame)
            this.Animate();
            
        DrawSprite(this.spriteToDraw, this.x, this.y, false, this.isInstaKilled);
    }
}