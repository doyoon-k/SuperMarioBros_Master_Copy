/*
  goomba.js
  Super Mario Bros.

  GAM100 
  Fall 2019

  JoonHo Hwang Wrote all of this
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

        this.spriteToDraw = sprites.goomba_1;
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
        this.isStomped = true;
        this.spriteToDraw = sprites.goomba_stomped;
        setTimeout(this.Destroy, GOOMBA_REMAINS_STOMPED_SECONDS * 1000);

        game.statistics.AddScore(SCORES.Stomp[map(++game.mario.stompCombo, 0, SCORES.Stomp.length - 1, 0, SCORES.Stomp.length - 1, true)]);
    }

    InstaKilled(direction)
    {
        this.isInstaKilled = true;
        this.speedY = this.instaKilledInitialSpeed;
        this.isGoingLeft = direction == DIRECTION.Right;
        
        physics.RemoveFromMovingObjectsArray(this);
        physics.RemoveFromBucketMap(this);

        game.statistics.AddScore(SCORES.InstaKillGoomba);
    }

    *ChangeSprite()
    {
        while (true)
        {
            this.spriteToDraw = sprites.goomba_1;
            yield;
            this.spriteToDraw = sprites.goomba_2;
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
        // this.Gravitate();
    }

    Draw()
    {
        this.Animate();
        DrawSprite(this.spriteToDraw, this.x, this.y, false, this.isInstaKilled);
    }

    OnCollisionWith(collider, direction)
    {
        if (collider instanceof InactiveBlock)
        {
            switch (direction)
            {
                case DIRECTION.Left:
                case DIRECTION.Right:
                    this.isGoingLeft = !this.isGoingLeft;
                    break;

                case DIRECTION.Down:
                    this.speedY = 0;
                    this.y = collider.y - BLOCK_SIZE;
                    break;
            }
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
                    if (collider.isBouncing)
                    {
                        this.InstaKilled(this.x >= collider.x ? DIRECTION.Left : DIRECTION.Right);
                    }
                    else
                    {
                        this.speedY = 0;
                        this.y = collider.y - BLOCK_SIZE;
                    }
                    break;
            }
        }
        else if (collider instanceof BaseEnemy)
        {
            if (collider instanceof KoopaTroopa && collider.isSliding)
            {
                this.InstaKilled(this.x >= collider.x ? DIRECTION.Left : DIRECTION.Right);
                return;
            }

            this.isGoingLeft = !this.isGoingLeft;
        }
        else if (collider instanceof Mario)
        {
            if (collider.isInvincible)
            {
                this.InstaKilled(this.x >= collider.x ? DIRECTION.Left : DIRECTION.Right);
                return;
            }

            switch (direction)
            {
                case DIRECTION.Up:
                    this.Stomped();
                    break;
            }
        }
        else if (collider instanceof Fireball)
        {
            this.InstaKilled(this.x >= collider.x ? DIRECTION.Left : DIRECTION.Right);
        }
    }
}