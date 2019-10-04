/*
  koopa_troopa.js
  Super Mario Bros.

  GAM100 
  Fall 2019

  JoonHo Hwang Wrote all of this
  DoYoon Kim 
  SeungGeon Kim 
  
  All content © 2019 DigiPen (USA) Corporation, all rights reserved.
*/

class KoopaTroopa extends BaseEnemy
{
    constructor(x, y, isRed)
    {
        super(x, y);
        this.isRed = isRed;
        this.isInShell = false;

        this.spriteToDraw = sprites.turtle_1;
    }

    Move()
    {
        if (this.isInShell || this.isInstaKilled)
        {
            return;
        }

        this.x += this.walkingSpeed * (this.isGoingLeft ? -1 : 1);
    }

    Stomped()
    {
        if (!this.isInShell)
        {

        }
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
            this.spriteToDraw = sprites.turtle_1;
            yield;
            this.spriteToDraw = sprites.turtle_2;
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
        else {
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
                    this.y = collider.y - BLOCK_SIZE;
                    break;
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
                    this.InstaKilled(this.x >= collider.x ? "LEFT" : "RIGHT");
                    break;
            }
        }
        else if (collider instanceof BaseEnemy)
        {
            this.isGoingLeft = !this.isGoingLeft;
        }
        else if (collider instanceof Mario)
        {
            if (collider.isInvincible)
            {
                this.InstaKilled(this.x >= collider.x ? "LEFT" : "RIGHT");
                return;
            }

            switch (direction)
            {
                case "UP":
                    this.Stomped();
                    break;
            }
        }
        else if (collider instanceof Fireball)
        {
            this.InstaKilled(this.x >= collider.x ? "LEFT" : "RIGHT");
        }
    }
}