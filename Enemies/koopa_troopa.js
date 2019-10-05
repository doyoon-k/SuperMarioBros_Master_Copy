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

        // these three values are exclusive to each other, only one value can be set true at a given time
        this.isInShell = false;
        this._isAwakening = false;
        this.isSliding = false;

        this.slidingSpeed = HexFloatToDec("3.000");

        this.awakeningTimer = undefined;

        this.spriteToDraw = sprites.turtle_1;
    }

    get isAwakening()
    {
        return this._isAwakening;
    }

    set isAwakening(value)
    {
        this._isAwakening = value;
        this.animator = this.ChangeSprite();
    }

    Move()
    {
        if (this.isInShell || this.isAwakening)
        {
            return;
        }

        this.speedX = (this.isInstaKilled ?  this.instaKilledWalkingSpeed : this.isSliding ? this.slidingSpeed : this.walkingSpeed) * (this.isGoingLeft ? -1 : 1);
        this.x += this.speedX;
    }

    Stomped()
    {
        if (this.isSliding)
        {
            this.isSliding = false;
        }
        this.isInShell = true;
        this.awakeningTimer = setTimeout(this.Awakening, KOOPA_TROOPA_AWAKENING_SECONDS * 1000);

        this.spriteToDraw = sprites.turtle_shell;
    }

    Awakening()
    {
        this.isInShell = false;
        this.isAwakening = true;

        this.awakeningTimer = setTimeout(this.Recover, KOOPA_TROOPA_RECOVER_SECONDS * 1000);
    }

    Recover()
    {
        this.isInShell = false;
        this.isAwakening = false;

        this.isGoingLeft = true;
        let distanceBetweenMario = abs(game.mario.x - this.x);
        if (BLOCK_SIZE / 2 <= distanceBetweenMario && distanceBetweenMario <= BLOCK_SIZE)
        {
            this.isGoingLeft = this.x > game.mario.x ? false : true;
        }
    }

    ShellPushed()
    {
        clearTimeout(this.awakeningTimer);
        this.isInShell = false;
        this.isAwakening = false;
        this.isSliding = true;

        this.spriteToDraw = sprites.turtle_shell;
    }

    InstaKilled()
    {
        clearTimeout(this.awakeningTimer);
        this.isInShell = false;
        this.isAwakening = false;
        this.isSliding = false;

        this.isInstaKilled = true;

        this.spriteToDraw = sprites.turtle_shell;
    }

    *ChangeSprite()
    {
        if (this.isAwakening)
        {
            while (true)
            {
                this.spriteToDraw = sprites.turtle_shell;
                yield;
                this.spriteToDraw = sprites.turtle_awakening;
                yield;
            }
        }

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
        if (this.isInShell || this.isInstaKilled || this.isSliding)
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
        DrawSprite(this.spriteToDraw, this.x, this.y, !this.isGoingLeft, this.isInstaKilled);
    }

    OnCollisionWith(collider, direction)
    {
        if (collider instanceof InactiveBlock)
        {
            switch (direction)
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
                    if (collider.isBouncing)
                    {
                        this.InstaKilled(this.x >= collider.x ? "LEFT" : "RIGHT");
                    }
                    else
                    {
                        this.y = collider.y - BLOCK_SIZE;
                    }
                    break;
            }
        }
        else if (collider instanceof BaseEnemy)
        {
            if (collider instanceof KoopaTroopa && collider.isSliding)
            {
                this.InstaKilled(this.x >= collider.x ? "LEFT" : "RIGHT");
                return;
            }

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
                    if (this.isInShell || this.isAwakening)
                    {
                        this.ShellPushed(direction);
                    }
                    else
                    {
                        this.Stomped();
                    }
                    break;
                
                case "LEFT":
                case "RIGHT":
                    if (this.isInShell || this.isAwakening)
                    {
                        this.ShellPushed(direction);
                    }
                    break;
            }
        }
        else if (collider instanceof Fireball)
        {
            this.InstaKilled(this.x >= collider.x ? "LEFT" : "RIGHT");
        }
    }
}