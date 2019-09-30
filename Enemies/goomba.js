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

        this.spriteToDraw = sprites.goomba_1;
    }

    Move()
    {
        if (this.isStomped || this.isInstaKilled)
        {
            return;
        }

        this.x += this.walkingSpeed * (this.isGoingLeft ? -1 : 1);
    }

    Stomped()
    {
        this.isStomped = true;
        this.spriteToDraw = sprites.goomba_stomped;
        setTimeout(this.Destroy, GOOMBA_REMAINS_STOMPED_SECONDS * 1000);
    }

    InstaKilled()
    {
        this.isInstaKilled = true;
        // flip the sprite upside-down
        // sprite's coordinate should draw a parabola
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
    }

    Draw()
    {
        this.Animate();
        DrawSprite(this.spriteToDraw, this.x, this.y);
    }

    OnCollisionWith(collider, direction)
    {
        if (collider instanceof InactiveBlock)
        {
            switch(direction)
            {
                case "SIDE":
                    this.isGoingLeft = !this.isGoingLeft;
                    break;

                case "DOWN":
                    //this.y를 블록 y좌표 - 블록높이로 고정.
                    this.y = collider.y - BLOCK_SIZE;
            }
        }
        else if (collider instanceof ActiveBlock)
        {
            switch (direction)
            {
                case "SIDE":
                    this.isGoingLeft = !this.isGoingLeft;
                    break;
                    
                case "DOWN":
                    this.InstaKilled();
                    break;
            }
        }
        else if (collider instanceof BaseEnemy)
        {
            this.isGoingLeft = !this.isGoingLeft;
        }
        else if (collider instanceof Mario)
        {
            switch (direction)
            {
                case "SIDE":
                    this.isGoingLeft = !this.isGoingLeft;
                    break;
                
                case "UP":
                    this.Stomped();
                    break;
            }
        }
    }
}