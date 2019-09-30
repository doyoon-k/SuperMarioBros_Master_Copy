/*
  goomba.js
  Super Mario Bros.

  GAM100 
  Fall 2019

  JoonHo Hwang Wrote all of this
  DoYoon Kim 
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
        setTimeout(this.Destroy, 0.5 * 1000);
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
        else {
            this.animationFrameCount++;
        }
    }

    Update()
    {
        this.Move();
        this.Animate();
        DrawSprite(this.spriteToDraw, this.x, this.y);
    }

    OnCollisionWith(collider, direction)
    {
        switch (typeof collider)
        {
            case InactiveBlock:
            case ActiveBlock:
                switch (direction)
                {
                    case "SIDE":
                        this.isGoingLeft = !this.isGoingLeft;
                        break;
                    
                    case "DOWN":
                        this.InstaKilled();
                        break;
                }
                break;

            case BaseEnemy:
                this.isGoingLeft = !this.isGoingLeft;
                break;
                
            case Mario:
                this.isGoingLeft = !this.isGoingLeft;
                break;
        }
    }
}